/* Scout Report service worker — the degree-day tool's, with this app's cache name.
   Makes the hosted app installable and lets it OPEN with no signal: the
   last-cached app shell plus whatever is in the browser's storage (the
   farms, locations and pests saved from the sheet); reports made with no
   signal wait in the phone's storage and send when connectivity returns.

   NAVIGATIONS ARE NETWORK-FIRST, and that is not a preference — it is what
   makes a per-deploy cache stamp safe. BlightCast learned it live on
   2026-08-23: with a cache-first shell, a deploy replaced the content-hashed
   assets, the new worker swept the old cache, and the stale shell went
   looking for lazy chunks that no longer existed — tabs silently did
   nothing. Hashed assets stay cache-first (immutable); only the shell must
   always match the server.
   CACHE is stamped per deploy by the deploy script; the source keeps the
   -v1 placeholder. */
var CACHE = 'scoutreport-20261001131611';
var SHELL = ['./', './manifest.webmanifest', './icon.svg'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  /* sweep only OUR old caches: the Cache API is origin-wide and the other
     apps on a shared Pages origin (spraycast-*, blightcast-*, plantpicks-*)
     are not ours to delete */
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf('scoutreport') === 0 && k !== CACHE; })
      .map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   /* the sheet (Google) goes straight to the network */
  /* ⚑ ALWAYS match inside OUR cache — a bare caches.match() searches every
     cache on the origin OLDEST-first and a sibling app's cache would win */
  var inOurs = function (key) { return caches.open(CACHE).then(function (c) { return c.match(key); }); };
  var isNav = req.mode === 'navigate';
  if (isNav) {
    var isRoot = url.pathname === new URL('./', self.location).pathname
      || url.pathname === new URL('./index.html', self.location).pathname;
    /* network first, but not forever: on lie-fi the cached shell wins after
       4 s; with NO cached shell the timer stays silent so a first-ever
       visitor on a slow network still gets the real page */
    e.respondWith(
      Promise.race([
        fetch(req).then(function (res) {
          if (res && res.ok) {
            var copy = res.clone();
            caches.open(CACHE).then(function (c) { c.put(isRoot ? './' : req, copy); });
          }
          return res;
        }),
        new Promise(function (resolve) {
          setTimeout(function () {
            inOurs(isRoot ? './' : req).then(function (c) {
              if (c) return resolve(c);
              if (!isRoot) inOurs('./').then(function (shell) { if (shell) resolve(shell); });
            });
          }, 4000);
        }),
      ]).catch(function () {
        return inOurs(isRoot ? './' : req).then(function (c) {
          return c || inOurs('./').then(function (shell) { return shell || Response.error(); });
        });
      })
    );
    return;
  }
  e.respondWith(
    inOurs(req).then(function (cached) {
      var fresh = fetch(req).then(function (res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () { return cached; });
      return cached || fresh;
    })
  );
});
