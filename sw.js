/* AI Pulse — Service Worker (app-shell cache) */
const CACHE_NAME = "ai-pulse-v3";
const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./main.js",
  "./manifest.json"
];

/* Install — cache the app shell */
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting();
});

/* Activate — clean up old caches */
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE_NAME; })
            .map(function (k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

/* Fetch — network-first, fall back to cache.
   news.json gets special handling: strip query strings so the cache
   key is always the same, enabling reliable offline reads. */
self.addEventListener("fetch", function (e) {
  var url = new URL(e.request.url);
  var isNewsJson = url.pathname.endsWith("/news.json") || url.pathname === "news.json";

  /* Normalize the request for news.json — strip cache-bust params */
  var request = isNewsJson
    ? new Request(url.origin + url.pathname, { method: e.request.method })
    : e.request;

  e.respondWith(
    fetch(request)
      .then(function (response) {
        /* Cache successful GET responses for offline use */
        if (request.method === "GET" && response.status === 200) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(request, clone);
          });
        }
        return response;
      })
      .catch(function () {
        return caches.match(request);
      })
  );
});
