// In your service worker file
self.addEventListener('fetch', (event) => {
  if (event.request.url.endsWith('.pdf')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((response) => {
          const responseClone = response.clone();
          caches.open('pdf-cache').then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        });
      })
    );
  }
});