# STAV — NOC 1 (3. → 4. 8. 2026)

**Web beží:** https://stk.digobraz.sk · **repo:** `vystupy/stk-web/` · celý web je `noindex`
**Postavené:** 61 stránok · **overené naživo** o 23:20, nie „malo by to fungovať"

---

## Čo je hotové

| Bod zadania | Stav | Overenie |
|---|---|---|
| **A) 42 článkov 1:1** | ✅ | všetkých 42 URL `/blog/<slug>/` vracia **200** (skript prešiel zoznam `plan/clanky-urls.txt`) |
| Obrázky článkov | ✅ | 128 súborov v `public/blog/`, vzorka 12 naživo = 200 |
| Chýbajúce H1 a meta description | ✅ | H1 renderuje layout z front-mattera → má ho každý článok. Meta description: kde WP nemal, doplnená z prvej vety |
| 16 dlhých titles | ✅ | žiadny `<title>` nad 60 znakov na celom webe |
| `/clanky/` index + 4 živé kategórie | ✅ | filter oznamy / užitočné info / tipy / zaujímavosti, spam kategórie sa neprenášali |
| Prázdny článok `viete-co-obsahuje-povinna-vybava` | ✅ | URL žije, obsah prázdny, `noindex` **natvrdo aj po prepnutí domény** |
| **B) `/cennik/`** | ✅ | 52 cien z MASTERPROMPT §8, nič z WordPressu |
| **B) `/sluzby/`** | ✅ | kotvy `#tachografy`, `#prihlasovanie`, `#vyzdvihnutie`, `#vyhody` + odkaz na `/kontrola-originality/` |
| **B) `/kontakt/`** | ✅ | adresa, mapa, hodiny, telefón, LocalBusiness JSON-LD |
| **C) 7 stránok mimo menu** | ✅ | jednotný layout: veta → chat placeholder → akordeóny → pätička zdroja. V navigácii nie sú |
| **D) `/uzitocne-informacie/`** | ✅ | chat placeholder + tlačivá + jeden nenápadný riadok „Alebo si to prečítaj celé →" na 7 stránok |
| **E) Hero — adresa + mapa** | ✅ | v modrom info bloku pod glóbusom, editované v prototype `WEB-hero/prototyp/live.html` |
| `npm run build` | ✅ | prejde, 61 stránok |
| Mobil 360 px | ✅ | 14 stránok premeraných s **rozbalenými** akordeónmi, nikde vodorovný scroll |

Menu má presne 7 položiek: Domov · Cenník · Služby · Info · Blog · Kontakt + REZERVOVAŤ.

---

## 🔴 Čo som našiel a čo s tým treba spraviť

### 1. Starý web má v obsahu vsunutý spam (nemecké casino texty)
Nie je to len 6 spam kategórií v blogu — **cudzí text je priamo v tele stránok**:
`kontrola-originality`, `lehoty-stk`, `platne-predpisy-stk`, `povinna-vybava`, `priprava-na-stk`.
11 blokov, zoznam v **`plan/SPAM-NALEZY.md`**.
Do nového webu sa nepreniesol ani jeden — pri konverzii sa odfiltroval.
**Pre teba:** niekto má prístup do WP a píše ti do stránok. Prezrieť používateľov, nielen zmazať kategórie.

### 2. Hero mal nefunkčné telefónne číslo a mŕtvu navigáciu
- **Adresa: platí TECHNICKÁ ULICA** (Matej, 4. 8. 2026). V noci som ju omylom prepísal na
  „Farárske 27" podľa MASTERPROMPT §4 — vrátené späť a opravené aj v MASTERPROMPTe.
  ⚠️ Starý web si protirečí: homepage a cenník píšu Technickú, kontakt a zákonné stránky Farárske 27.
  **10 starých článkov má v texte „Farárske 27, smer Dolná Krupá"** — články sa neprepisujú (sú 1:1),
  rozhodni, či ich hromadne opraviť.
- **Navigácia z homepage bola mŕtva.** Tlačidlá Služby/Cenník/Info/Kontakt/Blog v hero scéne
  (desktop aj mobilné menu) boli `<button>` bez jediného handlera — z domovskej stránky sa
  nedalo prekliknúť nikam. Preto si tie stránky nevidel. Teraz sú to `<a href>`, overené klikom.
- Odkaz na telefón bol `tel:033202021` — **o číslicu menej**, z mobilu sa nikto nedovolal. Opravené na `tel:+421332020211`.
- Homepage nemala **žiadny `<title>`** okrem slova „EASYCHECK", **žiadnu meta description** a **žiadny H1**. Doplnené (H1 je vizuálne skrytý, scéna ho nesie obrazom). Keď sa titulok v prototype zmení, treba prepísať kotvu v `scripts/sync-hero.mjs` — inak sync spadne (zámerne).

### 3. Lehoty a kategórie vozidiel boli na starom webe LEN AKO OBRÁZKY
Tabuľka lehôt TK/EK a tabuľka kategórií L/M/N/O/T… boli JPG. Google z nich nemal ani slovo.
Prepísal som ich z obrázka do textu (`plan/wp-texty/lehoty-tabulka.md`, `kategorie-tabulka.md`)
a na webe sú ako skutočné HTML tabuľky.
**Pre teba:** ⚠️ prepis robil Claude z obrázka — **prosím prejdi čísla v tabuľke lehôt**, je to zákonný obsah.

### 4. Otváracie hodiny — dva rôzne údaje
Starý web píše všade `07:00–22:00`, MASTERPROMPT §5 hovorí `Po–Pia 07:00–19:00`, So `07:00–13:00`,
Ne zatvorené, sviatky `07:00–15:00`, na dohodu `19:00–23:00`. Hero už mal 19:00.
**Použil som MASTERPROMPT** — je novší a hero s ním sedí. Ak platí 22:00, treba zmeniť na jednom mieste:
`src/data/firma.ts` → `HODINY`.

---

## Čo NIE JE hotové (a prečo)

**Zámerne mimo zadania** (bolo v „⛔ Čo NErobiť"): chat, admin panel, scrapery TESTEK/SLOVDEKRA,
301 presmerovania, prepnutie na ostrú doménu.

**Chýbajúce staré URL — 5 stránok, ktoré tento web ešte nemá.** Na testovacej doméne vracajú 404,
pred prepnutím na ostrú doménu musia existovať (inak strata pozícií a rozbité odkazy):

| URL | Prečo je dôležitá |
|---|---|
| `/rezervacia/` | **95 interných odkazov = najlinkovanejšia URL celého webu** |
| `/koleso-stastia/` | 47 odkazov, živá mechanika. CTA na ňu som zo `/sluzby/` dočasne vybral, aby nevracalo 404 |
| `/rezervacia-vip/` | živý VIP flow |
| `/dakujeme/` | potvrdenie po formulári (má byť noindex) |
| `/brand-manual/` | má byť noindex |

`/ochrana-osobnych-udajov/` som postavil, ale **prevzatú 1:1** (137 slov + odkaz na PDF).
Právny text som nevymýšľal — čaká na teba, plán ho má prepísať.

---

## ❓ Rozhodnutia, ktoré potrebujem od teba

1. **Prejsť tabuľku lehôt TK/EK** (bod 3 vyššie) — prepis z obrázka, zákonný obsah.
2. **Otváracie hodiny** — 19:00 alebo 22:00? (bod 4)
3. **Prázdny článok `/blog/viete-co-obsahuje-povinna-vybava/`** — dopísať obsah, alebo nechať prázdny
   a 301 na `/povinna-vybava/`? Dnes: stránka žije, prázdna, noindex.
4. **Cenník — chýbajúce položky.** MASTERPROMPT §8 nemá to, čo starý web mal:
   kompletné STK balíčky (TK+EK spolu), tacho servis (overenie tachografu 164 / 216 / 308 €),
   príplatky za ďalšiu nápravu, váženie, opis protokolu, 3. opakované meranie, extra servis.
   Ak sa tie služby robia, cenník na webe je neúplný.
5. **Promo akcie na `/sluzby/`** — „Tachograf za polovicu" a „STK zdarma?" sú prevzaté zo starého webu
   a z homepage. Platia v roku 2026? Ak nie, treba ich zmazať na oboch miestach.
6. **Vysvetlivka ku KO** („v cene je tlačivo Odborný posudok, nálepky sa pripočítavajú zvlášť")
   je zo starého webu, v MASTERPROMPTe nie je. Platí?
7. **Sekundárne kontakty** `0908 731 178` a `trnava.stk@gmail.com` — dal som ich na `/kontakt/`
   ako doplnkové. Sú stále aktívne?
8. **Overovacie odkazy, ktoré nikde inde nie sú:** `jiscd.sk` (overenie TK) a `seka.sk/overenie-vozidla`
   (overenie EK). Boli len na starej `/uzitocne-informacie/`. Kam s nimi — do chatu, alebo na stránku?
9. **12 častých otázok** zo starej `/uzitocne-informacie/` (pokuty, výmena ŠPZ, dezén, OBD, zadržanie
   osvedčenia) sa nikam nezmestilo — je to podklad pre chat, nie pre stránku. Potvrdiť, že tam idú.
10. **Fáza 0 z plánu stále čaká na teba:** zmazať 6 spam kategórií vo WP, prezrieť WP používateľov,
    export Google Search Console za 16 mesiacov (bez neho sa nedá spraviť 301 mapa).

---

## Technické poznámky pre ďalšiu session

- **Homepage sa needituje v repe.** Zdroj pravdy `../WEB-hero/prototyp/live.html`,
  `npm run build` ho zrkadlí do `public/index.html`. **GitHub Actions púšťa `npx astro build`,
  nie `npm run build`** — sync-hero teda v CI NEbeží, `public/index.html` musí byť commitnutý.
- Články generuje `plan/scripty/clanky_do_astro.py` z WP exportu — súbory v `src/content/blog/`
  sa needitujú ručne, prepíše ich ďalší beh.
- Vyčistené texty starých stránok (bez navigácie a spamu) sú v `plan/wp-texty/`.
- Brief, podľa ktorého stavali subagenti: `plan/BRIEF-AGENT.md` (farebná logika, tón, zákazy).
- Chytená chyba, ktorú by build nikdy nenahlásil: položka gridu má `min-width:auto`, takže
  široká tabuľka v akordeóne roztlačila celú stránku na mobile. Opravené v `InfoStranka.astro`,
  premerané na 360 px s rozbalenými akordeónmi.
- `noindex` sa pri prepnutí na ostrú doménu mení na **jednom mieste**: `src/layouts/Web.astro`
  (prop `robots`) + `public/robots.txt` + sync-hero. Prázdny článok si `noindex` drží sám.
