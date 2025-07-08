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

// Proses install service worker: menyimpan file statis ke cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache); // Simpan semua file dalam cache
    })
  );
});

// Proses fetch: ambil file dari cache jika offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)         // Cek apakah request ada di cache
      .then(response => response || fetch(event.request)) // Jika tidak, ambil dari jaringan
  );
});

// Proses activate: hapus cache lama saat versi berubah
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME]; // Cache yang masih dipakai
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (!cacheWhitelist.includes(name)) {
            return caches.delete(name); // Hapus cache versi lama
          }
        })
      )
    )
  );
});
