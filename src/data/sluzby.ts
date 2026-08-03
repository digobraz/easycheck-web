/**
 * Obsah /sluzby/ — zlieva 4 staré stránky WP do kotiev jednej stránky
 * (plan/wp-texty/overovanie-tachografov.md, prihlasovanie-vozidiel.md,
 * vyzdvihnutie-vozidla-na-stk.md, stk-s-vyhodami.md).
 * Texty sú skrátené a učesané, žiadny fakt/služba/podmienka nie je pridaná
 * nad rámec pôvodných dumpov. Staré 4 URL sa neskôr presmerujú (301) sem.
 */

export interface NavDlazdica {
  href: string;
  farba: "bg-ec-red" | "bg-ec-green" | "bg-ec-cyan";
  nazov: string;
  popis: string;
  /** true = vlastná URL mimo kotiev tejto stránky (šípka „→“ v UI) */
  externa?: boolean;
}

/** 5 dlaždíc rýchlej navigácie hore na stránke. Poradie = poradie sekcií nižšie. */
export const NAV: NavDlazdica[] = [
  {
    href: "#tachografy",
    farba: "bg-ec-red",
    nazov: "Tachografy",
    popis: "Overenie, montáž, servis",
  },
  {
    href: "#prihlasovanie",
    farba: "bg-ec-green",
    nazov: "Prihlasovanie vozidiel",
    popis: "Celý proces vybavíme za vás",
  },
  {
    href: "#vyzdvihnutie",
    farba: "bg-ec-green",
    nazov: "Výzdvih vozidla",
    popis: "Vyzdvihneme ho a po kontrole vrátime",
  },
  {
    href: "#vyhody",
    farba: "bg-ec-green",
    nazov: "STK s výhodami",
    popis: "Prečo prísť práve k nám",
  },
  {
    href: "/kontrola-originality/",
    farba: "bg-ec-red",
    nazov: "Kontrola originality",
    popis: "Vlastná stránka",
    externa: true,
  },
];

/**
 * #tachografy — z overovanie-tachografov.md. Farba červená = úkon kontroly.
 * Akcie (tachoPolovica, stkZdarma) sú verbatim aj v src/data/obsah.ts
 * (VYHODY_FIRMY) — homepage ich už použila ako platné, preto zostávajú aj tu.
 */
export const TACHOGRAFY = {
  nadpis: "Overovanie tachografov",
  uvod:
    "Overenie, montáž, servis aj podpora na jednom mieste — vrátane nákladných vozidiel a flotíl.",
  akcie: [
    {
      nazov: "Tachograf za polovicu",
      text: "Absolvujte u nás s vozidlom STK a na overenie tachografu máte automaticky 50 % zľavu.",
    },
    {
      nazov: "STK zdarma?",
      text: "Objednajte si u nás montáž tachografu a kompletnú kontrolu STK máte celkom zdarma.",
    },
  ],
  polozky: [
    "STK a KO pre všetky druhy a veľkosti vozidiel",
    "Špeciálne kontroly ADR a CEMT (prepravné povolenia)",
    "Overovanie tachografov, montáž aj servis s plnou podporou",
    "3 nákladné linky — priestor aj pre kamióny",
    "Hydraulický prízdvih aj bez nákladu — skracuje čas kontroly",
    "Nákladný servis — dlhoročné skúsenosti s technickými opravami nákladnej dopravy",
  ],
};

interface KrokPrihlasenia {
  nazov: string;
  text: string;
  /** doklady potrebné na tento krok (len krok 1 — KO) */
  doklady?: string[];
  /** čomu sa vodič vyhne (len krok 3 — easy vybavenie) */
  vyhnete?: string[];
}

/** #prihlasovanie — z prihlasovanie-vozidiel.md. Farba zelená = ide to hladko. */
export const PRIHLASOVANIE: { nadpis: string; uvod: string; kroky: KrokPrihlasenia[] } = {
  nadpis: "Prihlasovanie vozidiel",
  uvod: "Nové auto? Prihlásime ho za vás — celý proces vybavíme namiesto vás.",
  kroky: [
    {
      nazov: "Kontrola originality",
      text: "Príďte s vozidlom na kontrolu originality.",
      doklady: [
        "Doklad o nadobudnutí vozidla (faktúra a pod.)",
        "OP osoby zodpovednej za dovoz",
        "Technický preukaz: malý aj veľký",
        "COC (pri novom vozidle)",
      ],
    },
    {
      nazov: "Splnomocnenie",
      text: "Prineste si so sebou overené splnomocnenie (fyzická osoba alebo spoločnosť).",
    },
    {
      nazov: "Easy vybavenie",
      text: "Prihlasovanie vozidiel je naša parketa — vybavíte to bez toho, aby ste pohli prstom.",
      vyhnete: [
        "Dovolenke alebo zabitému voľnému dňu",
        "Stresu s vybavovaním",
        "Parkovaniu v plnom meste",
        "Behaniu po úradoch a poštách",
        "Návšteve polície",
        "Komunikácii s úradmi",
        "Vybavovaniu úradných prekladov",
      ],
    },
  ],
};

/** #vyzdvihnutie — z vyzdvihnutie-vozidla-na-stk.md. Farba zelená = ide to hladko. */
export const VYZDVIHNUTIE = {
  nadpis: "Výzdvih vozidla na STK",
  uvod: "Na STK už nemusíte chodiť — vozidlo vyzdvihneme a po kontrole vrátime.",
  kroky: [
    { nazov: "Objednávka", text: "Rezervujete si termín." },
    { nazov: "Telefonát", text: "Potvrdíte výzdvih vozidla." },
    { nazov: "Výzdvih", text: "Pre vozidlo si prídeme na zvolenú adresu." },
    { nazov: "Kontrola", text: "Vozidlo skontrolujeme na stanici." },
    { nazov: "Odovzdanie", text: "Vozidlo vám odovzdáme na mieste určenia." },
    { nazov: "Platba", text: "Platíte iba za kontrolu, služba výzdvihu je zdarma." },
  ],
  podmienky: [
    "Platí pre kompletnú kontrolu TK + EK",
    "Vozidlo nesmie mať skryté závady",
    "Iba pre osobné vozidlá, nákladné vozidlá po dohode",
    "Výzdvih je možný od 07:00 do 16:00",
    "Zdarma v okruhu do 15 km od stanice. Nad 15 km na základe dohody.",
  ],
};

/** #vyhody — z stk-s-vyhodami.md. Farba zelená = ide to hladko. */
export const VYHODY = {
  nadpis: "STK s výhodami",
  uvod: "Nie sme bežná STK, sme Easy Check.",
  polozky: [
    { nazov: "Otvorené dlho", text: "aj v sobotu a cez sviatky — presné hodiny nižšie." },
    { nazov: "Termín ihneď", text: "stačí sa objednať alebo zavolať." },
    { nazov: "Všetko pod jednou strechou", text: "STK, KO, tachografy, prihlasovanie aj servis." },
    { nazov: "Bez stresu", text: "vybavíme za vás, čo je potrebné." },
    { nazov: "Ľudský prístup", text: "drobné chyby odstránime priamo na linke." },
    { nazov: "Benefity ku každej kontrole", text: "vernostný program s kolesom šťastia." },
  ],
};
