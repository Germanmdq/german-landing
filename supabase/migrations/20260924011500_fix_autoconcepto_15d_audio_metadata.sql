-- Corrige metadatos del tercer audio de Autoconcepto 15 días · Día 1.
update public.content_assets ca
set duration_seconds = 161,
    file_size_bytes = 2574260
from public.content_items ci
where ca.content_id = ci.id
  and ci.slug = 'practica-guiada-15-dias-dia-1'
  and ca.asset_type = 'audio'
  and ca.sort_order = 3;

do $$
declare
  linked_count integer;
  bad_metadata integer;
begin
  select count(*) into linked_count
  from public.content_assets ca
  join public.content_items ci on ci.id = ca.content_id
  where ci.slug = 'practica-guiada-15-dias-dia-1'
    and ca.asset_type = 'audio'
    and ca.sort_order between 1 and 4;

  select count(*) into bad_metadata
  from public.content_assets ca
  join public.content_items ci on ci.id = ca.content_id
  where ci.slug = 'practica-guiada-15-dias-dia-1'
    and ca.asset_type = 'audio'
    and ca.sort_order = 3 
    and (ca.duration_seconds <> 161 or ca.file_size_bytes <> 2574260);

  if linked_count <> 4 or bad_metadata <> 0 then
    raise exception 'Autoconcepto 15d correction failed: linked %, bad_metadata %', linked_count, bad_metadata;
  end if;
end $$;
