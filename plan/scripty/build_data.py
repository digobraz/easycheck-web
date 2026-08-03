import json, re, html, collections

BASE = "/Users/stachoman/AI/EASYCHECK/vstupy/wp-export"
SCR  = "/private/tmp/claude-501/-Users-stachoman-AI-EASYCHECK/8ab4c49e-4f8f-43bc-a2ff-fe5962d2b2f6/scratchpad"
d = json.load(open(f"{BASE}/wp_full.json"))
seo = json.load(open(f"{BASE}/seo_heads.json"))
seo_by = {i.get("url","").rstrip("/"): i for i in seo}

def strip(t):
    t = re.sub(r"<script.*?</script>|<style.*?</style>", " ", t, flags=re.S)
    t = re.sub(r"<[^>]+>", " ", t)
    return re.sub(r"\s+", " ", html.unescape(t)).strip()

def imgs(t): return sorted(set(re.findall(r'src="(https?://[^"]+\.(?:png|jpe?g|webp|gif|svg))"', t, re.I)))
def inlinks(t):
    return [u.split("?")[0].rstrip("/").replace("https://www.","https://")
            for u in re.findall(r'href="(https?://(?:www\.)?easycheck\.sk[^"]*)"', t, re.I)]

inbound = collections.Counter()
rows = []
for kind in ("pages","posts"):
    for p in d[kind]:
        for l in inlinks(p["content"]): inbound[l] += 1
        txt = strip(p["content"])
        rows.append(dict(
            typ = "stranka" if kind=="pages" else "clanok",
            id=p["id"], slug=p["slug"], url=p["link"].rstrip("/"),
            title=strip(p["title"]), date=p["date"][:10], modified=p["modified"][:10],
            slov=len(txt.split()), kat=p.get("categories",[]), obr=len(imgs(p["content"])),
            uryvok=txt[:300], text=txt))

for r in rows:
    k = r["url"].replace("https://www.","https://")
    r["inbound"] = inbound.get(k,0)
    s = seo_by.get(r["url"]) or seo_by.get(k) or {}
    r["seo_title"]=s.get("title") or ""; r["seo_desc"]=s.get("desc") or ""
    r["h1"]=s.get("h1") or ""; r["bytes"]=s.get("bytes") or 0
    r["problem"]=[]
    if not r["h1"]: r["problem"].append("bez H1")
    if not r["seo_desc"]: r["problem"].append("bez meta desc")
    if len(r["seo_title"])>60: r["problem"].append(f"title {len(r['seo_title'])}z")
    if r["typ"]=="clanok" and r["slov"]<200: r["problem"].append("thin")

json.dump(rows, open(f"{SCR}/inventar.json","w"), ensure_ascii=False)

st=[r for r in rows if r["typ"]=="stranka"]; cl=[r for r in rows if r["typ"]=="clanok"]
print(f"stránky {len(st)} · články {len(cl)} · slov spolu {sum(r['slov'] for r in rows):,}")
print(f"stránky slov {sum(r['slov'] for r in st):,} · články slov {sum(r['slov'] for r in cl):,}")
print("bez H1:", sum(1 for r in rows if 'bez H1' in r['problem']), "| bez desc:", sum(1 for r in rows if 'bez meta desc' in r['problem']))
print("medián bytes:", sorted(r['bytes'] for r in rows)[len(rows)//2])
print("\nkategórie článkov:", collections.Counter(k for r in cl for k in r['kat']))
