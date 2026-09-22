create table if not exists public.telegram_accounts (
  telegram_user_id bigint primary key,
  user_id uuid unique not null references auth.users(id) on delete cascade,
  username text,
  first_name text,
  last_name text,
  language_code text,
  chat_id bigint,
  trial_started_at timestamptz not null default now(),
  trial_expires_at timestamptz not null default (now() + interval '48 hours'),
  access_tier text not null default 'trial' check (access_tier in ('trial', 'active', 'founder', 'blocked')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.telegram_accounts enable row level security;

revoke all on public.telegram_accounts from public, anon, authenticated;
grant all on public.telegram_accounts to service_role;

create index if not exists telegram_accounts_user_id_idx on public.telegram_accounts(user_id);

