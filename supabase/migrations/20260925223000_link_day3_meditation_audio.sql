-- Día 3: enlaza las 4 meditaciones de los 12 recorridos.
-- Precondiciones estrictas: 48 objetos presentes en Storage, 12 contenidos Día 3
-- existentes y ningún audio previamente enlazado en esos contenidos.

create temporary table _day3_audio (
  content_slug text not null,
  sort_order integer not null,
  storage_path text not null,
  duration_seconds integer not null,
  file_size_bytes bigint not null,
  primary key (content_slug, sort_order)
) on commit drop;

insert into _day3_audio (content_slug, sort_order, storage_path, duration_seconds, file_size_bytes) values
  ('practica-7-dias-amor-dia-3',1,'practicas-personalizadas/7-dias/amor/dia-03/meditaciones/8241.mp3',117,1876686),
  ('practica-7-dias-amor-dia-3',2,'practicas-personalizadas/7-dias/amor/dia-03/meditaciones/8242.mp3',87,1398541),
  ('practica-7-dias-amor-dia-3',3,'practicas-personalizadas/7-dias/amor/dia-03/meditaciones/8243.mp3',81,1294051),
  ('practica-7-dias-amor-dia-3',4,'practicas-personalizadas/7-dias/amor/dia-03/meditaciones/8244.mp3',87,1398541),
  ('practica-15-dias-amor-dia-3',1,'practicas-personalizadas/15-dias/amor/dia-03/meditaciones/8349.mp3',117,1876686),
  ('practica-15-dias-amor-dia-3',2,'practicas-personalizadas/15-dias/amor/dia-03/meditaciones/8350.mp3',87,1398541),
  ('practica-15-dias-amor-dia-3',3,'practicas-personalizadas/15-dias/amor/dia-03/meditaciones/8351.mp3',81,1294051),
  ('practica-15-dias-amor-dia-3',4,'practicas-personalizadas/15-dias/amor/dia-03/meditaciones/8352.mp3',87,1398541),
  ('practica-30-dias-amor-dia-3',1,'practicas-personalizadas/30-dias/amor/dia-03/meditaciones/8457.mp3',117,1876686),
  ('practica-30-dias-amor-dia-3',2,'practicas-personalizadas/30-dias/amor/dia-03/meditaciones/8458.mp3',87,1398541),
  ('practica-30-dias-amor-dia-3',3,'practicas-personalizadas/30-dias/amor/dia-03/meditaciones/8459.mp3',81,1294051),
  ('practica-30-dias-amor-dia-3',4,'practicas-personalizadas/30-dias/amor/dia-03/meditaciones/8460.mp3',87,1398541),

  ('practica-7-dias-dinero-dia-3',1,'practicas-personalizadas/7-dias/dinero/dia-03/meditaciones/8277.mp3',94,1500105),
  ('practica-7-dias-dinero-dia-3',2,'practicas-personalizadas/7-dias/dinero/dia-03/meditaciones/8278.mp3',94,1500105),
  ('practica-7-dias-dinero-dia-3',3,'practicas-personalizadas/7-dias/dinero/dia-03/meditaciones/8279.mp3',81,1294051),
  ('practica-7-dias-dinero-dia-3',4,'practicas-personalizadas/7-dias/dinero/dia-03/meditaciones/8280.mp3',76,1209623),
  ('practica-15-dias-dinero-dia-3',1,'practicas-personalizadas/15-dias/dinero/dia-03/meditaciones/8385.mp3',94,1500105),
  ('practica-15-dias-dinero-dia-3',2,'practicas-personalizadas/15-dias/dinero/dia-03/meditaciones/8386.mp3',94,1500105),
  ('practica-15-dias-dinero-dia-3',3,'practicas-personalizadas/15-dias/dinero/dia-03/meditaciones/8387.mp3',81,1294051),
  ('practica-15-dias-dinero-dia-3',4,'practicas-personalizadas/15-dias/dinero/dia-03/meditaciones/8388.mp3',76,1209623),
  ('practica-30-dias-dinero-dia-3',1,'practicas-personalizadas/30-dias/dinero/dia-03/meditaciones/8493.mp3',94,1500105),
  ('practica-30-dias-dinero-dia-3',2,'practicas-personalizadas/30-dias/dinero/dia-03/meditaciones/8494.mp3',94,1500105),
  ('practica-30-dias-dinero-dia-3',3,'practicas-personalizadas/30-dias/dinero/dia-03/meditaciones/8495.mp3',81,1294051),
  ('practica-30-dias-dinero-dia-3',4,'practicas-personalizadas/30-dias/dinero/dia-03/meditaciones/8496.mp3',76,1209623),

  ('practica-7-dias-salud-dia-3',1,'practicas-personalizadas/7-dias/salud/dia-03/meditaciones/8313.mp3',96,1540647),
  ('practica-7-dias-salud-dia-3',2,'practicas-personalizadas/7-dias/salud/dia-03/meditaciones/8314.mp3',82,1307426),
  ('practica-7-dias-salud-dia-3',3,'practicas-personalizadas/7-dias/salud/dia-03/meditaciones/8315.mp3',67,1075041),
  ('practica-7-dias-salud-dia-3',4,'practicas-personalizadas/7-dias/salud/dia-03/meditaciones/8316.mp3',77,1227596),
  ('practica-15-dias-salud-dia-3',1,'practicas-personalizadas/15-dias/salud/dia-03/meditaciones/8421.mp3',96,1540647),
  ('practica-15-dias-salud-dia-3',2,'practicas-personalizadas/15-dias/salud/dia-03/meditaciones/8422.mp3',82,1307426),
  ('practica-15-dias-salud-dia-3',3,'practicas-personalizadas/15-dias/salud/dia-03/meditaciones/8423.mp3',67,1075041),
  ('practica-15-dias-salud-dia-3',4,'practicas-personalizadas/15-dias/salud/dia-03/meditaciones/8424.mp3',77,1227596),
  ('practica-30-dias-salud-dia-3',1,'practicas-personalizadas/30-dias/salud/dia-03/meditaciones/8529.mp3',96,1540647),
  ('practica-30-dias-salud-dia-3',2,'practicas-personalizadas/30-dias/salud/dia-03/meditaciones/8530.mp3',82,1307426),
  ('practica-30-dias-salud-dia-3',3,'practicas-personalizadas/30-dias/salud/dia-03/meditaciones/8531.mp3',67,1075041),
  ('practica-30-dias-salud-dia-3',4,'practicas-personalizadas/30-dias/salud/dia-03/meditaciones/8532.mp3',77,1227596),

  ('practica-guiada-7-dias-dia-3',1,'practicas-guiadas/7-dias/autoconcepto/dia-03/meditaciones/8565.mp3',162,2597248),
  ('practica-guiada-7-dias-dia-3',2,'practicas-guiadas/7-dias/autoconcepto/dia-03/meditaciones/8566.mp3',167,2668301),
  ('practica-guiada-7-dias-dia-3',3,'practicas-guiadas/7-dias/autoconcepto/dia-03/meditaciones/8567.mp3',157,2508641),
  ('practica-guiada-7-dias-dia-3',4,'practicas-guiadas/7-dias/autoconcepto/dia-03/meditaciones/8568.mp3',226,3620412),
  ('practica-guiada-15-dias-dia-3',1,'practicas-guiadas/15-dias/autoconcepto/dia-03/meditaciones/8601.mp3',162,2597248),
  ('practica-guiada-15-dias-dia-3',2,'practicas-guiadas/15-dias/autoconcepto/dia-03/meditaciones/8602.mp3',167,2668301),
  ('practica-guiada-15-dias-dia-3',3,'practicas-guiadas/15-dias/autoconcepto/dia-03/meditaciones/8603.mp3',157,2508641),
  ('practica-guiada-15-dias-dia-3',4,'practicas-guiadas/15-dias/autoconcepto/dia-03/meditaciones/8604.mp3',226,3620412),
  ('taller-40-dias-dia-3',1,'taller-40-dias/dia-3/meditaciones/6477.mp3',162,2597248),
  ('taller-40-dias-dia-3',2,'taller-40-dias/dia-3/meditaciones/6478.mp3',167,2668301),
  ('taller-40-dias-dia-3',3,'taller-40-dias/dia-3/meditaciones/6479.mp3',157,2508641),
  ('taller-40-dias-dia-3',4,'taller-40-dias/dia-3/meditaciones/6480.mp3',226,3620412);

do $$
declare
  expected_rows integer;
  expected_contents integer;
  storage_ok integer;
  content_ok integer;
  existing_audio integer;
begin
  select count(*), count(distinct content_slug)
    into expected_rows, expected_contents
  from _day3_audio;

  if expected_rows <> 48 or expected_contents <> 12 then
    raise exception 'Day 3 mapping invalid: rows %, contents %', expected_rows, expected_contents;
  end if;

  select count(*) into storage_ok
  from _day3_audio m
  join storage.objects o
    on o.bucket_id = 'audios'
   and o.name = m.storage_path
   and (o.metadata->>'size')::bigint = m.file_size_bytes;

  if storage_ok <> 48 then
    raise exception 'Day 3 Storage validation failed: expected 48, found %', storage_ok;
  end if;

  select count(*) into content_ok
  from (select distinct content_slug from _day3_audio) m
  join public.content_items i on i.slug = m.content_slug;

  if content_ok <> 12 then
    raise exception 'Day 3 content validation failed: expected 12, found %', content_ok;
  end if;

  select count(*) into existing_audio
  from public.content_assets a
  join public.content_items i on i.id = a.content_id
  join (select distinct content_slug from _day3_audio) m on m.content_slug = i.slug
  where a.asset_type = 'audio';

  if existing_audio <> 0 then
    raise exception 'Day 3 already has % audio rows; aborting instead of overwriting', existing_audio;
  end if;
end $$;

insert into public.content_assets (
  content_id, asset_type, source_url, storage_path, mime_type,
  duration_seconds, file_size_bytes, sort_order
)
select
  i.id,
  'audio',
  'https://wpqtvixnmexlmhawwfdq.supabase.co/storage/v1/object/public/audios/' || m.storage_path,
  m.storage_path,
  'audio/mpeg',
  m.duration_seconds,
  m.file_size_bytes,
  m.sort_order
from _day3_audio m
join public.content_items i on i.slug = m.content_slug;

do $$
declare
  linked_count integer;
  complete_contents integer;
begin
  select count(*) into linked_count
  from _day3_audio m
  join public.content_items i on i.slug = m.content_slug
  join public.content_assets a
    on a.content_id = i.id
   and a.asset_type = 'audio'
   and a.sort_order = m.sort_order
   and a.storage_path = m.storage_path
   and a.file_size_bytes = m.file_size_bytes;

  if linked_count <> 48 then
    raise exception 'Day 3 link validation failed: expected 48, linked %', linked_count;
  end if;

  select count(*) into complete_contents
  from (
    select i.id
    from (select distinct content_slug from _day3_audio) m
    join public.content_items i on i.slug = m.content_slug
    join public.content_assets a on a.content_id = i.id and a.asset_type = 'audio'
    group by i.id
    having count(*) = 4 and min(a.sort_order) = 1 and max(a.sort_order) = 4
  ) q;

  if complete_contents <> 12 then
    raise exception 'Day 3 completeness validation failed: expected 12 contents, found %', complete_contents;
  end if;
end $$;
