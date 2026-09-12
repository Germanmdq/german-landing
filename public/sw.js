// Cambiar esta versión (y por lo tanto el contenido del archivo) es lo que
// hace que el navegador detecte un service worker nuevo y lo reinstale —
// eso es lo que fuerza a los usuarios con la PWA ya instalada a agarrar la
// versión nueva de la app, más allá de cualquier header de caché.
const CACHE_NAME = 'german-app-v2';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((names) => Promise.all(
        names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      )),
      self.clients.claim(),
    ])
  );
});

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(self.registration.showNotification(data.title || 'Asistente Germán', {
    body: data.body || 'Germán te dejó una práctica.',
    data: { url: data.url || '/' },
  }));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data?.url || '/'));
});
