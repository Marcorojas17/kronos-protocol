/* 🛡️ GUARDIAN-SHA ✅ */
/* DMD-33 ○_● · sw.js · v1.0 · 2026 */
/* SHA obra: ee0369032ee7829925233553054808142155a0707dbd4579b45f7af528763738 */
/* TX: 0xd94bf2d1c1187bddf22fe8d376f7663f63a8b01b5e85367b052db43d1ed6a466 */

var CACHE = 'dmd33-v1';
var ASSETS = [
  './orb.html',
  './manifest.json',
  './'
];

self.addEventListener('install', function(e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function(c) {
      return c.addAll(ASSETS);
    }).catch(function(){})
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      if (cached) return cached;
      return fetch(e.request).then(function(res) {
        if (!res || res.status !== 200 || res.type === 'opaque') return res;
        var copy = res.clone();
        caches.open(CACHE).then(function(c) { c.put(e.request, copy); });
        return res;
      }).catch(function() {
        return caches.match('./orb.html');
      });
    })
  );
});