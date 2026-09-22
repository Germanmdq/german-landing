-- Pipeline de observabilidad para taller_deliveries: hasta ahora push_status
-- sólo prueba que el proveedor ACEPTÓ el push, no que el dispositivo lo
-- recibió. Agregamos una señal explícita de recepción (la escribe el service
-- worker en el evento 'push') y una tabla de incidentes para las 4
-- meditaciones programadas que vencieron sin generar entrega, para no
-- depender de que el usuario avise.

alter table public.taller_deliveries
  add column if not exists received_at timestamptz;

-- El service worker llama esto SIN sesión de usuario (un push puede llegar
-- con la app cerrada), así que no hay auth.uid() para validar ownership.
-- Sólo marca una marca de tiempo idempotente por delivery_id — no expone ni
-- modifica contenido, así que conocer/adivinar el uuid no filtra nada.
create or replace function public.mark_taller_delivery_received(p_delivery_id uuid)
returns timestamptz
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_received_at timestamptz;
begin
  update public.taller_deliveries
  set received_at = coalesce(received_at, now())
  where id = p_delivery_id
  returning received_at into v_received_at;

  return v_received_at;
end;
$$;

revoke all on function public.mark_taller_delivery_received(uuid) from public;
grant execute on function public.mark_taller_delivery_received(uuid) to anon, authenticated;

-- Incidentes de meditaciones que vencieron (horario + margen de recuperación)
-- sin llegar a crear la entrega. Se escribe desde send-notifications
-- (service_role) para que quede logueado de forma durable, no sólo en logs
-- efímeros de la Edge Function.
create table if not exists public.notification_incidents (
  id uuid primary key default gen_random_uuid(),
  enrollment_id uuid not null references public.program_enrollments(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  day_number integer not null,
  delivery_type text not null,
  kind text not null check (kind in ('meditation_overdue_uncaught')),
  detail jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists notification_incidents_enrollment_idx
  on public.notification_incidents (enrollment_id, created_at desc);

alter table public.notification_incidents enable row level security;
-- Sin policies para anon/authenticated a propósito: es una tabla operativa,
-- sólo accesible con service_role (o desde el SQL editor como postgres).

-- Vista de una sola fila por entrega ya creada, con todo el pipeline
-- observable: qué tenía programado (horario/timezone del enrollment), cuándo
-- se creó la entrega, qué pasó con el push, si el cliente lo recibió y si se
-- abrió. Para "se debía haber creado y no existe" hay que cruzar con
-- notification_incidents, porque acá sólo aparecen entregas que sí existen.
create or replace view public.taller_delivery_pipeline as
select
  td.id as delivery_id,
  td.user_id,
  td.enrollment_id,
  pe.collection_id,
  td.day_number,
  td.delivery_type,
  td.message_index,
  case td.delivery_type
    when 'meditation_morning' then pe.morning
    when 'meditation_noon' then pe.noon
    when 'meditation_afternoon' then pe.afternoon
    when 'meditation_night' then pe.night
    else null
  end as scheduled_local_time,
  pe.timezone as scheduled_timezone,
  td.delivered_at as delivery_created_at,
  td.push_status,
  td.push_attempts,
  td.push_last_attempt_at,
  td.push_error,
  td.received_at as client_received_at,
  td.seen_at as opened_at
from public.taller_deliveries td
join public.program_enrollments pe on pe.id = td.enrollment_id;

revoke all on public.taller_delivery_pipeline from public, anon, authenticated;
