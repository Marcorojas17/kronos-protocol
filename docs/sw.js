// ARKHÉ ZERO · Service Worker
const CACHE_NAME = 'arkhe-zero-v1';
const ASSETS = [
  './',
  './index.html',
  './favicon.svg',
  './arkhe-style.css',
  './arkhe-bg.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((key) => { if (key !== CACHE_NAME) return caches.delete(key); })
    ))
  );
});

self.addEventListener('fetch', (e) => {
  // Estrategia: Network first, fallback to cache
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
