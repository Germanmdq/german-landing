create table if not exists public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  morning time not null default '07:50',
  noon time not null default '12:30',
  afternoon time not null default '17:00',
  night time not null default '22:45',
  installation_acknowledged boolean not null default false,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_settings enable row level security;

grant select, insert, update on table public.user_settings to authenticated;

create policy "user_settings_select_own"
on public.user_settings for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "user_settings_insert_own"
on public.user_settings for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "user_settings_update_own"
on public.user_settings for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);;
