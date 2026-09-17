create table if not exists public.stripe_subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text unique not null,
  stripe_price_id text,
  status text not null,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.stripe_subscriptions enable row level security;

drop policy if exists "Users read own Stripe subscription" on public.stripe_subscriptions;
create policy "Users read own Stripe subscription"
  on public.stripe_subscriptions for select
  to authenticated
  using ((select auth.uid()) = user_id);

revoke all on public.stripe_subscriptions from anon, authenticated;
grant select on public.stripe_subscriptions to authenticated;
grant all on public.stripe_subscriptions to service_role;
