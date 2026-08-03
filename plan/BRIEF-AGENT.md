# BRIEF pre agenta — nový web easycheck.sk (Astro 6 + Tailwind v4)

Repo: `~/AI/EASYCHECK/vystupy/stk-web/` · testovacia doména https://stk.digobraz.sk
Celý web je `noindex` (rieši to layout, nič nepridávaj).

## Firmy a tón
Easy Check = stanica technickej kontroly Trnava. Cieľovka: vodiči osobných áut + firmy s flotilou.
**Tón: vecný, praktický, dôveryhodný.** Ľudia chcú informáciu, nie príbeh.
Slovenčina s plnou diakritikou. Vykanie. Žiadne buzzwordy, žiadne „v dnešnej dobe“,
žiadne fear marketing frázy, žiadne zdrobneniny. Krátke vety.

**Nevymýšľaj fakty.** Ceny, lehoty, zákony a kontakty ber výhradne zo zdrojov,
ktoré máš v zadaní. Keď niečo nevieš, nechaj to von a napíš to do svojho reportu.

## Čo NEROBIŤ
- Nesahaj na cudzie súbory — vlastníš len tie, ktoré máš vymenované v zadaní.
- Nespúšťaj `npm run build`, `npm run dev` ani `git` príkazy. Build a commit rieši hlavná session.
- Nemeň `src/styles/global.css`, `src/layouts/Web.astro`, `src/data/firma.ts`,
  `src/components/*`, `public/index.html` — tie vlastní hlavná session.
- Nerob chat, admin panel ani scrapery. Placeholder na chat je hotový komponent.
- Nevytváraj nové URL nad rámec zadania.

## Kostra, ktorú používaš

```astro
---
import Web from "../layouts/Web.astro";
import { KONTAKT, HODINY, REZERVACIA } from "../data/firma";
---
<Web titul="… max 60 znakov …" popis="… meta description, 120–155 znakov …">
  <!-- obsah -->
</Web>
```

`Web.astro` dodá `<head>`, hlavičku s menu, pätičku aj `noindex`. Ty píšeš len obsah do `<main>`.

Komponenty k dispozícii:
- `import Akordeon from "../components/Akordeon.astro";` → `<Akordeon otazka="…"><p>…</p></Akordeon>`
  (natívny `<details>`, obsah je vždy v HTML aj keď je zabalený — Google ho číta)
- `import ChatMiesto from "../components/ChatMiesto.astro";` → `<ChatMiesto />` alebo `<ChatMiesto velky />`
- `import InfoStranka from "../layouts/InfoStranka.astro";` — hotový layout 7 info stránok
  (props: `titul`, `popis`, `h1`, `odpoved`, `zdroj`; do slotu idú `<Akordeon>`y)

Dáta: `src/data/firma.ts` → `KONTAKT` (adresa, tel, telHref, mail, mapa), `HODINY`,
`MENU`, `MIMO_MENU`, `REZERVACIA`, `KATEGORIE`, `OVERENE_DNA`.

## Vizuálny jazyk — neo-brutalizmus (je v `global.css`, len ho používaj)

Triedy: `nb` (obrys), `nb-card` (obrys + tvrdý tieň), `nb-btn` (tlačidlo),
`nb-tag` (štítok), `nb-shadow` / `nb-shadow-sm`, `nb-lift` (hover), `nb-dots`,
`t-display` (Saira Condensed 800, veľké nadpisy, UPPERCASE), `t-sub` (štítky, UPPERCASE),
`t-num` (tabuľkové číslice), `ec-proza` (bežný text z WP), `ec-scroll-x` (obal pre široké tabuľky).

Farby — **farba nie je dekorácia, každá niečo znamená:**
| trieda | farba | význam |
|---|---|---|
| `bg-ec-yellow` #FFE600 | žltá | PLOCHA, nesie stránku. Nikdy neoznačuje kategóriu. |
| `bg-ec-red` #E12128 | červená | ÚKON KONTROLY — TK, EK, KO, ADR/CEMT |
| `bg-ec-green` #5BBA47 | zelená | čo ide hladko — výhody, zľavy, „vybavíme za vás“ |
| `bg-ec-cyan` #18B6E4 | cyan | INFO a pomoc — dostupnosť, hodiny, „ako to funguje“ |
| `bg-ec-paper` #FFFDF5 | papier | neutrálny obsah |
| `text-ec-ink` #231F20 | ink | text a obrysy |

Pravidlá: ostré rohy (žiadny `rounded-*`), tvrdý tieň (žiadny `shadow-lg`), žiadne gradienty.
**V jednom rade nemiešaj viac než 2 kategórie farieb.**

## Technické minimum
- Šírka obsahu: `max-w-[1100px] mx-auto px-4` (textové stránky `max-w-[860px]`).
- Presne **jeden `<h1>`** na stránku. Podnadpisy `<h2>`/`<h3>`.
- Odkazy vždy s koncovým lomítkom: `/cennik/`, `/blog/<slug>/`.
- Široká tabuľka musí scrollovať sama: `<div class="ec-scroll-x"><table …>`. Stránka
  sa **nikdy** nesmie posúvať vodorovne (skontroluj 360 px).
- Telefón vždy cez `KONTAKT.telHref`, nikdy natvrdo.
- Žiadny externý JS/CDN, žiadne nové npm balíky.
- Píš `.astro`, nie React. Komentáre v kóde po slovensky, len tam kde vysvetľujú „prečo“.

## Zdroje obsahu
- `plan/wp-texty/<slug>.md` — vyčistený text starej stránky (bez navigácie a bez spamu).
  ⚠️ Na konci každého dumpu je starý pätičkový blok („NON-STOP PRE VÁS“, kontakty,
  `07:00 - 22:00`) — **ten ignoruj**, pätičku rieši layout a hodiny sú iné (viď nižšie).
- `~/AI/EASYCHECK/vstupy/MASTERPROMPT.md` — profil firmy + cenník 2026 (jediný platný zdroj cien).
- Otváracie hodiny sú **Po–Pia 07:00–19:00, So 07:00–13:00, Ne zatvorené, sviatky 07:00–15:00,
  na dohodu 19:00–23:00** (MASTERPROMPT §5). Starý web píše 07:00–22:00 — to je neaktuálne.

## Report na konci
Vráť: zoznam súborov, ktoré si vytvoril, čo si vynechal a prečo, a každý fakt,
o ktorom si si nebol istý (pôjde Matejovi na potvrdenie). Buď konkrétny, žiadne „hotovo“.
