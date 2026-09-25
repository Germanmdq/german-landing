alter table public.telegram_accounts
  alter column trial_expires_at set default (now() + interval '72 hours');

update public.telegram_accounts
set trial_expires_at = trial_started_at + interval '72 hours'
where access_tier = 'trial'
  and trial_expires_at is distinct from trial_started_at + interval '72 hours';
