-- Devuelve sólo un fragmento corto alrededor de la coincidencia buscada.
-- Evita descargar los cuerpos completos de las 700 conferencias para buscar.
create or replace function public.search_library_content_snippets(p_query text)
returns table(id uuid, snippet text)
language sql
stable
security invoker
set search_path = ''
as $$
  with params as (
    select btrim(coalesce(p_query, '')) as q
  ), matches as (
    select
      ci.id,
      ci.body,
      strpos(lower(ci.body), lower(p.q)) as hit,
      p.q
    from public.content_items ci
    cross join params p
    where ci.is_published = true
      and ci.content_type in ('conference', 'book')
      and char_length(p.q) >= 2
      and strpos(lower(ci.body), lower(p.q)) > 0
  )
  select
    m.id,
    (case when m.hit > 56 then '…' else '' end)
      || btrim(substring(m.body from greatest(1, m.hit - 55) for char_length(m.q) + 110))
      || (case when m.hit + char_length(m.q) + 55 < char_length(m.body) then '…' else '' end) as snippet
  from matches m
  limit 1000;
$$;

revoke all on function public.search_library_content_snippets(text) from public;
grant execute on function public.search_library_content_snippets(text) to authenticated;

