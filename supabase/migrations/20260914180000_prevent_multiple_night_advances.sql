-- Garantiza en base de datos que una inscripción sólo pueda avanzar una vez
-- por fecha local, aunque varias ejecuciones del cron se superpongan.
alter table public.program_enrollments
  add column if not exists last_night_local_date date;

create or replace function public.claim_program_night(
  p_enrollment_id uuid,
  p_current_day integer,
  p_local_date date
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  claimed uuid;
begin
  update public.program_enrollments
     set last_night_local_date = p_local_date,
         updated_at = now()
   where id = p_enrollment_id
     and status = 'active'
     and current_day = p_current_day
     and (last_night_local_date is null or last_night_local_date < p_local_date)
  returning id into claimed;
  return claimed is not null;
end;
$$;

revoke all on function public.claim_program_night(uuid, integer, date) from public, anon, authenticated;
grant execute on function public.claim_program_night(uuid, integer, date) to service_role;
