/* 잠만보 미니게임 공통 adaptive.js v1 — <html> 에 기기 · 입력 방식 · 방향 표시를 달아 adaptive.css 가 화면에 맞게 함 (외부 접속 없음) */
(function () {
  var h = document.documentElement, ua = navigator.userAgent || '';
  var ios = /iP(hone|ad|od)/.test(ua) || (/Macintosh/.test(ua) && 'ontouchend' in document);
  var android = /Android/.test(ua);
  h.setAttribute('data-device', ios ? 'ios' : android ? 'android' : 'win');
  var m = /\/([^\/]+)\/(?:index\.html)?$/.exec(location.pathname);
  if (m) h.setAttribute('data-game', m[1]);
  function mq(q) { return !!(window.matchMedia && matchMedia(q).matches); }
  function set() {
    h.setAttribute('data-pointer', mq('(pointer: coarse)') ? 'coarse' : 'fine');
    h.setAttribute('data-orient', window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
    h.setAttribute('data-standalone', (mq('(display-mode: standalone)') || navigator.standalone) ? '1' : '0');
  }
  set();
  window.addEventListener('resize', set);
  window.addEventListener('orientationchange', set);
  /* 맨 아래 '화면 vX.Y.Z' — 각 페이지가 자기 VER 한 곳의 값을 넘김. 이미 #gver 가 있으면(마피아 · 티츄) 글자만 채움.
     body 끝에 붙여서 화면 안쪽이 다시 그려져도 안 지워짐 */
  window.JMB_GVER = function (ver, host) {   // host = 붙일 자리(선택자) — 화면 높이에 딱 맞는 페이지(지도 · 마이티)용, 없으면 body 끝
    function put() {
      try {
        var f = document.getElementById('gver');
        if (!f) { f = document.createElement('footer'); f.id = 'gver'; f.className = 'gver'; (host && document.querySelector(host) || document.body).appendChild(f); }
        f.textContent = '잠만보 · 화면 v' + ver;
      } catch (e) {}
    }
    if (document.body) put(); else document.addEventListener('DOMContentLoaded', put);
  };
})();
