-- Remap existing custom-practice enrollments to the concrete content bank
-- selected by tema + duracion. This preserves history and avoids leaving an
-- active personalized practice attached to the old generic collection.

update public.program_enrollments pe
set collection_id = target.id,
    custom_config = coalesce(pe.custom_config, '{}'::jsonb) || jsonb_build_object('bank_slug', target.slug),
    updated_at = now()
from public.collections old_collection,
     public.collections target
where pe.collection_id = old_collection.id
  and old_collection.slug = 'custom-practice'
  and target.slug = case
    when pe.custom_config->>'tema' = 'Amor y relaciones' and pe.custom_config->>'duracion' = '7 días' then 'practica-7-dias-amor'
    when pe.custom_config->>'tema' = 'Dinero y trabajo' and pe.custom_config->>'duracion' = '7 días' then 'practica-7-dias-dinero'
    when pe.custom_config->>'tema' = 'Salud y bienestar' and pe.custom_config->>'duracion' = '7 días' then 'practica-7-dias-salud'
    when pe.custom_config->>'tema' = 'Amor y relaciones' and pe.custom_config->>'duracion' = '15 días' then 'practica-15-dias-amor'
    when pe.custom_config->>'tema' = 'Dinero y trabajo' and pe.custom_config->>'duracion' = '15 días' then 'practica-15-dias-dinero'
    when pe.custom_config->>'tema' = 'Salud y bienestar' and pe.custom_config->>'duracion' = '15 días' then 'practica-15-dias-salud'
    when pe.custom_config->>'tema' = 'Amor y relaciones' and pe.custom_config->>'duracion' = '30 días' then 'practica-30-dias-amor'
    when pe.custom_config->>'tema' = 'Dinero y trabajo' and pe.custom_config->>'duracion' = '30 días' then 'practica-30-dias-dinero'
    when pe.custom_config->>'tema' = 'Salud y bienestar' and pe.custom_config->>'duracion' = '30 días' then 'practica-30-dias-salud'
    else null
  end;
