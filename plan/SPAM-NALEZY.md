# SPAM na starom webe easycheck.sk — čo sa stalo

**Overené 4. 8. 2026.** Do nového webu sa nedostal ani jeden riadok tohto obsahu —
pri konverzii sa odfiltroval. Tento súbor je podklad pre teba, čo s tým na starom WordPresse.

---

## Čo tam je

Do tela stránok je vsunutý **cudzí nemecký text o tuningu, casine a stávkach** —
napísaný tak, aby vyzeral ako blog, s odkazmi von na hazardné weby.

| Stránka | Blokov spamu | Stále živé na easycheck.sk (4. 8. 2026) |
|---|---|---|
| `/kontrola-originality/` | 3 | **áno** — 7 výskytov v HTML |
| `/lehoty-stk/` | 3 | **áno** — 6 výskytov |
| `/priprava-na-stk/` | 3 | **áno** — 3 výskyty |
| `/platne-predpisy-stk/` | 1 | **áno** — 1 výskyt |
| `/povinna-vybava/` | 1 | v HTML sa už nenašlo (v exporte zo 16. 7. ešte bolo) |

**Odkazy, ktoré z tvojho webu vedú von:**
`https://gamrfirst-casino.ch/` (z `/lehoty-stk/`) a `https://gamrfirstcasino.ch/` (z `/kontrola-originality/`).

**6 spam kategórií v blogu je stále indexovaných** — všetky vracajú 200:
`mostbet-kasyn` · `online-casino` · `public` · `1` · `business-small-business` · `uncategorized`.

---

## Kedy sa to stalo

Z dátumov `modified` vo WP exporte:

- **5. 2. 2026** — upravené `lehoty-stk` a `kontrola-originality`
- **17. 2. 2026** — upravené `priprava-na-stk`, `platne-predpisy-stk`, `povinna-vybava`
  a **naraz všetkých 42 článkov blogu**
- **17. 2. 2026** — v ten istý deň vznikol **prázdny článok** `/blog/viete-co-obsahuje-povinna-vybava/`
  (0 slov, žiadny obsah)

Hromadná úprava všetkého v jeden deň nie je práca človeka, ktorý edituje text.
Vyzerá to na **automatický zápis cez prihlásený účet alebo cez zraniteľný plugin**.
Beží to tam **od februára, teda pol roka**.

---

## Ako sa to tam dostalo — čo sa dá povedať a čo nie

**Čo je isté:** niekto alebo niečo malo právo zapisovať do obsahu stránok aj vytvárať
kategórie a články. To v WordPresse zvládne len prihlásený používateľ s právami redaktora
a vyššie, alebo kód, ktorý beží na serveri (plugin, téma, nahratý súbor).

**Čo sa z exportu zistiť nedá:** ktorý účet to bol. WP REST API, cez ktoré máme dáta,
mená autorov úprav nevydáva. Na to treba prístup do administrácie.

---

## Čo s tým — a čo na to potrebujem

Sám to opraviť **nemôžem: do WordPressu easycheck.sk nemám žiadny prístup** (v Keychaine
je len Acuity a WebSupport, nič k WP). Celý doterajší audit bežal cez verejné REST API.

Keď mi dáš prístup do WP administrácie, viem spraviť toto:

1. **Zistiť, kadiaľ sa dnu dostali** — používatelia a ich role, dátumy posledného
   prihlásenia, zoznam pluginov a ich verzie, kedy pribudli súbory v `wp-content`.
2. **Zavrieť dvere.** Bez tohto sa spam o mesiac vráti — sedí tam pol roka, cesta dnu
   je stále otvorená.
3. **Vyčistiť obsah** — odstrániť vsunuté bloky z 5 stránok, zmazať 6 spam kategórií
   aj prázdny článok zo 17. 2.
4. **Odhlásiť u Googlu** — po vyčistení požiadať o preindexovanie tých stránok.

⚠️ Poradie je dôležité: **najprv nájsť cestu dnu, až potom čistiť.** Ak sa vyčistí obsah
a diera ostane, jediné, čo sa zmení, je že o tom nebudeme vedieť.

⚠️ Ak sa na starom webe bude čokoľvek mazať, sprav to **skôr**, než sa začne robiť
301 mapa a prepínať doména — inak budeme presmerúvať na obsah, ktorý sa medzitým zmenil.

---

## Presné bloky, ktoré sa pri konverzii vyhodili

- **kontrola-originality** — „Es war dieses Knacken. Kein Defekt. Eher ein Geräusch, das sagt: hier wurde gearbeitet…"
- **kontrola-originality** — „Wer schon mal… weiß…, wer sein Auto abgegeben hat, kennt dieses Gefühl danach…"
- **kontrola-originality** — „Am Ende steht das Auto da. Nicht geschniegelt. Sondern persönlich…"
- **lehoty-stk** — „Es war nur ein Klick. Kein Feuerwerk. Kein großes Vorher-nachher…"
- **lehoty-stk** — „Wer schon mal… weiß…, wer schon einmal ein Auto hat tunen lassen…"
- **lehoty-stk** — „Am Ende steht das Auto da. Nicht perfekt. Aber richtig…"
- **platne-predpisy-stk** — „Das Spiel von Geschwindigkeit und Stil…" (nalepené priamo za nadpis
  „Platná vyhláška v oblasti technickej kontroly")
- **povinna-vybava** — „Wenn Geschwindigkeit auf Stil trifft…" (nalepené za nadpis
  „POVINNÁ VÝBAVA PRE OSOBNÉ VOZIDLÁ")
- **priprava-na-stk** — „Kennt ihr das Gefühl, wenn ihr in ein Auto steigt, das einfach nicht genug „Bumm" hat?…"
- **priprava-na-stk** — „Wenn du schon mal ein Auto getunt hast, weißt du, was ich meine…"
- **priprava-na-stk** — „Ich glaube, der wahre Kick kommt dann, wenn du das Resultat siehst…"
