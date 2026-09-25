import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const app = readFileSync(new URL('../app/telegram-mini-app.tsx', import.meta.url), 'utf8');

test('la consulta de la Biblioteca trae los content_assets de conferencias y libros', () => {
  assert.match(app, /\.select\('id,title,excerpt,content_type,metadata,published_at,content_assets\(asset_type,source_url,storage_path,duration_seconds,sort_order\)'\)\s*\.eq\('is_published', true\)\s*\.in\('content_type', \['conference', 'book'\]\)/);
  assert.match(app, /audioUrl,\n\s*duration: audioAsset\?\.duration_seconds/);
  assert.match(app, /storage\/v1\/object\/public\/audios\/\$\{audioAsset\.storage_path\}/);
});

test('Conferencias en audio: con audio se abre en modo audio; sin audio sigue bloqueada', () => {
  assert.match(app, /const audioLocked = filter === 'Audios' && !entry\.audioUrl;/);
  assert.match(app, /disabled=\{audioLocked\} onClick=\{audioLocked \? undefined : filter === 'Audios' \? \(\) => onRead\(entry, undefined, 'audio'\)/);
  assert.match(app, /<em className="card-subtitle">Próximamente leída por Germán<\/em>/);
  assert.match(app, /library-content-card library-content-card--instant/);
});

test('Conferencias en texto: títulos y subtítulos aparecen sin la animación demorada', () => {
  assert.match(app, /delay=\{0\} className=\{`library-content-card library-content-card--instant/);
  assert.match(app, /libraryExcerpt\(entry\.excerpt\) \|\| 'Abrir conferencia'/);
});

test('búsqueda dentro de Audios: abre el audio o queda bloqueada, nunca el texto', () => {
  assert.match(app, /const audioSearchLocked = filter === 'Audios' && !entry\.audioUrl;/);
  assert.match(app, /disabled=\{audioSearchLocked\} onClick=\{audioSearchLocked \? undefined : filter === 'Audios' \? \(\) => \{ blurSearch\(\); onRead\(entry, q, 'audio'\); \} : \(\) => \{ blurSearch\(\); onRead\(entry, q\); \}\}/);
});

test('favoritos de la Biblioteca siguen guardándose como antes (sin el audio de la conferencia)', () => {
  assert.match(app, /onToggleFavorite\(libraryFavorite\(\{ \.\.\.entry, audioUrl: undefined, duration: undefined \}\)\)/);
});
