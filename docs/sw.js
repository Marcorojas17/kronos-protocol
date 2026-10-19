const CACHE_NAME = 'arkhe-zero-v3';
const ASSETS = [
  './', './index.html', './certificado.html', './estado.html',
  './favicon.svg', './arkhe-style.css', './arkhe-bg.js', './manifest.json',
  './legado/filosofia/carrusel.html',
  './catalogo/index.html',
  './verificar/index.html',
  './comprar/index.html'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null)
  )));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
