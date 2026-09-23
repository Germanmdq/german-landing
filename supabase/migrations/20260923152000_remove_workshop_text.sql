-- Los talleres/prácticas son exclusivamente de audio.
-- No conservar texto en content_items ni copias de párrafos en favoritos.

update public.content_items ci
set body = '',
    updated_at = now()
where coalesce(ci.body, '') <> ''
  and exists (
    select 1
    from public.collection_items cii
    join public.collections c on c.id = cii.collection_id
    where cii.content_id = ci.id
      and c.collection_type = 'taller'
  );

update public.user_favorites
set payload = jsonb_set(payload, '{reader,paragraphs}', '[]'::jsonb, true),
    updated_at = now()
where favorite_id like 'delivery:%'
  and jsonb_typeof(payload->'reader') = 'object';
