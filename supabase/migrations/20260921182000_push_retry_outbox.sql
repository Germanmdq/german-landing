-- Convierte taller_deliveries en una cola de salida reintentable para push.
-- Crear la entrega y entregarla al servicio WebPush son dos pasos distintos:
-- una caída entre ambos no debe dejar la notificación perdida para siempre.

alter table public.taller_deliveries
  add column if not exists push_status text,
  add column if not exists push_error text,
  add column if not exists push_attempts integer,
  add column if not exists push_last_attempt_at timestamptz;

update public.taller_deliveries
set push_status = coalesce(push_status, 'pending'),
    push_attempts = coalesce(push_attempts, 0)
where push_status is null or push_attempts is null;

alter table public.taller_deliveries
  alter column push_status set default 'pending',
  alter column push_status set not null,
  alter column push_attempts set default 0,
  alter column push_attempts set not null;

alter table public.taller_deliveries
  drop constraint if exists taller_deliveries_push_status_check;

alter table public.taller_deliveries
  add constraint taller_deliveries_push_status_check
  check (push_status in ('pending', 'sent', 'failed'));

create index if not exists taller_deliveries_unsent_recent
  on public.taller_deliveries (delivered_at desc)
  where push_status in ('pending', 'failed');

create or replace function public.claim_delivery_push_attempt(
  p_delivery_id uuid,
  p_min_interval_seconds integer default 90,
  p_max_attempts integer default 6
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  claimed uuid;
begin
  update public.taller_deliveries
     set push_status = 'pending',
         push_error = null,
         push_attempts = coalesce(push_attempts, 0) + 1,
         push_last_attempt_at = now()
   where id = p_delivery_id
     and coalesce(push_status, 'pending') <> 'sent'
     and coalesce(push_attempts, 0) < greatest(p_max_attempts, 1)
     and (
       push_last_attempt_at is null
       or push_last_attempt_at <= now() - make_interval(secs => greatest(p_min_interval_seconds, 0))
     )
  returning id into claimed;

  return claimed is not null;
end;
$$;

revoke all on function public.claim_delivery_push_attempt(uuid, integer, integer) from public, anon, authenticated;
grant execute on function public.claim_delivery_push_attempt(uuid, integer, integer) to service_role;
