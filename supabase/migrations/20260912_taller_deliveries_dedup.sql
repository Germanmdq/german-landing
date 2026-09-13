-- Evita duplicados aunque dos ejecuciones de pg_cron se superpongan.
-- Antes de crear los índices, conserva la primera entrega de cada clave y
-- elimina únicamente duplicados históricos de esa misma entrega lógica.

with ranked as (
  select id,
         row_number() over (
           partition by user_id, day_number, delivery_type
           order by delivered_at, id
         ) as rn
  from public.taller_deliveries
  where message_index is null
)
delete from public.taller_deliveries d
using ranked r
where d.id = r.id and r.rn > 1;

with ranked as (
  select id,
         row_number() over (
           partition by user_id, day_number, delivery_type, message_index
           order by delivered_at, id
         ) as rn
  from public.taller_deliveries
  where message_index is not null
)
delete from public.taller_deliveries d
using ranked r
where d.id = r.id and r.rn > 1;

create unique index if not exists taller_deliveries_unique_non_message
  on public.taller_deliveries (user_id, day_number, delivery_type)
  where message_index is null;

create unique index if not exists taller_deliveries_unique_message
  on public.taller_deliveries (user_id, day_number, delivery_type, message_index)
  where message_index is not null;
