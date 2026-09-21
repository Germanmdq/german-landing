-- Centralize user-owned app state in Supabase.

create table if not exists public.user_favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  favorite_id text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, favorite_id)
);
alter table public.user_favorites enable row level security;
drop policy if exists "Users manage own favorites" on public.user_favorites;
create policy "Users manage own favorites" on public.user_favorites for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create table if not exists public.user_content_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  content_key text not null,
  content_type text not null,
  progress jsonb not null default '{}'::jsonb,
  last_opened_at timestamptz not null default now(),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, content_key)
);
alter table public.user_content_progress enable row level security;
drop policy if exists "Users manage own content progress" on public.user_content_progress;
create policy "Users manage own content progress" on public.user_content_progress for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create table if not exists public.user_consultations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question text not null,
  answer text,
  source text not null default 'text',
  status text not null default 'pending' check (status in ('pending','answered','failed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists user_consultations_user_created on public.user_consultations(user_id, created_at desc);
alter table public.user_consultations enable row level security;
drop policy if exists "Users manage own consultations" on public.user_consultations;
create policy "Users manage own consultations" on public.user_consultations for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

alter table public.program_enrollments add column if not exists custom_config jsonb;
insert into public.collections (slug,title,description,collection_type,is_published,sort_order)
values ('custom-practice','Tu propia práctica','Práctica personalizada creada por el usuario','taller',true,90)
on conflict (slug) do update set title=excluded.title, description=excluded.description, collection_type=excluded.collection_type, is_published=excluded.is_published, updated_at=now();

create or replace function public.start_custom_program(
  p_morning time,
  p_noon time,
  p_afternoon time,
  p_night time,
  p_timezone text,
  p_message_interval_minutes integer,
  p_custom_config jsonb
)
returns public.program_enrollments
language plpgsql
security invoker
set search_path = ''
as $$
declare
  result public.program_enrollments;
  custom_collection_id uuid;
begin
  if auth.uid() is null then raise exception 'authentication required' using errcode='28000'; end if;
  if exists (select 1 from public.program_enrollments where user_id=auth.uid() and status='active') then
    raise exception 'active program already exists' using errcode='23505';
  end if;
  select id into custom_collection_id from public.collections where slug='custom-practice' and is_published=true;
  if custom_collection_id is null then raise exception 'custom practice collection missing' using errcode='P0002'; end if;
  insert into public.program_enrollments(user_id,collection_id,current_day,morning,noon,afternoon,night,timezone,message_interval_minutes,custom_config)
  values(auth.uid(),custom_collection_id,1,p_morning,p_noon,p_afternoon,p_night,p_timezone,p_message_interval_minutes,p_custom_config)
  returning * into result;
  return result;
end;
$$;
revoke all on function public.start_custom_program(time,time,time,time,text,integer,jsonb) from public;
grant execute on function public.start_custom_program(time,time,time,time,text,integer,jsonb) to authenticated;
