import './style.css'
import { me, works, esc, a, reduced } from './data.js'

document.getElementById('app').innerHTML = `
  <header class="hero">
    <div class="who">
      <h1>${esc(me.name)}</h1>
      <p class="line">${esc(me.line)}</p>
    </div>
    <figure class="monitor">
      <div class="readout" aria-live="off">
        <p><span class="num" id="mspt">0.0</span><span class="unit">ms</span><span class="cap">틱당 처리 시간</span></p>
        <p><span class="num" id="tps">20.0</span><span class="unit">TPS</span><span class="cap">초당 틱</span></p>
      </div>
      <canvas class="chart" aria-hidden="true"></canvas>
      <figcaption>서버는 1초에 20번, 틱마다 50ms 안에 모든 일을 끝내야 합니다. 막대 하나가 틱 하나, 선이 50ms 한계입니다. 그래프는 실제 측정값이 아닌 예시 움직임입니다.</figcaption>
    </figure>
  </header>
  <main>
    <section class="works" aria-labelledby="works-h">
      <h2 id="works-h">만든 것</h2>
      <table>
        <thead><tr><th scope="col">이름</th><th scope="col">하는 일</th><th scope="col" class="r">대표 수치</th></tr></thead>
        <tbody>
          ${works
            .map(
              (w) => `
            <tr>
              <th scope="row"><span class="t">${esc(w.title)}</span><span class="k">${esc(w.kind)}, ${w.year}</span></th>
              <td><p>${esc(w.blurb)}</p><p class="stack">${w.tools.map(esc).join(', ')}</p>${a(w.link)}</td>
              <td class="r"><span class="m">${esc(w.metric.value)}</span><span class="ml">${esc(w.metric.label)}</span></td>
            </tr>`,
            )
            .join('')}
        </tbody>
      </table>
    </section>
    <section class="about">
      <p>${esc(me.intro)}</p>
      <p class="stack">${me.tools.map(esc).join(', ')}</p>
    </section>
  </main>
  <footer class="foot">
    <p>플러그인 의뢰나 채용 문의는 <a href="mailto:${esc(me.email)}">${esc(me.email)}</a></p>
    <nav>${me.links.map((l) => a(l)).join('')}</nav>
  </footer>
`

// ---- 틱 모니터 ----
const cv = document.querySelector('.chart')
const g = cv.getContext('2d')
const css = getComputedStyle(document.documentElement)
const col = (n) => css.getPropertyValue(n).trim()
const BUDGET = 50, MAX = 60, N = 60 // 최근 3초
let ticks = Array.from({ length: N }, sample)
let W = 0, H = 0

function sample() {
  // 평소 8~13ms, 가끔 GC 같은 튐 22~31ms. 50ms는 넘지 않는다.
  return Math.random() < 0.05 ? 22 + Math.random() * 9 : 8 + Math.random() * 5
}

function size() {
  const dpr = Math.min(devicePixelRatio || 1, 2)
  W = cv.clientWidth; H = cv.clientHeight
  cv.width = W * dpr; cv.height = H * dpr
  g.setTransform(dpr, 0, 0, dpr, 0, 0)
  draw()
}

function draw() {
  const bar = col('--indigo'), spike = col('--slate'), rule = col('--rule'), alert = col('--alert')
  g.clearRect(0, 0, W, H)
  const y = (ms) => H - (ms / MAX) * H
  g.fillStyle = rule
  for (const ms of [10, 20, 30, 40]) g.fillRect(0, Math.round(y(ms)), W, 1)
  const step = W / N, bw = Math.max(2, step - 3)
  ticks.forEach((ms, i) => {
    g.fillStyle = ms > 20 ? spike : bar
    const top = y(ms)
    g.fillRect(i * step, top, bw, H - top)
  })
  g.fillStyle = alert
  g.fillRect(0, Math.round(y(BUDGET)), W, 2)
  g.font = `600 12px "Instrument Sans", Pretendard, sans-serif`
  g.fillText('50ms', 0, y(BUDGET) - 6)
  const recent = ticks.slice(-20)
  const avg = recent.reduce((s, v) => s + v, 0) / recent.length
  document.getElementById('mspt').textContent = avg.toFixed(1)
  document.getElementById('tps').textContent = Math.min(20, 1000 / Math.max(avg, BUDGET)).toFixed(1)
}

size()
addEventListener('resize', size)

if (!reduced()) {
  let on = true
  new IntersectionObserver(([e]) => (on = e.isIntersecting)).observe(cv)
  setInterval(() => {
    if (!on || document.hidden) return
    ticks.push(sample()); ticks.shift(); draw()
  }, 50)
}
