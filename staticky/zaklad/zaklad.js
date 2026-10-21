/* ZÁKLAD webu easycheck.sk — spoločná hlavička, topbar a päta pre podstránky (z uvod-v13.html, 21. 10. 2026).
   Stránka má na začiatku <div id="z-hore"></div> a na konci <div id="z-pata"></div>; zvyšok doplní tento skript.
   Fakty (hodiny, telefóny, adresa) = tie isté ako na úvode. Pri prenose do Astra → komponenty Hlavicka/Pata. */
(() => {
const $ = id => document.getElementById(id);
const MENU = [ ['/rezervacia/','Rezervácie'], ['/sluzby/','Služby'], ['/cennik/','Cenník'], ['/clanky/','Blog'], ['/#kontakt','Kontakt'] ];
const cesta = location.pathname.replace(/index\.html$/, '');
const akt = h => h.includes('#') ? '' : (cesta === h || (h !== '/' && cesta.startsWith(h)) || (h === '/clanky/' && cesta.startsWith('/blog/'))) ? ' aria-current="page"' : '';
const odkazy = MENU.map(([h,t]) => `<a href="${h}"${akt(h)}>${t}</a>`).join('');
const SIP = '<svg class="sip" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4"/></svg>';

$('z-hore').outerHTML = `
  <div class="pas bez" aria-label="Otváracie hodiny a kontakt"><div class="pas-in" id="pas"></div></div>
  <header class="hl">
    <svg class="hl-tvar" aria-hidden="true"><path class="tien"/><path class="plast"/></svg>
    <a class="logo" href="/" aria-label="Easy Check — domov"><img src="/easycheck-logo.svg" alt="Easy Check STK"></a>
    <nav aria-label="Hlavné menu">${odkazy}</nav>
    <details class="jazyk"><summary aria-label="Jazyk: slovenčina — zmeniť"><span id="vlajka-akt"></span>${SIP}</summary><ul id="jazyky"></ul></details>
    <a class="tel" href="tel:+421332020211">033 20 20 211</a>
    <details class="menu">
      <summary aria-label="Menu"><span class="ham" aria-hidden="true"><i></i><i></i><i></i></span></summary>
      <div class="menu-panel">
        ${odkazy}
        <a class="m-tel" href="tel:+421332020211">033 20 20 211</a>
        <details><summary><span id="vlajka-menu"></span>Slovenčina${SIP}</summary><ul id="jazyky-menu"></ul></details>
      </div>
    </details>
  </header>`;

const zp = $('z-pata');
if(zp) zp.outerHTML = `
<footer class="pata">
  <div class="pata-in ani" id="pata-in">
    <div class="pk pk-kont">
      <img class="pk-symbol" src="/ikony/easycheck-symbol.svg" alt="" aria-hidden="true">
      <h4>Kontakt</h4>
      <a class="velke" href="tel:+421332020211">033 20 20 211</a>
      <a class="velke m" href="tel:+421908731178">0908 731 178 <small>mobil</small></a>
      <a href="mailto:stk@easycheck.sk">stk@easycheck.sk</a>
      <span>Technická ulica, Trnava<br>smer Dolná Krupá</span>
      <div class="soc">
        <a href="https://www.facebook.com/easycheckstk" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21z"/></svg></a>
        <a href="https://www.instagram.com/easycheck_tt/" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM12 4.6c2.4 0 2.7 0 3.6.1 2.4.1 3.5 1.2 3.6 3.6.1.9.1 1.2.1 3.6s0 2.7-.1 3.6c-.1 2.4-1.2 3.5-3.6 3.6-.9.1-1.2.1-3.6.1s-2.7 0-3.6-.1c-2.4-.1-3.5-1.2-3.6-3.6-.1-.9-.1-1.2-.1-3.6s0-2.7.1-3.6C4.9 5.9 6 4.8 8.4 4.7c.9-.1 1.2-.1 3.6-.1zM12 3c-2.4 0-2.8 0-3.7.1C5 3.2 3.2 5 3.1 8.3 3 9.2 3 9.6 3 12s0 2.8.1 3.7c.1 3.3 1.9 5.1 5.2 5.2.9.1 1.3.1 3.7.1s2.8 0 3.7-.1c3.3-.1 5.1-1.9 5.2-5.2.1-.9.1-1.3.1-3.7s0-2.8-.1-3.7c-.1-3.3-1.9-5.1-5.2-5.2C14.8 3 14.4 3 12 3z"/></svg></a>
        <a href="https://www.youtube.com/@easycheck-stktrnava3471" aria-label="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3z"/></svg></a>
      </div>
    </div>
    <div class="pk">
      <h4>Hodiny</h4>
      <ul class="ph">
        <li><span>Po – Pia</span><b>07:00 – 20:00</b></li>
        <li><span>Sobota</span><b>07:00 – 13:00</b></li>
        <li><span>Sviatky</span><b>07:00 – 15:00</b></li>
        <li><span>Nedeľa</span><b>zatvorené</b></li>
      </ul>
    </div>
    <div class="pk pcta">
      <h4>Rýchle odkazy</h4>
      <a class="btn" href="/rezervacia/">Rezervovať termín <span aria-hidden="true">→</span></a>
      <a class="gbtn" href="https://g.page/EASYCheckStkEkKo/review?rc" target="_blank" rel="noopener"><svg class="glogo gb-g" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg><span>Pridať Google hodnotenie</span></a>
      <!-- súbory zo súčasného easycheck.sk (wp-content/uploads/2026/10) — pri prechode presunúť na nový web -->
      <a class="stiah" href="https://easycheck.sk/wp-content/uploads/2026/10/Splnomocnenie-fyzicka-osoba102026.docx" download><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0l-5-5m5 5l5-5M4 20h16" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Splnomocnenie<small>fyzická osoba · DOCX</small></span></a>
      <a class="stiah" href="https://easycheck.sk/wp-content/uploads/2026/10/Generalne-plnomocenstvo-spolocnost102026.docx" download><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0l-5-5m5 5l5-5M4 20h16" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Splnomocnenie<small>spoločnosť · DOCX</small></span></a>
    </div>
    <div class="pata-spod">
      <span>© <span id="rok"></span> Easy Check, s.r.o. · IČO 44 466 587 <i>/</i> Global Partner Service s.r.o. · IČO 50 267 361</span>
      <nav aria-label="Právne informácie"><a href="/ochrana-osobnych-udajov/">Ochrana osobných údajov (GDPR)</a><a href="/ochrana-osobnych-udajov/#cookies" class="tbd2">Cookies</a></nav>
    </div>
  </div>
  <!-- obrovské logo dole, odseknuté v polovici „STK“ (vzor birne.sk) -->
  <div class="pata-logo ani" aria-hidden="true"><img src="/easycheck-logo.svg" alt=""></div>
</footer>
`;

/* ---------- TOPBAR (rovnaký ako na úvode) ---------- */
const HOD = {1:[7,20],2:[7,20],3:[7,20],4:[7,20],5:[7,20],6:[7,13],0:null};
const DNI = ['nedeľu','pondelok','utorok','stredu','štvrtok','piatok','sobotu'];
function stav(){
  const d = new Date(), den = d.getDay(), h = d.getHours() + d.getMinutes()/60, dnes = HOD[den];
  if(dnes && h >= dnes[0] && h < dnes[1]) return `<span><i class="bod"></i>Teraz otvorené <span class="dim">· do ${dnes[1]}:00 ·</span> <span class="y tbd">voľná linka</span></span>`;
  if(dnes && h < dnes[0]) return `<span><i class="bod zat"></i>Zatvorené <span class="dim">· otvárame o 07:00</span></span>`;
  let n = (den + 1) % 7; while(!HOD[n]) n = (n + 1) % 7;
  return `<span><i class="bod zat"></i>Zatvorené <span class="dim">· otvárame ${n === (den+1)%7 ? 'zajtra' : 'v ' + DNI[n]} 07:00</span></span>`;
}
window.ecStav = stav;
$('pas').innerHTML = stav() + `
  <span>Po – Pia 07 – 20 <span class="dim">·</span> So 07 – 13 <span class="dim">·</span> Sviatky 07 – 15</span>
  <a class="pp" href="/#kontakt">Víkendy aj sviatky</a>
  <a class="pp" href="/rezervacia/">Termín bez čakania</a>
  <a href="https://www.google.com/maps?cid=161974492916168468">Technická ulica, Trnava <span class="dim">· smer Dolná Krupá</span> <span class="y">→</span></a>
  <span><a href="tel:+421908731178">0908 731 178</a><span class="dim">·</span><a href="mailto:stk@easycheck.sk">stk@easycheck.sk</a></span>`;
const kopia = [...$('pas').children].map(e => e.outerHTML.replace(/^<(\w+)/, '<$1 aria-hidden="true"')).join('');
$('pas').insertAdjacentHTML('beforeend', kopia);
$('pas').querySelectorAll('[aria-hidden] a, a[aria-hidden]').forEach(a => a.tabIndex = -1);

/* ---------- JAZYKY ---------- */
const VLAJKY = {
  sk:'<rect width="30" height="20" fill="#fff"/><rect y="6.67" width="30" height="6.67" fill="#0B4EA2"/><rect y="13.33" width="30" height="6.67" fill="#EE1C25"/><path d="M5.5 4.5h9v6.2c0 3-2.2 4.6-4.5 5.6-2.3-1-4.5-2.6-4.5-5.6z" fill="#EE1C25" stroke="#fff" stroke-width=".9"/><path d="M10 6v7.4M7.8 8h4.4M8.4 10.2h3.2" stroke="#fff" stroke-width="1.1"/><path d="M6.6 13c1-1 2.2-1 3.4 0 1.2-1 2.4-1 3.4 0v.6c-.9 1.2-2 1.9-3.4 2.4-1.4-.5-2.5-1.2-3.4-2.4z" fill="#0B4EA2"/>',
  cz:'<rect width="30" height="10" fill="#fff"/><rect y="10" width="30" height="10" fill="#D7141A"/><path d="M0 0l15 10L0 20z" fill="#11457E"/>',
  pl:'<rect width="30" height="10" fill="#fff"/><rect y="10" width="30" height="10" fill="#DC143C"/>',
  hu:'<rect width="30" height="6.67" fill="#CD2A3E"/><rect y="6.67" width="30" height="6.67" fill="#fff"/><rect y="13.33" width="30" height="6.67" fill="#436F4D"/>',
  de:'<rect width="30" height="6.67" fill="#000"/><rect y="6.67" width="30" height="6.67" fill="#DD0000"/><rect y="13.33" width="30" height="6.67" fill="#FFCE00"/>',
  es:'<rect width="30" height="20" fill="#AA151B"/><rect y="5" width="30" height="10" fill="#F1BF00"/>',
  ua:'<rect width="30" height="10" fill="#0057B7"/><rect y="10" width="30" height="10" fill="#FFD700"/>',
  gb:'<rect width="30" height="20" fill="#012169"/><path d="M0 0l30 20M30 0L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0l30 20M30 0L0 20" stroke="#C8102E" stroke-width="1.5"/><path d="M15 0v20M0 10h30" stroke="#fff" stroke-width="6"/><path d="M15 0v20M0 10h30" stroke="#C8102E" stroke-width="3.4"/>',
};
const JAZYKY = [
  ['sk','Slovenčina','SK'], ['cz','Čeština','CZ'], ['pl','Polski','PL'], ['hu','Magyar','HU'],
  ['de','Deutsch','DE'], ['ua','Українська','UA'], ['gb','English','EN'], ['es','Español','ES'],
];
const vlajka = k => `<svg class="vlajka" viewBox="0 0 30 20" aria-hidden="true">${VLAJKY[k]}</svg>`;
$('vlajka-akt').outerHTML = vlajka('sk');
const jazykyLi = JAZYKY.map(([k,n,c]) => `<li><a href="#" lang="${c.toLowerCase()}" class="${k==='sk'?'akt':''}">${vlajka(k)}<span>${n}</span>${k==='sk'?`<small>${c}</small>`:''}</a></li>`).join('');
$('jazyky').innerHTML = $('jazyky-menu').innerHTML = jazykyLi;
const jz = document.querySelector('.jazyk'), mn = document.querySelector('.menu');
document.addEventListener('click', e => {
  if(jz.open && !jz.contains(e.target)) jz.open = false;
  if(mn.open && !mn.contains(e.target)) mn.open = false;
  if(mn.open && e.target.closest('.menu-panel a[href*="#"]')) mn.open = false;
});

/* ---------- TVAR HEADERU (žltý pás so zástavkou) ---------- */
const hl = document.querySelector('.hl'), tvar = hl.querySelector('.hl-tvar');
function kresli(){
  const cs = getComputedStyle(hl), px = n => parseFloat(cs.getPropertyValue(n));
  const w = hl.clientWidth, H = px('--hb'), T = px('--zt'), W = px('--zw'), S = px('--zs'), r = 16, k = 10, o = 1.5;
  const d = [
    `M${r},${o}`, `H${w-r}`, `Q${w-o},${o} ${w-o},${r}`, `V${H-r}`, `Q${w-o},${H-o} ${w-r},${H-o}`,
    `H${W+S+k}`, `Q${W+S},${H-o} ${W+S-k*.7},${H+k*.7}`,
    `L${W+k*.7},${H+T-k*.7-o}`, `Q${W},${H+T-o} ${W-k},${H+T-o}`,
    `H${r}`, `Q${o},${H+T-o} ${o},${H+T-r}`, `V${r}`, `Q${o},${o} ${r},${o}`, 'Z'
  ].join(' ');
  tvar.setAttribute('width', w + 8); tvar.setAttribute('height', H + T + 8);
  tvar.querySelector('.plast').setAttribute('d', d);
  const t = tvar.querySelector('.tien'); t.setAttribute('d', d); t.setAttribute('transform', 'translate(6 6)');
}
new ResizeObserver(kresli).observe(hl);
kresli();

/* ---------- PÄTA: rok + symbol v karte Kontakt ---------- */
if($('rok')) $('rok').textContent = new Date().getFullYear();
(() => {
  const k = document.querySelector('.pk-kont'), sym = k && k.querySelector('.pk-symbol');
  if(!sym) return;
  const VID = .805, POM = 870 / 960;
  const uprav = () => {
    const kr = k.getBoundingClientRect();
    let prava = 0;
    k.querySelectorAll(':scope > :not(.pk-symbol)').forEach(el => {
      const r = document.createRange(); r.selectNodeContents(el);
      prava = Math.max(prava, r.getBoundingClientRect().right - kr.left);
    });
    sym.style.height = Math.max(0, Math.min(kr.height * .8, (kr.width - prava - 10) / (VID * POM))) + 'px';
  };
  new ResizeObserver(uprav).observe(k);
  document.fonts?.ready.then(uprav);
})();

/* ---------- ODHALENIE PRI SCROLLOVANÍ (.ani → .vid), raz ---------- */
const io = new IntersectionObserver(zz => zz.forEach(z => {
  if(!z.isIntersecting) return;
  z.target.classList.add('vid'); io.unobserve(z.target);
}), { threshold:.15, rootMargin:'0px 0px -6% 0px' });
window.ecSleduj = el => io.observe(el);
const sleduj = () => document.querySelectorAll('.ani:not(.vid)').forEach(el => io.observe(el));
sleduj(); addEventListener('load', sleduj);

/* ---------- VYSVETLIVKY (.vysv) ---------- */
document.addEventListener('click', e => {
  const b = e.target.closest('.vysv button');
  document.querySelectorAll('.vysv.otv').forEach(v => { if(!b || v !== b.parentNode){ v.classList.remove('otv'); v.firstElementChild.setAttribute('aria-expanded', false); } });
  if(b){ const v = b.parentNode.classList.toggle('otv'); b.setAttribute('aria-expanded', v); }
});

/* ---------- KOTVY: zvýrazni aktuálnu sekciu ---------- */
const kotvy = [...document.querySelectorAll('.kotvy a[href^="#"]')];
if(kotvy.length){
  const ciele = kotvy.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const io2 = new IntersectionObserver(zz => zz.forEach(z => {
    if(!z.isIntersecting) return;
    kotvy.forEach(a => a.classList.toggle('akt', a.getAttribute('href') === '#' + z.target.id));
    const a = kotvy.find(a => a.classList.contains('akt')), c = a?.parentElement;
    if(c) c.scrollTo({ left:a.offsetLeft - c.clientWidth / 2 + a.offsetWidth / 2, behavior:'smooth' });
  }), { rootMargin:'-40% 0px -55% 0px' });
  ciele.forEach(c => io2.observe(c));
}
})();
