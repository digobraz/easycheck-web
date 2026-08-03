# -*- coding: utf-8 -*-
import json, csv, collections
SCR="/private/tmp/claude-501/-Users-stachoman-AI-EASYCHECK/8ab4c49e-4f8f-43bc-a2ff-fe5962d2b2f6/scratchpad"
OUT="/Users/stachoman/AI/EASYCHECK/vystupy/stk-web/plan"
rows=json.load(open(f"{SCR}/inventar.json"))

# akcia: ZOSTAVA (URL 1:1) | ZLUCIT (301) | NOINDEX | 301
MAP = {
 # slug: (akcia, ciel, rola, dovod)
 "easy-check": ("ZOSTAVA","/","Domov","Hero scéna hotová. Homepage."),
 "cennik": ("ZOSTAVA","/cennik/","Peniaze","Najsilnejší komerčný dopyt. Ceny z MASTERPROMPT 2026, nie z WP."),
 "rezervacia": ("ZOSTAVA","/rezervacia/","Konverzia","95 interných odkazov = najlinkovanejšia URL webu. Nedotýkať sa."),
 "kontakt": ("ZOSTAVA","/kontakt/","Kontakt","Mapa, hodiny, telefón. Dnes bez meta description."),
 "kontrola-originality": ("ZOSTAVA","/kontrola-originality/","Služba","Samostatná služba s vlastným dopytom (KO). 841 slov."),
 "overovanie-tachografov": ("ZLUCIT","/sluzby/#tachografy","Služba","269 slov = nie je to samostatná stránka. InoBase téma."),
 "prihlasovanie-vozidiel": ("ZLUCIT","/sluzby/#prihlasovanie","Služba","219 slov. Doplnková služba, patrí do rodiny."),
 "vyzdvihnutie-vozidla-na-stk": ("ZLUCIT","/sluzby/#vyzdvihnutie","Služba","220 slov. Doplnková služba."),
 "stk-s-vyhodami": ("ZLUCIT","/sluzby/#vyhody","Benefit","264 slov. Benefity patria k službám a na homepage."),
 "lehoty-stk": ("ZOSTAVA","/lehoty-stk/","Info ⚡","714 slov. ⚡ ZÁKONNÝ OBSAH — musí sa auto-aktualizovať."),
 "kategorie-vozidiel-stk": ("ZOSTAVA","/kategorie-vozidiel-stk/","Info ⚡","1 965 slov = najdlhšia stránka webu. ⚡ zákonný obsah."),
 "povinna-vybava": ("ZOSTAVA","/povinna-vybava/","Info ⚡","1 036 slov. ⚡ zákonný obsah (vyhláška)."),
 "priprava-na-stk": ("ZOSTAVA","/priprava-na-stk/","Info","954 slov. Praktický obsah, mení sa málo."),
 "povinnosti-prevadzkovatela-vozidla": ("ZOSTAVA","/povinnosti-prevadzkovatela-vozidla/","Info ⚡","935 slov. ⚡ zákon 106/2018."),
 "platne-predpisy-stk": ("ZOSTAVA","/platne-predpisy-stk/","Info ⚡","693 slov. ⚡ toto je NAJRÝCHLEJŠIE zastarávajúca stránka webu."),
 "uzitocne-informacie": ("ZOSTAVA","/uzitocne-informacie/","Rozcestník","1 278 slov → stane sa HUB-om: chat navrchu + dlaždice na 6 info stránok."),
 "clanky": ("ZOSTAVA","/clanky/","Blog index","Index 42 článkov. Ostáva presne kde je."),
 "koleso-stastia": ("ZOSTAVA","/koleso-stastia/","Kampaň","47 interných odkazov — živá mechanika, nie mŕtva kampaň. Necháme."),
 "vyhraj-auto-sutaz-stk": ("301","/koleso-stastia/","Kampaň","Skončená súťaž (2022). 1 odkaz. Presmerovať na živú mechaniku."),
 "rezervacia-vip": ("ZOSTAVA","/rezervacia-vip/","Konverzia","0 odkazov, ale živý VIP flow → rieši sa v rezervačnom systéme."),
 "dakujeme": ("NOINDEX","/dakujeme/","Technická","Potvrdzovacia stránka po formulári. Ostáva, ale noindex."),
 "ochrana-osobnych-udajov": ("ZOSTAVA","/ochrana-osobnych-udajov/","Právne","Povinné. Prepísať, 137 slov je málo."),
 "brand-manual": ("NOINDEX","/brand-manual/","Interné","Nemá čo robiť vo verejnom indexe."),
}

for r in rows:
    if r["typ"]=="clanok":
        r["akcia"],r["ciel"],r["rola"],r["dovod"] = "ZOSTAVA", f"/blog/{r['slug']}/", "Článok", "URL 1:1 podľa zadania — nula redirectov, nula straty."
    else:
        a=MAP.get(r["slug"],("?","?","?","?")); r["akcia"],r["ciel"],r["rola"],r["dovod"]=a

json.dump(rows, open(f"{SCR}/mapovanie.json","w"), ensure_ascii=False)

with open(f"{OUT}/sitemap-stary-web.csv","w",newline="") as f:
    w=csv.writer(f); w.writerow(["typ","url","title","datum","slov","kategorie","inbound","seo_problemy","akcia","nova_url","dovod"])
    for r in sorted(rows,key=lambda x:(x["typ"],-x["inbound"])):
        w.writerow([r["typ"],r["url"],r["title"],r["date"],r["slov"],"|".join(r["kat"]),r["inbound"],"|".join(r["problem"]),r["akcia"],r["ciel"],r["dovod"]])

c=collections.Counter(r["akcia"] for r in rows)
print("AKCIE:",dict(c))
print("URL spolu:",len(rows),"| zostáva 1:1:",c["ZOSTAVA"],"| 301:",c["ZLUCIT"]+c["301"],"| noindex:",c["NOINDEX"])
print("CSV:",f"{OUT}/sitemap-stary-web.csv")
