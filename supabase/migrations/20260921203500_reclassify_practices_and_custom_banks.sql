-- Align the database with the current product architecture.
-- Guided practices: 7, 15 and 40 days (one fixed route each).
-- Custom practices: 7, 15 and 30 days x Amor, Dinero and Salud.

insert into public.collections (slug, title, description, collection_type, is_published, sort_order)
values
  ('practica-guiada-7-dias', 'Práctica guiada de 7 días', 'Recorrido guiado fijo de 7 días', 'taller', true, 1),
  ('practica-guiada-15-dias', 'Práctica guiada de 15 días', 'Recorrido guiado fijo de 15 días', 'taller', true, 2),
  ('practica-7-dias-amor', 'Amor y relaciones · 7 días', 'Tu propia práctica · Amor · 7 días', 'taller', true, 10),
  ('practica-7-dias-dinero', 'Dinero y trabajo · 7 días', 'Tu propia práctica · Dinero · 7 días', 'taller', true, 11),
  ('practica-7-dias-salud', 'Salud y bienestar · 7 días', 'Tu propia práctica · Salud · 7 días', 'taller', true, 12),
  ('practica-15-dias-amor', 'Amor y relaciones · 15 días', 'Tu propia práctica · Amor · 15 días', 'taller', true, 13),
  ('practica-15-dias-dinero', 'Dinero y trabajo · 15 días', 'Tu propia práctica · Dinero · 15 días', 'taller', true, 14),
  ('practica-15-dias-salud', 'Salud y bienestar · 15 días', 'Tu propia práctica · Salud · 15 días', 'taller', true, 15),
  ('practica-30-dias-amor', 'Amor y relaciones · 30 días', 'Tu propia práctica · Amor · 30 días', 'taller', true, 16),
  ('practica-30-dias-dinero', 'Dinero y trabajo · 30 días', 'Tu propia práctica · Dinero · 30 días', 'taller', true, 17),
  ('practica-30-dias-salud', 'Salud y bienestar · 30 días', 'Tu propia práctica · Salud · 30 días', 'taller', true, 18)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  collection_type = excluded.collection_type,
  is_published = excluded.is_published,
  sort_order = excluded.sort_order,
  updated_at = now();

-- The generic collection remains only as historical compatibility; no new
-- custom enrollment should point to it after this migration.
update public.collections
set is_published = false,
    description = 'Colección histórica: las nuevas prácticas personalizadas apuntan a uno de los 9 bancos específicos.',
    updated_at = now()
where slug = 'custom-practice';

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

revoke all on function public.start_custom_program(time,time,time,time,text,integer,jsonb) from public;
grant execute on function public.start_custom_program(time,time,time,time,text,integer,jsonb) to authenticated;
