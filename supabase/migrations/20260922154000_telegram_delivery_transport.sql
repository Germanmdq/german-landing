alter table public.taller_deliveries
  add column if not exists telegram_status text not null default 'pending',
  add column if not exists telegram_error text,
  add column if not exists telegram_message_id bigint,
  add column if not exists telegram_sent_at timestamptz,
  add column if not exists telegram_attempts integer not null default 0,
  add column if not exists telegram_last_attempt_at timestamptz;

create or replace function public.claim_delivery_telegram_attempt(
  p_delivery_id uuid,
  p_min_interval_seconds integer default 90,
  p_max_attempts integer default 6
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  claimed uuid;
begin
  update public.taller_deliveries
     set telegram_attempts = coalesce(telegram_attempts, 0) + 1,
         telegram_last_attempt_at = now()
   where id = p_delivery_id
     and telegram_status in ('pending', 'failed')
     and coalesce(telegram_attempts, 0) < p_max_attempts
     and (
       telegram_last_attempt_at is null
       or telegram_last_attempt_at <= now() - make_interval(secs => p_min_interval_seconds)
     )
  returning id into claimed;

  return claimed is not null;
end;
$$;

revoke all on function public.claim_delivery_telegram_attempt(uuid, integer, integer) from public, anon, authenticated;
grant execute on function public.claim_delivery_telegram_attempt(uuid, integer, integer) to service_role;

alter table public.telegram_accounts
  drop constraint if exists telegram_accounts_access_tier_check;

alter table public.telegram_accounts
  add constraint telegram_accounts_access_tier_check
  check (access_tier in ('trial', 'limited', 'active', 'founder', 'blocked'));

alter table public.telegram_accounts
  add column if not exists permissions jsonb not null default '{}'::jsonb;
