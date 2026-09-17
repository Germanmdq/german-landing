-- The uploaded Sinfonia audio is not Germán's narration. Keep the complete
-- book text/PDF and disconnect the temporary audio until the final recording
-- is available.
delete from public.content_assets
where asset_type = 'audio'
  and content_id = (
    select id from public.content_items where slug = 'sinfonia-de-susurros'
  );

update public.content_items
set metadata = (coalesce(metadata, '{}'::jsonb) - 'audio_duration_seconds_exact')
               || jsonb_build_object('audio_has_chapter_timestamps', false),
    updated_at = now()
where slug = 'sinfonia-de-susurros';
