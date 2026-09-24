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

test('preview visible y contenido real bloqueado en las tres áreas, con un solo gate', () => {
  assert.match(widgets, /meditaciones: true,\s*curso365: true,\s*libros: true/);
  assert.match(widgets, /export function isLaunchPending\(area: LaunchArea\)/);
  // Ninguna sección completa se reemplaza al entrar.
  assert.doesNotMatch(app, /tab === 'meditaciones' && !trail\.length && LAUNCH_PENDING/);
  assert.doesNotMatch(app, /tab === 'audiolibros' && !trail\.length && LAUNCH_PENDING/);
  assert.doesNotMatch(app, /courseOpen && LAUNCH_PENDING/);
  // Meditaciones: el listado se ve; al abrir una aparece la tarjeta.
  assert.match(app, /launchArea: 'meditaciones'/);
  assert.match(app, /if \(selected\.launchArea && isLaunchPending\(selected\.launchArea\)\)/);
  // Audiolibros: índice visible; el capítulo muestra la tarjeta. Sin la lógica vieja del viernes.
  assert.match(app, /chaptersLaunchPending\s*\? <LaunchDateCard \/>/);
  assert.doesNotMatch(app, /firstChapterUnlockAt|chaptersLocked|Disponible día viernes/);
  // Libros en texto: aparecen en listados y búsqueda; al abrir uno, tarjeta.
  assert.doesNotMatch(app, /if \(isBook && LAUNCH_PENDING\.libros\) return false;/);
  assert.match(app, /\/book\|libro\/i\.test\(entry\.type\) && isLaunchPending\('libros'\)/);
  // 365: días visibles y abribles; el día muestra la tarjeta y no se pide contenido.
  assert.match(app, /if \(courseLaunchPending\) \{ setAudioUrl\(undefined\); setDayContent\(\{\}\); return; \}/);
  assert.match(app, /\{courseLaunchPending \? <LaunchDateCard \/> :/);
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

test('fin de prueba: la home queda visible y el cartel aparece al abrir contenido', () => {
  const blockedAt = app.indexOf('if (fullyBlocked || accessPermissions.all === false) return <AccessPaywall />;');
  const inactiveAt = app.indexOf("if (accessState === 'inactive' && !trialExpired) return <AccessPaywall />;");
  const trialGateAt = app.indexOf('if (trialGateOpen) return <TrialEndedScreen');
  assert.ok(blockedAt > 0 && blockedAt < inactiveAt && inactiveAt < trialGateAt, 'bloqueado → inactivo sin trial → fin de prueba');
  // Con el trial vencido, navegar a contenido abre el cartel; la home y el perfil siguen accesibles.
  assert.match(app, /const homeSafeTargets: NavTarget\[\] = \['home', 'espacio', 'configuracion', 'notificaciones'\];/);
  assert.match(app, /if \(trialExpired && !homeSafeTargets\.includes\(target\)\) \{[\s\S]{0,120}setTrialGateOpen\(true\);/);
  assert.match(read('app/components/delivery-screen.tsx'), /if \(trialExpired\) return <TrialEndedScreen \/>;/);
});

test('las animaciones son sólo de entrada y respetan movimiento reducido', () => {
  assert.doesNotMatch(css, /infinite/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /safe-area-inset-bottom/);
});
