/* 잠만보 설정 — 배포할 때 이 파일만 고치면 됩니다. (비밀 값은 여기 넣지 마세요: Client Secret · SESSION_SECRET 은 Apps Script 스크립트 속성에만) */
window.JMB_CONFIG = {
  version: '1.2.0',   // 바꾸면 auth.js/auth.css 캐시가 새로 받아짐

  /* v1.2: 앱 화면·데이터·카카오 로그인 모두 "잠만보" Apps Script 하나(src/잠만보.gscript)에서 제공 → 두 주소가 같음 */
  api: 'https://script.google.com/macros/s/AKfycbwvE4TAy7rTGJe2FPIHh-norBPsZ_7oY5Cb8tQKEd53hDhXaUIVF4MGPL6Tb4pdEFFN/exec',
  kakaoApi: 'https://script.google.com/macros/s/AKfycbwvE4TAy7rTGJe2FPIHh-norBPsZ_7oY5Cb8tQKEd53hDhXaUIVF4MGPL6Tb4pdEFFN/exec',

  /* 카카오 REST API 키 (공개되어도 안전한 값: 등록한 Redirect URI 에서만 동작) */
  kakaoRestKey: '3b96a1e29cf354319dfc02ac4ffd77b7'
};
