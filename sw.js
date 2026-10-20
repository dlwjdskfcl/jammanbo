/* 잠만보 서비스 워커 — 정적 파일(로그인 모듈·아이콘)을 캐시해 재방문을 빠르게 합니다.
 * - 화면(index.html): 네트워크 우선 → 실패 시 캐시 (항상 최신 시작 페이지, 오프라인에서도 열림)
 * - 그 외 같은 출처 정적 파일: stale-while-revalidate (auth.js?v=… 처럼 버전 주소를 쓰므로 업데이트가 즉시 반영)
 * - Apps Script(다른 출처) 요청과 로그인 복귀(?code=…)는 건드리지 않음
 */
var CACHE = 'jmb-static-v1';
var PRECACHE = ['icon-192.png', 'manifest.webmanifest'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(PRECACHE); }).catch(function () {}).then(function () { return self.skipWaiting(); }));
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
  if (url.origin !== self.location.origin) return;                         // Apps Script · 카카오는 그대로 통과
  if (/[?&](code|error|state)=/.test(url.search)) return;                  // 카카오 로그인 복귀는 캐시하지 않음

  if (req.mode === 'navigate') {                                           // 시작 페이지: 네트워크 우선
    e.respondWith(fetch(req).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(url.pathname, copy); });
      return res;
    }).catch(function () { return caches.match(url.pathname).then(function (m) { return m || caches.match('./'); }); }));
    return;
  }

  e.respondWith(caches.open(CACHE).then(function (c) {                     // 정적 파일: 캐시 먼저, 뒤에서 갱신
    return c.match(req).then(function (hit) {
      var net = fetch(req).then(function (res) { if (res && res.ok) c.put(req, res.clone()); return res; }).catch(function () { return hit; });
      return hit || net;
    });
  }));
});
