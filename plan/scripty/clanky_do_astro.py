#!/usr/bin/env python3
"""
Gutenberg HTML (WP export) → Markdown pre Astro content collection.

Vstup:  vstupy/wp-export/wp_full.json  (42 článkov, plné HTML)
        vstupy/wp-export/seo_heads.json (title + meta description naživo z webu)
        plan/sitemap-stary-web.csv       (seo_problemy, nova_url)
Výstup: src/content/blog/<slug>.md      — URL 1:1 podľa `link` v exporte
        public/blog/<rok>/<subor>       — stiahnuté obrázky

Pravidlá:
  * <h1> z tela sa odstráni — H1 renderuje layout z front-mattera (38 URL ho nemalo).
  * title nad 60 znakov: orezať prívesok " - easycheck.sk", potom skrátiť po vetnom
    predele. H1 sa NEMENÍ, mení sa len <title>.
  * chýbajúca meta description → prvá veta článku (max 155 znakov).
  * obrázky z mŕtvej domény trnavastk.sk sa ťahajú z easycheck.sk (rovnaká cesta).
  * WP injektuje do obsahu <script> blob — zahodiť.

Spustenie:  python3 plan/scripty/clanky_do_astro.py
"""
from __future__ import annotations

import csv
import html
import json
import os
import re
import subprocess
import sys
import unicodedata
from pathlib import Path
from urllib.parse import quote, urlparse

from markdownify import markdownify

REPO = Path(__file__).resolve().parents[2]          # .../vystupy/stk-web
EASY = REPO.parents[1]                              # .../AI/EASYCHECK
WP = json.loads((EASY / "vstupy/wp-export/wp_full.json").read_text("utf8"))
SEO = json.loads((EASY / "vstupy/wp-export/seo_heads.json").read_text("utf8"))
CSV_ROWS = list(csv.DictReader((REPO / "plan/sitemap-stary-web.csv").open(encoding="utf8")))

OUT_MD = REPO / "src/content/blog"
OUT_IMG = REPO / "public/blog"
SEO_BY_URL = {r["url"].rstrip("/") + "/": r for r in SEO}
CSV_BY_URL = {r["url"].rstrip("/") + "/": r for r in CSV_ROWS}

ZIVE_KATEGORIE = {"oznamy", "uzitocne-info-a-upozornenia", "tipy-triky-rady", "zaujimavosti"}


def ascii_slug(s: str) -> str:
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    s = re.sub(r"[^A-Za-z0-9._-]+", "-", s).strip("-.")
    return s.lower()


def stiahni(url: str) -> str | None:
    """Stiahne obrázok, vráti lokálnu cestu /blog/<rok>/<subor>. None = nepodarilo sa."""
    u = url.replace("//trnavastk.sk/", "//easycheck.sk/").replace(
        "//www.trnavastk.sk/", "//easycheck.sk/"
    )
    path = urlparse(u).path                     # /wp-content/uploads/2024/10/subor.webp
    m = re.search(r"/uploads/(\d{4})/\d{2}/(.+)$", path)
    if not m:
        return None
    rok, subor = m.group(1), ascii_slug(os.path.basename(m.group(2)))
    ciel = OUT_IMG / rok / subor
    if ciel.exists() and ciel.stat().st_size > 0:
        return f"/blog/{rok}/{subor}"
    ciel.parent.mkdir(parents=True, exist_ok=True)
    r = subprocess.run(
        ["curl", "-sSL", "--max-time", "40", "-o", str(ciel), quote(u, safe=":/?&=")],
        capture_output=True, text=True,
    )
    if r.returncode != 0 or not ciel.exists() or ciel.stat().st_size < 512:
        if ciel.exists():
            ciel.unlink()
        return None
    return f"/blog/{rok}/{subor}"


def priprav_html(surove: str, chyby: list[str]) -> tuple[str, list[str], str | None]:
    """Vyčistí Gutenberg HTML, stiahne obrázky, vráti (html, iframes, prvy_obrazok)."""
    h = surove
    h = re.sub(r"<script\b.*?</script>", "", h, flags=re.S | re.I)
    h = re.sub(r"<style\b.*?</style>", "", h, flags=re.S | re.I)
    h = re.sub(r"<noscript\b.*?</noscript>", "", h, flags=re.S | re.I)
    # <h1> preč — renderuje ho layout z front-mattera
    h = re.sub(r"<h1\b[^>]*>.*?</h1>", "", h, flags=re.S | re.I)
    # WP responzívne atribúty sú pre lokálne súbory nezmysel
    h = re.sub(r'\s(srcset|sizes|loading|decoding|fetchpriority)="[^"]*"', "", h, flags=re.I)

    prvy = None
    for src in re.findall(r'<img[^>]+src="([^"]+)"', h):
        lokal = stiahni(src)
        if lokal:
            h = h.replace(src, lokal)
            prvy = prvy or lokal
        else:
            chyby.append(f"obrázok sa nepodarilo stiahnuť: {src}")

    # iframe (YouTube) markdownify zahodí — vytiahnuť a vrátiť späť po konverzii
    iframes: list[str] = []

    def _drz(m: re.Match) -> str:
        iframes.append(m.group(0))
        return f"\n\nIFRAMESLOT{len(iframes) - 1}\n\n"

    h = re.sub(r"<iframe\b.*?</iframe>", _drz, h, flags=re.S | re.I)
    h = re.sub(r"<figure[^>]*wp-block-embed[^>]*>(.*?)</figure>", r"\1", h, flags=re.S | re.I)
    return h, iframes, prvy


def na_markdown(h: str, iframes: list[str]) -> str:
    md = markdownify(h, heading_style="ATX", bullets="-", strip=["span", "div"])
    md = html.unescape(md)
    md = re.sub(r"\n{3,}", "\n\n", md).strip()
    for i, ifr in enumerate(iframes):
        ifr = re.sub(r'\s(width|height|frameborder|allowfullscreen)="[^"]*"', "", ifr, flags=re.I)
        md = md.replace(f"IFRAMESLOT{i}", f'<div class="ec-video">{ifr}</div>')
    return md


def skrat_title(t: str) -> str:
    # prívesok " - easycheck.sk" má viac podôb: aj bez pomlčky, aj s pomlčkou za sebou
    t = re.sub(r"\s*[-–|]?\s*easycheck\.sk\s*[-–|]?\s*$", "", t, flags=re.I)
    t = t.strip(" -–|")
    if len(t) <= 60:
        return t
    # rez po vetnom predele (dvojbodka / pomlčka), inak po slove
    for sep in (":", " – ", " - ", "?", "!"):
        if sep in t:
            hlava = t.split(sep)[0].strip(" -–")
            if 20 <= len(hlava) <= 60:
                return hlava
    kus = t[:57]
    return kus[: kus.rfind(" ")].rstrip(" ,.–-") + "…"


def popis_z_textu(md: str) -> str:
    text = re.sub(r"!?\[[^\]]*\]\([^)]*\)", "", md)
    text = re.sub(r"[#*_>`]|<[^>]+>", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    if len(text) <= 155:
        return text
    kus = text[:152]
    return kus[: kus.rfind(" ")].rstrip(" ,.–-") + "…"


def yaml(v: str) -> str:
    return '"' + v.replace("\\", "\\\\").replace('"', '\\"') + '"'


def main() -> int:
    OUT_MD.mkdir(parents=True, exist_ok=True)
    OUT_IMG.mkdir(parents=True, exist_ok=True)
    hlasenia: list[str] = []
    urls: list[str] = []

    for p in WP["posts"]:
        slug, link = p["slug"], p["link"]
        assert link == f"https://easycheck.sk/blog/{slug}/", f"URL nesedí: {link}"
        urls.append(f"/blog/{slug}/")
        chyby: list[str] = []

        seo = SEO_BY_URL.get(link, {})
        csv_r = CSV_BY_URL.get(link, {})
        prazdny = int(csv_r.get("slov") or 0) == 0

        h, iframes, prvy = priprav_html(p["content"], chyby)
        md = na_markdown(h, iframes)

        nadpis = html.unescape(p["title"]).strip()
        titul = skrat_title(html.unescape(seo.get("title") or nadpis))
        popis = (seo.get("desc") or "").strip() or popis_z_textu(md)
        if not popis:
            popis = f"{nadpis} — blog Easy Check STK Trnava."
        kat = [k for k in p["categories"] if k in ZIVE_KATEGORIE] or ["oznamy"]

        fm = [
            "---",
            f"title: {yaml(nadpis)}",
            f"titulSeo: {yaml(titul)}",
            f"popis: {yaml(popis)}",
            f"datum: {p['date'][:10]}",
            f"kategorie: [{', '.join(yaml(k) for k in kat)}]",
            f"obrazok: {yaml(prvy) if prvy else 'null'}",
            f"zdroj: {yaml(link)}",
            f"prazdny: {'true' if prazdny else 'false'}",
            "---",
            "",
        ]
        (OUT_MD / f"{slug}.md").write_text("\n".join(fm) + md + "\n", "utf8")

        if len(titul) > 60:
            chyby.append(f"title má stále {len(titul)} znakov")
        if chyby:
            hlasenia.append(f"{slug}: " + " · ".join(chyby))

    (REPO / "plan/clanky-urls.txt").write_text("\n".join(sorted(urls)) + "\n", "utf8")
    print(f"hotovo: {len(WP['posts'])} článkov → {OUT_MD}")
    obrazky = sum(1 for _ in OUT_IMG.rglob("*") if _.is_file())
    print(f"obrázkov v public/blog: {obrazky}")
    if hlasenia:
        print("\nPOZOR:")
        for r in hlasenia:
            print("  ·", r)
    return 0


if __name__ == "__main__":
    sys.exit(main())
