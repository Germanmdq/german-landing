-- Guided 7-day programs use the same program_enrollments / taller_deliveries engine as the 40-day workshop.
-- Minimum supported intermediate-message interval: 30 minutes.

insert into public.collections (slug, title, description, collection_type, is_published, sort_order)
values
  ('practica-7-dias-amor', 'Amor y relaciones', 'Programa guiado de 7 días con 4 meditaciones diarias y mensajes intermedios', 'taller', true, 10),
  ('practica-7-dias-dinero', 'Dinero y trabajo', 'Programa guiado de 7 días con 4 meditaciones diarias y mensajes intermedios', 'taller', true, 11),
  ('practica-7-dias-salud', 'Salud y bienestar', 'Programa guiado de 7 días con 4 meditaciones diarias y mensajes intermedios', 'taller', true, 12)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  collection_type = excluded.collection_type,
  is_published = excluded.is_published,
  sort_order = excluded.sort_order,
  updated_at = now();

-- The UI only exposes 30/40/45/60 minutes. Keep the DB invariant aligned with that product rule.
alter table public.program_enrollments
  drop constraint if exists program_enrollments_message_interval_minutes_check;
alter table public.program_enrollments
  add constraint program_enrollments_message_interval_minutes_check
  check (message_interval_minutes >= 30);
