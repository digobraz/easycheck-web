/**
 * Cenník 2026 — jediný platný zdroj: vstupy/MASTERPROMPT.md §8.
 * Staré ceny z WordPressu (plan/wp-texty/cennik.md) sú NEPLATNÉ, nepoužívajú sa.
 * Vozidlo = popis riadku (kategória + kód podľa vyhlášky), cena/y = z MASTERPROMPTu 1:1.
 * Názvy riadkov sú mierne skrátené o opakovanú predponu TK/EK/KO (tá je v nadpise
 * tabuľky) — čísla, kódy vozidiel aj poradie ostávajú presne podľa zdroja.
 */

export interface RiadokCena {
  vozidlo: string;
  cena: string;
}

export interface RiadokOpakovana {
  vozidlo: string;
  vDen: string;
  do60: string;
}

/** Rýchly prehľad najčastejších úkonov — nad tabuľkami, nech sa netreba prehrabávať. */
export const NAJCASTEJSIE: RiadokCena[] = [
  { vozidlo: "Osobné auto — technická kontrola (benzín/diesel)", cena: "60 €" },
  { vozidlo: "Osobné auto — emisná kontrola (benzín/diesel)", cena: "60 €" },
  { vozidlo: "Kontrola originality — automobil (M1)", cena: "120 €" },
  { vozidlo: "Motocykel — technická kontrola", cena: "45 €" },
];

/** Technická kontrola — pravidelná / zvláštna (plný rozsah). 14 riadkov. */
export const TK_PRAVIDELNA: RiadokCena[] = [
  { vozidlo: "Motocykel (L1, L2, L3, L4, L6)", cena: "45 €" },
  { vozidlo: "Osobné vozidlo do 3,5 t — benzín/diesel", cena: "60 €" },
  { vozidlo: "Osobné vozidlo do 3,5 t — mild hybrid/elektrina", cena: "65 €" },
  { vozidlo: "Prípojné vozidlo (O1, O2, R1, R2)", cena: "35 €" },
  { vozidlo: "Historické vozidlo", cena: "60 €" },
  { vozidlo: "Nákladné vozidlo nad 3,5 t (N2, N3)", cena: "85 €" },
  { vozidlo: "Nákladné vozidlo terénne/špeciálne (N2G, N3G)", cena: "120 €" },
  { vozidlo: "Traktor (T)", cena: "90 €" },
  { vozidlo: "Prípojné vozidlo (O3, O4, R3, R4)", cena: "75 €" },
  { vozidlo: "Nákladné vozidlo ADR", cena: "175 €" },
  { vozidlo: "Náves/príves ADR", cena: "175 €" },
  { vozidlo: "Nákladné vozidlo CEMT", cena: "155 €" },
  { vozidlo: "Náves/príves CEMT", cena: "155 €" },
  { vozidlo: "Staré nákladné vozidlo (pred r. 1995)", cena: "160 €" },
];

/** Technická kontrola — opakovaná (čiastočný rozsah). 8 riadkov. */
export const TK_OPAKOVANA: RiadokOpakovana[] = [
  { vozidlo: "Motocykel", vDen: "25 €", do60: "30 €" },
  { vozidlo: "Osobné vozidlo do 3,5 t", vDen: "20 €", do60: "35 €" },
  { vozidlo: "Osobné vozidlo do 3,5 t — mild hybrid/elektrina", vDen: "20 €", do60: "35 €" },
  { vozidlo: "Prípojné vozidlo (O1, O2, R1, R2)", vDen: "—", do60: "20 €" },
  { vozidlo: "Nákladné vozidlo nad 3,5 t", vDen: "30 €", do60: "50 €" },
  { vozidlo: "Nákladné vozidlo terénne (N2G, N3G)", vDen: "45 €", do60: "70 €" },
  { vozidlo: "Prípojné vozidlo (O3, O4, R3, R4)", vDen: "—", do60: "40 €" },
  { vozidlo: "Opakovaná ADR / CEMT", vDen: "45 €", do60: "45 €" },
];

/** Administratívna kontrola. 2 riadky. */
export const ADMINISTRATIVNA: RiadokCena[] = [
  { vozidlo: "Po našej stanici (TK alebo EK)", cena: "16 €" },
  { vozidlo: "Po inej stanici (TK alebo EK)", cena: "26 €" },
];

/** Emisná kontrola — pravidelná / zvláštna (plný rozsah). 5 riadkov. */
export const EK_PRAVIDELNA: RiadokCena[] = [
  { vozidlo: "Vozidlo do 3,5 t — benzín, diesel", cena: "60 €" },
  { vozidlo: "Vozidlo do 3,5 t — LPG, CNG, LNG, plug-in hybrid", cena: "75 €" },
  { vozidlo: "Osobné vozidlo benzín BKAT/NKAT do 3,5 t", cena: "75 €" },
  { vozidlo: "Nákladné vozidlo nad 3,5 t", cena: "75 €" },
  { vozidlo: "Staré nákladné vozidlo nad 3,5 t (pred r. 1995)", cena: "155 €" },
];

/** Emisná kontrola — opakovaná. 4 riadky. */
export const EK_OPAKOVANA: RiadokOpakovana[] = [
  { vozidlo: "Osobné vozidlo benzín/diesel do 3,5 t", vDen: "20 €", do60: "30 €" },
  { vozidlo: "Osobné vozidlo BKAT/NKAT do 3,5 t", vDen: "30 €", do60: "45 €" },
  { vozidlo: "Osobné vozidlo LPG/CNG/LNG/plug-in hybrid", vDen: "35 €", do60: "50 €" },
  { vozidlo: "Nákladné vozidlo nad 3,5 t", vDen: "30 €", do60: "42 €" },
];

/** Kontrola originality (KO). 13 riadkov. */
export const KO: RiadokCena[] = [
  { vozidlo: "Motocykel (L1E, L2E)", cena: "100 €" },
  { vozidlo: "Motocykel (L3E, L4, L5, L6, L7E)", cena: "110 €" },
  { vozidlo: "Automobil (M1, M1G)", cena: "120 €" },
  { vozidlo: "Autobus (M2)", cena: "195 €" },
  { vozidlo: "Autobus (M3)", cena: "225 €" },
  { vozidlo: "Nákladné vozidlo do 3,5 t (N1, N1G)", cena: "130 €" },
  { vozidlo: "Nákladné vozidlo do 12 t (N2, N2G)", cena: "160 €" },
  { vozidlo: "Nákladné vozidlo nad 12 t (N3, N3G)", cena: "165 €" },
  { vozidlo: "Pracovný stroj (PS)", cena: "170 €" },
  { vozidlo: "Traktor (T1–T5)", cena: "185 €" },
  { vozidlo: "Prípojné vozidlo do 3,5 t (O1, O2)", cena: "100 €" },
  { vozidlo: "Prípojné vozidlo nad 3,5 t (O3, O4)", cena: "135 €" },
  { vozidlo: "Prípojné vozidlo (R1, R2, R3, R4)", cena: "140 €" },
];

/** ODOPASS a príslušenstvo KO. 6 riadkov. */
export const ODOPASS: RiadokCena[] = [
  { vozidlo: "ODOPASS 4", cena: "5 €" },
  { vozidlo: "ODOPASS 6", cena: "7 €" },
  { vozidlo: "ODOPASS 7+", cena: "10 €" },
  { vozidlo: "Bezpečnostná nálepka MSA (3 ks)", cena: "10 €" },
  { vozidlo: "Bezpečnostná nálepka SK-KO (12 ks)", cena: "20 €" },
  { vozidlo: "Nálepka QR", cena: "5 €" },
];
