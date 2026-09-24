-- program_enrollments sólo se modifica mediante RPC.
--
-- Las políticas de INSERT/UPDATE permitían que el usuario, desde el cliente,
-- cambiara current_day, collection_id, status, last_night_local_date o
-- user_id, o insertara una inscripción que no empezara en Día 1. Se eliminan
-- y las RPC que las necesitaban pasan a SECURITY DEFINER, verificando
-- auth.uid() explícitamente. La lectura propia (SELECT) se mantiene.

drop policy if exists "Users insert own program enrollments" on public.program_enrollments;
drop policy if exists "Users update own program enrollments" on public.program_enrollments;

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
security definer
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
security definer
set search_path = ''
as $$
declare
  result public.program_enrollments;
begin
  if auth.uid() is null then raise exception 'authentication required' using errcode = '28000'; end if;

  update public.program_enrollments
  set status = 'abandoned', abandoned_at = now(), pending_schedule = null, updated_at = now()
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
security definer
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
  set status = 'abandoned', abandoned_at = now(), pending_schedule = null, updated_at = now()
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
security definer
set search_path = ''
as $$
declare
  result public.program_enrollments;
  target_collection_id uuid;
  target_slug text;
  requested_topic text;
  requested_duration text;
begin
  if auth.uid() is null then
    raise exception 'authentication required' using errcode='28000';
  end if;

  if exists (
    select 1 from public.program_enrollments
    where user_id = auth.uid() and status = 'active'
  ) then
    raise exception 'active program already exists' using errcode='23505';
  end if;

  requested_topic := p_custom_config->>'tema';
  requested_duration := p_custom_config->>'duracion';

  target_slug := case
    when requested_topic = 'Amor y relaciones' and requested_duration = '7 días' then 'practica-7-dias-amor'
    when requested_topic = 'Dinero y trabajo' and requested_duration = '7 días' then 'practica-7-dias-dinero'
    when requested_topic = 'Salud y bienestar' and requested_duration = '7 días' then 'practica-7-dias-salud'
    when requested_topic = 'Amor y relaciones' and requested_duration = '15 días' then 'practica-15-dias-amor'
    when requested_topic = 'Dinero y trabajo' and requested_duration = '15 días' then 'practica-15-dias-dinero'
    when requested_topic = 'Salud y bienestar' and requested_duration = '15 días' then 'practica-15-dias-salud'
    when requested_topic = 'Amor y relaciones' and requested_duration = '30 días' then 'practica-30-dias-amor'
    when requested_topic = 'Dinero y trabajo' and requested_duration = '30 días' then 'practica-30-dias-dinero'
    when requested_topic = 'Salud y bienestar' and requested_duration = '30 días' then 'practica-30-dias-salud'
    else null
  end;

  if target_slug is null then
    raise exception 'invalid custom practice combination' using errcode='22023';
  end if;

  select id into target_collection_id
  from public.collections
  where slug = target_slug and is_published = true;

  if target_collection_id is null then
    raise exception 'custom practice bank missing' using errcode='P0002';
  end if;

  insert into public.program_enrollments(
    user_id, collection_id, current_day, morning, noon, afternoon, night,
    timezone, message_interval_minutes, custom_config
  ) values (
    auth.uid(), target_collection_id, 1, p_morning, p_noon, p_afternoon, p_night,
    p_timezone, p_message_interval_minutes,
    jsonb_build_object(
      'tema', requested_topic,
      'duracion', requested_duration,
      'bank_slug', target_slug
    )
  )
  returning * into result;

  return result;
end;
$$;

-- Cambio de horarios / zona / frecuencia. Nunca toca el progreso.
--
-- Si el día lógico actual todavía no tuvo ninguna entrega, el cambio se aplica
-- ya. Si ya empezó (hubo al menos una entrega), queda en pending_schedule y
-- deliver_program_night lo aplica al pasar al día siguiente: así un cambio a
-- mitad del día no repite ni saltea textos, no genera una segunda noche y no
-- avanza días por cambiar la zona horaria.
--
-- Devuelve { applied: 'now' | 'next_day' }.
create or replace function public.update_program_schedule(
  p_enrollment_id uuid,
  p_morning time,
  p_noon time,
  p_afternoon time,
  p_night time,
  p_timezone text,
  p_message_interval_minutes integer
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  e public.program_enrollments;
begin
  if auth.uid() is null then raise exception 'authentication required' using errcode = '28000'; end if;
  if p_morning is null or p_noon is null or p_afternoon is null or p_night is null then
    raise exception 'all four times are required' using errcode = '22023';
  end if;
  if p_message_interval_minutes is null or p_message_interval_minutes < 30 then
    raise exception 'invalid message interval' using errcode = '22023';
  end if;
  if p_timezone is null or not exists (select 1 from pg_catalog.pg_timezone_names where name = p_timezone) then
    raise exception 'invalid timezone' using errcode = '22023';
  end if;

  select * into e
  from public.program_enrollments
  where id = p_enrollment_id
    and user_id = auth.uid()
    and status = 'active'
  for update;
  if e.id is null then raise exception 'active enrollment not found' using errcode = 'P0002'; end if;

  if exists (
    select 1 from public.taller_deliveries td
    where td.enrollment_id = e.id
      and td.day_number = e.current_day
  ) then
    update public.program_enrollments
    set pending_schedule = jsonb_build_object(
          'morning', to_char(p_morning, 'HH24:MI'),
          'noon', to_char(p_noon, 'HH24:MI'),
          'afternoon', to_char(p_afternoon, 'HH24:MI'),
          'night', to_char(p_night, 'HH24:MI'),
          'timezone', p_timezone,
          'message_interval_minutes', p_message_interval_minutes
        ),
        updated_at = now()
    where id = e.id;
    return jsonb_build_object('applied', 'next_day');
  end if;

  update public.program_enrollments
  set morning = p_morning,
      noon = p_noon,
      afternoon = p_afternoon,
      night = p_night,
      -- Si cambia la zona, la fecha de la última noche se reexpresa en la zona
      -- nueva (a partir de su instante real) para no permitir otra noche en
      -- esa misma fecha.
      last_night_local_date = case
        when p_timezone is distinct from timezone and last_night_local_date is not null
          then (((last_night_local_date + night) at time zone timezone) at time zone p_timezone)::date
        else last_night_local_date
      end,
      timezone = p_timezone,
      message_interval_minutes = p_message_interval_minutes,
      pending_schedule = null,
      updated_at = now()
  where id = e.id;
  return jsonb_build_object('applied', 'now');
end;
$$;

revoke all on function public.start_program(uuid,time,time,time,time,text,integer) from public;
revoke all on function public.abandon_program(uuid) from public;
revoke all on function public.switch_program(uuid,uuid,time,time,time,time,text,integer) from public;
revoke all on function public.start_custom_program(time,time,time,time,text,integer,jsonb) from public;
revoke all on function public.update_program_schedule(uuid,time,time,time,time,text,integer) from public;
grant execute on function public.start_program(uuid,time,time,time,time,text,integer) to authenticated;
grant execute on function public.abandon_program(uuid) to authenticated;
grant execute on function public.switch_program(uuid,uuid,time,time,time,time,text,integer) to authenticated;
grant execute on function public.start_custom_program(time,time,time,time,text,integer,jsonb) to authenticated;
grant execute on function public.update_program_schedule(uuid,time,time,time,time,text,integer) to authenticated;
