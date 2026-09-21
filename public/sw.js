const CACHE_NAME = 'german-app-v14';
const LAST_PUSH_CACHE = 'german-last-push-v1';
const PUSH_RECEIPT_CACHE = 'german-push-receipts-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    await caches.keys().then((names) => Promise.all(names.filter((name) => name !== CACHE_NAME && name !== LAST_PUSH_CACHE && name !== PUSH_RECEIPT_CACHE).map((name) => caches.delete(name))));
    await self.clients.claim();
    const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    await Promise.all(windows.map((client) => client.navigate(client.url)));
  })());
});

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const url = data.url || '/';
  const deliveryId = data.deliveryId || null;
  // Cada entrega debe ser una notificación distinta. Reutilizar siempre el
  // mismo tag hace que iOS pueda reemplazar/coalescer avisos consecutivos.
  const notificationTag = data.tag || `german-${data.deliveryId || Date.now()}`;
  event.waitUntil((async () => {
    await caches.open(LAST_PUSH_CACHE).then((cache) => cache.put('/__last_push__', new Response(JSON.stringify({ url, at: Date.now() }))));
    await self.registration.showNotification(data.title || 'Asistente Germán', {
      body: data.body || 'Germán te dejó una práctica.',
      icon: data.icon || '/images/german-welcome.png',
      badge: data.badge || '/images/german-welcome.png',
      tag: notificationTag,
      renotify: true,
      lang: 'es-AR',
      data: { url },
    });
    // El recibo se escribe DESPUÉS de que showNotification resolvió. Si iOS
    // rechaza la notificación, la app todavía puede rescatarla por fallback.
    if (deliveryId) {
      await caches.open(PUSH_RECEIPT_CACHE).then((cache) => cache.put(`/__push_receipt__/${deliveryId}`, new Response(JSON.stringify({ at: Date.now() }))));
    }
  })());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = new URL(event.notification.data?.url || '/', self.location.origin).href;
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(async (windows) => {
    const existing = windows.find((client) => new URL(client.url).origin === self.location.origin) || windows[0];
    if (existing) {
      // En iOS una PWA ya abierta puede volver al frente sin respetar navigate().
      // Enviamos además una orden explícita a la app para abrir la entrega.
      await existing.focus();
      existing.postMessage({ type: 'OPEN_PUSH', url: targetUrl });
      try {
        const navigated = await existing.navigate(targetUrl);
        return (navigated || existing).focus();
      } catch {
        return existing.focus();
      }
    }
    return clients.openWindow(targetUrl);
  }));
});

// iOS a veces restaura una PWA suspendida sin entregar notificationclick.
// La app consulta este fallback al abrir y recupera la entrega si el push es reciente.
self.addEventListener('message', (event) => {
  if (event.data?.type !== 'GET_LAST_PUSH') return;
  event.waitUntil(caches.open(LAST_PUSH_CACHE).then(async (cache) => {
    const response = await cache.match('/__last_push__');
    if (!response) return;
    const payload = await response.json().catch(() => null);
    await cache.delete('/__last_push__');
    if (!payload || Date.now() - Number(payload.at || 0) > 120000) return;
    event.source?.postMessage({ type: 'LAST_PUSH', url: payload.url });
  }));
});
