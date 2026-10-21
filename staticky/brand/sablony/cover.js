/* COVER — vykreslenie obrázka pre blog / sociálne siete (Soft Slab). Používa manuál /brand/ aj sablony/cover.html.
   ecCover(el, { nadpis, kat, format, foto, chip, pod, slovo, ikona })
   - nadpis: text; „|“ = vynútený nový riadok
   - kat:    sprievodca | sezona | novinky | upozornenia | zaujimavosti | zo-stanice
   - format: blog (1200×630) | fb (1200×630) | wide (1920×1080) | ig (1080×1350) | story (1080×1920)
   - foto:   meno súboru z /foto/ bez .jpg (napr. img_7299), cesta „/…“, URL, alebo „ziadna“ (nálepka so slovom a ikonou)
   - chip:   text čipu (predvolene názov kategórie) · pod: podnadpis (nepovinný) · slovo: veľké slovo pri „bez fotky“
   - ikona:  auto | nakladne | dodavka | cisterna | preprava (len pri „bez fotky“)
   - vypln: contain = fotka/ilustrácia sa zmestí celá (biely podklad), predvolene cover
   - farba:  nepovinná HEX plocha namiesto farby kategórie (napr. farba sprievodcu na sociálne siete);
             text sa prepne na papierový pri tmavej ploche (#E12128, #5271FF) — bez parametra sa nič nemení */
(() => {
const KAT = {
  'sprievodca':   { n:'Sprievodca STK',        f:'#FFE600', t:'#231F20', slovo:'STK',    ik:'auto' },
  'sezona':       { n:'Sezóna',                f:'#5BBA47', t:'#231F20', slovo:'SEZÓNA', ik:'auto' },
  'novinky':      { n:'Novinky a legislatíva', f:'#5271FF', t:'#FFFDF5', slovo:'§',      ik:'dodavka' },
  'upozornenia':  { n:'Upozornenia',           f:'#E12128', t:'#FFFDF5', slovo:'POZOR',  ik:'auto' },
  'zaujimavosti': { n:'Zaujímavosti',          f:'#FF914B', t:'#231F20', slovo:'WOW',    ik:'preprava' },
  'zo-stanice':   { n:'Zo stanice',            f:'#F27BB4', t:'#231F20', slovo:'TRNAVA', ik:'nakladne' },
};
const IKONY = { auto:'/ikony/auto-cierna.webp', dodavka:'/ikony/dodavka-cierna.webp', cisterna:'/ikony/cisterna-cierna.webp', preprava:'/ikony/preprava-cierna.webp', nakladne:'/ikony/preprava-cierna.webp' };
const FORMATY = { blog:[1200,630], fb:[1200,630], wide:[1920,1080], ig:[1080,1350], story:[1080,1920] };

const fotoUrl = f => !f ? '/foto/img_7299.webp'
  : /^(ziadna|none|bez)$/i.test(f) ? null
  : /^(https?:)?\//.test(f) ? f
  : '/foto/' + f.replace(/[^a-z0-9_\-.]/gi, '') + (/\.\w{3,4}$/.test(f) ? '' : '.jpg');

// text na vlastnej ploche: čierny, iba na tmavých farbách (červená, modrá) papierový — ako v brand manuáli
function textNa(hex){
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(c => c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4);
  return .2126 * r + .7152 * g + .0722 * b < .25 ? '#FFFDF5' : '#231F20';
}

function el(tag, cls, txt){ const e = document.createElement(tag); if(cls) e.className = cls; if(txt != null) e.textContent = txt; return e; }

// nadpis zmenšuje po krokoch, kým sa nezmestí do svojho boxu (žiadne orezané slovo, žiadne „…“)
function fit(cv){
  const h = cv.querySelector('.cv-h'), box = cv.querySelector('.cv-spod'), tx = cv.querySelector('.cv-tx');
  if(!h) return;
  h.style.fontSize = ''; h.style.overflowWrap = '';
  const start = parseFloat(getComputedStyle(h).fontSize), min = start * .45;
  let fs = start;
  // obsah spodku je zarovnaný nadol → pretečie hore a scrollHeight ho nevidí; rátame výšky detí
  const gap = parseFloat(getComputedStyle(box).rowGap) || 0;
  const prelieva = () => [...box.children].reduce((s, c) => s + c.offsetHeight, 0) + gap * (box.children.length - 1) > box.clientHeight + 1 || h.scrollWidth > h.clientWidth + 1;
  while(prelieva() && fs > min){ fs *= .95; h.style.fontSize = fs + 'px'; }
  // ani na minime sa nezmestí (extrémne dlhé slovo) → radšej zalomiť slovo, ako pretiecť z plátna
  h.style.overflowWrap = prelieva() ? 'anywhere' : '';
}

window.EC_KAT = KAT;
window.EC_FORMATY = FORMATY;
window.ecCover = function(root, o = {}){
  const k = KAT[o.kat] || KAT.sprievodca;
  const format = FORMATY[o.format] ? o.format : 'blog';
  root.innerHTML = '';
  root.className = 'cv f-' + format;
  const fx = /^#?[0-9a-f]{6}$/i.test(o.farba || '') ? '#' + o.farba.replace('#', '') : null;
  root.style.setProperty('--f', fx || k.f);
  root.style.setProperty('--ft', fx ? textNa(fx) : k.t);
  root.setAttribute('role', 'img');
  root.setAttribute('aria-label', `${k.n}: ${(o.nadpis || '').replace(/\|/g, ' ')}`);

  root.append(el('div', 'cv-perf'));

  const fig = el('figure', 'cv-foto'), src = fotoUrl(o.foto);
  if(src){
    const img = el('img'); img.src = src; img.alt = ''; img.decoding = 'sync';
    if(o.pozicia) img.style.objectPosition = o.pozicia;
    if(o.vypln === 'contain'){ img.style.objectFit = 'contain'; fig.style.background = '#fff'; } // ilustrácia na bielom: celá, bez orezu
    fig.append(img);
  } else {
    fig.classList.add('bez');
    fig.append(el('span', 'slovo', o.slovo || k.slovo));
    const ik = el('img', 'ik'); ik.src = IKONY[o.ikona] || IKONY[k.ik]; ik.alt = ''; fig.append(ik);
  }
  root.append(fig);

  const logo = el('div', 'cv-logo'), li = el('img'); li.src = '/easycheck-logo.svg'; li.alt = 'Easy Check STK'; logo.append(li); root.append(logo);

  const tx = el('div', 'cv-tx');
  const chip = el('span', 'cv-chip'); chip.append(el('i'), document.createTextNode(o.chip || k.n)); tx.append(chip);
  const spod = el('div', 'cv-spod');
  const h = el('h2', 'cv-h');
  (o.nadpis || 'Nadpis článku').split('|').forEach((r, i) => { if(i) h.append(el('br')); h.append(document.createTextNode(r.trim())); });
  spod.append(h);
  if(o.pod) spod.append(el('p', 'cv-pod', o.pod));
  tx.append(spod);
  root.append(tx);

  const pas = el('div', 'cv-pas');
  pas.innerHTML = '<span class="bod"></span><b>easycheck.sk</b><span>033 20 20 211</span><span class="pp">STK Trnava</span>';
  root.append(pas);

  if(o.vodidla && format === 'story'){
    const z1 = el('div', 'zona'); z1.style.top = 0; z1.style.height = '23.15cqw'; z1.append(el('span', '', 'rozhranie · 250 px'));
    const z2 = el('div', 'zona'); z2.style.bottom = 0; z2.style.height = '31.5cqw'; z2.append(el('span', '', 'rozhranie · 340 px'));
    root.append(z1, z2);
  }

  const hotovo = () => fit(root);
  hotovo();
  return Promise.all([
    document.fonts ? document.fonts.ready : null,
    ...[...root.querySelectorAll('img')].map(i => i.complete ? null : new Promise(r => { i.onload = i.onerror = r; })),
  ]).then(() => { hotovo(); return root; });
};

// manuál: prekresli nadpisy pri zmene šírky
let t; addEventListener('resize', () => { clearTimeout(t); t = setTimeout(() => document.querySelectorAll('.cv').forEach(fit), 120); });
})();
