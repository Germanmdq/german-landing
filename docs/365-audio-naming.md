# Convención de audios — Taller de 365 días

Los audios diarios del Taller de 365 días usan esta convención fija:

- Día 1 → `365-dia-001.mp3`
- Día 2 → `365-dia-002.mp3`
- Día 3 → `365-dia-003.mp3`
- …
- Día 365 → `365-dia-365.mp3`

Regla: siempre tres dígitos para el número de día.

El contenido correspondiente en Supabase usa el slug equivalente:

- Día 1 → `taller-365-dia-001`
- Día 2 → `taller-365-dia-002`
- etc.

Cada audio debe vincularse al `content_item` del mismo día mediante `content_assets` con `asset_type = 'audio'` y `sort_order = 1`.

## Estado actual

- Día 1 recibido el 2026-09-26.
- Nombre definitivo: `365-dia-001.mp3`.
- Duración del archivo recibido: 5:09 aprox.
- El Día 1 todavía no tenía ningún `content_asset` de audio asociado al momento de recibir este archivo.
