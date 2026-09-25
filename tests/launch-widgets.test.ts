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

test('Consultas pendiente: tarjeta en lugar del composer, sin grabar, transcribir ni guardar', () => {
  // 1. consultas: true
  assert.match(widgets, /consultas: true,/);
  const panelAt = app.indexOf('function PreguntamePanel(');
  const panel = app.slice(panelAt, app.indexOf('\nfunction ', panelAt + 10));
  // 2. Preguntame usa isLaunchPending('consultas') en una sola bandera
  assert.match(panel, /const consultasLaunchPending = isLaunchPending\('consultas'\);/);
  // 3. Mientras está pendiente se renderiza LaunchDateCard en lugar del composer
  assert.match(panel, /\{consultasLaunchPending\s*\? <div className="preguntame-launch-card"><LaunchDateCard \/><\/div>\s*: <>/);
  const pendingBranch = panel.slice(panel.indexOf('{consultasLaunchPending'), panel.indexOf(': <>'));
  assert.doesNotMatch(pendingBranch, /prompt-bar|textarea|prompt-mic|prompt-send|preguntame-suggestions/);
  // 4 y 5. toggleVoice corta antes de getUserMedia y antes de /api/transcribe
  const voiceAt = panel.indexOf('const toggleVoice = async () => {');
  const voiceGateAt = panel.indexOf('if (consultasLaunchPending) return;', voiceAt);
  assert.ok(voiceAt > 0 && voiceGateAt > voiceAt, 'toggleVoice tiene el gate');
  assert.ok(voiceGateAt < panel.indexOf('navigator.mediaDevices.getUserMedia', voiceAt), 'gate antes de getUserMedia');
  assert.ok(voiceGateAt < panel.indexOf("fetch('/api/transcribe'", voiceAt), 'gate antes de /api/transcribe');
  // 6. submit sigue bloqueado antes del insert y del loader
  const submitAt = panel.indexOf('const submit = async () => {');
  const submitGateAt = panel.indexOf('if (consultasLaunchPending) return;', submitAt);
  assert.ok(submitGateAt > submitAt, 'submit tiene el gate');
  assert.ok(submitGateAt < panel.indexOf(".from('user_consultations').insert(", submitAt), 'gate antes del insert');
  assert.ok(submitGateAt < panel.indexOf('setWorking(true);', submitAt), 'gate antes del loader');
  // 7. Sin el bloqueo, el composer existente sigue igual
  const composer = panel.slice(panel.indexOf(': <>'));
  assert.match(composer, /<div className=\{`prompt-bar\$\{listening \? ' is-listening' : ''\}`\}>/);
  assert.match(composer, /<textarea ref=\{promptRef\}/);
  assert.match(composer, /className="prompt-mic" onClick=\{toggleVoice\}/);
  assert.match(composer, /className="prompt-send"/);
  assert.match(composer, /className="preguntame-suggestions"/);
});

test('Fotos de "¿Qué necesitás ahora?": versionadas y el carrusel no deja el shimmer eterno', () => {
  assert.match(app, /image: `\/images\/meditacion-\$\{String\(index \+ 1\)\.padStart\(2, '0'\)\}\.webp\?v=\$\{MEDITATION_IMAGE_VERSION\}`/);
  const carousel = read('app/components/day-one-carousel.tsx');
  assert.match(carousel, /const FALLBACK_IMAGE = '\/images\/momento\.webp';/);
  assert.match(carousel, /onError=\{\(\) => handleImageError\(index, item\.image!\)\}/);
  assert.match(carousel, /element\?\.complete && element\.naturalWidth > 0/);
  assert.match(carousel, /retry=\$\{Date\.now\(\)\}/);
});


test('Meditaciones para ahora: las tarjetas internas muestran oreja y mantienen el bloqueo hasta cargar audio', () => {
  const carousel = read('app/components/day-one-carousel.tsx');
  const carouselCss = read('app/components/day-one-carousel.css');
  const idsMigration = read('supabase/migrations/20260925235000_reserve_meditation_audio_ids.sql');
  assert.match(app, /audioCue: true/);
  assert.match(carousel, /AnimatedInterfaceIcon name=\"ear\"/);
  assert.match(carouselCss, /\.day-one-audio-cue/);
  assert.match(idsMigration, /9001,9002,9003,9004,9005/);
  assert.match(idsMigration, /9071,9072,9073,9074,9075/);
  assert.doesNotMatch(idsMigration, /insert into public\.content_assets/i);
});

test('las pantallas internas mantienen Volver visible y las meditaciones usan tarjeta compacta', () => {
  const carouselCss = read('app/components/day-one-carousel.css');
  assert.match(app, /<button type="button" className="header-back" onClick=\{onBack\}>/);
  assert.match(app, /const meditationDetailScreen = tab === 'meditaciones' && trail\.length > 0;/);
  assert.match(app, /meditation-detail-screen/);
  assert.match(carouselCss, /\.meditation-detail-screen \.day-one-track/);
  assert.match(carouselCss, /height: min\(82%, 640px\)/);
});
