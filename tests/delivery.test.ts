import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { extractDeliveryParagraphs, findNumberedMessage } from '../app/lib/taller-delivery.ts';

test('extrae el mensaje 15 con numeración normal y con cero a la izquierda', () => {
  const plain = '14. Mensaje anterior\n\n15. Mensaje correcto\n\n16. Mensaje siguiente';
  const padded = '014. Mensaje anterior<br><br>015. Mensaje correcto<br><br>016. Mensaje siguiente';
  assert.deepEqual(findNumberedMessage(plain, 15), ['Mensaje correcto']);
  assert.deepEqual(findNumberedMessage(padded, 15), ['Mensaje correcto']);
});

test('la extracción de meditaciones conserva su sección y admite br', () => {
  const body = '# Introducción<br><br>Texto inicial<br><br>## Meditación de la mañana<br><br>Respirá.<br><br>Imaginá.<br><br>## Meditación de la tarde<br><br>Otro texto.';
  assert.deepEqual(extractDeliveryParagraphs(body, 'meditation_morning', null), ['Respirá.', 'Imaginá.']);
});

test('el Taller usa Telegram como único transporte de notificaciones', () => {
  const source = readFileSync(new URL('../supabase/functions/send-notifications/index.ts', import.meta.url), 'utf8');
  assert.match(source, /api\.telegram\.org\/bot\$\{TELEGRAM_BOT_TOKEN\}\/sendMessage/);
  assert.match(source, /web_app: \{ url: `\$\{TELEGRAM_APP_ORIGIN\}\/delivery\/\$\{encodeURIComponent\(delivery\.id\)\}`/);
  assert.doesNotMatch(source, /webpush|sendNotification|\.from\('push_subscriptions'\)/i);
});

test('la Mini App no pide permisos ni registra Web Push', () => {
  const source = readFileSync(new URL('../app/telegram-mini-app.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /Notification\.requestPermission|ensurePushSubscription|serviceWorker\.register|showNotification|push_subscriptions/);
  assert.match(source, /Tus avisos llegan por Telegram/);
});

test('el proyecto no publica una PWA ni conserva un Service Worker', () => {
  const layout = readFileSync(new URL('../app/layout.tsx', import.meta.url), 'utf8');
  const packageJson = readFileSync(new URL('../package.json', import.meta.url), 'utf8');
  assert.doesNotMatch(layout, /manifest\.webmanifest|appleWebApp/);
  assert.doesNotMatch(packageJson, /web-push/);
  assert.equal(existsSync(new URL('../public/sw.js', import.meta.url)), false);
  assert.equal(existsSync(new URL('../app/manifest.ts', import.meta.url)), false);
});

test('el acceso desde Telegram tiene timeout y evita recargar la misma ruta', () => {
  const source = readFileSync(new URL('../app/components/login-gate.tsx', import.meta.url), 'utf8');
  assert.match(source, /TELEGRAM_READY_TIMEOUT_MS/);
  assert.match(source, /TELEGRAM_AUTH_TIMEOUT_MS/);
  assert.match(source, /if \(currentPath !== safeRedirectPath\)/);
  assert.match(source, /La sesión se inició, pero la pantalla no se actualizó/);
});

test('los íconos Lottie permanecen animados en Telegram y respetan movimiento reducido', () => {
  const source = readFileSync(new URL('../app/components/animated-interface-icon.tsx', import.meta.url), 'utf8');
  assert.match(source, /loop=\{!reduceMotion\}/);
  assert.match(source, /prefers-reduced-motion: reduce/);
});

test('la ruta dedicada renderiza la entrega y no redirige a la home', () => {
  const source = readFileSync(new URL('../app/delivery/[id]/page.tsx', import.meta.url), 'utf8');
  assert.match(source, /<DeliveryScreen deliveryId=\{id\}/);
  assert.doesNotMatch(source, /redirect\(/);
});
