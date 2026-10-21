# Brand Easy Check STK Trnava — pre AI agentov

Verzia 1.0 · 21. 10. 2026 · smer **SOFT SLAB** · ľudská verzia: `/brand/` · dáta: `/brand/brand.json`

Ak je niečo v rozpore, platí živý web easycheck.sk a jeho `zaklad/zaklad.css`, potom `brand.json`.

---

## Skopíruj do promptu

```
Robíš grafiku alebo text pre Easy Check — stanicu technickej kontroly (STK) v Trnave.
Štýl SOFT SLAB: plné farby, hrubý čierny rámik, oblé rohy, tvrdý tieň bez rozmazania, prerušovaná perforácia vo vnútri karty.

FARBY (vždy plné, nikdy prechody):
- žltá #FFE600 (hlavná), čierna ink #231F20 (text, rámiky, tiene), papier #FFFDF5 (pozadie, nie čistá biela)
- z loga: červená #E12128, zelená #5BBA47, azúrová #18B6E4; sekundárny text #6E6A63
- služby: TK + EK žltá #FFE600 · samostatná TK červená #E12128 · EK zelená #5BBA47 · KO #18B6E4 · ADR/CEMT #FF914B · tachografy #F27BB4 · prihlasovanie #5271FF · výzdvih #14B8A6
- text na žltej/zelenej/azúrovej/oranžovej/ružovej = čierny; na červenej a modrej #5271FF = papierový

PÍSMO: nadpisy Saira Condensed 900, VERZÁLKY, line-height 1,0–1,05 (nikdy pod 1 — mäkčene Ž, Č, Š). Text DM Sans 400/500. Štítky, dátumy a čipy IBM Plex Mono verzálky s riedkym prestrkaním.

TVAR: rámik 3 px #231F20, radius 16 px (tlačidlá a čipy pill 999 px), tieň 6px 6px 0 #231F20. Hlavné tlačidlo = čierna pill, papierový text, žltý tieň 4px 4px 0, šípka →.

LOGO: vždy na žltej #FFE600 alebo papieri; na fotke len na žltej nálepke s čiernym rámikom. Nedeformovať, neprefarbovať, neotáčať.

FOTKY: len reálne fotky zo stanice (hala, technici, vozidlá). Žiadne fotobanky, žiadne AI fotky stanice ani ľudí. Fotka vždy v rámiku s tvrdým tieňom.

TÓN: vykanie. Vecne, prakticky, krátke vety. Najprv informácia, potom detail. Konkrétne čísla. Dátumy „15. 11. 2026“, ceny „65 €“, telefón „033 20 20 211“. Značka sa píše „Easy Check“.

NIKDY: tykanie, POZOR!!!, strašenie a tlak, superlatívy bez dôkazu, „v dnešnej dobe“, vymyslené hodiny/ceny/paragrafy, gradienty, rozmazané tiene, neón, sklo, tenké 1px rámiky, iné písma.
```

---

## Farby

| token | HEX | použitie |
|---|---|---|
| `--y` žltá | `#FFE600` | hlavná farba, podklad loga, hlavička, päta, TK + EK |
| `--ink` | `#231F20` | text, rámiky, tiene, čierny pás |
| `--paper` | `#FFFDF5` | pozadie stránky a kariet |
| `--r` červená | `#E12128` | z loga; zatvorené, štítok |
| `--g` zelená | `#5BBA47` | z loga; otvorené, dnes, EK |
| `--c` azúrová | `#18B6E4` | z loga; fokus, KO |
| `--muted` | `#6E6A63` | sekundárny text |
| svetlá žltá | `#FFF7C2` | otvorená FAQ, hover v tabuľke |

### Farby služieb (cenník, dlaždice, čipy)

| služba | HEX | text |
|---|---|---|
| TK + EK (kompletná) | `#FFE600` | čierny |
| TK samostatne | `#E12128` | papierový |
| EK | `#5BBA47` | čierny |
| KO | `#18B6E4` | čierny |
| ADR a CEMT | `#FF914B` | čierny |
| Tachografy | `#F27BB4` | čierny |
| Prihlasovanie vozidiel | `#5271FF` | papierový, len veľký |
| Výzdvih vozidla | `#14B8A6` | čierny |

### Kategórie blogu

| slug (`kat`) | názov | HEX | text |
|---|---|---|---|
| `sprievodca` | Sprievodca STK | `#FFE600` | čierny |
| `sezona` | Sezóna | `#5BBA47` | čierny |
| `novinky` | Novinky a legislatíva | `#5271FF` | papierový |
| `upozornenia` | Upozornenia | `#E12128` | papierový |
| `zaujimavosti` | Zaujímavosti | `#FF914B` | čierny |
| `zo-stanice` | Zo stanice | `#F27BB4` | čierny |
| `archiv` | Archív — len filter, bez coveru | `#CFC8B6` | čierny |

---

## Typografia

- **Saira Condensed** 700/800/900 — nadpisy, tlačidlá, menu. Verzálky. line-height 1,0–1,05.
- **DM Sans** 400/500/700 — text. line-height 1,45–1,7, max. 70 znakov na riadok.
- **IBM Plex Mono** 400/500 — čipy, dátumy, pás, kicker. Verzálky, letter-spacing 0,08–0,12 em.
- Google Fonts: `https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@600;700;800;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&family=IBM+Plex+Mono:wght@400;500&display=swap`

## Tvar a komponenty

- Rámik `3px solid #231F20`, menší `2.5px`. Radius `16px`, pill `999px`.
- Tieň `6px 6px 0 0 #231F20` (menší 4/3 px). Nikdy blur.
- Perforácia: vnútorná čiara `inset 5px`, `1.5px dashed currentColor`, radius `11px`, opacity `.5` — farbou textu karty.
- Hover: karta sa „zatlačí“ — `translate(3px,3px)`, tieň na polovicu.
- Tlačidlo hlavné: čierna pill, Saira 800 verzálky, tieň `4px 4px 0 #FFE600`. Svetlé: papier, tieň čierny.
- Čip: Plex Mono verzálky 0,68 rem, pill, rámik 2,5 px, výplň farbou služby.
- Pás: čierny pruh, Plex Mono verzálky, pomaly bežiaci, žlté pills.

## Logo

- Súbory: `/easycheck-logo.svg` (2126 : 1031), symbol `/ikony/easycheck-symbol.svg`.
- Podklad: žltá alebo papier. Na fotke/tmavej ploche len na žltej nálepke s rámikom.
- Ochranná zóna: 1/4 výšky loga. Min. šírka 120 px, symbol 24 px.
- Nerob: deformácia, prefarbenie, otočenie, logo priamo na fotke, tieň/obrys na písmenách, prepis nápisu iným písmom.

## Ikony a ilustrácie

Vozidlá: štýl **variant C** — hrubý čierny obrys so zaoblenými koncami + jedna plochá žltá výplň. Súbory v `/ikony/`, celá kolekcia `/ikony/kie/variant-C.png`.

Prompt pre novú ilustráciu (kie.ai / gpt-image):

```
Flat vector illustration of {MOTÍV}, thick uniform black outline (#231F20, about 6% of the object height) with fully rounded line caps and joins, simple geometric shapes, exactly one flat accent fill in bright yellow #FFE600, everything else white or off-white #FFFDF5, side view where it makes sense, no text, no letters, no shadows, no gradients, no ground line, plain off-white background #FFFDF5, bold friendly look, very few details, instantly readable silhouette.
```

## Fotografie

Reálne fotky zo stanice v `/foto/`. Žiadne fotobanky ani AI fotky stanice či ľudí. Bez filtrov. Vždy v rámiku. Na sociálnych sieťach rozmazať EČV a tváre zákazníkov bez súhlasu.

## Tón hlasu

Vykanie. Vecne, krátke vety, konkrétne čísla. Max. jeden výkričník.

| zle | dobre |
|---|---|
| Vodiči, POZOR! Neriskujte zbytočné problémy na cestách! | Platnosť STK si overíte za pár sekúnd. Ak vám končí, termín nájdete online. |
| Toto je zďaleka najjednoduchšia a najlepšia možnosť! | Na STK nemusíte ísť. Vyzdvihneme, skontrolujeme, vrátime. |
| Prečítaj si aké máme novinky na STK stanici! | Čo je nové na stanici: tri zmeny, ktoré skrátia vašu kontrolu. |
| V dnešnej dobe je bezpečnosť dôležitejšia ako kedykoľvek predtým. | Brzdy, svetlá, pneumatiky. Toto sa kontroluje najčastejšie. |

Otváracie hodiny, ceny a sviatky nikdy z pamäti — vždy z aktuálneho webu alebo od stanice.

---

## Obrázky pre blog a sociálne siete

**Princíp:** plocha vo farbe kategórie + reálna fotka ako nálepka (rámik, tvrdý tieň), ľavý horný roh fotky prekrýva žlté logo + veľký nadpis Saira 900 + čip s kategóriou + čierny pás dole (easycheck.sk · 033 20 20 211 · STK Trnava).

| formát | rozmer | na čo |
|---|---|---|
| `blog` | 1200 × 630 | cover článku, OG obrázok |
| `fb` | 1200 × 630 | FB príspevok s odkazom |
| `wide` | 1920 × 1080 | 16:9 |
| `ig` | 1080 × 1350 | IG / FB príspevok 4:5 |
| `story` | 1080 × 1920 | story; hore 250 px a dole 340 px nič dôležité |

**Šablóna:** `/brand/sablony/cover.html?nadpis=Zimné%20pneumatiky&kat=sezona&format=blog&foto=img_2140`

Parametre: `nadpis` (max. ~45 znakov, `|` = nový riadok) · `kat` · `format` · `foto` (meno z `/foto/` bez .jpg, cesta `/…`, alebo `ziadna`) · `pod` (podnadpis) · `chip` · `slovo` · `pozicia` (object-position) · `vodidla=1`.

**Export do PNG:** okno presne na rozmer formátu → počkať na `html[data-hotovo]` → screenshot.

```js
// Playwright
await page.setViewportSize({ width: 1200, height: 630 });
await page.goto('https://…/brand/sablony/cover.html?nadpis=Lehoty%20STK&kat=sprievodca&foto=img_7299');
await page.waitForSelector('html[data-hotovo]');
await page.screenshot({ path: 'lehoty-stk.png' });
```

Fotky v `/foto/`: `hala` (chrobák na linke), `img_2140` (meranie, malé auto), `img_4781` (hala, kamión), `img_5020` (chrobák pred budovou), `img_7299` (linka, motorka), `img_7424` (hala, auto), `img_7703` (vstup do budovy), `img_9260` a `img_9365` (chrobáky), `optimus-2376`, `optimus-7328`, `optimus-vstup` (robot pri vjazde).

**Nerob:** text cez fotku bez plochy · viac fotiek na jednom coveri · logo mimo žltej nálepky · AI fotky · nadpis nad 3 riadky na landscape · iné písma, gradienty, rozmazané tiene.
