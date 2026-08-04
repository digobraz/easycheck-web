# EASYCHECK web — stk.digobraz.sk (testovacia doména)

Nový web pre Easy Check STK. Testovacia doména, **celý web je `noindex`** —
nesmie kanibalizovať live `easycheck.sk` vo vyhľadávaní.

## Dizajn a štruktúra (platí od 4. 8. 2026)

**Jeden vizuálny systém: tmavý HUD.** Hero scéna udáva tón celému webu — tmavé
pozadie `#05080A`, tmavé panely so svetelnou linkou, zrezaný roh, žltá `#FFE600`
ako jediná plná plocha (tlačidlá). Predtým tu boli dva svety (futuristická
homepage + svetlý neobrutalizmus na podstránkach); zjednotené v `src/styles/global.css`.

⚠️ Triedy `nb-*` sa **zámerne nepremenovali** — drží ich 60+ stránok. `nb` dnes
znamená „panel", nie „neobrutalistický blok". Rovnako `--color-ec-paper` = tmavý
povrch a `--color-ec-ink` = svetlý text; význam sa otočil, mená ostali.

**Menu má 4 položky:** Domov · Rezervácie (`/rezervacia/`) · Info (`/chat/`) · Blog (`/clanky/`).
Popisky sedia s URL; „Info“ je stará `/chat/` — okrem chatu tam je cenník, služby
a rozcestník na všetko mimo menu, preto sa už nevolá „Chat“.

⚠️ **MENU NIE JE SITEMAPA.** Cenník, Služby, Kontakt a ďalších ~60 URL starého
webu **ostávajú živé** — len sa na ne z hlavnej navigácie neodkazuje. Vstup do
nich vedie cez `/chat/` a pätičku (`src/components/Pata.astro`), preto sa
odtiaľ nič nemaže. Zrušiť tie adresy = zahodiť roky pozícií vo vyhľadávaní.

## Ako to funguje

| Časť | Kde žije |
|---|---|
| **Homepage** (fullscreen hero scéna) | zrkadlo z `../WEB-hero/prototyp/live.html` → `public/index.html` |
| Ďalšie stránky | `src/pages/*.astro` (Astro 6 + Tailwind v4) |
| Staré variantné návrhy A/B/C | `src/pages/archiv/` |

**Homepage sa needituje v tomto repe.** Zdroj pravdy je prototyp `live.html`;
`npm run build` ho pred každým buildom prezrkadlí (`npm run sync-hero`).
Jediný rozdiel oproti prototypu = pridaný `<meta name="robots" content="noindex">`.

## Príkazy

```bash
npm install
npm run dev         # lokálny server
npm run sync-hero   # pretiahne aktuálny prototyp do public/
npm run build       # sync + astro build → dist/
```

## Deploy

`git push` do `main` → GitHub Actions → GitHub Pages → https://stk.digobraz.sk

## Čo kde žije (stav 4. 8. 2026)

| Časť | Kde sa edituje |
|---|---|
| Homepage (hero scéna) | `../WEB-hero/prototyp/live.html` — **nie v tomto repe** |
| Podstránky | `src/pages/*.astro` |
| Články blogu | generuje `plan/scripty/clanky_do_astro.py` z WP exportu — needitovať ručne |
| Kontakt, hodiny, menu | `src/data/firma.ts` (jediný zdroj pravdy) |
| Ceny | `src/data/cennik.ts` — z `vstupy/MASTERPROMPT.md` §8, nikdy z WordPressu |

⚠️ **GitHub Actions púšťa `npx astro build`, nie `npm run build`** — `sync-hero` teda v CI
nebeží a `public/index.html` musí byť commitnutý. Po každej úprave prototypu:
`npm run sync-hero` + commit.

⚠️ **Adresa je Technická ulica, Trnava (smer Dolná Krupá).** „Farárske 27" je stará adresa,
ktorú nesie časť starého webu aj staré články.

Aktuálny stav prác a otvorené otázky: `plan/STAV-NOC-1.md`.
