/* 잠만보 미니게임 목록 games.js v1 — 한 곳에서 관리 (extras.js 의 메뉴 · 홈 카드, arcade/ 오락실이 같이 씀)
 * window.JMB_GAME_LIST(ROOT) → 게임 배열. 새 미니게임은 여기에 한 줄 + sw.js SKIP_DIRS + config.js version
 *   cat   : card 카드 · 보드 / party 모임에서 / brain 두뇌 · 퍼즐 / action 손맛 / tool 도구 (오락실 분류)
 *   dev   : 개발자 계정(설정 '개발자계정')일 때만 메뉴에 보임 = 공개 전 (주소로는 열림). 공개할 때 지움
 *   admin : 운영진까지 보임
 *   beta  : 테스트 사이트에서만 보임 (운영 사이트 /jammanbo/ 에서는 숨김) — 운영에 공개할 때 지움
 *   ext   : 외부 사이트 (새 창 ↗)   home:false : 홈 카드에는 안 보임   isNew : 'NEW' 표시 (YYYY-MM-DD 까지)
 *   ?reset: 예전 서비스 워커(미니게임 폴더를 모르는 버전)를 거치지 않고 열기 — 각 게임 화면이 주소에서 지움
 */
window.JMB_GAME_LIST = function (ROOT) {
  var PROD = /^\/jammanbo\/$/.test(ROOT);
  // 홈 카드 · 메뉴 · 오락실 아이콘: 단색 선(currentColor) 아이콘 — 이모지는 기기마다 모양이 달라 광택 그림으로 보이던 것. 색은 CSS(.jmb-gi)가 정함
  var P = {
    arcade: '<circle cx="12" cy="6.5" r="2.5"/><path d="M12 9v6"/><rect x="5" y="15" width="14" height="5" rx="2"/>',
    tichu: '<rect x="4.5" y="4" width="11" height="16" rx="2"/><path d="M15.5 7.4l3.2.9a1.5 1.5 0 0 1 1 1.9L18 18.4"/>',
    mighty: '<path d="M12 3c3 3.5 7 5.8 7 9.6a3.6 3.6 0 0 1-6.2 2.5c.1 1.8.7 3.1 1.7 4.4H9.5c1-1.3 1.6-2.6 1.7-4.4A3.6 3.6 0 0 1 5 12.6C5 8.8 9 6.5 12 3z"/>',
    semantle: '<path d="M5 6h14M12 6v12M9 18h6"/>',
    kodle: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    quiz: '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/>',
    rogue: '<rect x="4" y="4" width="16" height="16" rx="3.5"/><circle cx="9" cy="9" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="9" r="1.1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none"/><circle cx="9" cy="15" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="15" r="1.1" fill="currentColor" stroke="none"/>',
    jumprope: '<path d="M5 20V9a7 7 0 0 1 14 0v11"/><circle cx="5" cy="20" r="1.3"/><circle cx="19" cy="20" r="1.3"/>',
    bingo: '<rect x="4" y="4" width="16" height="16" rx="2.5"/><path d="M4 9.3h16M4 14.7h16M9.3 4v16M14.7 4v16"/>',
    mafia: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
    forest: '<path d="M12 3l6 8h-3.5l4 6H5.5l4-6H6l6-8z"/><path d="M12 17v4"/>',
    roulette: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.5"/><path d="M12 4v5.5M12 14.5V20M4 12h5.5M14.5 12H20"/>',
    toolbox: '<rect x="3.5" y="8" width="17" height="11" rx="2"/><path d="M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8M3.5 13h17"/>',
    timer: '<circle cx="12" cy="13.5" r="7"/><path d="M12 13.5V9.5M9.5 3.5h5M12 3.5v3"/>',
    sound: '<path d="M4 10v4h4l5 4V6L8 10H4z"/><path d="M16.5 9a4 4 0 0 1 0 6M19 6.5a7.5 7.5 0 0 1 0 11"/>',
    aging: '<rect x="3" y="7.5" width="18" height="10" rx="5"/><path d="M8 10.5v4M6 12.5h4"/><circle cx="15.5" cy="11.5" r=".9" fill="currentColor"/><circle cx="17.5" cy="13.5" r=".9" fill="currentColor"/>',
    map: '<path d="M12 21s6.5-6 6.5-11a6.5 6.5 0 0 0-13 0c0 5 6.5 11 6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
    defense: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"/>',
    tangzzol: '<rect x="6" y="3.5" width="12" height="17" rx="1.5"/><circle cx="14.5" cy="12" r=".9" fill="currentColor"/>'
  };
  function gi(id) { return P[id] ? '<svg class="jmb-gi" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + P[id] + '</svg>' : ''; }
  var L = [
    // 오락실: 모든 미니게임 · 내 기록 · 모임 랭킹을 한 화면에 (hub: 게임이 아니라 모아 보는 곳)
    { id: 'arcade', hub: true, beta: true, href: ROOT + 'arcade/?reset', emoji: '🕹️', name: '오락실', desc: '미니게임 전체 · 내 기록 · 이번 주 모임 랭킹', bg: 'linear-gradient(135deg,#edf1ff,#dbe4ff)', bgDark: 'linear-gradient(135deg,#1f2747,#27325c)' },
    { id: 'tichu', cat: 'card', href: ROOT + 'tichu/?reset', emoji: '🃏', name: '티츄', desc: '2 대 2 카드게임 · AI 연습', bg: 'linear-gradient(135deg,#fff4e6,#ffe8cc)', bgDark: 'linear-gradient(135deg,#3a2a12,#4a3315)' },
    { id: 'mighty', cat: 'card', isNew: '2026-12-31', href: ROOT + 'mighty/?reset', emoji: '♠️', name: '마이티', desc: '5인 트릭테이킹 · AI 4명과 연습', bg: 'linear-gradient(135deg,#e7f5ff,#d0ebff)', bgDark: 'linear-gradient(135deg,#12283d,#173450)' },
    { id: 'semantle', cat: 'brain', href: ROOT + 'semantle/?reset', emoji: '🔤', name: '꼬맨틀', desc: '매일 하나, 뜻이 가까운 단어로 찾는 비밀 단어 · 모임 순위', bg: 'linear-gradient(135deg,#fff0f6,#fcc2d7)', bgDark: 'linear-gradient(135deg,#3d1528,#4f1c34)' },
    { id: 'kodle', cat: 'brain', beta: true, isNew: '2026-12-31', href: ROOT + 'kodle/?reset', emoji: '🟩', name: '꼬들', desc: '매일 하나, 두 글자 단어를 자모 색깔로 맞히기 · 6번 기회', bg: 'linear-gradient(135deg,#ebfbee,#b2f2bb)', bgDark: 'linear-gradient(135deg,#12301f,#1b4a2c)' },
    { id: 'quiz', cat: 'brain', beta: true, isNew: '2026-12-31', href: ROOT + 'quiz/?reset', emoji: '🔍', name: '보드게임 확대 퀴즈', desc: '사진 한 조각만 보고 어떤 보드게임인지 맞히기', bg: 'linear-gradient(135deg,#fff4e6,#ffd8a8)', bgDark: 'linear-gradient(135deg,#3a2a12,#4d3716)' },
    { id: 'rogue', cat: 'brain', beta: true, isNew: '2026-12-31', href: ROOT + 'rogue/?reset', emoji: '🎲', name: '잠만보 던전', desc: '주사위 로그라이크 · 한 판 10분', bg: 'linear-gradient(135deg,#f3f0ff,#e5dbff)', bgDark: 'linear-gradient(135deg,#2a1f47,#36295e)' },
    { id: 'jumprope', cat: 'action', beta: true, isNew: '2026-12-31', href: ROOT + 'jumprope/?reset', emoji: '🪢', name: '단체 줄넘기', desc: '타이밍 점프 · 혼자 또는 한 기기로 여럿이', bg: 'linear-gradient(135deg,#ecfdf3,#d3f9d8)', bgDark: 'linear-gradient(135deg,#12301f,#17402a)' },
    { id: 'bingo', cat: 'party', beta: true, isNew: '2026-12-31', href: ROOT + 'bingo/?reset', emoji: '🎱', name: '빙고', desc: '모임 빙고 · AI 대결 · 주제 빙고', bg: 'linear-gradient(135deg,#fff9db,#ffec99)', bgDark: 'linear-gradient(135deg,#3b3010,#4a3c12)' },
    { id: 'mafia', cat: 'party', beta: true, isNew: '2026-12-31', href: ROOT + 'mafia/?reset', emoji: '🌙', name: '마피아 나레이터', desc: '마피아 · 세일럼 1692 밤 진행 음성 안내 · 초보자용 · 숙련자용', bg: 'linear-gradient(135deg,#edf1ff,#dbe4ff)', bgDark: 'linear-gradient(135deg,#1a2050,#232b66)' },
    { id: 'forest', cat: 'party', soon: '곧 출시예정', beta: true, isNew: '2026-12-31', href: ROOT + 'forest/?reset', emoji: '🌳', icon: '<svg width="26" height="26" viewBox="0 0 24 24" fill="#4f9a4a" stroke="#1d3a22" stroke-width="2" stroke-linejoin="miter" aria-hidden="true"><path d="M12 2.5l6.5 8.5H15l4.5 6.5H4.5L9 11H5.5zM10.5 17.5h3v4h-3z"/></svg>', name: '아르케온', desc: '근원 원소, 고대 문명 · 함께 걷고 모으고 짓는 월드', bg: 'linear-gradient(135deg,#e8f7e4,#d3eccc)', bgDark: 'linear-gradient(135deg,#17301e,#1f4028)' },
    { id: 'roulette', cat: 'party', href: ROOT + 'roulette/?reset', emoji: '🎯', name: '순서 룰렛', desc: '구슬로 순서 · 당첨자 정하기', bg: 'linear-gradient(135deg,#e7f5ff,#dbe4ff)', bgDark: 'linear-gradient(135deg,#142447,#1d2f5e)' },
    { id: 'toolbox', cat: 'tool', beta: true, isNew: '2026-12-31', href: ROOT + 'toolbox/?reset', emoji: '🧰', name: '모임 도구함', desc: '점수판 · 주사위 · 동전 · 팀 나누기 · 순서', bg: 'linear-gradient(135deg,#e6fcf5,#c3fae8)', bgDark: 'linear-gradient(135deg,#0f2f27,#134235)' },
    { id: 'timer', cat: 'tool', href: ROOT + 'timer/?reset', emoji: '⏱️', name: '타이머', desc: '체스 클락 · 턴 타이머 · 모래시계', bg: 'linear-gradient(135deg,#fff0f6,#ffdeeb)', bgDark: 'linear-gradient(135deg,#3d1528,#4f1c34)' },
    { id: 'sound', cat: 'tool', dev: true, href: ROOT + 'sound/?reset', emoji: '🔊', name: '사운드보드', desc: '대회 · 머더미스터리 · 할로윈 BGM · 효과음', bg: 'linear-gradient(135deg,#fff9db,#ffec99)', bgDark: 'linear-gradient(135deg,#3b3010,#4a3c12)' },
    { id: 'aging', cat: 'action', dev: true, href: ROOT + 'aging/?reset', emoji: '🕹️', name: '에이징 커브 검사', desc: '미니게임으로 재는 게임 피지컬 나이 · 주 1회 기록', bg: 'linear-gradient(135deg,#fff4e6,#ffd8a8)', bgDark: 'linear-gradient(135deg,#3a2a12,#4a3315)' },
    { id: 'map', cat: 'tool', href: ROOT + 'map/?reset', emoji: '📍', name: '장소 지도', desc: '모임 장소 · 맛집 지도', bg: 'linear-gradient(135deg,#e6fcf5,#c3fae8)', bgDark: 'linear-gradient(135deg,#0f2f27,#134235)' },
    // 아르마니여름 디펜스 — 별도 사이트(GitHub Pages 저장소 jammanbo-defense). 카카오 로그인은 같은 출처 저장소(localStorage)를 게임이 읽어 서버에서 전용 입장권으로 바꿔 씀. 운영 사이트가 아니면 ?env=beta 로 게임이 테스트 서버를 씀
    { id: 'defense', cat: 'action', ext: true, dev: true, beta: true, href: 'https://dlwjdskfcl.github.io/jammanbo-defense/' + (PROD ? '' : '?env=beta'), emoji: '🐾', name: '아르마니여름 디펜스', desc: '랜덤 타워디펜스 · 내 기록 · 랭킹', bg: 'linear-gradient(135deg,#ecfdf3,#d3f9d8)', bgDark: 'linear-gradient(135deg,#12301f,#17402a)' },
    // 외부 사이트 — 결과는 앱의 '내 기록 > 방탈출 탱쫄'에서 기록
    { id: 'tangzzol', cat: 'party', ext: true, home: false, href: 'https://bangpot-tangzzol-test.vercel.app/test/tangzzol', emoji: '🚪', name: '방탈출 탱쫄 판별기', desc: '나는 탱일까 쫄일까? 20종 유형 테스트', bg: 'linear-gradient(135deg,#f3f0ff,#e5dbff)', bgDark: 'linear-gradient(135deg,#2a1f47,#36295e)' }
  ];
  // 아이콘이 있는 게임은 선 아이콘 + 중립 배경(파스텔 그라데이션 대신). 이모지는 아이콘이 없는 게임의 대비책으로 남김
  L.forEach(function (g) { var s = gi(g.id); if (s) { g.icon = s; g.bg = 'var(--surface2,#f2f4f7)'; g.bgDark = 'var(--surface2,#21252d)'; } });
  return L;
};
window.JMB_GAME_CATS = [
  { id: 'card', name: '카드 · 보드', emoji: '🃏' },
  { id: 'brain', name: '두뇌 · 퍼즐', emoji: '🧠' },
  { id: 'action', name: '손맛 · 액션', emoji: '⚡' },
  { id: 'party', name: '모임에서', emoji: '🎉' },
  { id: 'tool', name: '도구', emoji: '🧰' }
];
