import json, re, html, collections, os

BASE = "/Users/stachoman/AI/EASYCHECK/vstupy/wp-export"
d = json.load(open(f"{BASE}/wp_full.json"))
seo = json.load(open(f"{BASE}/seo_heads.json"))
seo_by_url = {}
for item in (seo if isinstance(seo, list) else seo.get("items", [])):
    seo_by_url[item.get("url", "").rstrip("/")] = item

cats = {c["id"]: c for c in d["categories"]}

def strip(t):
    t = re.sub(r"<script.*?</script>|<style.*?</style>", " ", t, flags=re.S)
    t = re.sub(r"<[^>]+>", " ", t)
    t = html.unescape(t)
    return re.sub(r"\s+", " ", t).strip()

def imgs(t):
    return sorted(set(re.findall(r'src="(https?://[^"]+\.(?:png|jpe?g|webp|gif|svg))"', t, re.I)))

def links(t):
    out = re.findall(r'href="(https?://(?:www\.)?easycheck\.sk[^"]*)"', t, re.I)
    return [u.split("?")[0].rstrip("/") for u in out]

rows = []
inbound = collections.Counter()
for kind in ("pages", "posts"):
    for p in d[kind]:
        txt = strip(p["content"])
        for l in links(p["content"]):
            inbound[l] += 1
        rows.append({
            "typ": "stránka" if kind == "pages" else "článok",
            "id": p["id"], "slug": p["slug"], "url": p["link"].rstrip("/"),
            "title": strip(p["title"]),
            "date": p["date"][:10], "modified": p["modified"][:10],
            "slov": len(txt.split()),
            "znakov": len(txt),
            "kat": [cats[c]["slug"] for c in p.get("categories", []) if c in cats],
            "obrazkov": len(imgs(p["content"])),
            "text": txt,
            "uryvok": txt[:400],
        })

for r in rows:
    key = r["url"].replace("https://www.", "https://")
    r["inbound"] = inbound.get(key, 0) + inbound.get(key.replace("https://", "https://www."), 0)
    s = seo_by_url.get(r["url"]) or seo_by_url.get(key) or {}
    r["seo_title"] = s.get("title", "")
    r["seo_desc"] = s.get("description", "") or s.get("desc", "")
    r["h1"] = s.get("h1", "")

out = "/private/tmp/claude-501/-Users-stachoman-AI-EASYCHECK/8ab4c49e-4f8f-43bc-a2ff-fe5962d2b2f6/scratchpad/inventar.json"
json.dump(rows, open(out, "w"), ensure_ascii=False, indent=1)

print("SEO sample keys:", list((seo if isinstance(seo, list) else [])[:1]))
print("celkom:", len(rows))
print("\n=== STRÁNKY (23) — podľa inbound odkazov ===")
for r in sorted([x for x in rows if x["typ"] == "stránka"], key=lambda x: -x["inbound"]):
    print(f'{r["inbound"]:>3} ↗ {r["slov"]:>5} slov | /{r["slug"]:<38} | {r["title"][:60]}')
