-- Avance nocturno atómico e idempotente.
--
-- Antes, send-notifications reservaba la noche (claim_program_night), creaba
-- la entrega, intentaba Telegram y recién después avanzaba current_day. Si algo
-- fallaba entre medio, el taller quedaba congelado para siempre y la fecha
-- quedaba consumida aunque no se hubiera entregado nada.
--
-- Ahora deliver_program_night hace TODO en una sola transacción: valida,
-- registra la entrega de la noche, reserva la fecha local y avanza (o
-- completa) el taller. Telegram se intenta después, fuera de la transacción.

-- 1) Inicio del día lógico actual. Una meditación sólo pertenece al día actual
--    si su horario ocurrió estrictamente después de este instante. Evita
--    recuperar horarios previos a la inscripción, repetir la noche recién
--    entregada y mandar meditaciones del día siguiente la misma noche.
alter table public.program_enrollments
  add column if not exists current_day_started_at timestamptz;

update public.program_enrollments pe
set current_day_started_at = coalesce((
  select max(td.delivered_at)
  from public.taller_deliveries td
  where td.enrollment_id = pe.id
    and td.delivery_type = 'meditation_night'
    and td.day_number = pe.current_day - 1
), pe.started_at)
where pe.current_day_started_at is null;

alter table public.program_enrollments
  alter column current_day_started_at set default now(),
  alter column current_day_started_at set not null;

-- 2) Cambios de horario pendientes para el próximo día lógico (ver
--    update_program_schedule). Se aplican dentro de deliver_program_night.
alter table public.program_enrollments
  add column if not exists pending_schedule jsonb;

-- 3) Duración total del programa, independiente de cuántos días de contenido
--    estén cargados. Misma regla que usaba la Edge Function.
create or replace function public.program_total_days(p_collection_id uuid)
returns integer
language sql
stable
security definer
set search_path = ''
as $$
  select case
    when c.slug = 'taller-40-dias' then 40
    when substring(c.slug from '(?:^|-)(7|15|30|40)-dias(?:-|$)') is not null
      then substring(c.slug from '(?:^|-)(7|15|30|40)-dias(?:-|$)')::integer
    -- Programas históricos sin duración en el slug.
    else (select max(ci.sort_order) from public.collection_items ci where ci.collection_id = c.id)
  end
  from public.collections c
  where c.id = p_collection_id;
$$;

revoke all on function public.program_total_days(uuid) from public, anon, authenticated;
grant execute on function public.program_total_days(uuid) to service_role;

-- 3b) Ventana del día lógico (misma regla que schedule.ts).
--
-- Una fecha lógica va de 04:00 a 04:00 locales: la madrugada pertenece a la
-- noche anterior. El día actual sólo puede generar entregas desde su primera
-- fecha lógica válida: la de la inscripción para el Día 1, o la SIGUIENTE a
-- la de la noche que cerró el día anterior. Así ninguna entrega del Día N+1
-- sale la misma noche en que terminó el Día N, aunque cambien los horarios.
create or replace function public.program_logical_date(p_at timestamptz, p_timezone text)
returns date
language sql
stable
set search_path = ''
as $$
  select ((p_at at time zone p_timezone) - interval '4 hours')::date;
$$;

create or replace function public.program_day_first_logical_date(p_current_day integer, p_day_started_at timestamptz, p_timezone text)
returns date
language sql
stable
set search_path = ''
as $$
  select public.program_logical_date(p_day_started_at, p_timezone)
    + case when p_current_day > 1 then 1 else 0 end;
$$;

revoke all on function public.program_logical_date(timestamptz, text) from public, anon, authenticated;
revoke all on function public.program_day_first_logical_date(integer, timestamptz, text) from public, anon, authenticated;
grant execute on function public.program_logical_date(timestamptz, text) to service_role;
grant execute on function public.program_day_first_logical_date(integer, timestamptz, text) to service_role;

-- 3c) Cada vez que cambia current_day, el día lógico nuevo empieza ahora.
--     deliver_program_night ya lo fija; esto cubre cualquier otro camino (por
--     ejemplo, la Edge Function anterior durante el despliegue).
create or replace function public.program_enrollments_track_day_start()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.current_day is distinct from old.current_day
     and new.current_day_started_at is not distinct from old.current_day_started_at then
    new.current_day_started_at := now();
  end if;
  return new;
end;
$$;

drop trigger if exists program_enrollments_track_day_start on public.program_enrollments;
create trigger program_enrollments_track_day_start
before update on public.program_enrollments
for each row execute function public.program_enrollments_track_day_start();

-- 4) Registro de la noche + avance, en una transacción.
--
-- Devuelve jsonb { status, delivery_id, inserted }:
--   advanced / completed      → la noche quedó registrada y el día avanzó
--   stale                     → otra ejecución ya avanzó (current_day cambió)
--   night_already_claimed     → esa fecha local ya tuvo su noche
--   before_day_start          → el horario es anterior al día lógico actual
--   not_yet                   → el horario todavía no llegó
--   unknown_duration          → no se puede saber cuándo termina el programa
--   missing_content           → falta contenido o audio: no se consume nada
create or replace function public.deliver_program_night(
  p_enrollment_id uuid,
  p_current_day integer,
  p_local_date date,
  p_content_id uuid,
  p_asset_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  e public.program_enrollments;
  v_total integer;
  v_occurrence timestamptz;
  v_delivery_id uuid;
  v_inserted boolean := false;
  v_pending jsonb;
  v_timezone_changes boolean;
begin
  select * into e
  from public.program_enrollments
  where id = p_enrollment_id
  for update;

  if e.id is null or e.status <> 'active' or e.current_day <> p_current_day then
    return jsonb_build_object('status', 'stale');
  end if;

  if e.last_night_local_date is not null and e.last_night_local_date >= p_local_date then
    return jsonb_build_object('status', 'night_already_claimed');
  end if;

  -- Instante real del horario de la noche para esa fecha local.
  v_occurrence := (p_local_date + e.night) at time zone e.timezone;
  if v_occurrence <= e.current_day_started_at
     or public.program_logical_date(v_occurrence, e.timezone)
        < public.program_day_first_logical_date(e.current_day, e.current_day_started_at, e.timezone) then
    return jsonb_build_object('status', 'before_day_start');
  end if;
  if v_occurrence > now() then
    return jsonb_build_object('status', 'not_yet');
  end if;

  v_total := public.program_total_days(e.collection_id);
  if v_total is null or v_total < 1 then
    return jsonb_build_object('status', 'unknown_duration');
  end if;

  select id into v_delivery_id
  from public.taller_deliveries
  where enrollment_id = e.id
    and day_number = e.current_day
    and delivery_type = 'meditation_night'
    and message_index is null;

  if v_delivery_id is null then
    if p_content_id is null or p_asset_id is null or not exists (
      select 1 from public.content_assets
      where id = p_asset_id
        and content_id = p_content_id
        and asset_type = 'audio'
    ) then
      return jsonb_build_object('status', 'missing_content');
    end if;

    -- validate_active_program_delivery comprueba además que el contenido
    -- pertenezca al programa y que el día sea el actual.
    insert into public.taller_deliveries (
      enrollment_id, user_id, content_id, asset_id, day_number, delivery_type, message_index
    ) values (
      e.id, e.user_id, p_content_id, p_asset_id, e.current_day, 'meditation_night', null
    )
    returning id into v_delivery_id;
    v_inserted := true;
  end if;

  if e.current_day >= v_total then
    update public.program_enrollments
    set status = 'completed',
        completed_at = now(),
        last_night_local_date = p_local_date,
        pending_schedule = null,
        updated_at = now()
    where id = e.id;

    return jsonb_build_object('status', 'completed', 'delivery_id', v_delivery_id, 'inserted', v_inserted);
  end if;

  v_pending := e.pending_schedule;
  v_timezone_changes := v_pending ? 'timezone' and (v_pending->>'timezone') is distinct from e.timezone;

  update public.program_enrollments
  set current_day = e.current_day + 1,
      current_day_started_at = now(),
      -- Si cambia la zona horaria, la fecha de esta noche se expresa en la
      -- zona nueva, para que no se pueda volver a reclamar esa misma noche.
      last_night_local_date = case
        when v_timezone_changes then (v_occurrence at time zone (v_pending->>'timezone'))::date
        else p_local_date
      end,
      morning = coalesce((v_pending->>'morning')::time, morning),
      noon = coalesce((v_pending->>'noon')::time, noon),
      afternoon = coalesce((v_pending->>'afternoon')::time, afternoon),
      night = coalesce((v_pending->>'night')::time, night),
      timezone = coalesce(v_pending->>'timezone', timezone),
      message_interval_minutes = coalesce((v_pending->>'message_interval_minutes')::integer, message_interval_minutes),
      pending_schedule = null,
      updated_at = now()
  where id = e.id;

  return jsonb_build_object('status', 'advanced', 'delivery_id', v_delivery_id, 'inserted', v_inserted);
end;
$$;

revoke all on function public.deliver_program_night(uuid, integer, date, uuid, uuid) from public, anon, authenticated;
grant execute on function public.deliver_program_night(uuid, integer, date, uuid, uuid) to service_role;

-- 5) Nunca guardar una meditación sin audio.
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

  if new.delivery_type like 'meditation\_%' and new.asset_id is null then
    raise exception 'meditation delivery requires an audio asset' using errcode = '23502';
  end if;

  -- La noche la valida deliver_program_night con su propia ocurrencia. El
  -- resto nunca puede salir antes de la ventana del día lógico actual.
  if new.delivery_type <> 'meditation_night'
     and public.program_logical_date(now(), enrollment.timezone)
         < public.program_day_first_logical_date(enrollment.current_day, enrollment.current_day_started_at, enrollment.timezone) then
    raise exception 'delivery is outside the current logical day window' using errcode = '55000';
  end if;
  return new;
end;
$$;

revoke all on function public.validate_active_program_delivery() from public;

-- 6) Nuevos motivos de incidente.
alter table public.notification_incidents
  drop constraint if exists notification_incidents_kind_check;
alter table public.notification_incidents
  add constraint notification_incidents_kind_check
  check (kind in ('meditation_overdue_uncaught', 'missing_day_content', 'missing_meditation_audio'));

-- 7) Un solo contenido por día de programa. Si hoy ya hay duplicados, NO se
--    borra nada: se avisa y la restricción queda sin crear hasta resolverlos.
--    Es DEFERRABLE para que reordenar días dentro de una transacción siga
--    funcionando.
do $$
begin
  if exists (
    select 1 from pg_constraint
    where conname = 'collection_items_collection_sort_order_key'
      and conrelid = 'public.collection_items'::regclass
  ) then
    return;
  end if;

  if exists (
    select 1
    from public.collection_items
    group by collection_id, sort_order
    having count(*) > 1
  ) then
    raise warning 'collection_items tiene (collection_id, sort_order) duplicados; no se crea la restricción única. Resolverlos y volver a correr esta migración.';
    return;
  end if;

  alter table public.collection_items
    add constraint collection_items_collection_sort_order_key
    unique (collection_id, sort_order)
    deferrable initially deferred;
end;
$$;
