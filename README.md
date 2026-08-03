# EASYCHECK web — stk.digobraz.sk (testovacia doména)

Nový web pre Easy Check STK. Testovacia doména, **celý web je `noindex`** —
nesmie kanibalizovať live `easycheck.sk` vo vyhľadávaní.

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
