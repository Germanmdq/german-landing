-- Día 1 · Autoconcepto 7 días: enlaza las 4 meditaciones definitivas.
-- No toca los 32 mensajes de texto ni ningún otro recorrido.

create temporary table _autoconcepto_7d_audio (
  sort_order integer primary key,
  storage_path text not null,
  duration_seconds numeric not null,
  file_size_bytes bigint not null
) on commit drop;

insert into _autoconcepto_7d_audio (sort_order, storage_path, duration_seconds, file_size_bytes) values
  (1, 'practicas-guiadas/15-dias/autoconcepto/dia-01/meditaciones/6369.mp3', 148.845688, 2381581),
  (2, 'practicas-guiadas/15-dias/autoconcepto/dia-01/meditaciones/6370.mp3', 154.226938, 2467681),
  (3, 'practicas-guiadas/15-dias/autoconcepto/dia-01/meditaciones/6371.mp3', 154.226938, 2467681),
  (4, 'practicas-guiadas/15-dias/autoconcepto/dia-01/meditaciones/6372.mp3', 195.448125, 3127220);

update public.content_assets a
set
  source_url = 'https://wpqtvixnmexlmhawwfdq.supabase.co/storage/v1/object/public/audios/' || m.storage_path,
  storage_path = m.storage_path,
  mime_type = 'audio/mpeg',
  duration_seconds = m.duration_seconds,
  file_size_bytes = m.file_size_bytes
from public.content_items i
join _autoconcepto_7d_audio m on true
where i.slug = 'practica-guiada-15-dias-dia-1'
  and a.content_id = i.id
  and a.asset_type = 'audio'
  and a.sort_order = m.sort_order;

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
from _autoconcepto_7d_audio m
join public.content_items i on i.slug = 'practica-guiada-15-dias-dia-1'
where not exists (
  select 1
  from public.content_assets a
  where a.content_id = i.id
    and a.asset_type = 'audio'
    and a.sort_order = m.sort_order
);

do $$
declare
  linked_count integer;
begin
  select count(*) into linked_count
  from public.content_items i
  join public.content_assets a on a.content_id = i.id
  join _autoconcepto_7d_audio m
    on m.sort_order = a.sort_order
   and m.storage_path = a.storage_path
  where i.slug = 'practica-guiada-15-dias-dia-1'
    and a.asset_type = 'audio';

  if linked_count <> 4 then
    raise exception 'Autoconcepto 7d audio validation failed: expected 4, linked %', linked_count;
  end if;
end $$;
