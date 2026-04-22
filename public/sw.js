// Bump this on every deploy that changes SW behavior. The PushRegistrar
// checks the registration and re-registers when this version string differs.
const SW_VERSION = 'hs-sw-2026-04-22-1';

self.addEventListener('install', () => {
  // Activate this SW immediately instead of waiting for old tabs to close.
  // Safe because our SW doesn't cache routable assets — Next handles that.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Take control of open pages right away.
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  if (!event.data) return;

  let payload;
  try {
    payload = event.data.json();
  } catch {
    payload = { title: 'Homestead', body: event.data.text() };
  }

  const title = payload.title || 'Homestead';
  const options = {
    body: payload.body || '',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: payload.tag || 'homestead',
    data: { url: payload.url || '/' },
    requireInteraction: payload.urgent === true,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});

// Version check endpoint — lets clients verify which SW is active without reloading
self.addEventListener('message', (event) => {
  if (event.data?.type === 'GET_VERSION') {
    event.ports[0]?.postMessage({ version: SW_VERSION });
  }
});
