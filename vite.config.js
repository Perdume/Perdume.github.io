import { defineConfig } from 'vite'

// 배포 대상: GitHub Pages 사용자 사이트(https://perdume.github.io) — 루트 경로라 base 는 '/'.
// designs/ 의 시안 페이지는 개발 서버(npm run dev)에서만 열리고 빌드에는 들어가지 않습니다.
export default defineConfig({
  base: '/',
})
