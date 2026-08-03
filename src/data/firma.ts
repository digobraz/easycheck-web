/**
 * Zdroj pravdy pre kontaktné údaje, otváracie hodiny a menu nového webu.
 * Hodnoty sú z vstupy/MASTERPROMPT.md §4 a §5 (profil firmy 2026) — NIE z WordPressu.
 * Hero prototyp (WEB-hero/prototyp/live.html) drží tie isté hodiny 07:00–19:00.
 */

export const KONTAKT = {
  nazov: "Easy Check",
  popis: "Stanica technickej kontroly Trnava",
  ulica: "Farárske 27",
  psc: "917 00",
  mesto: "Trnava",
  adresa: "Farárske 27, 917 00 Trnava",
  tel: "033 20 20 211",
  telHref: "tel:+421332020211",
  mail: "stk@easycheck.sk",
  mapa: "https://maps.app.goo.gl/5rPigU95M78qd6Ju9",
  mapaEmbed:
    "https://www.google.com/maps?q=Far%C3%A1rske%2027,%20917%2001%20Trnava&output=embed",
  facebook: "https://www.facebook.com/easycheckstk",
  instagram: "https://www.instagram.com/easycheck_tt/",
  youtube: "https://www.youtube.com/@easycheck-stktrnava3471",
};

/** Otváracie hodiny — MASTERPROMPT §5 */
export const HODINY = [
  { den: "Pondelok – Piatok", cas: "07:00 – 19:00" },
  { den: "Sobota", cas: "07:00 – 13:00" },
  { den: "Nedeľa", cas: "Zatvorené" },
  { den: "Sviatky", cas: "07:00 – 15:00" },
  { den: "Na dohodu", cas: "19:00 – 23:00" },
];

/** Rezervácia = existujúca Acuity, logika sa zatiaľ nemení. */
export const REZERVACIA =
  "https://klasik.as.me/KLASIK-OSOBNE-VOZIDLA-Technicka-Emisna-kontrola";

/**
 * MENU — 7 položiek podľa plan.html §01. Nič viac.
 * Rezervácia je jediné farebne odlíšené tlačidlo.
 */
export const MENU = [
  { t: "Domov", h: "/" },
  { t: "Cenník", h: "/cennik/" },
  { t: "Služby", h: "/sluzby/" },
  { t: "Info", h: "/uzitocne-informacie/" },
  { t: "Blog", h: "/clanky/" },
  { t: "Kontakt", h: "/kontakt/" },
];

/**
 * 7 stránok MIMO menu. V navigácii NIE SÚ — vedie na ne jeden nenápadný
 * riadok z /uzitocne-informacie/. Pre Google existujú presne ako doteraz.
 */
export const MIMO_MENU = [
  { h: "/lehoty-stk/", t: "Lehoty STK", pod: "Kedy ide ktoré vozidlo na kontrolu" },
  { h: "/kategorie-vozidiel-stk/", t: "Kategórie vozidiel", pod: "M, N, O, L, T — čo znamenajú" },
  { h: "/povinna-vybava/", t: "Povinná výbava", pod: "Čo musíte mať v aute" },
  { h: "/povinnosti-prevadzkovatela-vozidla/", t: "Povinnosti prevádzkovateľa", pod: "Zákon 106/2018 Z. z." },
  { h: "/platne-predpisy-stk/", t: "Platné predpisy", pod: "Zákony a vyhlášky ku kontrolám" },
  { h: "/priprava-na-stk/", t: "Príprava na STK", pod: "Ako prejsť na prvý raz" },
  { h: "/kontrola-originality/", t: "Kontrola originality", pod: "KO na počkanie" },
];

/** Kategórie blogu — 4 živé. Spam kategórie z WP sa neprenášajú. */
export const KATEGORIE = [
  { slug: "oznamy", nazov: "Oznamy" },
  { slug: "uzitocne-info-a-upozornenia", nazov: "Užitočné info a upozornenia" },
  { slug: "tipy-triky-rady", nazov: "Tipy, triky, rady" },
  { slug: "zaujimavosti", nazov: "Zaujímavosti" },
];

/** Pätička zdroja na zákonných stránkach. */
export const OVERENE_DNA = "3. 8. 2026";
