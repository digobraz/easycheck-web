/**
 * Dáta pre /rezervacia/ — najlinkovanejšia URL starého webu (95 interných odkazov).
 * Zdroj: plan/wp-texty/rezervacia.md (dump https://easycheck.sk/rezervacia/).
 *
 * ⚠️ CENY zo starého webu (cenník platný k 01.01.2025) sa NEPOUŽÍVAJÚ — sú neaktuálne.
 * Namiesto ceny má každá skupina odkaz na /cennik/ (pole `cennik`, kotvy #tk/#ek/#ko/
 * #administrativna existujú v src/data/cennik.ts + src/pages/cennik.astro).
 *
 * Acuity odkazy (klasik.as.me/...) sú prenesené znak po znaku zo zdroja — vrátane
 * nekonzistentného veľkého/malého „K" v „Klasik"/„klasik", to je vlastnosť pôvodných
 * odkazov, nie preklep. NEZJEDNOCOVAŤ.
 *
 * Niektoré položky v zdroji zdieľajú identický Acuity odkaz (viď komentáre pri
 * „⚠️ ZDIEĽANÝ ODKAZ") — to je stav starého webu, nie chyba tohto prepisu.
 * Nahlásené v reporte agenta, Matej by mal overiť s Acuity, či to naozaj vedie
 * na správny typ kontroly.
 */

export interface RezervacnyUkon {
  nazov: string;
  popis?: string;
  url: string;
}

export interface RezervacnaSkupina {
  nazov: string;
  /** kód vozidla podľa vyhlášky, ako v zdroji (napr. „M1, N1") */
  poznamka?: string;
  ukony: RezervacnyUkon[];
}

export interface RezervacnaKategoria {
  id: string;
  nazov: string;
  /** farba štítku: červená = úkon kontroly, zelená = doplnková služba/vybavíme za vás */
  farba: "red" | "green";
  uvod?: string;
  skupiny: RezervacnaSkupina[];
  /** kotva v /cennik/, ak táto kategória tam má svoju tabuľku cien */
  cennik?: string;
  /** odkaz na existujúcu podrobnú stránku webu (napr. /kontrola-originality/) */
  viacInfo?: { href: string; text: string };
  /** položky bez rezervačného odkazu — zdroj mal len text alebo mŕtvy odkaz „#" */
  bezOdkazu?: { nazov: string; popis?: string }[];
}

// ---------------------------------------------------------------------------
// Opakovane použité Acuity odkazy — v zdroji sa reťazec objavuje viackrát,
// tu je len raz, nech sa neprepisuje ručne a nevznikne preklep.
// ---------------------------------------------------------------------------

/** „Zvláštna technická kontrola — čiastkového rozsahu" pre osobné vozidlá aj motocykle (zdroj ju used opakovane). */
const OSOBNE_TK_ZVLASTNA =
  "https://Klasik.as.me/KLASIK-OSOBNE-VOZIDLA-zvlastna-Technicka-kontrola-ciastkoveho-rozsahu";

/** „Zvláštna technická kontrola — čiastkového rozsahu" pre nákladné vozidlá (opakovane naprieč viacerými skupinami v zdroji). */
const NAKLADNE_TK_ZVLASTNA =
  "https://Klasik.as.me/KLASIK-NAKLADNE-VOZIDLA-Zvlastna-kontrola-ciastkoveho-rozsahu";

// ---------------------------------------------------------------------------
// 1 · Osobné vozidlá do 3,5 t
// ---------------------------------------------------------------------------

export const OSOBNE: RezervacnaKategoria = {
  id: "osobne",
  nazov: "Osobné vozidlá do 3,5 t",
  farba: "red",
  uvod: "Bežný benzínový a dieselový pohon, staršie ročníky aj alternatívny pohon.",
  cennik: "#tk",
  skupiny: [
    {
      nazov: "Kompletná STK — technická aj emisná kontrola naraz",
      ukony: [
        {
          nazov: "Automobil",
          popis: "Bežné auto",
          url: "https://Klasik.as.me/KLASIK-OSOBNE-VOZIDLA-Technicka-Emisna-kontrola",
        },
        {
          nazov: "Automobil NKAT / BKAT",
          popis: "Staršie ročníky — špinavý benzín",
          url: "https://Klasik.as.me/KLASIK-OSOBNE-VOZIDLA-Technicka-Emisna-kontrola-BKAT-NKAT",
        },
        {
          nazov: "Elektromobil, LPG, CNG",
          popis: "Alternatívny pohon — hybrid",
          url: "https://Klasik.as.me/KLASIK-OSOBNE-VOZIDLA-Technicka-Emisna-kontrola-HYBRID",
        },
        {
          nazov: "Motocykel L3, L4, L6",
          popis: "Malý motocykel",
          url: "https://klasik.as.me/motocykel-L3-L4-L6",
        },
        {
          nazov: "Motocykel L5, L7",
          popis: "Veľký motocykel",
          url: "https://klasik.as.me/motocykel-L5-L7",
        },
      ],
    },
    {
      nazov: "Technická kontrola",
      poznamka: "benzín, diesel",
      ukony: [
        {
          nazov: "Pravidelná",
          popis: "opakovaná po inej stanici",
          url: "https://Klasik.as.me/KLASIK-OSOBNE-VOZIDLA-Technicka-kontrola",
        },
        {
          nazov: "Opakovaná",
          popis: "do 60 dní od pravidelnej",
          url: "https://Klasik.as.me/KLASIK-OSOBNE-VOZIDLA-Opakovana-Technicka-kontrola",
        },
        {
          nazov: "Opakovaná",
          popis: "v deň pravidelnej",
          url: "https://Klasik.as.me/KLASIK-OSOBNE-VOZIDLA-Opakovana-Technicka-kontrola",
        },
        {
          nazov: "Zvláštna",
          popis: "čiastkového rozsahu",
          url: OSOBNE_TK_ZVLASTNA,
        },
      ],
    },
    {
      nazov: "Technická kontrola — LPG, CNG, hybrid",
      poznamka: "M1, N1",
      ukony: [
        {
          nazov: "Pravidelná",
          popis: "opakovaná po inej stanici",
          url: "https://Klasik.as.me/KLASIK-OSOBNE-VOZIDLA-Technicka-kontrola-LPG-CNG-HYBRID-ELEKTRINA",
        },
        {
          nazov: "Opakovaná",
          popis: "do 60 dní od pravidelnej",
          url: "https://Klasik.as.me/KLASIK-OSOBNE-VOZIDLA-opakovana-Technicka-kontrola-LPG-CNG-HYBRID-ELEKTRINA",
        },
        {
          nazov: "Opakovaná",
          popis: "v deň pravidelnej",
          url: "https://Klasik.as.me/KLASIK-OSOBNE-VOZIDLA-opakovana-Technicka-kontrola-LPG-CNG-HYBRID-ELEKTRINA",
        },
        {
          nazov: "Zvláštna",
          popis: "čiastkového rozsahu",
          url: OSOBNE_TK_ZVLASTNA,
        },
      ],
    },
    {
      nazov: "Emisná kontrola — benzín, diesel",
      ukony: [
        {
          nazov: "Pravidelná",
          popis: "opakovaná po inej stanici",
          url: "https://Klasik.as.me/KLASIK-OSOBNE-VOZIDLA-Emisna-kontrola-Benzin-Diesel",
        },
        {
          nazov: "Opakovaná",
          popis: "do 60 dní od pravidelnej",
          url: "https://Klasik.as.me/KLASIK-OSOBNE-VOZIDLA-opakovana-Emisna-kontrola-Benzin-Diesel",
        },
        {
          nazov: "Opakovaná",
          popis: "v deň pravidelnej",
          url: "https://Klasik.as.me/KLASIK-OSOBNE-VOZIDLA-opakovana-Emisna-kontrola-Benzin-Diesel",
        },
      ],
    },
    {
      nazov: "Emisná kontrola — NKAT / BKAT",
      poznamka: "špinavý benzín, vozidlá do r. 1995",
      ukony: [
        {
          nazov: "Pravidelná",
          popis: "opakovaná po inej stanici",
          url: "https://Klasik.as.me/KLASIK-OSOBNE-VOZIDLA-Emisna-kontrola-NKAT-BKAT",
        },
        {
          nazov: "Opakovaná",
          popis: "do 60 dní od pravidelnej",
          url: "https://Klasik.as.me/KLASIK-OSOBNE-VOZIDLA-opakovana-Emisna-kontrola-NKAT-BKAT",
        },
        {
          nazov: "Opakovaná",
          popis: "v deň pravidelnej",
          url: "https://Klasik.as.me/KLASIK-OSOBNE-VOZIDLA-opakovana-Emisna-kontrola-NKAT-BKAT",
        },
      ],
    },
    {
      nazov: "Emisná kontrola — LPG, CNG, hybrid",
      ukony: [
        {
          nazov: "Pravidelná",
          popis: "opakovaná po inej stanici",
          url: "https://Klasik.as.me/KLASIK-OSOBNE-VOZIDLA-Emisna-kontrola-LPG-CNG-HYBRID",
        },
        {
          nazov: "Opakovaná",
          popis: "do 60 dní od pravidelnej",
          url: "https://Klasik.as.me/KLASIK-OSOBNE-VOZIDLA-opakovana-Emisna-kontrola-LPG-CNG-HYBRID",
        },
        {
          nazov: "Opakovaná",
          popis: "v deň pravidelnej",
          url: "https://Klasik.as.me/KLASIK-OSOBNE-VOZIDLA-opakovana-Emisna-kontrola-LPG-CNG-HYBRID",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// 2 · Motocykle a štvorkolky (samostatná technická kontrola, mimo kompletnej STK vyššie)
// ---------------------------------------------------------------------------

export const MOTOCYKLE: RezervacnaKategoria = {
  id: "motocykle",
  nazov: "Motocykle a štvorkolky",
  farba: "red",
  uvod: "Samostatná technická kontrola pre motocykle, trojkolky a štvorkolky.",
  cennik: "#tk",
  skupiny: [
    {
      nazov: "Technická kontrola",
      poznamka: "L3, L4, L6",
      ukony: [
        {
          nazov: "Pravidelná",
          popis: "opakovaná po inej stanici",
          url: "https://Klasik.as.me/Technicka-kontrola-motocykel-trojkolka-stvorkolka",
        },
        {
          nazov: "Opakovaná",
          popis: "do 60 dní od pravidelnej",
          url: "https://Klasik.as.me/Opakovana-technicka-kontrola-motocykel-trojkolka-stvorkolka",
        },
        {
          nazov: "Opakovaná",
          popis: "v deň pravidelnej",
          url: "https://Klasik.as.me/Opakovana-technicka-kontrola-motocykel-trojkolka-stvorkolka",
        },
        {
          nazov: "Zvláštna",
          popis: "čiastkového rozsahu",
          url: OSOBNE_TK_ZVLASTNA,
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// 3 · Nákladné vozidlá a autobusy nad 3,5 t
// ---------------------------------------------------------------------------

export const NAKLADNE: RezervacnaKategoria = {
  id: "nakladne",
  nazov: "Nákladné vozidlá a autobusy nad 3,5 t",
  farba: "red",
  uvod: "Nákladné vozidlá, autobusy, ťahače, traktory a pracovné stroje.",
  cennik: "#tk",
  skupiny: [
    {
      nazov: "Kompletná STK — technická aj emisná kontrola naraz",
      ukony: [
        { nazov: "Ťahač", url: "https://Klasik.as.me/KLASIK-NAKLADNE-VOZIDLA-TAHAC-NAVESOV-Technicka-Emisna-kontrola" },
        { nazov: "Sólo", url: "https://Klasik.as.me/KLASIK-NAKLADNE-VOZIDLA-SOLO-Technicka-Emisna-kontrola" },
        {
          nazov: "Traktor, pracovný stroj",
          url: "https://Klasik.as.me/KLASIK-NAKLADNE-VOZIDLA-TRAKTOR-PRACOVNY-STROJ-Technicka-Emisna-kontrola",
        },
        {
          nazov: "Špeciálne, terénne",
          url: "https://Klasik.as.me/KLASIK-NAKLADNE-VOZIDLA-SPECIALNE-Technicka-Emisna-kontrola",
        },
        {
          // ⚠️ ZDIEĽANÝ ODKAZ v zdroji: rovnaký ako "Nák. súprava CEMT" a "Nák. súprava ADR" nižšie.
          nazov: "Nákladná súprava",
          popis: "Ťahač + prípojné vozidlo",
          url: "https://Klasik.as.me/KLASIK-NAKLADNE-VOZIDLA-SUPRAVA-Technicka-Emisna-kontrola",
        },
        {
          // ⚠️ ZDIEĽANÝ ODKAZ v zdroji: rovnaký ako "Terénna súprava" nižšie.
          nazov: "Traktorová súprava",
          popis: "Traktor + prípojné vozidlo",
          url: "https://Klasik.as.me/KLASIK-NAKLADNE-VOZIDLA-TRAKTOROVA-SUPRAVA-Technicka-Emisna-kontrola",
        },
        {
          // ⚠️ ZDIEĽANÝ ODKAZ v zdroji: rovnaký ako "Traktorová súprava" vyššie.
          nazov: "Terénna súprava",
          popis: "Terénne vozidlo + prípojné vozidlo",
          url: "https://Klasik.as.me/KLASIK-NAKLADNE-VOZIDLA-TRAKTOROVA-SUPRAVA-Technicka-Emisna-kontrola",
        },
        {
          // ⚠️ ZDIEĽANÝ ODKAZ v zdroji: rovnaký ako "Nákladná súprava" vyššie.
          nazov: "Nákladná súprava CEMT",
          popis: "Ťahač (TK+EK) + prípojné vozidlo (TK)",
          url: "https://Klasik.as.me/KLASIK-NAKLADNE-VOZIDLA-SUPRAVA-Technicka-Emisna-kontrola",
        },
        {
          // ⚠️ ZDIEĽANÝ ODKAZ v zdroji: rovnaký ako "Nákladná súprava" vyššie.
          nazov: "Nákladná súprava ADR",
          popis: "Ťahač (TK+EK) + prípojné vozidlo (TK)",
          url: "https://Klasik.as.me/KLASIK-NAKLADNE-VOZIDLA-SUPRAVA-Technicka-Emisna-kontrola",
        },
      ],
    },
    {
      nazov: "Technická kontrola — nákladné vozidlá a autobusy",
      poznamka: "M1, M2, M3, N2, N3",
      ukony: [
        {
          nazov: "Pravidelná",
          popis: "opakovaná po inej stanici",
          url: "https://Klasik.as.me/KLASIK-NAKLADNE-VOZIDLA-SUPRAVA-Technicka-kontrola",
        },
        {
          nazov: "Opakovaná",
          popis: "do 60 dní od pravidelnej",
          url: "https://Klasik.as.me/KLASIK-NAKLADNE-VOZIDLA-SUPRAVA-opakovana-Technicka-kontrola",
        },
        {
          nazov: "Opakovaná",
          popis: "v deň pravidelnej",
          url: "https://Klasik.as.me/KLASIK-NAKLADNE-VOZIDLA-SUPRAVA-opakovana-Technicka-kontrola",
        },
        { nazov: "Zvláštna", popis: "čiastkového rozsahu", url: NAKLADNE_TK_ZVLASTNA },
      ],
    },
    {
      nazov: "Technická kontrola — špeciálne, terénne",
      poznamka: "N2G, N3G",
      ukony: [
        {
          nazov: "Pravidelná",
          popis: "opakovaná po inej stanici",
          url: "https://Klasik.as.me/KLASIK-NAKLADNE-VOZIDLA-TERENNE-Technicka-kontrola",
        },
        {
          nazov: "Opakovaná",
          popis: "do 60 dní od pravidelnej",
          url: "https://Klasik.as.me/KLASIK-NAKLADNE-VOZIDLA-TERENNE-opakovana-Technicka-kontrola",
        },
        {
          nazov: "Opakovaná",
          popis: "v deň pravidelnej",
          url: "https://Klasik.as.me/KLASIK-NAKLADNE-VOZIDLA-TERENNE-opakovana-Technicka-kontrola",
        },
        { nazov: "Zvláštna", popis: "čiastkového rozsahu", url: NAKLADNE_TK_ZVLASTNA },
      ],
    },
    {
      nazov: "Technická kontrola — traktory, pracovné stroje",
      poznamka: "T, PS",
      ukony: [
        {
          nazov: "Pravidelná",
          popis: "opakovaná po inej stanici",
          url: "https://Klasik.as.me/KLASIK-NAKLADNE-VOZIDLA-TRAKTOR-PS-technicka-kontrola",
        },
        {
          nazov: "Opakovaná",
          popis: "do 60 dní od pravidelnej",
          url: "https://Klasik.as.me/KLASIK-NAKLADNE-VOZIDLA-TRAKTOR-PRACOVNY-STROJ-Opakovana-technicka-kontrola",
        },
        {
          nazov: "Opakovaná",
          popis: "v deň pravidelnej",
          url: "https://Klasik.as.me/KLASIK-NAKLADNE-VOZIDLA-TRAKTOR-PRACOVNY-STROJ-Opakovana-technicka-kontrola",
        },
        { nazov: "Zvláštna", popis: "čiastkového rozsahu", url: NAKLADNE_TK_ZVLASTNA },
      ],
    },
    {
      nazov: "Technická kontrola — vyrobené do r. 1995",
      poznamka: "M1, M2, M3, N2, N3, T, PS",
      ukony: [
        {
          // ⚠️ ZDIEĽANÝ ODKAZ v zdroji: rovnaký ako "Pravidelná" v skupine Prípojné vozidlá nižšie.
          nazov: "Pravidelná",
          popis: "opakovaná po inej stanici",
          url: "https://Klasik.as.me/KLASIK-NAKLADNY-NAVES-PRIVES-Technicka-kontrola",
        },
        {
          // ⚠️ ZDIEĽANÝ ODKAZ v zdroji: rovnaký ako "Opakovaná" v skupine Prípojné vozidlá nižšie.
          nazov: "Opakovaná",
          popis: "do 60 dní od pravidelnej",
          url: "https://Klasik.as.me/KLASIK-NAKLADNY-NAVES-PRIVES-opakovana-Technicka-kontrola",
        },
        {
          nazov: "Opakovaná",
          popis: "v deň pravidelnej",
          url: "https://Klasik.as.me/KLASIK-NAKLADNY-NAVES-PRIVES-opakovana-Technicka-kontrola",
        },
      ],
    },
    {
      nazov: "Emisná kontrola",
      poznamka: "nad 3,5 t",
      ukony: [
        {
          nazov: "Pravidelná",
          popis: "opakovaná po inej stanici",
          url: "https://Klasik.as.me/KLASIK-NAKLADNE-VOZIDLA-Emisna-kontrola",
        },
        {
          nazov: "Opakovaná",
          popis: "do 60 dní od pravidelnej",
          url: "https://Klasik.as.me/KLASIK-NAKLADNE-VOZIDLA-opakovana-Emisna-kontrola",
        },
        {
          nazov: "Opakovaná",
          popis: "v deň pravidelnej",
          url: "https://Klasik.as.me/KLASIK-NAKLADNE-VOZIDLA-opakovana-Emisna-kontrola",
        },
      ],
    },
  ],
  // Príplatky zo zdroja — bez funkčného rezervačného odkazu. Kontrola a meranie/
  // Kontrola náprav mali v zdroji len text (žiadny odkaz). Priťažovanie vozidiel,
  // Kontrola bŕzd a Váženie náprav mali odkaz "#" — to je mŕtvy odkaz už na starom webe,
  // nie niečo, čo agent zahodil.
  bezOdkazu: [
    { nazov: "Kontrola a meranie", popis: "za každú ďalšiu nápravu" },
    { nazov: "Kontrola náprav", popis: "za každú ďalšiu nápravu" },
    { nazov: "Priťažovanie vozidiel", popis: "hydraulické priťaženie" },
    { nazov: "Kontrola bŕzd", popis: "1 náprava" },
    { nazov: "Váženie náprav", popis: "1 náprava" },
  ],
};

// ---------------------------------------------------------------------------
// 4 · Prípojné vozidlá (návesy, prívesy)
// ---------------------------------------------------------------------------

export const PRIPOJNE: RezervacnaKategoria = {
  id: "pripojne",
  nazov: "Prípojné vozidlá",
  farba: "red",
  uvod: "Návesy a prívesy nákladných vozidiel.",
  cennik: "#tk",
  skupiny: [
    {
      nazov: "Technická kontrola",
      poznamka: "O2, O3, O4, R2, R3, R4",
      ukony: [
        {
          nazov: "Pravidelná",
          popis: "opakovaná po inej stanici",
          url: "https://Klasik.as.me/KLASIK-NAKLADNY-NAVES-PRIVES-Technicka-kontrola",
        },
        {
          nazov: "Opakovaná",
          popis: "do 60 dní od pravidelnej",
          url: "https://Klasik.as.me/KLASIK-NAKLADNY-NAVES-PRIVES-opakovana-Technicka-kontrola",
        },
        {
          nazov: "Opakovaná",
          popis: "v deň pravidelnej",
          url: "https://Klasik.as.me/KLASIK-NAKLADNY-NAVES-PRIVES-opakovana-Technicka-kontrola",
        },
        { nazov: "Zvláštna", popis: "čiastkového rozsahu", url: NAKLADNE_TK_ZVLASTNA },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// 5 · ADR a CEMT
// Zdroj mal dve skupiny odkazov na tie isté kombinácie (technické kontroly
// pri nákladných vozidlách + samostatná sekcia "KONTROLA ADR/CEMT"). Druhá
// sekcia je nadmnožina prvej (obsahuje navyše "celá súprava" a "ťahač TK+EK"),
// preto je tu len ona — žiadny jedinečný odkaz sa nestratil (overené 1:1).
// ---------------------------------------------------------------------------

export const ADR_CEMT: RezervacnaKategoria = {
  id: "adr-cemt",
  nazov: "ADR a CEMT",
  farba: "red",
  uvod: "Kontroly pre prepravu nebezpečných vecí (ADR) a medzinárodnú cestnú dopravu (CEMT).",
  cennik: "#tk",
  skupiny: [
    {
      nazov: "ADR",
      ukony: [
        { nazov: "Celá súprava", popis: "TK + EK", url: "https://klasik.as.me/SUPRAVA-ADR-TK-A-EK" },
        { nazov: "Ťahač", popis: "TK + EK", url: "https://klasik.as.me/TAHAC-ADR-TK-A-EK" },
        { nazov: "Ťahač", popis: "TK, pravidelná", url: "https://klasik.as.me/TAHAC-ADR-TK" },
        {
          nazov: "Ťahač",
          popis: "TK, opakovaná do 60 dní",
          url: "https://klasik.as.me/TAHAC-ADR-OP-TK",
        },
        { nazov: "Náves", popis: "TK, pravidelná", url: "https://klasik.as.me/NAVES-ADR-TK" },
        {
          nazov: "Náves",
          popis: "TK, opakovaná do 60 dní",
          url: "https://klasik.as.me/NAVES-ADR-OP-TK",
        },
      ],
    },
    {
      nazov: "CEMT",
      ukony: [
        { nazov: "Celá súprava", popis: "TK + EK", url: "https://klasik.as.me/SUPRAVA-CEMT-TK-A-EK" },
        { nazov: "Ťahač", popis: "TK + EK", url: "https://klasik.as.me/TAHAC-CEMT-TK-A-EK" },
        { nazov: "Ťahač", popis: "TK, pravidelná", url: "https://klasik.as.me/TAHAC-CEMT-TK" },
        {
          nazov: "Ťahač",
          popis: "TK, opakovaná do 60 dní",
          url: "https://klasik.as.me/TAHAC-CEMT-OP-TK",
        },
        { nazov: "Náves", popis: "TK, pravidelná", url: "https://klasik.as.me/NAVES-CEMT-TK" },
        {
          nazov: "Náves",
          popis: "TK, opakovaná do 60 dní",
          url: "https://klasik.as.me/NAVES-CEMT-OP-TK",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// 6 · Kontrola originality
// ---------------------------------------------------------------------------

export const KONTROLA_ORIGINALITY: RezervacnaKategoria = {
  id: "kontrola-originality",
  nazov: "Kontrola originality",
  farba: "red",
  cennik: "#ko",
  viacInfo: { href: "/kontrola-originality/", text: "Ako prebieha kontrola originality" },
  skupiny: [
    {
      nazov: "Osobné vozidlá",
      ukony: [
        { nazov: "Automobil", popis: "M1, M1G, M2", url: "https://Klasik.as.me/KLASIK-OSOBNY-AUTOMOBIL-Kontrola-originality" },
        {
          nazov: "Malý motocykel",
          popis: "L1E, L2E",
          url: "https://Klasik.as.me/KLASIK-MALY-MOTOCYKEL-Kontrola-originality",
        },
        {
          nazov: "Veľký motocykel",
          popis: "L3E, L4, L6, L5, L7",
          url: "https://Klasik.as.me/KLASIK-VELKY-MOTOCYKEL-Kontrola-originality",
        },
      ],
    },
    {
      nazov: "Autobusy",
      ukony: [
        { nazov: "Do 5 ton", popis: "M1", url: "https://Klasik.as.me/KLASIK-AUTOBUS-do-5t-Kontrola-originality" },
        { nazov: "Nad 5 ton", popis: "M2", url: "https://Klasik.as.me/KLASIK-AUTOBUS-nad-5t-Kontrola-originality" },
        { nazov: "Nad 12 ton", popis: "M3", url: "https://Klasik.as.me/KLASIK-AUTOBUS-nad-12t-Kontrola-originality" },
      ],
    },
    {
      nazov: "Nákladné vozidlá",
      ukony: [
        {
          nazov: "Nákladné do 3,5 tony",
          popis: "N1, N1G",
          url: "https://Klasik.as.me/KLASIK-NAKLADNE-VOZIDLO-do-3-5t-Kontrola-originality",
        },
        {
          nazov: "Nákladné do 12 ton",
          popis: "N2, N2G",
          url: "https://klasik.as.me/KLASIK-NAKLADNE-VOZIDLO-do-12t",
        },
        {
          nazov: "Nákladné nad 12 ton",
          popis: "N3, N3G",
          url: "https://Klasik.as.me/KLASIK-NAKLADNE-VOZIDLO-nad-12t-Kontrola-originality",
        },
        { nazov: "Traktor", url: "https://Klasik.as.me/KLASIK-TRAKTOR-Kontrola-originality" },
        { nazov: "Pracovný stroj", url: "https://Klasik.as.me/KLASIK-PRACOVNY-STROJ-Kontrola-originality" },
      ],
    },
    {
      nazov: "Prípojné vozidlá",
      ukony: [
        {
          nazov: "Do 3,5 tony",
          popis: "O1, O2",
          url: "https://Klasik.as.me/KLASIK-PRIVES-NAVES-do-3-5t-Kontrola-originality",
        },
        {
          nazov: "Nad 3,5 tony",
          popis: "O3",
          url: "https://Klasik.as.me/KLASIK-PRIVES-NAVES-nad-3-5t-Kontrola-originality",
        },
        {
          nazov: "Nad 10 ton",
          popis: "O4",
          url: "https://Klasik.as.me/KLASIK-PRIVES-NAVES-nad-10t-Kontrola-originality",
        },
        {
          nazov: "Traktorové",
          popis: "R1, R2, R3, R4",
          url: "https://Klasik.as.me/KLASIK-PRIVES-NAVES-TRAKTOROVE-Kontrola-originality",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// 7 · Overenie tachografu
// V zdroji bez ceny (cenník tachografov nebol súčasťou dumpu ani src/data/cennik.ts),
// preto táto kategória nemá pole `cennik`.
// ---------------------------------------------------------------------------

export const TACHOGRAF: RezervacnaKategoria = {
  id: "tachograf",
  nazov: "Overenie tachografu",
  farba: "red",
  viacInfo: { href: "/sluzby/#tachografy", text: "Viac o overovaní tachografov" },
  skupiny: [
    {
      nazov: "Overenie",
      ukony: [
        { nazov: "I. generácia", url: "https://klasik.as.me/tachograf-1-gen" },
        { nazov: "II. generácia", url: "https://klasik.as.me/tachograf-2-gen" },
        { nazov: "II. generácia (Gen. V2)", url: "https://klasik.as.me/tachograf-2-gen-v-2" },
        {
          nazov: "Výmena a overenie",
          popis: "II. generácia (Gen. V2)",
          url: "https://klasik.as.me/vymena-overenie-tachograf-2-gen-v-2",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// 8 · Administratívna kontrola (doplnková služba — nerobí sa fyzická kontrola vozidla)
// ---------------------------------------------------------------------------

export const ADMINISTRATIVNA: RezervacnaKategoria = {
  id: "administrativna",
  nazov: "Administratívna kontrola",
  farba: "green",
  uvod: "Namiesto fyzickej kontroly vozidla — na základe platného protokolu o TK alebo EK.",
  cennik: "#administrativna",
  skupiny: [
    {
      nazov: "Osobné vozidlá",
      ukony: [
        {
          nazov: "Po našej stanici",
          url: "https://klasik.as.me/KLASIK-OSOBNE-VOZIDLA-Administrativna-kontrola-po-nasej-stanici",
        },
        {
          nazov: "Po inej stanici",
          url: "https://klasik.as.me/KLASIK-OSOBNE-VOZIDLA-Administrativna-kontrola-po-inej-stanici",
        },
      ],
    },
    {
      nazov: "Motocykle",
      ukony: [
        {
          nazov: "Po našej stanici",
          url: "https://klasik.as.me/KLASIK-MOTOCYKEL-Administrativna-kontrola-po-NASEJ-stanici",
        },
        {
          nazov: "Po inej stanici",
          url: "https://klasik.as.me/KLASIK-MOTOCYKEL-Administrativna-kontrola-po-INEJ-stanici",
        },
      ],
    },
    {
      nazov: "Nákladné vozidlá",
      ukony: [
        {
          nazov: "Po našej stanici",
          url: "https://klasik.as.me/KLASIK-NAKLADNE-VOZIDLA-Administrativna-kontrola-po-NASEJ-stanici",
        },
        {
          nazov: "Po inej stanici",
          url: "https://klasik.as.me/KLASIK-NAKLADNE-VOZIDLA-Administrativna-kontrola-po-INEJ-stanici",
        },
      ],
    },
  ],
};

/** Poradie kategórií na stránke. */
export const KATEGORIE_REZERVACIA: RezervacnaKategoria[] = [
  OSOBNE,
  MOTOCYKLE,
  NAKLADNE,
  PRIPOJNE,
  ADR_CEMT,
  KONTROLA_ORIGINALITY,
  TACHOGRAF,
  ADMINISTRATIVNA,
];
