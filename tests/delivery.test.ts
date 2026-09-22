import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
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

test('el service worker navega a la URL exacta y no la transforma en query', () => {
  const source = readFileSync(new URL('../public/sw.js', import.meta.url), 'utf8');
  assert.match(source, /german-app-v11/);
  assert.match(source, /existing\.navigate\(targetUrl\)/);
  assert.match(source, /clients\.openWindow\(targetUrl\)/);
  assert.doesNotMatch(source, /new URL\(`\/\?delivery=/);
});

async function simulateNotificationClick(open: boolean) {
  const source = readFileSync(new URL('../public/sw.js', import.meta.url), 'utf8');
  const handlers: Record<string, (event: Record<string, unknown>) => void> = {};
  let navigatedTo = '';
  let openedTo = '';
  const windowClient = {
    url: 'https://german.elclubdelaimaginacion.com/',
    navigate: async (url: string) => { navigatedTo = url; return windowClient; },
    focus: async () => undefined,
  };
  const context = {
    URL,
    Response,
    Date,
    Promise,
    self: { location: { origin: 'https://german.elclubdelaimaginacion.com' }, addEventListener: (name: string, handler: (event: Record<string, unknown>) => void) => { handlers[name] = handler; }, skipWaiting: () => undefined, clients: { claim: async () => undefined } },
    caches: { keys: async () => [], delete: async () => true, open: async () => ({ put: async () => undefined, match: async () => undefined, delete: async () => true }) },
    clients: { matchAll: async () => open ? [windowClient] : [], openWindow: async (url: string) => { openedTo = url; } },
  };
  runInNewContext(source, context);
  let pending: Promise<unknown> = Promise.resolve();
  handlers.notificationclick({ notification: { close: () => undefined, data: { url: '/delivery/entrega-real' } }, waitUntil: (promise: Promise<unknown>) => { pending = promise; } });
  await pending;
  return { navigatedTo, openedTo };
}

test('con la PWA abierta reutiliza la ventana y navega a la entrega', async () => {
  assert.deepEqual(await simulateNotificationClick(true), { navigatedTo: 'https://german.elclubdelaimaginacion.com/delivery/entrega-real', openedTo: '' });
});

test('con la PWA cerrada abre directamente la entrega', async () => {
  assert.deepEqual(await simulateNotificationClick(false), { navigatedTo: '', openedTo: 'https://german.elclubdelaimaginacion.com/delivery/entrega-real' });
});

test('todos los pushes del Taller usan la ruta dedicada de su entrega', () => {
  const source = readFileSync(new URL('../supabase/functions/send-notifications/index.ts', import.meta.url), 'utf8');
  assert.equal(source.match(/url: `\/delivery\/\$\{(?:inserted|delivery)\.id\}`/g)?.length, 3);
});

test('la ruta dedicada renderiza la entrega y no redirige a la home', () => {
  const source = readFileSync(new URL('../app/delivery/[id]/page.tsx', import.meta.url), 'utf8');
  assert.match(source, /<DeliveryScreen deliveryId=\{id\}/);
  assert.doesNotMatch(source, /redirect\(/);
});
