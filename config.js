/* 잠만보 설정 — 배포할 때 이 파일만 고치면 됩니다. (비밀 값은 여기 넣지 마세요: Client Secret · SESSION_SECRET 은 Apps Script 스크립트 속성에만) */

/* v1.3: 화면·데이터·카카오 로그인 모두 "잠만보_구글시트" 안의 스크립트 하나에서 제공 → 주소 하나
 * 아래 YOUR_DEPLOY_URL 을 새 배포의 웹 앱 URL(…/exec)로 바꾸세요. (바꾸기 전엔 앱이 열리지 않아요) */
//var JMB_API = 'https://script.google.com/macros/s/AKfycbwvE4TAy7rTGJe2FPIHh-norBPsZ_7oY5Cb8tQKEd53hDhXaUIVF4MGPL6Tb4pdEFFN/exec';
var JMB_API = 'https://jammanbo-api.dlwjdskfcl.workers.dev/';

window.JMB_CONFIG = {
  version: '1.3.0',   // 바꾸면 auth.js/auth.css 캐시가 새로 받아짐
  api: JMB_API,
  kakaoApi: JMB_API,
  /* 카카오 REST API 키 (공개되어도 안전한 값: 등록한 Redirect URI 에서만 동작) */
  kakaoRestKey: '3b96a1e29cf354319dfc02ac4ffd77b7'
};
