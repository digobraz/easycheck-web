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
