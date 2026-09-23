-- Reemplaza tarde y noche del Día 1 del Taller de 40 días
-- por las nuevas grabaciones, conservando el orden del programa.

update public.content_assets ca
set
  storage_path = 'taller-40-dias/dia-1/dia1_tarde_v2.mp3',
  source_url = 'https://wpqtvixnmexlmhawwfdq.supabase.co/storage/v1/object/public/audios/taller-40-dias/dia-1/dia1_tarde_v2.mp3',
  mime_type = 'audio/mpeg'
from public.content_items ci
where ca.content_id = ci.id
  and ci.slug = 'taller-40-dias-dia-1'
  and ca.asset_type = 'audio'
  and ca.sort_order = 3;

update public.content_assets ca
set
  storage_path = 'taller-40-dias/dia-1/dia1_noche_v2.mp3',
  source_url = 'https://wpqtvixnmexlmhawwfdq.supabase.co/storage/v1/object/public/audios/taller-40-dias/dia-1/dia1_noche_v2.mp3',
  mime_type = 'audio/mpeg'
from public.content_items ci
where ca.content_id = ci.id
  and ci.slug = 'taller-40-dias-dia-1'
  and ca.asset_type = 'audio'
  and ca.sort_order = 4;
