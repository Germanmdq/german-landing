-- Enlaza los audios procesados 6009-6048 disponibles al Día 1 de las prácticas personalizadas.
-- 6032 (Amor · intermedio 20) se deja expresamente pendiente.
-- No toca textos ni otras prácticas.

create temporary table _new_practice_audio (
  content_slug text not null,
  asset_type text not null,
  sort_order integer not null,
  storage_path text not null,
  mime_type text not null,
  duration_seconds numeric,
  file_size_bytes bigint
) on commit drop;

insert into _new_practice_audio (content_slug, asset_type, sort_order, storage_path, mime_type, duration_seconds, file_size_bytes) values
  ('practica-7-dias-amor-dia-1','audio',1,'practicas-personalizadas/7-dias/amor/dia-01/meditaciones/6009.mp3','audio/mpeg',85.211,2045124),
  ('practica-7-dias-amor-dia-1','audio',2,'practicas-personalizadas/7-dias/amor/dia-01/meditaciones/6010.mp3','audio/mpeg',74.266,1782436),
  ('practica-7-dias-amor-dia-1','audio',3,'practicas-personalizadas/7-dias/amor/dia-01/meditaciones/6011.mp3','audio/mpeg',70.217,1685261),
  ('practica-7-dias-amor-dia-1','audio',4,'practicas-personalizadas/7-dias/amor/dia-01/meditaciones/6012.mp3','audio/mpeg',59.115,1418812),
  ('practica-7-dias-amor-dia-1','audio/intermediate',1,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6013.mp3','audio/mpeg',19.827,475896),
  ('practica-7-dias-amor-dia-1','audio/intermediate',2,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6014.mp3','audio/mpeg',15.099,362420),
  ('practica-7-dias-amor-dia-1','audio/intermediate',3,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6015.mp3','audio/mpeg',10.684,256468),
  ('practica-7-dias-amor-dia-1','audio/intermediate',4,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6016.mp3','audio/mpeg',15.099,362420),
  ('practica-7-dias-amor-dia-1','audio/intermediate',5,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6017.mp3','audio/mpeg',18.077,433891),
  ('practica-7-dias-amor-dia-1','audio/intermediate',6,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6018.mp3','audio/mpeg',16.692,400663),
  ('practica-7-dias-amor-dia-1','audio/intermediate',7,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6019.mp3','audio/mpeg',13.401,321669),
  ('practica-7-dias-amor-dia-1','audio/intermediate',8,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6020.mp3','audio/mpeg',13.401,321669),
  ('practica-7-dias-amor-dia-1','audio/intermediate',9,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6021.mp3','audio/mpeg',13.401,321669),
  ('practica-7-dias-amor-dia-1','audio/intermediate',10,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6022.mp3','audio/mpeg',20.741,497839),
  ('practica-7-dias-amor-dia-1','audio/intermediate',11,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6023.mp3','audio/mpeg',16.849,404425),
  ('practica-7-dias-amor-dia-1','audio/intermediate',12,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6024.mp3','audio/mpeg',16.849,404425),
  ('practica-7-dias-amor-dia-1','audio/intermediate',13,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6025.mp3','audio/mpeg',19.043,457088),
  ('practica-7-dias-amor-dia-1','audio/intermediate',14,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6026.mp3','audio/mpeg',14.994,359912),
  ('practica-7-dias-amor-dia-1','audio/intermediate',15,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6027.mp3','audio/mpeg',19.827,475896),
  ('practica-7-dias-amor-dia-1','audio/intermediate',16,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6028.mp3','audio/mpeg',14.994,359912),
  ('practica-7-dias-amor-dia-1','audio/intermediate',17,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6029.mp3','audio/mpeg',16.405,393767),
  ('practica-7-dias-amor-dia-1','audio/intermediate',18,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6030.mp3','audio/mpeg',16.405,393767),
  ('practica-7-dias-amor-dia-1','audio/intermediate',19,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6031.mp3','audio/mpeg',12.513,300353),
  ('practica-7-dias-amor-dia-1','audio/intermediate',21,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6033.mp3','audio/mpeg',12.513,300353),
  ('practica-7-dias-amor-dia-1','audio/intermediate',22,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6034.mp3','audio/mpeg',13.166,316027),
  ('practica-7-dias-amor-dia-1','audio/intermediate',23,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6035.mp3','audio/mpeg',20.010,480285),
  ('practica-7-dias-amor-dia-1','audio/intermediate',24,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6036.mp3','audio/mpeg',13.453,322923),
  ('practica-7-dias-amor-dia-1','audio/intermediate',25,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6037.mp3','audio/mpeg',13.453,322923),
  ('practica-7-dias-amor-dia-1','audio/intermediate',26,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6038.mp3','audio/mpeg',13.453,322923),
  ('practica-7-dias-amor-dia-1','audio/intermediate',27,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6039.mp3','audio/mpeg',13.453,322923),
  ('practica-7-dias-amor-dia-1','audio/intermediate',28,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6040.mp3','audio/mpeg',16.405,393767),
  ('practica-7-dias-amor-dia-1','audio/intermediate',29,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6041.mp3','audio/mpeg',12.983,311638),
  ('practica-7-dias-amor-dia-1','audio/intermediate',30,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6042.mp3','audio/mpeg',15.647,375586),
  ('practica-7-dias-amor-dia-1','audio/intermediate',31,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6043.mp3','audio/mpeg',17.371,416964),
  ('practica-7-dias-amor-dia-1','audio/intermediate',32,'practicas-personalizadas/7-dias/amor/dia-01/intermedios/6044.mp3','audio/mpeg',14.707,353016),
  ('practica-7-dias-dinero-dia-1','audio',1,'practicas-personalizadas/7-dias/dinero/dia-01/meditaciones/6045.mp3','audio/mpeg',91.402,2193708),
  ('practica-7-dias-dinero-dia-1','audio',2,'practicas-personalizadas/7-dias/dinero/dia-01/meditaciones/6046.mp3','audio/mpeg',80.300,1927259),
  ('practica-7-dias-dinero-dia-1','audio',3,'practicas-personalizadas/7-dias/dinero/dia-01/meditaciones/6047.mp3','audio/mpeg',80.300,1927259),
  ('practica-7-dias-dinero-dia-1','audio',4,'practicas-personalizadas/7-dias/dinero/dia-01/meditaciones/6048.mp3','audio/mpeg',60.317,1447651);

update public.content_assets a
set source_url = 'https://wpqtvixnmexlmhawwfdq.supabase.co/storage/v1/object/public/audios/' || m.storage_path,
    storage_path = m.storage_path,
    mime_type = m.mime_type,
    duration_seconds = m.duration_seconds,
    file_size_bytes = m.file_size_bytes
from public.content_items i
join _new_practice_audio m on m.content_slug = i.slug
where a.content_id = i.id
  and a.asset_type = m.asset_type
  and a.sort_order = m.sort_order;

insert into public.content_assets (
  content_id, asset_type, source_url, storage_path, mime_type,
  duration_seconds, file_size_bytes, sort_order
)
select
  i.id, m.asset_type, 'https://wpqtvixnmexlmhawwfdq.supabase.co/storage/v1/object/public/audios/' || m.storage_path, m.storage_path, m.mime_type,
  m.duration_seconds, m.file_size_bytes, m.sort_order
from _new_practice_audio m
join public.content_items i on i.slug = m.content_slug
where not exists (
  select 1
  from public.content_assets a
  where a.content_id = i.id
    and a.asset_type = m.asset_type
    and a.sort_order = m.sort_order
);

do $$
declare
  expected_count integer;
  linked_count integer;
begin
  select count(*) into expected_count from _new_practice_audio;
  select count(*) into linked_count
  from _new_practice_audio m
  join public.content_items i on i.slug = m.content_slug
  join public.content_assets a
    on a.content_id = i.id
   and a.asset_type = m.asset_type
   and a.sort_order = m.sort_order
   and a.storage_path = m.storage_path;

  if expected_count <> 39 or linked_count <> 39 then
    raise exception 'Audio mapping validation failed: expected %, linked %', expected_count, linked_count;
  end if;
end $$;
