/* 잠만보 서비스 워커 v2 — 재방문을 빠르게
 * - 같은 출처의 GET(시작 페이지·config·auth·아이콘): 캐시 먼저 보여주고 뒤에서 새로 받아 둠 (stale-while-revalidate)
 *   → GitHub 에 올린 변경은 "다음 번" 열 때 적용됨
 * - Apps Script·카카오(다른 출처)와 로그인 복귀(?code=…)는 건드리지 않음
 */
var CACHE = 'jmb-static-v2';
var PRECACHE = ['./', 'config.js', 'auth.js', 'auth.css', 'icon-192.png', 'apple-touch-icon.png', 'manifest.webmanifest'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(PRECACHE.map(function (u) { return c.add(u).catch(function () {}); }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;              // Apps Script · 카카오는 그대로 통과
  if (/[?&](code|error|state)=/.test(url.search)) return;       // 카카오 로그인 복귀는 캐시하지 않음

  // 시작 페이지는 주소 하나로 저장 (…/jammanbo/, …/jammanbo/index.html 같은 것으로)
  var key = req.mode === 'navigate' ? new Request(url.pathname.replace(/index\.html$/, '')) : req;

  e.respondWith(caches.open(CACHE).then(function (c) {
    return c.match(key, { ignoreSearch: req.mode === 'navigate' }).then(function (hit) {
      var net = fetch(req).then(function (res) {
        if (res && res.ok) c.put(key, res.clone());
        return res;
      }).catch(function () { return hit; });
      if (hit) { e.waitUntil(net.then(function () {}, function () {})); return hit; }
      return net;
    });
  }));
});
