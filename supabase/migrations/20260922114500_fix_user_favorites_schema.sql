-- The table already existed in production with the legacy schema
-- (user_id, content_id, saved_at). The previous CREATE TABLE IF NOT EXISTS
-- therefore did not add the columns used by the current app.

alter table public.user_favorites
  drop constraint if exists user_favorites_pkey,
  drop constraint if exists user_favorites_content_id_fkey,
  drop constraint if exists user_favorites_user_id_fkey;

alter table public.user_favorites
  add column if not exists favorite_id text,
  add column if not exists payload jsonb not null default '{}'::jsonb,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

-- Production had no rows in this legacy table at migration time, so the
-- legacy content_id/saved_at columns can be removed without data loss.
alter table public.user_favorites
  drop column if exists content_id,
  drop column if exists saved_at;

alter table public.user_favorites
  alter column favorite_id set not null;

alter table public.user_favorites
  add constraint user_favorites_pkey primary key (user_id, favorite_id),
  add constraint user_favorites_user_id_fkey foreign key (user_id) references auth.users(id) on delete cascade;

alter table public.user_favorites enable row level security;

drop policy if exists "Users manage own favorites" on public.user_favorites;
create policy "Users manage own favorites"
  on public.user_favorites
  for all
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
