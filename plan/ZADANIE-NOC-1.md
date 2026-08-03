# ZADANIE — NOC 1: kostra webu easycheck.sk

**Zadané:** 2026-08-03 večer · **Deadline:** ráno 2026-08-04
**Repo:** `~/AI/EASYCHECK/vystupy/stk-web/` (Astro 6 + Tailwind v4) → `git push` = live na https://stk.digobraz.sk

---

## Čo čítať PRED prácou (v tomto poradí)

1. **`plan/plan.html`** — vizuálny plán redizajnu. Otvor v prehliadači, prečítaj sekcie 01–04. Toto je kánon.
2. **`plan/sitemap-stary-web.csv`** — 65 starých URL: slov, inbound odkazy, SEO chyby, akcia, nová URL, dôvod.
3. **`README.md`** v repe — ako funguje build a zrkadlenie hero prototypu.
4. **`src/data/obsah.ts`** — farebná logika značky (žltá = plocha, červená = úkon kontroly, zelená = čo ide hladko, cyan = info/maskot). **Dodržať.**
5. **`~/AI/EASYCHECK/vstupy/MASTERPROMPT.md`** — profil firmy + **cenník 2026** (jediný platný zdroj cien, NIE WordPress).

**Zdroj obsahu starého webu:** `~/AI/EASYCHECK/vstupy/wp-export/wp_full.json` (23 stránok + 42 článkov s plným HTML).

---

## Rozsah — postaviť do rána

### A) 42 článkov 1:1
- Gutenberg HTML → Markdown, skriptom (všetkých 42 je Gutenberg, konverzia je mechanická).
- **URL presne `/blog/<slug>/`** — znak po znaku podľa `link` v exporte. Nula redirectov, nula straty. Overiť všetkých 42.
- Stiahnuť 99 obrázkov z WP, prepojiť cesty lokálne.
- Doplniť chýbajúce **H1** a **meta description** (v CSV stĺpec `seo_problemy`).
- Skrátiť 16 titles nad 60 znakov — orezať prívesok „ - easycheck.sk".
- `/clanky/` = index článkov. Kategórie ponechať 4 živé: `oznamy`, `uzitocne-info-a-upozornenia`, `tipy-triky-rady`, `zaujimavosti`.
- ⚠️ `/blog/viete-co-obsahuje-povinna-vybava/` má **0 slov** — vytvor stránku, ale nechaj prázdnu s `noindex`, Matej rozhodne ráno.

### B) Stránky v menu
Menu má **7 položiek**: `Domov · Cenník · Služby · Info · Blog · Kontakt` + tlačidlo `REZERVOVAŤ`.
- **`/cennik/`** — ceny z `MASTERPROMPT.md` §8 (TK, EK, KO, ODOPASS). NIE z WordPressu.
- **`/sluzby/`** — NOVÁ, zlieva 4 staré stránky do kotiev: `#tachografy`, `#prihlasovanie`, `#vyzdvihnutie`, `#vyhody`. Obsah z WP exportu.
- **`/kontakt/`** — adresa Farárske 27, 917 00 Trnava · `033 202 02 11` · `stk@easycheck.sk` · mapa · otváracie hodiny.
- Odkaz na `/kontrola-originality/` daj zo `/sluzby/`.

### C) 7 stránok MIMO menu
`/lehoty-stk/` · `/kategorie-vozidiel-stk/` · `/povinna-vybava/` · `/povinnosti-prevadzkovatela-vozidla/` · `/platne-predpisy-stk/` · `/priprava-na-stk/` · `/kontrola-originality/`

**Jednotný layout, zhora nadol:**
1. Odpoveď **jednou vetou** (napr. „Nové auto ide na STK po 4 rokoch.")
2. Miesto na chat — zatiaľ len placeholder blok, chat sa nerobí
3. **Akordeóny** — celý pôvodný text z WP rozdelený na otázky. Zabalené, ale **v HTML** (Google to musí čítať).
4. Pätička zdroja: „Podľa zákona 106/2018 Z. z. · overené 3. 8. 2026"

🔑 **V navigácii tieto stránky NIE SÚ.** Vedie na ne jeden nenápadný riadok „Alebo si to prečítaj celé →" z `/uzitocne-informacie/`.

### D) `/uzitocne-informacie/`
Rozcestník: veľký placeholder na chat + riadok „Tlačivá na stiahnutie" (zatiaľ statické) + ten nenápadný odkaz na 7 stránok. **Žiadny odsek textu.**

### E) Hero
Doplniť **adresu + odkaz na mapu** do modrého (cyan) info bloku, kde už je telefón a otváracie hodiny.
⚠️ Hero sa needituje v repe! Zdroj pravdy je `~/AI/EASYCHECK/vystupy/WEB-hero/prototyp/live.html`, `npm run build` ho zrkadlí. Edituj prototyp.

---

## ⛔ Čo NErobiť

- **Chat** — potrebuje znalostnú bázu rozobratú fakt po fakte + testovanie. Cez noc by vznikol chat, ktorý klame.
- **Admin panel** (Supabase + PIN) — samostatná fáza.
- **Auto-sync legislatívy** (scrapery TESTEK/SLOVDEKRA) — samostatná fáza.
- **301 presmerovania a prepnutie na ostrú doménu** — čaká sa na GSC export od Mateja.
- **Nemazať ani nepresúvať žiadnu URL** nad rámec 4 zlúčení do `/sluzby/`.

---

## Ako pracovať

- **Fan-out na Sonnet subagentov, zoskupené podľa súborov** — nikdy dvaja agenti na jeden súbor. Návrh vĺn: (1) články+obrázky · (2) cenník+služby · (3) 7 info stránok · (4) kontakt+hero.
- Po fan-oute **VŽDY centrálny `npm run build`** — reporty agentov nie sú spoľahlivé.
- Priebežne commituj **explicitnými cestami**, nie `git add -A` (v strome môžu byť cudzie necommitnuté súbory).
- Deploy = `git push` do `main` → GitHub Actions → GitHub Pages.
- Celý web ostáva **`noindex`** — testovacia doména nesmie kanibalizovať živý easycheck.sk.

## Hotovo znamená

1. `npm run build` prejde
2. Nasadené na https://stk.digobraz.sk a **naozaj si to otvoril a odfotil** — nie „malo by to fungovať"
3. Všetkých 42 článkových URL vracia 200
4. Zoznam toho, čo si NEstihol, na konci

**Stav zapíš** do `plan/STAV-NOC-1.md` — čo je hotové, čo nie, čo potrebuje Mateja.
