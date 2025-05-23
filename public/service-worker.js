
var CACHE_NAME = 'iamgique-cache-v1';
var urlsToCache = [
  '/',
  
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened Cache');
        return cache.addAll(urlsToCache);
      })
  );
});