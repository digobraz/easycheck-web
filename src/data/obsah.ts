/**
 * Autentický obsah homepage easycheck.sk — vytiahnuté z WP exportu (vstupy/wp-export/wp_full.json).
 * Texty sú Matejove, needitované. Rezervácia = existujúca Acuity (klasik.as.me), logika sa zatiaľ nemení.
 */

export const FIRMA = {
  nazov: "Easy Check",
  popis: "Stanica technickej kontroly Trnava",
  adresa: "Technická ulica, Trnava (smer Dolná Krupá)",  // Farárske 27 = stará adresa (Matej 4.8.2026)
  tel: "033 202 02 11",
  telHref: "tel:0332020211",
  mail: "stk@easycheck.sk",
  hodiny: "Po–Pia 07:00–19:00 · So 07:00–13:00 · sviatky 07:00–15:00",
  recenzie: 5542,
  hodnotenie: "4,8",
};

export const REZERVACIA = "https://klasik.as.me/KLASIK-OSOBNE-VOZIDLA-Technicka-Emisna-kontrola";

/**
 * ============================================================
 * FAREBNÁ LOGIKA (odvodená z loga: EASY = zelená, CHECK = červená)
 * ------------------------------------------------------------
 * Farba nie je dekorácia. Každá niečo znamená:
 *
 *   yellow #FFE600  PLOCHA. Nesie stránku. NIE je akcent — na žltej sa
 *                   akcentuje inkom. Žltá nikdy neoznačuje kategóriu.
 *   ink    #231F20  Obrys, text, primárne CTA na žltej ploche.
 *   red    #E12128  "CHECK" = úkon kontroly. STK, emisná, KO, ADR/CEMT.
 *                   Čokoľvek, čo si u nás objednávaš ako kontrolu.
 *   green  #5BBA47  "EASY" = čo ide hladko. Výhody, zľavy, pre ľudí,
 *                   potvrdenie, "vybavíme za vás".
 *   cyan   #18B6E4  MASKOT = vysvetlenie a pomoc. Info, dostupnosť,
 *                   otváracie hodiny, "ako to funguje".
 *   paper  #FFFDF5  Neutrálny obsah bez kategórie.
 *
 * Pravidlo: v jednom rade nemiešaj viac než 2 kategórie.
 * ============================================================
 */
export type Kat = "kontrola" | "easy" | "info" | "neutral";

export const KAT_FARBA: Record<Kat, string> = {
  kontrola: "bg-ec-red text-white",
  easy: "bg-ec-green text-white",
  info: "bg-ec-cyan text-white",
  neutral: "bg-ec-paper",
};

/** Hlavné USP z hero sekcie — verbatim */
export const USP = ["Termín ihneď", "Non-stop", "Bez stresu", "Všetko na jednom mieste"];

/**
 * Hero nadpis — POZOR, ZMENA oproti starému webu (návrh, čaká Matejovo OK).
 * Starý web mal celú vetu ako H1 = 7 riadkov textu, nečitateľné.
 * "STK bez stresu" = ich vlastný FB headline + brand manuál ho špecifikuje
 * ako hero (01 Hero, 120px). Veta zostáva, len sa posunula pod nadpis.
 * Font: Saira Condensed 800 (Anton vyradený 2026-07-22).
 */
export const HERO = {
  nadpis: "STK bez stresu",
  lead: "Transformujeme nepríjemnú STK-čku na bezstarostný zážitok.",
  pod: "Celá objednávka vám zaberie iba 30 sekúnd.",
};

/** Ponuka — 6 blokov, verbatim texty + odkazy na existujúcu rezerváciu */
export const PONUKA = [
  {
    nadpis: "STK ihneď",
    text: "Vykonávame technické a emisné kontroly pre všetky druhy vozidiel, BEZ ČAKANIA.",
    cta: "Rezervovať termín STK",
    href: "https://klasik.as.me/KLASIK-OSOBNE-VOZIDLA-Technicka-Emisna-kontrola",
    kat: "kontrola" as Kat,
  },
  {
    nadpis: "Viac než KO",
    text: "Kontrola originality na počkanie + bezplatná pomoc pri prihlasovaní vozidla, celý proces vybavíme za vás!",
    cta: "Rezervovať termín KO",
    href: "https://klasik.as.me/KLASIK-OSOBNY-AUTOMOBIL-Kontrola-originality",
    kat: "kontrola" as Kat,
  },
  {
    nadpis: "Tacho servis",
    text: "U nás nájdete všetko na jednom mieste STK a TACHOGRAF vybavíte za jeden deň!",
    cta: "Rezervovať termín tacho",
    href: "https://klasik.as.me/tachograf-2-gen",
    kat: "kontrola" as Kat,
  },
  {
    nadpis: "ADR aj CEMT",
    text: "Pomôžeme vám aj s ADR či CEMT. Naši technici sa dokonale vyznajú v nákladných vozidlách.",
    cta: "Rezervovať termín",
    href: "https://klasik.as.me/TAHAC-ADR-TK-A-EK",
    kat: "kontrola" as Kat,
  },
  {
    nadpis: "Bez byrokracie",
    text: "Nestresujte sa s prihlasovaním, stačí jeden podpis a o všetko sa postaráme my!",
    cta: "Viac o službe",
    href: "/sluzby/#prihlasovanie",
    kat: "easy" as Kat,
  },
  {
    nadpis: "Extra služby",
    text: "V našom portfóliu služieb nájdete aj razenie vin čísel či evidenciu vozidiel.",
    cta: "Naša ponuka",
    href: "/sluzby",
    kat: "neutral" as Kat,
  },
] as const;

/** Dostupnosť — verbatim */
export const DOSTUPNOST = [
  {
    stitok: "Garancia do 24 hodín!",
    nadpis: "Nepovieme vám nie",
    text: "Už nemusíte čakať na termín, stačí sa objednať alebo zavolať a už dnes môžete byť na linke!",
  },
  {
    stitok: "Otvorené non-stop",
    nadpis: "Cez týždeň do 22:00",
    text: "Ako jediná STK na Slovensku sme otvorení do neskorej noci, od 07:00 až do 22:00.",
  },
  {
    stitok: "Víkendy aj sviatky",
    nadpis: "Aj počas voľna",
    text: "STK si môžete pohodlne naplánovať na víkend či sviatok. Jediná otvorená STK na Slovensku.",
  },
];

/** Výhody — verbatim, rozdelené pre ľudí / pre firmy */
export const VYHODY_LUDIA = [
  {
    nadpis: "Každý zákazník vyhráva!",
    text: "Prídite na kontrolu, pridajte hodnotenie na googli a zatočte kolesom!",
  },
  { nadpis: "Opakovačka zdarma!", text: "Časovo obmedzená akcia!" },
  {
    nadpis: "Výzdvih zdarma",
    text: "Na STK už nemusíte chodiť! Pre vaše vozidlo si prídeme, vykonáme kontrolu a vrátime vám ho naspäť. Služba je ZDARMA pre Trnavu a +15 km okolie.",
  },
];

export const VYHODY_FIRMY = [
  {
    nadpis: "Tachograf za polovicu!",
    text: "Stačí ak u nás s vozidlom absolvujete STK-áčku a na overenie tachografu máte automaticky 50 % zľavu!",
  },
  {
    nadpis: "STK zdarma?",
    text: "Objednajte si u nás montáž tachografu a kompletnú kontrolu STK máte celkom ZDARMA!",
  },
];

/** Ceny z /rezervacia — najčastejšie úkony */
export const CENY = [
  { co: "Automobil", pozn: "Bežné auto", cena: "115,-" },
  { co: "Automobil NKAT / BKAT", pozn: "Staršie ročníky", cena: "129,50,-" },
  { co: "Elektromobil, LPG, CNG", pozn: "Alternatívny pohon, hybrid", cena: "155,-" },
  { co: "Motocykel L3, L4, L6", pozn: "Malý motocykel", cena: "41,-" },
  { co: "Motocykel L5, L7", pozn: "Veľký motocykel", cena: "57,50,-" },
  { co: "Opakovaná", pozn: "V deň pravidelnej", cena: "19,-" },
];

export const NAV = [
  { t: "Naša ponuka", h: "/sluzby" },
  { t: "Cenník", h: "/cennik" },
  { t: "Užitočné informácie", h: "/uzitocne-informacie" },
  { t: "Blog", h: "/clanky" },
  { t: "Kontakt", h: "/kontakt" },
];

/**
 * ============================================================
 * PIEDESTÁL — výber vozidla (prototyp 2, sci-fi)
 * ------------------------------------------------------------
 * NIE je to dekorácia. Acuity má 72 odkazov kľúčovaných presne
 * podľa kategórie vozidla × úkonu — takže "vyber si vozidlo na
 * piedestáli" = prvý krok objednávky. Výber → cena + čas → CTA
 * vedie rovno na správny Acuity odkaz.
 * Ceny a časy: z /rezervacia (ceny overené), časy = odhad ⏳ Matej.
 * ============================================================
 */
export const VOZIDLA = [
  {
    id: "auto",
    nazov: "Osobné auto",
    kod: "M1",
    popis: "Bežné auto, benzín alebo diesel.",
    cena: "115,-",
    cas: "~30 min",
    ukony: ["Technická kontrola", "Emisná kontrola", "Kontrola originality"],
    href: "https://klasik.as.me/KLASIK-OSOBNE-VOZIDLA-Technicka-Emisna-kontrola",
  },
  {
    id: "kamion",
    nazov: "Nákladné vozidlo",
    kod: "N3",
    popis: "Ťahač, súprava, náves. Vrátane ADR a CEMT.",
    cena: "od 72,-",
    cas: "~60 min",
    ukony: ["Technická + emisná", "Tachograf", "ADR / CEMT"],
    href: "https://klasik.as.me/KLASIK-NAKLADNE-VOZIDLA-SOLO-Technicka-Emisna-kontrola",
  },
  {
    id: "motorka",
    nazov: "Motocykel",
    kod: "L3",
    popis: "Motocykel, trojkolka, štvorkolka.",
    cena: "41,-",
    cas: "~20 min",
    ukony: ["Technická kontrola", "Kontrola originality"],
    href: "https://klasik.as.me/Technicka-kontrola-motocykel-trojkolka-stvorkolka",
  },
] as const;
