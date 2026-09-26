create table if not exists public.ui_click_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  event_name text not null,
  target text not null,
  source text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists ui_click_events_event_target_idx on public.ui_click_events (event_name, target);
create index if not exists ui_click_events_created_at_idx on public.ui_click_events (created_at desc);
create index if not exists ui_click_events_user_id_idx on public.ui_click_events (user_id);

alter table public.ui_click_events enable row level security;

drop policy if exists "users can insert own ui click events" on public.ui_click_events;
create policy "users can insert own ui click events"
on public.ui_click_events
for insert
to authenticated
with check (auth.uid() = user_id);
