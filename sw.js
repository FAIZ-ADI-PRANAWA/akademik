const CACHE_NAME = 'pwa-akademik-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/jadwal.html',
  '/style.css',
  '/app.webmanifest',
  '/icon-192.png',
  '/icon-512.png'
];

// Install service worker & simpan file
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch resource (ambil dari cache jika offline)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Update service worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(name => {
        if (!cacheWhitelist.includes(name)) {
          return caches.delete(name);
        }
      })
    ))
  );
});
