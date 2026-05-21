const SW_VERSION = 'pkb-admin-v2';
const STATIC_CACHE = `static-${SW_VERSION}`;

const STATIC_ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './admin.js',
  './manifest.json',
  './KATALOG.pdf',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== STATIC_CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

function isGoogleAppsScriptRequest(url) {
  return url.hostname === 'script.google.com' || url.hostname === 'script.googleusercontent.com';
}
function isCoreMutableAsset(url) {
  const p = url.pathname || '';
  return p.endsWith('/index.html') || p.endsWith('/script.js') || p.endsWith('/admin.js') || p.endsWith('/style.css');
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Data order/admin API harus selalu fresh dari network.
  if (isGoogleAppsScriptRequest(url)) {
    event.respondWith(fetch(request));
    return;
  }

  // Navigasi halaman: network first agar update app cepat masuk.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(STATIC_CACHE).then((cache) => cache.put('./index.html', copy));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Asset inti app: network first agar update JS/CSS tidak tertahan cache lama.
  if (url.origin === self.location.origin && isCoreMutableAsset(url)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(STATIC_CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Asset lokal lain: cache first + fallback network.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          const copy = response.clone();
          caches.open(STATIC_CACHE).then((cache) => cache.put(request, copy));
          return response;
        });
      })
    );
    return;
  }

  // Request lain (misalnya CDN): network passthrough.
  event.respondWith(fetch(request));
});
