const cacheStart = (cacheResources, ttl, swName = "./cacheWorker.js") => {
  let tl = 0;
  tl = localStorage.cacheTTL;
  if (+tl) {
    const now = new Date();
    if (now.getTime() > +localStorage.cacheTTL) {
      localStorage.cacheTTL = 0;
      caches.delete("cachev1").then(() => {
      });
    }
  } else {
    navigator.serviceWorker.register(swName, {
      scope: './'
    })
    .then(reg => {
      caches.open("cachev1")
      .then( cache => {
        cache.addAll(cacheResources)
        .then(() => {
          localStorage.cacheTTL = +(new Date().getTime()) + +ttl;
        });
      });
    })
    .catch( err => {
    });
  }
};

const cacheClean = () => {
  caches.delete("cachev1").then(() => {

  });
};

export { cacheStart, cacheClean };
