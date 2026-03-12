const CACHE_NAME = "agrisync-nexus-cache-v0";
const urlsToCache = [
  "./index.html",
  "./manifest.json",
  "./logo_agrisync.png",
  "./logo_black_star_nexus.png",
];

// Installation du Service Worker et mise en cache des fichiers du MVP
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Fichiers Nexus Network mis en cache");
      return cache.addAll(urlsToCache);
    }),
  );
});

// Récupération des fichiers depuis le cache si le réseau est coupé
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
