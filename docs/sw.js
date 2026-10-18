// ARKHÉ ZERO · Service Worker v2
const CACHE_NAME = 'arkhe-zero-v2';
const ASSETS = [
  './',
  './index.html',
  './certificado.html',
  './estado.html',
  './favicon.svg',
  './arkhe-style.css',
  './arkhe-bg.js',
  './manifest.json'
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
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
