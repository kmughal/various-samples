const CACHE_NAME = "CACHE_VERSION_1";
const thingsToCache = ["/", "https://api.cdnjs.com/libraries/jquery"];
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(thingsToCache);
      })
      .catch((reason) => {
        console.log("reason :", reason);
      })
  );
});

self.addEventListener("fetch", (event) => {
  const fetchAndSaveResponseInCache = (request) => {
    return fetch(request, { mode: "no-cors" }).then((response) => {
      const responseNotValid =
        !response || response.status !== 200 || response.type !== "basic";
      if (responseNotValid) return;

      const responseClone = response.clone();

      caches.open(CACHE_NAME).then((cache) => {
        cache.put(request, responseClone);
      });
      return response;
    });
  };
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log("serving from cache! :", event.request);
        return response;
      }
      console.log("fetching !:", event.request);
      return fetchAndSaveResponseInCache(event.request);
    })
  );
});

self.addEventListener("sync", (event) => {
  console.log(event.tag);
});

self.addEventListener("backgroundfetchsuccess", (event) => {
  const registration = event.registration;
  event.updateUI({ title: "Done!" });
});

// self.addEventListener("activate", function (event) {
//   var cacheWhitelist = thingsToCache

//   event.waitUntil(
//     caches.keys().then(function (cacheNames) {
//       return Promise.all(
//         cacheNames.map(function (cacheName) {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });
