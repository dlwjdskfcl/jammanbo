/* 잠만보 설정 — 배포할 때 이 파일만 고치면 됩니다. (비밀 값은 여기 넣지 마세요: Client Secret · SESSION_SECRET 은 Apps Script 스크립트 속성에만) */
window.JMB_CONFIG = {
  version: '1.0.0',

  /* 기존 앱(화면 코드·데이터)을 제공하는 Apps Script 웹앱 */
  api: 'https://script.google.com/macros/s/AKfycbxFkPB3WlcHsXp0v36g64Bsbeh-KpGcn5oNuTAFQX_57z7yUZRkBU7OK4g3X-HsJGqr/exec',

  /* 카카오 로그인용 Apps Script 웹앱 (apps-script/Auth.gs 배포 주소) — 비워 두면 로그인 기능이 꺼지고 앱은 예전처럼 동작 */
  kakaoApi: 'https://script.google.com/macros/s/AKfycbwBfIK9qZHG6IEsfWRvbRQiq7F1_9TBS0WOtOL0NouJ2cHfn24-hfhAwVgj03BOmDn8/exec',

  /* 카카오 REST API 키 (공개되어도 안전한 값: 등록한 Redirect URI 에서만 동작) */
  kakaoRestKey: '3b96a1e29cf354319dfc02ac4ffd77b7'
};
