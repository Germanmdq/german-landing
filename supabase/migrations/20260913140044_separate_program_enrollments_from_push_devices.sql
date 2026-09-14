create table public.program_enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  collection_id uuid not null references public.collections(id) on delete restrict,
  status text not null default 'active' check (status in ('active', 'abandoned', 'completed')),
  current_day integer not null default 1 check (current_day > 0),
  morning time not null,
  noon time not null,
  afternoon time not null,
  night time not null,
  timezone text not null,
  message_interval_minutes integer not null check (message_interval_minutes > 0),
  started_at timestamptz not null default now(),
  abandoned_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((status = 'abandoned') = (abandoned_at is not null)),
  check ((status = 'completed') = (completed_at is not null))
);

create unique index program_enrollments_one_active_per_user
  on public.program_enrollments (user_id)
  where status = 'active';

create index program_enrollments_user_history
  on public.program_enrollments (user_id, started_at desc);

alter table public.program_enrollments enable row level security;

create policy "Users read own program enrollments"
  on public.program_enrollments for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users insert own program enrollments"
  on public.program_enrollments for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users update own program enrollments"
  on public.program_enrollments for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- Migra el progreso existente. Si hubiera más de un progreso incompleto para
-- un usuario, sólo el más reciente queda activo; los anteriores quedan como
-- historial abandonado para satisfacer la nueva restricción.
with ranked_progress as (
  select
    upp.*,
    row_number() over (
      partition by upp.user_id
      order by (upp.completed_at is null) desc, upp.started_at desc, upp.id desc
    ) as active_rank
  from public.user_plan_progress upp
), prepared as (
  select
    rp.*,
    ps.morning,
    ps.noon,
    ps.afternoon,
    ps.night,
    ps.timezone,
    ps.message_interval_minutes
  from ranked_progress rp
  left join lateral (
    select p.*
    from public.push_subscriptions p
    where p.user_id = rp.user_id
      and p.active_taller_id = rp.collection_id
    order by p.is_active desc, p.updated_at desc, p.id desc
    limit 1
  ) ps on true
)
insert into public.program_enrollments (
  user_id,
  collection_id,
  status,
  current_day,
  morning,
  noon,
  afternoon,
  night,
  timezone,
  message_interval_minutes,
  started_at,
  abandoned_at,
  completed_at,
  created_at,
  updated_at
)
select
  user_id,
  collection_id,
  case
    when completed_at is not null then 'completed'
    when active_rank = 1 then 'active'
    else 'abandoned'
  end,
  current_day,
  coalesce(morning, '07:00'::time),
  coalesce(noon, '12:00'::time),
  coalesce(afternoon, '17:00'::time),
  coalesce(night, '22:00'::time),
  coalesce(timezone, 'UTC'),
  coalesce(message_interval_minutes, 60),
  started_at,
  case when completed_at is null and active_rank <> 1 then started_at end,
  completed_at,
  started_at,
  now()
from prepared;

alter table public.taller_deliveries
  add column enrollment_id uuid references public.program_enrollments(id) on delete cascade;

update public.taller_deliveries td
set enrollment_id = (
  select pe.id
  from public.program_enrollments pe
  join public.collection_items ci
    on ci.collection_id = pe.collection_id
  where pe.user_id = td.user_id
    and ci.content_id = td.content_id
  order by pe.started_at desc
  limit 1
)
where td.enrollment_id is null;

-- La auditoría previa a esta migración debe confirmar que todas las entregas
-- históricas tienen un progreso compatible. Si no fuera así, abortamos en vez
-- de dejar filas huérfanas o perder historial.
alter table public.taller_deliveries
  alter column enrollment_id set not null;

alter table public.taller_deliveries
  drop constraint taller_deliveries_enrollment_id_fkey,
  add constraint taller_deliveries_enrollment_id_fkey
    foreign key (enrollment_id) references public.program_enrollments(id) on delete restrict;

drop index if exists public.taller_deliveries_unique_non_message;
drop index if exists public.taller_deliveries_unique_message;

create unique index taller_deliveries_enrollment_unique_non_message
  on public.taller_deliveries (enrollment_id, day_number, delivery_type)
  where enrollment_id is not null and message_index is null;

create unique index taller_deliveries_enrollment_unique_message
  on public.taller_deliveries (enrollment_id, day_number, delivery_type, message_index)
  where enrollment_id is not null and message_index is not null;

create index taller_deliveries_enrollment_delivered_at
  on public.taller_deliveries (enrollment_id, delivered_at desc);

create or replace function public.validate_active_program_delivery()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  enrollment public.program_enrollments;
begin
  select * into enrollment
  from public.program_enrollments
  where id = new.enrollment_id
  for update;

  if enrollment.id is null
    or enrollment.status <> 'active'
    or enrollment.user_id <> new.user_id
    or enrollment.current_day <> new.day_number then
    raise exception 'delivery does not belong to the active enrollment day' using errcode = '55000';
  end if;

  if not exists (
    select 1 from public.collection_items
    where collection_id = enrollment.collection_id
      and content_id = new.content_id
  ) then
    raise exception 'delivery content does not belong to enrollment program' using errcode = '55000';
  end if;
  return new;
end;
$$;

create trigger validate_active_program_delivery_before_insert
before insert on public.taller_deliveries
for each row execute function public.validate_active_program_delivery();

revoke all on function public.validate_active_program_delivery() from public;

create or replace function public.start_program(
  p_collection_id uuid,
  p_morning time,
  p_noon time,
  p_afternoon time,
  p_night time,
  p_timezone text,
  p_message_interval_minutes integer
)
returns public.program_enrollments
language plpgsql
security invoker
set search_path = ''
as $$
declare
  result public.program_enrollments;
begin
  if auth.uid() is null then raise exception 'authentication required' using errcode = '28000'; end if;
  if not exists (
    select 1 from public.collections
    where id = p_collection_id and is_published = true
  ) then
    raise exception 'program not found' using errcode = 'P0002';
  end if;
  if exists (
    select 1 from public.program_enrollments
    where user_id = auth.uid() and status = 'active'
  ) then
    raise exception 'active program already exists' using errcode = '23505';
  end if;

  insert into public.program_enrollments (
    user_id, collection_id, current_day, morning, noon, afternoon, night,
    timezone, message_interval_minutes
  ) values (
    auth.uid(), p_collection_id, 1, p_morning, p_noon, p_afternoon, p_night,
    p_timezone, p_message_interval_minutes
  ) returning * into result;
  return result;
end;
$$;

create or replace function public.abandon_program(p_enrollment_id uuid)
returns public.program_enrollments
language plpgsql
security invoker
set search_path = ''
as $$
declare
  result public.program_enrollments;
begin
  if auth.uid() is null then raise exception 'authentication required' using errcode = '28000'; end if;

  update public.program_enrollments
  set status = 'abandoned', abandoned_at = now(), updated_at = now()
  where id = p_enrollment_id
    and user_id = auth.uid()
    and status = 'active'
  returning * into result;

  if result.id is null then raise exception 'active enrollment not found' using errcode = 'P0002'; end if;
  return result;
end;
$$;

create or replace function public.switch_program(
  p_current_enrollment_id uuid,
  p_new_collection_id uuid,
  p_morning time,
  p_noon time,
  p_afternoon time,
  p_night time,
  p_timezone text,
  p_message_interval_minutes integer
)
returns public.program_enrollments
language plpgsql
security invoker
set search_path = ''
as $$
declare
  result public.program_enrollments;
begin
  if auth.uid() is null then raise exception 'authentication required' using errcode = '28000'; end if;
  if not exists (
    select 1 from public.collections
    where id = p_new_collection_id and is_published = true
  ) then
    raise exception 'program not found' using errcode = 'P0002';
  end if;

  update public.program_enrollments
  set status = 'abandoned', abandoned_at = now(), updated_at = now()
  where id = p_current_enrollment_id
    and user_id = auth.uid()
    and status = 'active';
  if not found then raise exception 'active enrollment not found' using errcode = 'P0002'; end if;

  insert into public.program_enrollments (
    user_id, collection_id, current_day, morning, noon, afternoon, night,
    timezone, message_interval_minutes
  ) values (
    auth.uid(), p_new_collection_id, 1, p_morning, p_noon, p_afternoon, p_night,
    p_timezone, p_message_interval_minutes
  ) returning * into result;
  return result;
end;
$$;

revoke all on function public.start_program(uuid,time,time,time,time,text,integer) from public;
revoke all on function public.abandon_program(uuid) from public;
revoke all on function public.switch_program(uuid,uuid,time,time,time,time,text,integer) from public;
grant execute on function public.start_program(uuid,time,time,time,time,text,integer) to authenticated;
grant execute on function public.abandon_program(uuid) to authenticated;
grant execute on function public.switch_program(uuid,uuid,time,time,time,time,text,integer) to authenticated;

-- push_subscriptions queda exclusivamente como registro de dispositivos.
alter table public.push_subscriptions
  drop column morning,
  drop column noon,
  drop column afternoon,
  drop column night,
  drop column timezone,
  drop column message_interval_minutes,
  drop column active_taller_id,
  drop column current_day;
