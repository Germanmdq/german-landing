-- El Taller de 40 días pasa sus entregas intermedias a texto.
-- Desvinculamos entregas históricas de sus MP3 intermedios y quitamos esos assets.
update public.taller_deliveries td
set asset_id = null
where td.delivery_type = 'intermediate_message'
  and exists (
    select 1
    from public.content_assets ca
    where ca.id = td.asset_id
      and ca.storage_path like 'taller-40/intermedios/%'
  );

delete from public.content_assets
where storage_path like 'taller-40/intermedios/%';
