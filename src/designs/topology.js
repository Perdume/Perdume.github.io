import './topology.css'
import { me, works, esc, a } from '../data.js'

// 클라이언트부터 운영 도구까지, 작업들이 놓인 층 (viewBox 640 x 560)
const nodes = {
  client: { x: 320, y: 40, w: 200, label: '클라이언트', sub: 'Fabric 모드' },
  paper: { x: 160, y: 160, w: 200, label: 'Paper 서버', sub: 'Java, 26.x' },
  rust: { x: 480, y: 160, w: 200, label: 'Rust 서버', sub: '직접 작성 중' },
  internals: { x: 140, y: 290, w: 200, label: '서버 내부', sub: 'NMS, 패킷, 바이트코드' },
  plugins: { x: 400, y: 400, w: 200, label: '게임 플러그인', sub: 'Kotlin, Java, WASM', stack: 2 },
  web: { x: 400, y: 510, w: 220, label: '웹과 운영 도구', sub: '웹 가이드, 관리 화면, 봇' },
}
const edges = [
  ['client', 'paper'], ['client', 'rust'], ['paper', 'internals'], ['paper', 'plugins'],
  ['internals', 'plugins'], ['rust', 'plugins'], ['plugins', 'web'],
]
const H = 52

const svg = `
<svg class="map" viewBox="0 0 640 560" role="img" aria-label="클라이언트, Paper 서버와 Rust 서버, 서버 내부, 게임 플러그인, 웹과 운영 도구로 이어지는 구조도">
  ${edges
    .map(([f, t]) => {
      const A = nodes[f], B = nodes[t]
      return `<line class="wire" data-e="${f}-${t}" x1="${A.x}" y1="${A.y + H / 2}" x2="${B.x}" y2="${B.y - H / 2}"/>`
    })
    .join('')}
  ${Object.entries(nodes)
    .map(([id, n]) => {
      const x = n.x - n.w / 2, y = n.y - H / 2
      const back = Array.from({ length: (n.stack || 1) - 1 }, (_, i) =>
        `<rect class="box back" x="${x + (i + 1) * 6}" y="${y - (i + 1) * 6}" width="${n.w}" height="${H}"/>`).reverse().join('')
      return `<g class="node" data-n="${id}">${back}
        <rect class="box" x="${x}" y="${y}" width="${n.w}" height="${H}"/>
        <text class="nl" x="${x + 14}" y="${n.y - 2}">${esc(n.label)}</text>
        <text class="ns" x="${x + 14}" y="${n.y + 16}">${esc(n.sub)}</text>
      </g>`
    })
    .join('')}
</svg>`

document.getElementById('app').innerHTML = `
  <header class="top">
    <h1>${esc(me.name)}</h1>
    <p>${esc(me.line)}</p>
  </header>
  <main class="stage">
    <div class="side">
      <h2 class="lh">만든 것</h2>
      <ul class="picks">
        ${works.map((w, i) => `<li><button type="button" class="pick" data-i="${i}" aria-pressed="false"><span class="pt">${esc(w.title)}</span><span class="pk">${esc(w.kind)}</span></button></li>`).join('')}
      </ul>
      <article class="detail" aria-live="polite"></article>
    </div>
    <figure class="diagram">${svg}<figcaption>작업을 고르면 그 작업이 맡은 부분이 표시됩니다.</figcaption></figure>
  </main>
  <section class="about">
    <p>${esc(me.intro)}</p>
    <p class="stack">${me.tools.map(esc).join(', ')}</p>
  </section>
  <footer class="foot">
    <p>문의 <a href="mailto:${esc(me.email)}">${esc(me.email)}</a></p>
    <nav>${me.links.map((l) => a(l)).join('')}</nav>
  </footer>
`

const picks = [...document.querySelectorAll('.pick')]
const detail = document.querySelector('.detail')

function select(i) {
  const w = works[i]
  const p = w.map || { nodes: [], edges: [] }
  picks.forEach((b, j) => b.setAttribute('aria-pressed', String(j === i)))
  document.querySelectorAll('.node').forEach((n) => n.classList.toggle('on', p.nodes.includes(n.dataset.n)))
  document.querySelectorAll('.wire').forEach((e) => e.classList.toggle('on', p.edges.includes(e.dataset.e)))
  detail.innerHTML = `
    <p class="dm"><span class="v">${esc(w.metric.value)}</span> ${esc(w.metric.label)}</p>
    <p>${esc(w.blurb)}</p>
    <p class="stack">${w.tools.map(esc).join(', ')}</p>
    ${a(w.link)}`
}

picks.forEach((b, i) => b.addEventListener('click', () => select(i)))
select(0)
