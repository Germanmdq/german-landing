alter table public.telegram_accounts
  alter column trial_expires_at set default (now() + interval '96 hours');

update public.telegram_accounts
set trial_expires_at = trial_started_at + interval '96 hours'
where access_tier = 'trial'
  and trial_started_at is not null
  and trial_expires_at is distinct from trial_started_at + interval '96 hours';
