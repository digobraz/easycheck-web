# -*- coding: utf-8 -*-
import json
SCR="/private/tmp/claude-501/-Users-stachoman-AI-EASYCHECK/8ab4c49e-4f8f-43bc-a2ff-fe5962d2b2f6/scratchpad"
OUT="/Users/stachoman/AI/EASYCHECK/vystupy/stk-web/plan/plan.html"
rows=json.load(open(f"{SCR}/mapovanie.json"))
data=[{k:r[k] for k in ("typ","url","slug","title","date","slov","kat","inbound","problem","akcia","ciel","rola","dovod","uryvok")} for r in rows]
DATA=json.dumps(data,ensure_ascii=False)

CSS = """
*{box-sizing:border-box;margin:0;padding:0}
:root{
 --yellow:#FFE600; --ink:#231F20; --red:#E12128; --green:#5BBA47; --cyan:#18B6E4;
 --paper:#FFFDF5; --muted:#6b6560; --soft:#efe9db; --r:14px;
 --fh:'Saira Condensed',system-ui,sans-serif; --fb:'DM Sans',system-ui,sans-serif;
 --fm:ui-monospace,'SF Mono',Menlo,monospace;
}
body{background:var(--paper);color:var(--ink);font-family:var(--fb);font-size:15px;line-height:1.5;-webkit-font-smoothing:antialiased}
.wrap{max-width:1180px;margin:0 auto;padding:0 20px 100px}
h1,h2,h3,h4{font-family:var(--fh);text-transform:uppercase;letter-spacing:.01em;line-height:1}
a{color:inherit}
header{background:var(--yellow);border-bottom:3px solid var(--ink);padding:34px 0 30px}
header .wrap{padding-bottom:0}
.eyebrow{font-family:var(--fm);font-size:11px;letter-spacing:.14em;text-transform:uppercase;opacity:.65}
h1{font-size:clamp(28px,4.6vw,48px);font-weight:800;margin:8px 0 10px}
.lede{max-width:700px;font-size:16px}
.lede b{background:var(--ink);color:var(--yellow);padding:1px 6px;border-radius:4px}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(148px,1fr));gap:10px;margin-top:26px}
.kpi{background:var(--paper);border:2.5px solid var(--ink);border-radius:var(--r);padding:13px 15px}
.kpi .n{font-family:var(--fh);font-size:31px;font-weight:800;line-height:1;font-variant-numeric:tabular-nums}
.kpi .l{font-size:11.5px;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);margin-top:5px;font-weight:500}
.kpi.g{border-color:var(--green)} .kpi.g .n{color:var(--green)}
.kpi.r{border-color:var(--red)} .kpi.r .n{color:var(--red)}
.kpi.c{border-color:var(--cyan)} .kpi.c .n{color:var(--cyan)}
section{margin-top:52px;scroll-margin-top:70px;animation:fadeUp .34s cubic-bezier(.16,1,.3,1) both}
.sh{display:flex;align-items:baseline;gap:12px;border-bottom:3px solid var(--ink);padding-bottom:8px;margin-bottom:20px;flex-wrap:wrap}
.sh .num{font-family:var(--fm);font-size:12px;background:var(--ink);color:var(--yellow);padding:3px 8px;border-radius:6px;letter-spacing:.08em}
.sh h2{font-size:clamp(20px,2.9vw,29px);font-weight:800}
.sh .sub{font-size:13px;color:var(--muted);margin-left:auto}
nav.toc{position:sticky;top:0;z-index:50;background:var(--ink);border-bottom:3px solid var(--ink)}
nav.toc .inner{max-width:1180px;margin:0 auto;padding:0 20px;display:flex;gap:2px;overflow-x:auto}
nav.toc a{font-family:var(--fh);text-transform:uppercase;font-size:13px;font-weight:700;color:#fff;opacity:.62;padding:11px 13px;text-decoration:none;white-space:nowrap;border-bottom:3px solid transparent;margin-bottom:-3px}
nav.toc a:hover{opacity:1;border-bottom-color:var(--yellow)}

/* MENU MOCKUP */
.menubar{border:2.5px solid var(--ink);border-radius:var(--r);background:#fff;overflow:hidden;margin-bottom:6px}
.menubar .bar{background:var(--yellow);display:flex;align-items:center;gap:0;padding:0 4px;border-bottom:2.5px solid var(--ink);flex-wrap:wrap}
.menubar .logo{font-family:var(--fh);font-weight:800;font-size:18px;padding:13px 14px;letter-spacing:.02em}
.menubar .mi{font-family:var(--fh);font-weight:700;font-size:14px;text-transform:uppercase;padding:13px 12px;opacity:.85}
.menubar .cta{margin-left:auto;background:var(--ink);color:var(--yellow);font-family:var(--fh);font-weight:800;font-size:14px;text-transform:uppercase;padding:9px 16px;border-radius:9px;margin-right:8px}
.menubar .body{padding:14px 16px;font-size:13.5px;color:var(--muted)}
@media(max-width:760px){.menubar .cta{margin-left:0}}

/* PAGE CARDS */
.pages{display:grid;grid-template-columns:repeat(auto-fill,minmax(228px,1fr));gap:10px}
.pg{border:2.5px solid var(--ink);border-radius:var(--r);background:#fff;padding:12px 13px 13px;position:relative;overflow:hidden}
.pg::before{content:"";position:absolute;left:0;top:0;bottom:0;width:6px;background:var(--ink)}
.pg.k::before{background:var(--red)} .pg.e::before{background:var(--green)}
.pg.i::before{background:var(--cyan)} .pg.n::before{background:var(--soft)}
.pg .u{font-family:var(--fm);font-size:12px;font-weight:600;padding-left:8px}
.pg .t{font-family:var(--fh);font-size:15.5px;font-weight:700;margin:4px 0 3px;padding-left:8px;text-transform:uppercase}
.pg .d{font-size:12.5px;color:var(--muted);padding-left:8px;line-height:1.4}
.pg .tag{display:inline-block;font-family:var(--fm);font-size:10px;text-transform:uppercase;letter-spacing:.06em;border:1.5px solid currentColor;border-radius:5px;padding:1px 5px;margin:7px 0 0 8px}
.tag.new{color:var(--green)} .tag.keep{color:var(--muted)} .tag.law{color:var(--red)} .tag.hid{color:var(--cyan)}
.grouplbl{font-family:var(--fh);text-transform:uppercase;font-weight:700;font-size:14px;margin:18px 0 9px;display:flex;align-items:center;gap:9px;color:var(--muted)}
.grouplbl::after{content:"";flex:1;height:2px;background:var(--soft)}

/* TABLE */
.tbl{border:2.5px solid var(--ink);border-radius:var(--r);overflow-x:auto;background:#fff}
table{width:100%;border-collapse:collapse;font-size:13.5px;min-width:620px}
th{background:var(--ink);color:#fff;font-family:var(--fh);text-transform:uppercase;font-size:11.5px;letter-spacing:.06em;padding:9px 11px;text-align:left;font-weight:700}
td{padding:8px 11px;border-bottom:1px solid var(--soft);vertical-align:top;font-variant-numeric:tabular-nums}
tr.row{cursor:pointer} tr.row:hover td{background:#fffbe8}
tr.det td{background:#faf7ee;padding:0;border-bottom:2px solid var(--soft)}
.detbox{padding:13px 16px;font-size:13px;display:grid;grid-template-columns:1fr 1fr;gap:14px}
.detbox .lbl{font-family:var(--fm);font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);display:block;margin-bottom:2px}
.mono{font-family:var(--fm);font-size:12px}
.pill{display:inline-block;font-family:var(--fm);font-size:10.5px;font-weight:600;padding:2px 7px;border-radius:20px;text-transform:uppercase;letter-spacing:.04em;white-space:nowrap}
.p-ZOSTAVA{background:#e4f5de;color:#2f7020} .p-ZLUCIT{background:#ffe9c9;color:#8a5200}
.p-301{background:#ffd9da;color:#96161b} .p-NOINDEX{background:#e4e2dd;color:#5a5550}
.prob{font-family:var(--fm);font-size:10.5px;color:var(--red)}
.filters{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:12px;align-items:center}
.filters button{font-family:var(--fh);text-transform:uppercase;font-size:12.5px;font-weight:700;border:2px solid var(--ink);background:#fff;border-radius:9px;padding:6px 12px;cursor:pointer}
.filters button.on{background:var(--ink);color:var(--yellow)}
.filters input{border:2px solid var(--ink);border-radius:9px;padding:6px 11px;font-family:var(--fb);font-size:13px;min-width:180px;margin-left:auto}

details{border:2.5px solid var(--ink);border-radius:var(--r);background:#fff;margin-bottom:9px;overflow:hidden}
details[open]{background:#fffdf3}
summary{cursor:pointer;padding:12px 15px;font-family:var(--fh);text-transform:uppercase;font-weight:700;font-size:15px;list-style:none;display:flex;align-items:center;gap:10px}
summary::-webkit-details-marker{display:none}
summary::after{content:"+";margin-left:auto;font-size:21px;font-weight:400;line-height:1}
details[open] summary::after{content:"–"}
details[open] summary{border-bottom:2px solid var(--soft)}
.dbody{padding:14px 16px;font-size:14px}
.dbody p{margin-bottom:9px} .dbody ul{margin:0 0 9px 17px} .dbody li{margin-bottom:4px}
.dbody code,code{font-family:var(--fm);font-size:12.5px;background:var(--soft);padding:1px 5px;border-radius:4px}
.badge{font-family:var(--fm);font-size:10px;text-transform:uppercase;letter-spacing:.06em;padding:2px 7px;border-radius:5px;font-weight:600}
.b-red{background:var(--red);color:#fff} .b-green{background:var(--green);color:#fff}
.b-cyan{background:var(--cyan);color:#fff} .b-ink{background:var(--ink);color:var(--yellow)}
.flow{display:grid;grid-template-columns:repeat(auto-fit,minmax(178px,1fr));border:2.5px solid var(--ink);border-radius:var(--r);overflow:hidden;background:#fff;margin-bottom:14px}
.step{padding:14px 15px;border-right:2px solid var(--soft)}
.step:last-child{border-right:none}
.step .sn{font-family:var(--fm);font-size:10px;color:var(--muted);letter-spacing:.1em}
.step .st{font-family:var(--fh);text-transform:uppercase;font-weight:700;font-size:15px;margin:4px 0 5px}
.step .sd{font-size:12.5px;color:var(--muted);line-height:1.45}
.step.acc{background:var(--yellow)} .step.acc .sd{color:var(--ink)}
.fase{border:2.5px solid var(--ink);border-radius:var(--r);margin-bottom:11px;background:#fff;overflow:hidden}
.fase>summary{background:var(--soft)} .fase[open]>summary{background:var(--yellow)}
.ck{display:flex;gap:10px;padding:8px 16px;border-bottom:1px solid var(--soft);align-items:flex-start;font-size:14px}
.ck:last-child{border-bottom:none}
.ck input{width:17px;height:17px;margin-top:2px;accent-color:var(--green);cursor:pointer;flex-shrink:0}
.ck label{cursor:pointer;flex:1} .ck.done label{text-decoration:line-through;opacity:.45}
.ck .who{font-family:var(--fm);font-size:9.5px;text-transform:uppercase;letter-spacing:.07em;padding:2px 6px;border-radius:5px;flex-shrink:0;margin-top:1px}
.who.ja{background:var(--cyan);color:#fff} .who.matej{background:var(--red);color:#fff}
.pbar{height:7px;background:var(--soft);border-radius:20px;overflow:hidden;margin:3px 16px 11px}
.pbar i{display:block;height:100%;background:var(--green);width:0;transition:width .3s ease}
.fcount{font-family:var(--fm);font-size:11px;color:var(--muted);margin-left:auto;padding-right:6px}
.note{background:#fff;border:2.5px solid var(--ink);border-left:6px solid var(--red);border-radius:var(--r);padding:13px 16px;margin:14px 0;font-size:14px}
.note.ok{border-left-color:var(--green)} .note.info{border-left-color:var(--cyan)}
.note b{font-family:var(--fh);text-transform:uppercase;font-size:14px}
.two{display:grid;grid-template-columns:1fr 1fr;gap:13px}
.screen{border:2.5px solid var(--ink);border-radius:var(--r);background:#fff;overflow:hidden}
.screen .cap{background:var(--ink);color:#fff;font-family:var(--fh);text-transform:uppercase;font-size:12px;letter-spacing:.06em;padding:7px 13px}
.screen .in{padding:15px}
.mock{border:2px dashed var(--muted);border-radius:10px;padding:13px;margin-bottom:9px;text-align:center;font-size:13px;color:var(--muted)}
.mock.big{background:var(--yellow);border-style:solid;border-color:var(--ink);color:var(--ink);font-family:var(--fh);text-transform:uppercase;font-weight:700;font-size:17px;padding:26px 13px}
.mock.row{text-align:left;display:flex;justify-content:space-between;align-items:center;gap:10px;padding:9px 12px}
.tiny{font-family:var(--fm);font-size:11.5px;color:var(--muted)}
@media(max-width:820px){.two,.detbox{grid-template-columns:1fr}.step{border-right:none;border-bottom:2px solid var(--soft)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
"""

HEAD = """<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>EASYCHECK — plán redizajnu webu</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@600;700;800&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
<style>%s</style>""" % CSS

MENU = [
 ("/", "Domov", "n", "Hero scéna — hotová, LIVE", "keep", "ostáva"),
 ("/cennik/", "Cenník", "k", "Ceny 2026 z MASTERPROMPTu, nie z WP", "new", "prepísať"),
 ("/sluzby/", "Služby", "k", "NOVÁ — zlieva 4 krátke stránky do kotiev", "new", "nová"),
 ("/uzitocne-informacie/", "Info", "i", "CHAT na celú obrazovku + tlačivá", "new", "prestavať"),
 ("/clanky/", "Blog", "n", "Index 42 článkov", "keep", "ostáva"),
 ("/kontakt/", "Kontakt", "n", "Mapa, hodiny, telefón", "keep", "ostáva"),
 ("/rezervacia/", "Rezervácia", "e", "CTA tlačidlo · 95 interných odkazov", "keep", "ostáva"),
]
HIDDEN = [
 ("/lehoty-stk/", "Lehoty STK", "i", "⚡ zákonný obsah · 714 slov", "hid", "mimo menu"),
 ("/kategorie-vozidiel-stk/", "Kategórie vozidiel", "i", "⚡ 1 965 slov, najdlhšia", "hid", "mimo menu"),
 ("/povinna-vybava/", "Povinná výbava", "i", "⚡ vyhláška · 1 036 slov", "hid", "mimo menu"),
 ("/povinnosti-prevadzkovatela-vozidla/", "Povinnosti prevádzkovateľa", "i", "⚡ zákon 106/2018 · 935 slov", "hid", "mimo menu"),
 ("/platne-predpisy-stk/", "Platné predpisy", "i", "⚡ zastaráva najrýchlejšie · 693 slov", "hid", "mimo menu"),
 ("/priprava-na-stk/", "Príprava na STK", "i", "954 slov, praktické", "hid", "mimo menu"),
 ("/kontrola-originality/", "Kontrola originality", "k", "841 slov · vlastný dopyt, linkuje sa zo /sluzby/", "hid", "mimo menu"),
]
OTHER = [
 ("/blog/&lt;slug&gt;/", "42 článkov", "e", "1:1, nula redirectov", "keep", "ostáva"),
 ("/koleso-stastia/", "Koleso šťastia", "e", "47 odkazov = živá mechanika", "keep", "ostáva"),
 ("/rezervacia-vip/", "Rezervácia VIP", "e", "Rieši rezervačný systém", "keep", "ostáva"),
 ("/ochrana-osobnych-udajov/", "Ochrana údajov", "n", "Pätička. 137 slov je málo — prepísať", "new", "prepísať"),
 ("/admin/", "Admin panel", "k", "PIN · noindex · mimo sitemap", "new", "nový"),
]
def cards(lst):
    return "".join(f'<div class="pg {c}"><div class="u">{u}</div><div class="t">{t}</div><div class="d">{d}</div><span class="tag {tg}">{tl}</span></div>' for u,t,c,d,tg,tl in lst)

CHECK = [
 ("Fáza 0 — rozhodnutia (blokuje všetko)", [
  ("matej","🔴 Zmazať 6 spam kategórií vo WP (<code>mostbet-kasyn</code>, <code>online-casino</code>, <code>public</code>, <code>1</code>, <code>business-small-business</code>, <code>uncategorized</code>) — overené 3.8.2026: <b>stále indexované</b>"),
  ("matej","🔴 Prezrieť WP používateľov — spam kategórie niekto vytvoril"),
  ("matej","🔴 Export Google Search Console za 16 mesiacov (Výkon → Stránky → Export)"),
  ("matej","Potvrdiť: kategórie blogu na novom webe áno/nie (dnes 4 živé: oznamy 13, užitočné info 17, tipy 7, zaujímavosti 5)"),
  ("matej","Zoznam tlačív, ktoré musia byť na stiahnutie (splnomocnenie + čo ďalšie?)"),
  ("matej","Kto z personálu dostane prístup do admin panelu — jeden spoločný PIN alebo každý svoj?"),
  ("ja","Priložiť GSC dáta k inventáru a doplniť stĺpec „kliky/12 mes.“"),
 ]),
 ("Fáza 1 — znalostná báza + zdroje pravdy", [
  ("ja","<code>obsah/fakty/*.md</code> — jeden fakt = jeden súbor s <code>platne_od</code>, <code>zdroj</code>, <code>overene_dna</code>"),
  ("ja","Rozobrať 5 zákonných stránok (4 313 slov) na jednotlivé fakty"),
  ("ja","Scraper TESTEK novinky (<code>testek.sk/novinky</code> — overené, statické HTML s dátumami)"),
  ("ja","Scraper TESTEK metodické pokyny — hash PDF (MP 44/2018, MP 33/2021, <b>MP 2/2026</b>) → diff"),
  ("ja","Scraper TESTEK kontrolné položky (skupiny 0–8) — podklad pre „prečo som neprešiel“"),
  ("ja","Overiť zdroj pre emisné + KO (SLOVDEKRA, doména žije)"),
  ("ja","⚠️ Slov-Lex je Angular SPA — priamy scrape nefunguje. Overiť data.gov.sk alebo headless render"),
  ("matej","Odsúhlasiť: pri zachytenej zmene ti príde alert a ty potvrdíš — alebo sa má prepísať samo?"),
 ]),
 ("Fáza 2 — stránky (Astro)", [
  ("ja","<code>/cennik/</code> — z MASTERPROMPT 2026 (TK, EK, KO, ODOPASS), nie z WP"),
  ("ja","<code>/sluzby/</code> — nová, 4 kotvy + 301 zo 4 starých URL"),
  ("ja","<code>/uzitocne-informacie/</code> — chat na celú obrazovku, texty pod jedným nenápadným odkazom"),
  ("ja","7 stránok mimo menu — jednotný akordeónový layout zo znalostnej bázy"),
  ("ja","<code>/kontakt/</code> + pruh na oznam z admin panelu"),
  ("ja","<code>/ochrana-osobnych-udajov/</code> — prepísať (137 slov nestačí)"),
  ("matej","Skontrolovať ceny v cenníku pred publikovaním"),
 ]),
 ("Fáza 3 — blog 1:1", [
  ("ja","Konverzia 42 článkov Gutenberg → Markdown (skript, jednorazovo)"),
  ("ja","Stiahnuť 99 obrázkov z WP a prepojiť cesty"),
  ("ja","URL presne <code>/blog/&lt;slug&gt;/</code> — overiť všetkých 42 znak po znaku"),
  ("ja","Doplniť chýbajúce H1 (38 URL) a meta description (18 URL)"),
  ("ja","Skrátiť 16 titles nad 60 znakov (najhorší má 130)"),
  ("matej","Rozhodnúť o článku <code>/blog/viete-co-obsahuje-povinna-vybava/</code> — <b>0 slov</b>, duplikuje stránku"),
 ]),
 ("Fáza 4 — chat asistent", [
  ("ja","Bublina na každej stránke + plný režim na <code>/uzitocne-informacie/</code>"),
  ("ja","Odpovede výhradne zo znalostnej bázy — žiadna voľná generácia"),
  ("ja","Každá odpoveď nesie zdroj + dátum overenia"),
  ("ja","Fakt starší ako 90 dní → chat to prizná a ponúkne telefón"),
  ("ja","Fallback na človeka: <code>033 202 02 11</code> + rezervácia"),
  ("matej","Otestovať na 20 reálnych otázkach od zákazníkov"),
 ]),
 ("Fáza 5 — admin panel pre personál", [
  ("ja","Supabase: bucket <code>tlaciva</code> + tabuľky <code>tlaciva</code>, <code>oznamy</code>"),
  ("ja","🔒 PIN sa overuje <b>edge funkciou na serveri</b>, nie v prehliadači — a RLS zamkne zápis"),
  ("ja","Obrazovka 1: tlačivá — nahrať / vymeniť / zmazať PDF, vidno dátum poslednej výmeny"),
  ("ja","Obrazovka 2: oznam — text + platnosť do, prepínač zap/vyp"),
  ("ja","Web ťahá tlačivá aj oznam za behu → <b>nahratie sa prejaví hneď, bez rebuildu</b>"),
  ("ja","<code>/admin/</code> = noindex + mimo sitemap.xml"),
  ("matej","Otestovať s personálom: nahrať splnomocnenie a zapnúť oznam bez mojej pomoci"),
 ]),
 ("Fáza 6 — presun na ostrú doménu", [
  ("ja","301 mapa: 5 presmerovaní + 2 noindex (58 URL sa nehýbe)"),
  ("ja","Sitemap.xml + robots.txt (zrušiť <code>noindex</code> až pri prepnutí)"),
  ("ja","Kontrola: každá z 65 starých URL vracia 200 alebo 301, žiadna 404"),
  ("matej","Prepnúť DNS <code>easycheck.sk</code> na nový web"),
  ("ja","Nahlásiť novú sitemap do GSC + sledovať 14 dní"),
 ]),
]
fase_html=""
for i,(t,items) in enumerate(CHECK):
    inner="".join(f'<div class="ck"><input type="checkbox" id="c{i}_{j}"><label for="c{i}_{j}">{txt}</label><span class="who {w}">{"Matej" if w=="matej" else "Claude"}</span></div>' for j,(w,txt) in enumerate(items))
    fase_html+=f'<details class="fase" data-fase="{i}"{" open" if i==0 else ""}><summary>{t}<span class="fcount" id="fc{i}"></span></summary><div class="pbar"><i id="pb{i}"></i></div>{inner}</details>'

HTML = f"""<!doctype html><html lang="sk"><head>{HEAD}</head><body>
<header><div class="wrap">
<div class="eyebrow">EASYCHECK · redizajn webu · 3. augusta 2026 · v2</div>
<h1>Web so siedmimi položkami v menu, ktorý si drží 65 adries</h1>
<p class="lede">Návštevník vidí <b>7 položiek</b> a jedno veľké tlačidlo REZERVOVAŤ. Google vidí ďalej <b>58 nezmenených adries</b>. Ide to naraz, lebo <b>menu a sitemapa sú dve rôzne veci</b> — dá sa zložiť rozcestník a nechať domy stáť.</p>
<div class="kpis">
 <div class="kpi c"><div class="n">7</div><div class="l">položiek v menu</div></div>
 <div class="kpi g"><div class="n">58</div><div class="l">URL ostáva 1:1</div></div>
 <div class="kpi r"><div class="n">5</div><div class="l">presmerovaní</div></div>
 <div class="kpi"><div class="n">7</div><div class="l">stránok mimo menu</div></div>
 <div class="kpi"><div class="n">42</div><div class="l">článkov bez zmeny</div></div>
 <div class="kpi r"><div class="n">4 313</div><div class="l">slov zákonného obsahu</div></div>
</div></div></header>

<nav class="toc"><div class="inner">
<a href="#navrh">1 · Web</a><a href="#chat">2 · Chat + info</a><a href="#admin">3 · Admin panel</a><a href="#seo">4 · Google</a><a href="#stary">5 · Starý web</a><a href="#check">6 · Checklist</a>
</div></nav>

<div class="wrap">

<section id="navrh"><div class="sh"><span class="num">01</span><h2>Čo vidí návštevník</h2><span class="sub">celá navigácia webu</span></div>
<div class="menubar"><div class="bar">
 <span class="logo">EASY<span style="color:var(--red)">CHECK</span></span>
 <span class="mi">Cenník</span><span class="mi">Služby</span><span class="mi">Info</span><span class="mi">Blog</span><span class="mi">Kontakt</span>
 <span class="cta">Rezervovať →</span>
</div><div class="body">Toto je celé menu. Nič viac. Rezervácia je jediné farebne odlíšené tlačidlo — všetko ostatné je doplnok.</div></div>

<div class="grouplbl">V menu — 7 adries</div>
<div class="pages">{cards(MENU)}</div>

<div class="grouplbl">Mimo menu — 7 adries, ktoré si drží iba Google</div>
<div class="pages">{cards(HIDDEN)}</div>
<div class="note info"><b>Toto je jadro trikú.</b> Týchto sedem stránok nie je v navigácii. Vedie na ne jeden nenápadný odkaz z INFO a odkazy z chatu. Pre návštevníka de facto neexistujú — pre Google existujú presne ako doteraz, aj s pozíciami na frázy typu <i>lehoty STK</i> alebo <i>povinná výbava</i>.</div>

<div class="grouplbl">Zvyšok — články, kampane, technické</div>
<div class="pages">{cards(OTHER)}</div>
</section>

<section id="chat"><div class="sh"><span class="num">02</span><h2>INFO = chat, nie text</h2><span class="sub">a mechanizmus, ktorý ho drží aktuálny</span></div>
<div class="two">
<div class="screen"><div class="cap">/uzitocne-informacie/ — čo vidno</div><div class="in">
 <div class="mock big">💬 Opýtaj sa na čokoľvek<br><span style="font-size:12px;font-weight:400;text-transform:none;font-family:var(--fb)">„Kedy ide moje auto na STK?“ · „Čo si mám vziať so sebou?“</span></div>
 <div class="mock row"><span>📄 Tlačivá na stiahnutie</span><span class="tiny">splnomocnenie…</span></div>
 <div class="mock row"><span class="tiny">Alebo si to prečítaj celé →</span><span class="tiny">7 stránok</span></div>
 <p class="tiny" style="margin-top:11px">Jedna obrazovka. Žiadny odsek textu. Ten posledný riadok je jediná cesta k 4 313 slovám — a stačí, aby ich Google mal.</p>
</div></div>
<div class="screen"><div class="cap">Stránka spod toho odkazu</div><div class="in">
 <div class="mock" style="text-align:left;border-style:solid;border-color:var(--ink)"><b style="font-family:var(--fh);text-transform:uppercase">Lehoty STK</b><br><span class="tiny">Nové auto ide na STK po 4 rokoch.</span></div>
 <div class="mock row"><span>▸ Osobné vozidlá do 3,5 t</span><span>+</span></div>
 <div class="mock row"><span>▸ Motocykle</span><span>+</span></div>
 <div class="mock row"><span>▸ Nákladné a autobusy</span><span>+</span></div>
 <div class="mock row"><span>▸ Prípojné vozidlá</span><span>+</span></div>
 <p class="tiny" style="margin-top:11px">Odpoveď jednou vetou, zvyšok v dropdownoch. Vizuálne pol obrazovky — v HTML celých 714 slov, ktoré Google číta ďalej.</p>
</div></div>
</div>

<div class="note"><b>Problém, ktorý to má riešiť.</b> Texty na webe sú staré roky. Zákon 106/2018 sa medzitým menil, metodické pokyny tiež (TESTEK vydal <b>MP č. 2/2026</b>). Zákazník číta neaktuálnu informáciu a my o tom nevieme.</div>
<div class="flow">
<div class="step"><div class="sn">01 · ZDROJ</div><div class="st">Sledovače</div><div class="sd">TESTEK novinky, metodické pokyny, kontrolné položky. SLOVDEKRA pre emisné a KO. Raz denne.</div></div>
<div class="step"><div class="sn">02 · DIFF</div><div class="st">Zmena?</div><div class="sd">Porovná hash stránky a PDF proti minulému behu. Ak sa nič nezmenilo, mlčí.</div></div>
<div class="step acc"><div class="sn">03 · ALERT</div><div class="st">Upozornenie</div><div class="sd">Zmena → e-mail/Telegram s odkazom na zdroj. Nikdy neprepíše web ticho.</div></div>
<div class="step"><div class="sn">04 · BÁZA</div><div class="st">Fakty</div><div class="sd">Jeden fakt = jeden súbor s dátumom platnosti, zdrojom a dátumom overenia.</div></div>
<div class="step"><div class="sn">05 · VÝSTUP</div><div class="st">Web + chat</div><div class="sd">Stránky aj chat čítajú tú istú bázu. Jedna zmena sa prejaví všade naraz.</div></div>
</div>
<div class="two">
<details><summary>Zdroje — overené 3. 8. 2026</summary><div class="dbody"><ul>
<li><span class="badge b-green">funguje</span> <code>testek.sk/novinky</code> — statické HTML, položky s dátumom. Posledná: <b>3. 8. 2026</b>.</li>
<li><span class="badge b-green">funguje</span> <code>testek.sk/tk-pravidelne-...</code> — metodické pokyny ako PDF (MP 44/2018, MP 39, MP 46/2020, MP 33/2021).</li>
<li><span class="badge b-green">funguje</span> <code>testek.sk/skupina-0-identifikacia</code> — kontrolné položky po skupinách.</li>
<li><span class="badge b-cyan">žije</span> <code>slovdekra.sk</code> — poverená technická služba pre EK a KO.</li>
<li><span class="badge b-red">problém</span> <code>slov-lex.sk</code> — Angular SPA, vracia prázdny shell (2 273 B).</li>
</ul><p class="tiny">TESTEK je poverená technická služba MD SR. Jeho výklad je pre STK záväzný — lepší primárny zdroj než holý text zákona.</p></div></details>
<details><summary>Pravidlá chatu — aby neklamal</summary><div class="dbody"><ul>
<li>Odpovedá <b>iba</b> z faktov v báze. Žiadna voľná generácia.</li>
<li>Každá odpoveď nesie <b>zdroj + dátum overenia</b>.</li>
<li>Fakt starší ako 90 dní → prizná to a ponúkne telefón.</li>
<li>Otázka mimo bázy → „na toto ti odpovie technik“ + <code>033 202 02 11</code>.</li>
<li>Chat je <b>nadstavba nad textom, nie náhrada</b> — text zostáva v HTML kvôli Googlu.</li>
</ul></div></details>
</div>
</section>

<section id="admin"><div class="sh"><span class="num">03</span><h2>Admin panel pre personál</h2><span class="sub">aby si tlačivá nenahrával ty</span></div>
<div class="note ok"><b>Zadanie.</b> „Zákazníci potrebujú tlačivo na splnomocnenie a ja ich musím stále nahrávať na web, čo ma otravuje.“ → personál si to nahrá sám, cez PIN, bez teba a bez programátora.</div>
<div class="two">
<div class="screen"><div class="cap">/admin/ — obrazovka 1: tlačivá</div><div class="in">
 <div class="mock row"><span>📄 Splnomocnenie na prihlásenie vozidla</span><span class="tiny">nahrané 12. 6. 2026</span></div>
 <div class="mock row"><span>📄 Žiadosť o vykonanie TK</span><span class="tiny">nahrané 3. 2. 2026</span></div>
 <div class="mock" style="border-color:var(--green);color:var(--green)">+ Nahrať nové PDF</div>
 <p class="tiny">Vymeniť súbor = jeden klik. Na webe je nové tlačivo <b>okamžite</b>, bez rebuildu a bez môjho zásahu.</p>
</div></div>
<div class="screen"><div class="cap">/admin/ — obrazovka 2: oznam</div><div class="in">
 <div class="mock" style="text-align:left;border-color:var(--ink);border-style:solid">„Dnes 4. 8. je linka na emisné mimo prevádzky, TK ide normálne.“</div>
 <div class="mock row"><span>Platí do</span><span class="tiny">5. 8. 2026</span></div>
 <div class="mock row" style="background:var(--yellow);border-color:var(--ink);border-style:solid"><span><b>Zobraziť na webe</b></span><span>ZAP ●</span></div>
 <p class="tiny">Zapnutý oznam sa ukáže ako pruh nad hlavičkou na celom webe. Po dátume zmizne sám.</p>
</div></div>
</div>
<details><summary>Ako je to postavené (a prečo PIN nestačí sám o sebe)</summary><div class="dbody">
<ul>
<li><b>Kde beží:</b> Supabase — bucket <code>tlaciva</code> na PDF + tabuľky <code>tlaciva</code> a <code>oznamy</code>. Rovnaká infra ako report-app (<code>pschfuppkhblcdbleovs</code>).</li>
<li><b>Web ostáva statický.</b> Tlačivá a oznam si ťahá za behu → nahratie sa prejaví hneď, nič sa nebuilduje.</li>
<li>🔒 <b>PIN sa musí overovať na serveri</b> (edge funkcia), nie v JavaScripte. PIN zapísaný v prehliadači je clona, nie zámok — ktokoľvek si ho prečíta v zdrojáku a nahrá ti na web čo chce.</li>
<li>RLS zamkne zápis do bucketu aj tabuliek na overený token. Čítanie je verejné (tlačivá aj tak sťahujú zákazníci).</li>
<li><code>/admin/</code> je <code>noindex</code> a mimo <code>sitemap.xml</code>.</li>
</ul>
<p class="tiny">Toto je jediná časť plánu, ktorá potrebuje backend. Zvyšok webu je statické HTML.</p>
</div></details>
<details><summary>Čo panel zámerne NEVIE (zatiaľ)</summary><div class="dbody">
<p>Aby to personál zvládol, vie iba dve veci: tlačivá a oznam. Nevie meniť ceny, texty stránok ani odpovede chatu — tie majú svoj vlastný, kontrolovaný tok cez znalostnú bázu.</p>
<p>Ak sa ukáže, že vedenie potrebuje meniť aj fakty v chate, je to prirodzené rozšírenie — ale až keď panel dobehne v praxi.</p>
</div></details>
</section>

<section id="seo"><div class="sh"><span class="num">04</span><h2>Čo sa stane s Googlom</h2><span class="sub">tvoja hlavná obava — priamo</span></div>
<div class="two">
<div class="note ok"><b>Čo ťa nemôže bolieť.</b><br>58 z 65 URL sa nehýbe ani o znak. Všetkých 42 článkov ostáva na <code>/blog/&lt;slug&gt;/</code>. Odkazy zvonku smerujú tam, kam smerovali. To, že stránka nie je v menu, na jej pozíciu nemá vplyv.</div>
<div class="note"><b>Kde je riziko.</b><br>Zliať 6 info stránok do jednej by nebolo „presťahovanie“ — Google by zlúčil šesť pozícií do jednej a zvyšok zahodil. Preto ostávajú samostatné, len skryté z navigácie. Do chatu ide <b>kópia</b>, nie presun: chat Google neindexuje.</div>
</div>
<details><summary>Čo sa opravuje popri tom (a je to zadarmo)</summary><div class="dbody"><ul>
<li><b>38 z 65 URL nemá H1</b> — Elementor renderuje nadpisy ako <code>&lt;div&gt;</code>. V Astro zmizne samo.</li>
<li><b>18 URL nemá meta description</b> — vrátane <code>/kontakt</code> a <code>/clanky</code>.</li>
<li><b>16 titles nad 60 znakov</b> — najhorší 130.</li>
<li><b>Medián stránky 314 kB HTML</b> (homepage 638 kB) — bez obrázkov. Astro to zrazí rádovo.</li>
<li><b>6 spam kategórií indexovaných</b> — overené dnes: <b>stále tam sú</b>.</li>
</ul></div></details>
</section>

<section id="stary"><div class="sh"><span class="num">05</span><h2>Sitemapa starého webu</h2><span class="sub">65 URL · klikni na riadok</span></div>
<div class="filters">
 <button data-f="all" class="on">Všetko (65)</button>
 <button data-f="stranka">Stránky (23)</button>
 <button data-f="clanok">Články (42)</button>
 <button data-f="ZLUCIT">Zlieva sa (4)</button>
 <button data-f="problem">S chybou</button>
 <input id="q" placeholder="hľadať v URL a názve…">
</div>
<div class="tbl"><table><thead><tr>
<th style="width:38%">URL</th><th>Rola</th><th style="text-align:right">Slov</th><th style="text-align:right">Odkazov</th><th>Dátum</th><th>Akcia</th>
</tr></thead><tbody id="tb"></tbody></table></div>
<p class="tiny" style="margin-top:9px">Dáta: WP REST API export (16. 7. 2026), počty overené naživo 3. 8. 2026 · CSV: <code>plan/sitemap-stary-web.csv</code></p>
</section>

<section id="check"><div class="sh"><span class="num">06</span><h2>Checklist</h2><span class="sub">stav sa ukladá do prehliadača</span></div>
<div class="note info"><b>Deliaca čiara.</b> <span class="badge b-cyan">Claude</span> = spravím sám vrátane scrapingu. <span class="badge b-red">Matej</span> = potrebujem ťa, inak to stojí.</div>
{fase_html}
</section>

</div>
<script>
const DATA={DATA};
const tb=document.getElementById('tb');
let filt='all', q='';
function esc(s){{return (s||'').replace(/[&<>]/g,c=>({{'&':'&amp;','<':'&lt;','>':'&gt;'}}[c]))}}
function render(){{
 const list=DATA.filter(r=>{{
  if(filt==='stranka'&&r.typ!=='stranka')return false;
  if(filt==='clanok'&&r.typ!=='clanok')return false;
  if(filt==='ZLUCIT'&&r.akcia!=='ZLUCIT')return false;
  if(filt==='problem'&&!r.problem.length)return false;
  if(q){{const s=(r.url+' '+r.title).toLowerCase();if(!s.includes(q))return false;}}
  return true;
 }}).sort((a,b)=>a.typ===b.typ?b.inbound-a.inbound||a.date.localeCompare(b.date):(a.typ==='stranka'?-1:1));
 tb.innerHTML=list.map(r=>`
 <tr class="row" data-i="${{DATA.indexOf(r)}}">
  <td><span class="mono">${{esc(r.url.replace('https://easycheck.sk',''))||'/'}}</span>${{r.problem.length?'<br><span class="prob">⚠ '+r.problem.join(' · ')+'</span>':''}}</td>
  <td>${{esc(r.rola)}}</td><td style="text-align:right">${{r.slov.toLocaleString('sk-SK')}}</td>
  <td style="text-align:right">${{r.inbound||'—'}}</td><td class="mono">${{r.date}}</td>
  <td><span class="pill p-${{r.akcia}}">${{r.akcia==='ZOSTAVA'?'ostáva':r.akcia==='ZLUCIT'?'zlieva':r.akcia==='301'?'301':'noindex'}}</span></td>
 </tr>`).join('');
}}
tb.addEventListener('click',e=>{{
 const tr=e.target.closest('tr.row'); if(!tr)return;
 const nx=tr.nextElementSibling;
 if(nx&&nx.classList.contains('det')){{nx.remove();return;}}
 document.querySelectorAll('tr.det').forEach(x=>x.remove());
 const r=DATA[tr.dataset.i];
 const d=document.createElement('tr'); d.className='det';
 d.innerHTML=`<td colspan="6"><div class="detbox">
  <div><span class="lbl">Nová adresa</span><span class="mono">${{esc(r.ciel)}}</span>
   <span class="lbl" style="margin-top:9px">Prečo</span>${{esc(r.dovod)}}</div>
  <div><span class="lbl">Názov</span>${{esc(r.title)}}
   ${{r.kat.length?'<span class="lbl" style="margin-top:9px">Kategórie</span><span class="mono">'+r.kat.join(', ')+'</span>':''}}
   <span class="lbl" style="margin-top:9px">Začiatok textu</span><span style="color:var(--muted);font-size:12.5px">${{esc(r.uryvok.slice(0,190))}}…</span></div>
 </div></td>`;
 tr.after(d);
}});
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{{
 document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('on'));
 b.classList.add('on'); filt=b.dataset.f; render();
}});
document.getElementById('q').oninput=e=>{{q=e.target.value.toLowerCase().trim();render();}};
render();
const KEY='easycheck-plan-2026-08';
let saved={{}}; try{{saved=JSON.parse(localStorage.getItem(KEY)||'{{}}')}}catch(e){{}}
function sync(){{
 document.querySelectorAll('.fase').forEach(f=>{{
  const i=f.dataset.fase, cks=f.querySelectorAll('input'), done=[...cks].filter(c=>c.checked).length;
  document.getElementById('pb'+i).style.width=(done/cks.length*100)+'%';
  document.getElementById('fc'+i).textContent=done+'/'+cks.length;
 }});
}}
document.querySelectorAll('.ck input').forEach(c=>{{
 if(saved[c.id]){{c.checked=true;c.closest('.ck').classList.add('done');}}
 c.onchange=()=>{{saved[c.id]=c.checked;try{{localStorage.setItem(KEY,JSON.stringify(saved))}}catch(e){{}}
  c.closest('.ck').classList.toggle('done',c.checked);sync();}};
}});
sync();
</script></body></html>"""
open(OUT,"w").write(HTML)
print("OK:",OUT,len(HTML),"bytes")
