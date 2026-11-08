import './releases.css'
import { me, works, esc, a } from '../data.js'

const SIGN = { add: ['+', '추가'], fix: ['×', '수정'], perf: ['↯', '성능'] }

document.getElementById('app').innerHTML = `
  <header class="hero">
    <h1>${esc(me.name)}</h1>
    <p class="line">${esc(me.line)}</p>
    <p class="intro">${esc(me.intro)}</p>
  </header>
  <main>
    <h2 class="sr">만든 것</h2>
    ${works
      .map(
        (w) => `
      <article class="rel">
        ${(() => {
          const num = w.version.match(/^\d+(\.\d+)*/)
          return num
            ? `<p class="ver" aria-hidden="true">${esc(num[0])}</p>`
            : `<p class="ver word" aria-hidden="true">${esc(w.version)}</p>`
        })()}
        <div class="body">
          <h3>${esc(w.title)} <span class="vv">${/^\d/.test(w.version) ? `v${esc(w.version)}` : esc(w.version)}</span></h3>
          <p class="kind">${esc(w.kind)}, ${w.year}</p>
          <p class="blurb">${esc(w.blurb)}</p>
          <ul class="changes">
            ${w.changes
              .map((c) => `<li class="${c.type}"><span class="sg" aria-label="${SIGN[c.type][1]}">${SIGN[c.type][0]}</span>${esc(c.text)}</li>`)
              .join('')}
          </ul>
          <p class="foot-line"><span class="stack">${w.tools.map(esc).join(', ')}</span>${a(w.link)}</p>
        </div>
      </article>`,
      )
      .join('')}
  </main>
  <footer class="foot">
    <p class="legend"><span class="sg">+</span>추가 <span class="sg">×</span>수정 <span class="sg perf">↯</span>성능</p>
    <p>문의 <a href="mailto:${esc(me.email)}">${esc(me.email)}</a></p>
    <nav>${me.links.map((l) => a(l)).join('')}</nav>
  </footer>
`
