// 포트폴리오 내용 — 메인 페이지와 designs/ 시안이 함께 씁니다.
// Perdume 의 실제 작업 (GitHub Perdume, 로컬 Projects 폴더 기준)
export const me = {
  name: 'Perdume',
  latin: 'Perdume',
  line: '마인크래프트 서버의 안쪽을 만듭니다. 플러그인부터 패킷, 바이트코드, 서버 엔진까지.',
  intro:
    'Paper 플러그인으로 RPG와 PvP 미니게임을 만들고, 그걸 받치는 서버 내부 도구를 직접 짭니다. 버전마다 바뀌는 NMS를 감싸는 API, 명령 처리 과정을 바이트코드로 고치는 에이전트, Rust로 다시 쓰는 서버까지 다룹니다.',
  tools: ['Kotlin', 'Java', 'Paper API', 'Fabric', 'Netty', 'Byte Buddy', 'Rust', 'Next.js'],
  email: 'you@example.com', // TODO: 공개할 연락처로 교체
  links: [
    { label: 'GitHub', href: 'https://github.com/Perdume' },
    { label: '이메일', href: 'mailto:you@example.com' },
  ],
}

// 최신 작업이 위로. link 가 없으면 비공개 저장소.
// map: 시안 B(구조도)에서 켜질 노드와 연결
// changes: 시안 C(릴리스 노트)의 주요 내용. type: add | fix | perf
export const works = [
  {
    year: 2026,
    title: 'P-RPG',
    kind: 'RPG 서버 플러그인',
    version: '알파 테스트',
    blurb:
      'Paper 26.2와 Kotlin으로 만든 RPG. 개인 섬, 사냥터, 마법, 낚시, 시련의 탑, 듀오 보스 레이드까지 한 플러그인에 담았고, 플레이어용 웹 가이드와 운영자용 관리 화면, 디스코드 봇을 함께 만들었습니다.',
    tools: ['Kotlin', 'Paper 26.2', 'Next.js', 'MySQL'],
    metric: { label: 'Kotlin 코드', value: '8.2만 줄' },
    map: { nodes: ['paper', 'plugins', 'web'], edges: ['paper-plugins', 'plugins-web'] },
    changes: [
      { type: 'add', text: '시련의 탑: 3구간 × 5층, 최대 15층' },
      { type: 'add', text: '웹 가이드에서 서버 현황, 랭킹, 경매장을 5분 캐시로 표시' },
      { type: 'add', text: '운영자 PC 전용 관리 화면: 서비스 5개 상태를 SSH로 확인' },
    ],
  },
  {
    year: 2026,
    title: 'Bowshot',
    kind: '활 PvP 미니게임',
    version: '1.0-SNAPSHOT',
    blurb:
      '2~8명이 순위를 다투는 활 대전. 로비 안의 모든 두 사람을 1:1 승부로 나눠 계산하는 Elo 기반 MMR과, 기다릴수록 허용 범위가 넓어지는 매칭을 설계했습니다. 리플레이와 봇, 운영 도구 플러그인도 함께 만들었습니다.',
    tools: ['Java', 'Paper', 'ProtocolLib'],
    metric: { label: '한 판 인원', value: '2–8명' },
    map: { nodes: ['paper', 'plugins'], edges: ['paper-plugins'] },
    changes: [
      { type: 'add', text: '다자간 페어와이즈 Elo MMR, 설계 문서 5차 개정' },
      { type: 'add', text: 'MMR 범위를 초당 넓혀 가는 슬라이딩 윈도우 매칭' },
      { type: 'add', text: '경기 리플레이와 연습용 봇' },
    ],
  },
  {
    year: 2026,
    title: 'Custom-Bukkit',
    kind: 'Rust 서버 엔진',
    version: '0.2.1',
    blurb:
      '마인크래프트 26.3 서버를 Rust로 다시 짜는 프로젝트. Pumpkin 포크에서 출발해, 메모리 500MB로 묶은 컨테이너 안에서 돌아가는 것을 목표로 합니다. 지금은 P-RPG를 WASM 플러그인으로 올리는 시험 중입니다.',
    tools: ['Rust', 'WASM', 'Docker'],
    metric: { label: '목표 메모리 상한', value: '512MB' },
    map: { nodes: ['client', 'rust', 'plugins'], edges: ['client-rust', 'rust-plugins'] },
    changes: [
      { type: 'perf', text: '최고 메모리 사용량 512MB 미만을 통과 기준으로' },
      { type: 'add', text: '바로 접속해 플레이할 수 있는 서버 실행 스크립트' },
      { type: 'add', text: 'RPG를 WASM 플러그인으로 옮기는 시험판' },
    ],
  },
  {
    year: 2026,
    title: 'NMS-Packet Connector',
    kind: '플러그인용 공개 API',
    version: '개발 중',
    blurb:
      '다른 플러그인이 마인크래프트 버전과 상관없이 서버 내부 상태와 패킷을 다룰 수 있게 해 주는 API. 버전별 모듈과 공통 어댑터로 나눠서, 새 버전 추가가 작고 기계적인 작업이 되게 했습니다.',
    tools: ['Java', 'Netty', 'paperweight'],
    metric: { label: '구현된 버전 모듈', value: '2개' },
    map: { nodes: ['paper', 'internals', 'plugins'], edges: ['paper-internals', 'internals-plugins'] },
    changes: [
      { type: 'add', text: '1.20.5–1.20.6, 1.21.4 어댑터를 실제 서버 코드로 컴파일 검증' },
      { type: 'add', text: 'Netty 파이프라인 주입으로 패킷 가로채기' },
    ],
  },
  {
    year: 2026,
    title: 'WorldScope Agent',
    kind: '서버용 Java 에이전트',
    version: '0.1.1',
    blurb:
      'Paper의 명령 처리 과정을 바이트코드 수준에서 고쳐, 커맨드 블록이나 콘솔에서 실행한 명령이 자기가 속하지 않은 월드까지 건드리지 못하게 막습니다.',
    tools: ['Java', 'Byte Buddy'],
    metric: { label: '막는 명령 출처', value: '3종' },
    map: { nodes: ['paper', 'internals'], edges: ['paper-internals'] },
    changes: [
      { type: 'fix', text: '위치 조건 없는 @e 선택자가 모든 월드를 뒤지는 동작 차단' },
      { type: 'add', text: '커맨드 블록, 콘솔, 플레이어 명령 각각에 적용' },
    ],
    link: { label: '코드 보기', href: 'https://github.com/Perdume/worldscope-agent' },
  },
  {
    year: 2026,
    title: 'Single Server',
    kind: 'Fabric 클라이언트 모드',
    version: '1.0.0',
    blurb:
      '싱글플레이 월드를 버튼 한 번으로 진짜 로컬 서버로 바꿔 띄우고 자동으로 접속합니다. Paper, Purpur, Fabric, 직접 만든 서버 jar까지 고를 수 있습니다.',
    tools: ['Java', 'Fabric'],
    metric: { label: '서버로 바꾸는 데', value: '클릭 1번' },
    map: { nodes: ['client', 'paper'], edges: ['client-paper'] },
    changes: [
      { type: 'add', text: '월드 선택 화면의 서버로 실행 버튼' },
      { type: 'add', text: '게임을 끄면 띄운 서버도 함께 종료' },
      { type: 'add', text: '서버 폴더를 창에 끌어다 놓으면 가져오기' },
    ],
    link: { label: '코드 보기', href: 'https://github.com/Perdume/single-server' },
  },
]

export const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

export const a = (l, cls = '') =>
  l
    ? `<a${cls ? ` class="${cls}"` : ''} href="${esc(l.href)}"${
        /^https?:/.test(l.href) ? ' target="_blank" rel="noopener"' : ''
      }>${esc(l.label)}</a>`
    : `<span class="private">비공개 저장소</span>`

export const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches
