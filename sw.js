const CACHE_NAME = 'bpsc-portal-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/p/notes.html',
  '/p/pdfs.html',
  '/p/planner.html',
  '/p/quiz.html',
  '/p/profile.html'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
