create schema if not exists private;
revoke all on schema private from public;

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete restrict,
  provider text not null check (provider in ('mercadopago', 'paypal')),
  plan text not null check (plan in ('30_days', 'annual', 'lifetime')),
  amount numeric(12, 2) not null check (amount > 0),
  currency text not null check (currency ~ '^[A-Z]{3}$'),
  provider_payment_id text,
  provider_order_id text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'cancelled', 'failed', 'refunded')),
  approved_at timestamptz,
  processed_at timestamptz,
  raw_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index payments_provider_payment_unique
  on public.payments (provider, provider_payment_id)
  where provider_payment_id is not null;

create unique index payments_provider_order_unique
  on public.payments (provider, provider_order_id)
  where provider_order_id is not null;

create index payments_user_created_at
  on public.payments (user_id, created_at desc);

create table public.user_entitlements (
  user_id uuid primary key references auth.users(id) on delete cascade,
  access_until timestamptz,
  lifetime boolean not null default false,
  source_payment_id uuid references public.payments(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (lifetime or access_until is not null)
);

alter table public.payments enable row level security;
alter table public.user_entitlements enable row level security;

create policy "Users read own payments"
  on public.payments for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users read own entitlement"
  on public.user_entitlements for select
  to authenticated
  using ((select auth.uid()) = user_id);

revoke all on public.payments from anon, authenticated;
revoke all on public.user_entitlements from anon, authenticated;
grant select on public.payments to authenticated;
grant select on public.user_entitlements to authenticated;
grant all on public.payments to service_role;
grant all on public.user_entitlements to service_role;

create function private.prepare_approved_payment()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.updated_at := now();

  if tg_op = 'UPDATE' and old.processed_at is not null then
    if new.user_id is distinct from old.user_id
      or new.provider is distinct from old.provider
      or new.plan is distinct from old.plan
      or new.amount is distinct from old.amount
      or new.currency is distinct from old.currency then
      raise exception 'Processed payment fields are immutable';
    end if;
  end if;

  if new.status = 'approved' and new.processed_at is null then
    new.approved_at := coalesce(new.approved_at, now());
    new.processed_at := now();
  end if;

  return new;
end;
$$;

create function private.apply_approved_payment_entitlement()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  access_extension interval;
begin
  if new.status <> 'approved'
    or new.processed_at is null
    or (tg_op = 'UPDATE' and old.processed_at is not null) then
    return new;
  end if;

  access_extension := case new.plan
    when '30_days' then interval '30 days'
    when 'annual' then interval '365 days'
    else null
  end;

  insert into public.user_entitlements (
    user_id,
    access_until,
    lifetime,
    source_payment_id
  ) values (
    new.user_id,
    case when new.plan = 'lifetime' then null else now() + access_extension end,
    new.plan = 'lifetime',
    new.id
  )
  on conflict (user_id) do update set
    lifetime = public.user_entitlements.lifetime or excluded.lifetime,
    access_until = case
      when public.user_entitlements.lifetime or excluded.lifetime
        then public.user_entitlements.access_until
      else greatest(now(), coalesce(public.user_entitlements.access_until, now())) + access_extension
    end,
    source_payment_id = new.id,
    updated_at = now();

  return new;
end;
$$;

revoke all on function private.prepare_approved_payment() from public, anon, authenticated;
revoke all on function private.apply_approved_payment_entitlement() from public, anon, authenticated;

create trigger payments_prepare_approved
before insert or update on public.payments
for each row execute function private.prepare_approved_payment();

create trigger payments_apply_entitlement
after insert or update on public.payments
for each row execute function private.apply_approved_payment_entitlement();

-- No se concede acceso automáticamente a usuarios existentes.
-- Los accesos se crean únicamente por un pago aprobado o por una concesión administrativa explícita.
