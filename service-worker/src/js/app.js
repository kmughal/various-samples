if (navigator.serviceWorker) {
  // navigator.serviceWorker
  //   .register("/sw.js")
  //   .then((swr) => {
  //     console.log("service worker installed : ", swr);
  //     return swr.sync.register('myFirstSync');
  //   })
  //   .catch((reason) => console.log("reason :", reason));
  // Register your service worker:

  const register = navigator.serviceWorker.register("/sw.js");
  register.then((result) => {
    result.backgroundFetch.fetch(
      "image-file",
      ["https://picsum.photos/200/300"],
      {
        title: "download file",
      }
    );
  });
  //
  //   if (result.backgroundFetch) {
  //
  //       .then((backgroundFetch) => {
  //         console.log(backgroundFetch);
  //       });
  //   }

  //   result.periodicSync
  //     .register({
  //       tag: "get-latest-news", // default: ''
  //       minPeriod: 12 * 60 * 60 * 1000, // default: 0
  //       powerState: "avoid-draining", // default: 'auto'
  //       networkState: "avoid-cellular", // default: 'online'
  //     })
  //     .then(
  //       function (periodicSyncReg) {
  //         // success
  //         console.log(periodicSyncReg);
  //       },
  //       function () {
  //         // failure
  //       }
  //     );
  //});

  // Then later, request a one-off sync:
  navigator.serviceWorker.ready.then(function (swRegistration) {
    return swRegistration.sync.register("myFirstSync");
  });
}

function isOnline() {
  if (navigator.onLine) document.body.style.background = "pink";
  else document.body.style.background = "red";
}

window.addEventListener("online", isOnline);
window.addEventListener("offline", isOnline);
isOnline();


addEventListener('backgroundfetchsuccess', event => {
  console.log('[Service Worker]: Background Fetch Success', event.registration);
});