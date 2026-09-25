-- Reserva IDs de grabación para "Meditaciones para ahora".
-- Son 15 situaciones x 5 meditaciones = 75 audios, en el bloque 9001..9075.
-- No crea content_assets ni URLs: sólo deja el mapa preparado en metadata
-- para que los archivos puedan cargarse después sin inventar audio existente.

with planned_ids(sort_order, audio_ids) as (
  values
    (1,  array[9001,9002,9003,9004,9005]::int[]),
    (2,  array[9006,9007,9008,9009,9010]::int[]),
    (3,  array[9011,9012,9013,9014,9015]::int[]),
    (4,  array[9016,9017,9018,9019,9020]::int[]),
    (5,  array[9021,9022,9023,9024,9025]::int[]),
    (6,  array[9026,9027,9028,9029,9030]::int[]),
    (7,  array[9031,9032,9033,9034,9035]::int[]),
    (8,  array[9036,9037,9038,9039,9040]::int[]),
    (9,  array[9041,9042,9043,9044,9045]::int[]),
    (10, array[9046,9047,9048,9049,9050]::int[]),
    (11, array[9051,9052,9053,9054,9055]::int[]),
    (12, array[9056,9057,9058,9059,9060]::int[]),
    (13, array[9061,9062,9063,9064,9065]::int[]),
    (14, array[9066,9067,9068,9069,9070]::int[]),
    (15, array[9071,9072,9073,9074,9075]::int[])
)
update public.content_items c
set
  metadata = coalesce(c.metadata, '{}'::jsonb) || jsonb_build_object('meditation_audio_ids', to_jsonb(p.audio_ids)),
  updated_at = now()
from planned_ids p
where c.content_type = 'moment'
  and c.is_published = true
  and (c.metadata->>'sort_order')::int = p.sort_order;

do $$
declare
  prepared_count integer;
  distinct_id_count integer;
begin
  select count(*) into prepared_count
  from public.content_items
  where content_type = 'moment'
    and is_published = true
    and jsonb_typeof(metadata->'meditation_audio_ids') = 'array'
    and jsonb_array_length(metadata->'meditation_audio_ids') = 5;

  select count(distinct (value #>> '{}')::int) into distinct_id_count
  from public.content_items c,
       jsonb_array_elements(c.metadata->'meditation_audio_ids') value
  where c.content_type = 'moment'
    and c.is_published = true;

  if prepared_count <> 15 or distinct_id_count <> 75 then
    raise exception 'Meditation audio ID validation failed: prepared %, distinct ids %', prepared_count, distinct_id_count;
  end if;
end $$;
