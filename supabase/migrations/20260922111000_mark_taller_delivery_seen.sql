-- Marca una entrega como vista sin dar permiso de UPDATE general sobre la tabla.
create or replace function public.mark_taller_delivery_seen(p_delivery_id uuid)
returns timestamptz
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_seen_at timestamptz;
begin
  if auth.uid() is null then
    raise exception 'not authenticated' using errcode = '42501';
  end if;

  update public.taller_deliveries
  set seen_at = coalesce(seen_at, now())
  where id = p_delivery_id
    and user_id = auth.uid()
  returning seen_at into v_seen_at;

  if v_seen_at is null then
    raise exception 'delivery not found' using errcode = 'P0002';
  end if;

  return v_seen_at;
end;
$$;

revoke all on function public.mark_taller_delivery_seen(uuid) from public;
grant execute on function public.mark_taller_delivery_seen(uuid) to authenticated;
