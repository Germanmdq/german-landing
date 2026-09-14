alter table public.profiles
  add column if not exists workshop_link_opened_at timestamptz,
  add column if not exists installed_at timestamptz,
  add column if not exists activation_requested_at timestamptz;
