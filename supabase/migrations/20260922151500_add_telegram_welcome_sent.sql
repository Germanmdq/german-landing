alter table public.telegram_accounts
  add column if not exists welcome_sent_at timestamptz;
