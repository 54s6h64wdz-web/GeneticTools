// Service worker : Retouche s'ouvre instantanément, même hors connexion.
// À chaque mise à jour : même numéro que BUILD dans index.html et que version.json.
const CACHE = 'retouche-build-4';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './exemple.pdf',
  './lib/pdf.min.js', './lib/pdf.worker.min.js', './lib/pdf-lib.min.js',
  './icons/icon-180.png', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })))));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k.startsWith('retouche-') && k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
// Copie locale d'abord (rapide, marche hors connexion), réseau si absente.
// Les polices et tables (cmaps, standard_fonts, wasm) sont gardées au premier usage.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  if (url.pathname.endsWith('version.json')) return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request, { cache: 'no-cache' }).then(r => {
      if (r.status === 200) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
      return r;
    }).catch(() => caches.match('./index.html')))
  );
});
