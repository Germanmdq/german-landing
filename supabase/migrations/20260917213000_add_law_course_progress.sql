-- Independent daily progress for the 365-day course. This intentionally does
-- not use program_enrollments, so it can coexist with 7/40-day guided programs.
create table if not exists public.law_course_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  started_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.law_course_progress enable row level security;

drop policy if exists "Users read own 365 progress" on public.law_course_progress;
create policy "Users read own 365 progress"
  on public.law_course_progress for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users start own 365 progress" on public.law_course_progress;
create policy "Users start own 365 progress"
  on public.law_course_progress for insert
  to authenticated
  with check ((select auth.uid()) = user_id);
