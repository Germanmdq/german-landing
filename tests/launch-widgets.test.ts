import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const widgets = read('app/components/launch-widgets.tsx');
const app = read('app/telegram-mini-app.tsx');
const css = read('app/components/launch-widgets.css');

test('la tarjeta de lanzamiento muestra la fecha y el texto corto', () => {
  assert.match(widgets, /Disponible el domingo <span>27 de septiembre<\/span>/);
  assert.match(widgets, /Estamos terminando de preparar esta experiencia para vos\./);
  assert.doesNotMatch(widgets, /[Pp]r[oó]ximamente/);
});

test('las tres áreas quedan detrás de la tarjeta mientras LAUNCH_PENDING esté activo', () => {
  assert.match(widgets, /meditaciones: true,\s*curso365: true,\s*libros: true/);
  assert.match(app, /tab === 'meditaciones' && !trail\.length && LAUNCH_PENDING\.meditaciones/);
  assert.match(app, /courseOpen && LAUNCH_PENDING\.curso365/);
  assert.match(app, /tab === 'audiolibros' && !trail\.length && LAUNCH_PENDING\.libros/);
  assert.match(app, /\/Libros\/\.test\(filter\) && LAUNCH_PENDING\.libros && <LaunchDateCard \/>/);
  assert.match(app, /if \(isBook && LAUNCH_PENDING\.libros\) return false;/);
});

test('fin de prueba: copy corto, botón con WhatsApp y mensaje prearmado, sin precios ni urgencia', () => {
  assert.match(widgets, /¿Querés seguir experimentando esta aplicación\?/);
  assert.match(widgets, /Seguir con el Asistente/);
  assert.match(widgets, /<WhatsAppIcon \/>/);
  assert.doesNotMatch(widgets, /\$\s?\d|precio|última oportunidad|urgente/i);
  const url = widgets.match(/wa\.me\/\$\{WHATSAPP_NUMBER\}/);
  assert.ok(url, 'usa wa.me con el número de Germán');
});

test('la URL de WhatsApp abre con el mensaje prearmado', () => {
  const text = widgets.match(/TRIAL_ENDED_WHATSAPP_TEXT = '([^']+)'/)?.[1];
  const number = widgets.match(/WHATSAPP_NUMBER = '(\d+)'/)?.[1];
  assert.equal(text, 'Hola Germán, quiero seguir usando el Asistente Germán.');
  assert.equal(number, '5492236151152');
  assert.match(widgets, /`https:\/\/wa\.me\/\$\{WHATSAPP_NUMBER\}\?text=\$\{encodeURIComponent\(TRIAL_ENDED_WHATSAPP_TEXT\)\}`/);
  const url = new URL(`https://wa.me/${number}?text=${encodeURIComponent(text!)}`);
  assert.equal(url.searchParams.get('text'), text);
});

test('dentro de Telegram el enlace sale por WebApp.openLink', () => {
  assert.match(widgets, /webApp\?\.openLink/);
});

test('fin de prueba se muestra después de bloqueado y antes que el cartel genérico', () => {
  const blockedAt = app.indexOf('if (fullyBlocked || accessPermissions.all === false) return <AccessPaywall />;');
  const trialAt = app.indexOf('if (trialExpired) return <TrialEndedScreen />;');
  const inactiveAt = app.indexOf("if (accessState === 'inactive') return <AccessPaywall />;");
  assert.ok(blockedAt > 0 && blockedAt < trialAt && trialAt < inactiveAt);
  assert.match(read('app/components/delivery-screen.tsx'), /if \(trialExpired\) return <TrialEndedScreen \/>;/);
});

test('las animaciones son sólo de entrada y respetan movimiento reducido', () => {
  assert.doesNotMatch(css, /infinite/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /safe-area-inset-bottom/);
});
