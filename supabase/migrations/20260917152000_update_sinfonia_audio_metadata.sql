-- Match the audiobook asset metadata to the complete voice-optimized MP3
-- stored within the Supabase Free plan's fixed 50 MB upload limit.

update public.content_assets asset
set duration_seconds = 6556,
    file_size_bytes = 45891452,
    mime_type = 'audio/mpeg'
from public.content_items item
where item.slug = 'sinfonia-de-susurros'
  and asset.content_id = item.id
  and asset.asset_type = 'audio';

update public.content_items
set metadata = metadata || jsonb_build_object(
      'audio_duration_seconds_exact', 6555.84,
      'audio_source_file_size_bytes', 131052288,
      'audio_storage_file_size_bytes', 45891452,
      'audio_storage_encoding', 'MP3 56 kbps mono'
    ),
    updated_at = now()
where slug = 'sinfonia-de-susurros';
