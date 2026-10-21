/* Spoločné pre Pages Functions „súbory na stiahnutie“ (admin pre personál STK).
   Úložisko: R2 binding SUBORY, súbory pod kľúčom `subory/<meno>`, systémové veci pod `_sys/`.
   Záloha bez R2: statický zoznam /subory/zoznam.json (je v staticky/, beží aj na GitHub Pages).
   Autorizácia: 1) Cloudflare Access (JWT v Cf-Access-Jwt-Assertion, overenie voči ACCESS_TEAM_DOMAIN + ACCESS_AUD)
                2) záloha: heslo (ADMIN_HESLO_HASH = pbkdf2$iter$soľ$hash, vyrobí scripts/admin-heslo.mjs) → podpísaná cookie.
   Žiadne tajomstvo nie je v kóde ani v repe; všetko ide z env (wrangler.toml [vars] / Pages secrets / .dev.vars). */

export const TYPY = {
  pdf:  { mime: 'application/pdf', inline: true },
  docx: { mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', inline: false },
  xlsx: { mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', inline: false },
  jpg:  { mime: 'image/jpeg', inline: true },
  png:  { mime: 'image/png', inline: true },
};
export const MENO_RE = /^[a-z0-9][a-z0-9-]{0,80}\.(pdf|docx|xlsx|jpg|png)$/;
export const KLUC = meno => 'subory/' + meno;
export const maxBajtov = env => Math.max(1, Number(env.MAX_MB) || 20) * 1024 * 1024;

export const json = (data, status = 200, hlavicky = {}) => new Response(JSON.stringify(data), {
  status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...hlavicky },
});
export const chyba = (status, text) => json({ chyba: text }, status);

/* ---------- mená a typy ---------- */
export function pripona(nazovSuboru) {
  const m = /\.([a-z0-9]+)$/i.exec(nazovSuboru || '');
  if (!m) return null;
  const p = m[1].toLowerCase();
  return p === 'jpeg' ? 'jpg' : (TYPY[p] ? p : null);
}
export function slug(text) {
  return String(text || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 70) || 'subor';
}
/* Kontrola obsahu podľa prvých bajtov — prípona sa dá prepísať, hlavička súboru ťažšie. */
export function sediObsah(typ, bajty) {
  const b = new Uint8Array(bajty.slice(0, 8));
  const zac = (...x) => x.every((v, i) => b[i] === v);
  if (typ === 'pdf') return zac(0x25, 0x50, 0x44, 0x46);              // %PDF
  if (typ === 'docx' || typ === 'xlsx') return zac(0x50, 0x4b, 0x03, 0x04); // ZIP (Office Open XML)
  if (typ === 'jpg') return zac(0xff, 0xd8, 0xff);
  if (typ === 'png') return zac(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a);
  return false;
}
export const enc = s => encodeURIComponent(String(s ?? ''));
export const dec = s => { try { return decodeURIComponent(s || ''); } catch { return s || ''; } };
export const cistiText = (s, max = 80) => String(s ?? '').replace(/[\u0000-\u001f<>]/g, '').trim().slice(0, max);

/* ---------- zoznam: R2 + statická záloha ---------- */
export async function zaloha(env, request) {
  try {
    if (!env.ASSETS) return [];
    const r = await env.ASSETS.fetch(new URL('/subory/zoznam.json', request.url));
    if (!r.ok) return [];
    const z = await r.json();
    return Array.isArray(z.subory) ? z.subory : [];
  } catch { return []; }
}
export function zR2(o) {
  const m = o.customMetadata || {};
  const meno = o.key.slice('subory/'.length);
  return {
    meno, nazov: dec(m.nazov) || meno, popis: dec(m.popis), typ: pripona(meno),
    velkost: o.size, datum: (o.uploaded instanceof Date ? o.uploaded : new Date(o.uploaded)).toISOString(),
    pata: m.pata === '1', verzia: Number(m.verzia) || 1, url: '/subory/' + meno, zdroj: 'r2',
  };
}
export async function zoznam(env, request) {
  const zal = await zaloha(env, request);
  const mapa = new Map(zal.map(s => [s.meno, { ...s, zdroj: 'zaloha', velkost: s.velkost ?? null, datum: s.datum ?? null }]));
  if (env.SUBORY) {
    let cursor;
    do {
      const r = await env.SUBORY.list({ prefix: 'subory/', include: ['customMetadata'], cursor });
      for (const o of r.objects) {
        const s = zR2(o);
        const z = mapa.get(s.meno);
        mapa.set(s.meno, z ? { ...s, povodne: z.povodne || [] } : s);
      }
      cursor = r.truncated ? r.cursor : undefined;
    } while (cursor);
  }
  return [...mapa.values()].sort((a, b) => (b.pata - a.pata) || a.nazov.localeCompare(b.nazov, 'sk'));
}

/* ---------- base64url a krypto ---------- */
const b64u = buf => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const zB64u = s => { s = s.replace(/-/g, '+').replace(/_/g, '/'); s += '='.repeat((4 - s.length % 4) % 4); return Uint8Array.from(atob(s), c => c.charCodeAt(0)); };
const zB64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
const te = new TextEncoder();
function rovnake(a, b) {          // porovnanie v konštantnom čase (dĺžka nie je tajná)
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a[i] ^ b[i];
  return r === 0;
}

/* ---------- Cloudflare Access ---------- */
let certy = { team: '', kluce: null, kedy: 0 };
async function accessKluce(team) {
  if (certy.team === team && certy.kluce && Date.now() - certy.kedy < 3600e3) return certy.kluce;
  const r = await fetch(`https://${team}/cdn-cgi/access/certs`);
  if (!r.ok) throw new Error('Access certs ' + r.status);
  const { keys } = await r.json();
  certy = { team, kluce: keys || [], kedy: Date.now() };
  return certy.kluce;
}
const teamDomena = env => String(env.ACCESS_TEAM_DOMAIN || '').trim().replace(/^https?:\/\//, '').replace(/\/+$/, '');
export const maAccess = env => !!(teamDomena(env) && String(env.ACCESS_AUD || '').trim());
export async function overAccess(request, env) {
  if (!maAccess(env)) return null;
  const jwt = request.headers.get('Cf-Access-Jwt-Assertion') || cookie(request, 'CF_Authorization');
  if (!jwt) return null;
  try {
    const [h, p, s] = jwt.split('.');
    const hlav = JSON.parse(new TextDecoder().decode(zB64u(h)));
    const obs = JSON.parse(new TextDecoder().decode(zB64u(p)));
    if (hlav.alg !== 'RS256') return null;
    const team = teamDomena(env);
    const jwk = (await accessKluce(team)).find(k => k.kid === hlav.kid);
    if (!jwk) return null;
    const kluc = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
    const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', kluc, zB64u(s), te.encode(h + '.' + p));
    if (!ok) return null;
    const teraz = Date.now() / 1000;
    const aud = Array.isArray(obs.aud) ? obs.aud : [obs.aud];
    if (!aud.includes(String(env.ACCESS_AUD).trim())) return null;
    if (obs.iss !== `https://${team}`) return null;
    if (!(obs.exp > teraz) || (obs.nbf && obs.nbf > teraz + 60)) return null;
    return obs.email || obs.sub || 'access';
  } catch { return null; }
}

/* ---------- heslo (záloha) ---------- */
export const maHeslo = env => /^pbkdf2\$\d+\$[A-Za-z0-9+/=]+\$[A-Za-z0-9+/=]+$/.test(String(env.ADMIN_HESLO_HASH || '').trim());
export async function overHeslo(heslo, env) {
  const [, iter, sol, hash] = String(env.ADMIN_HESLO_HASH).trim().split('$');
  const kluc = await crypto.subtle.importKey('raw', te.encode(String(heslo)), 'PBKDF2', false, ['deriveBits']);
  const bity = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: zB64(sol), iterations: Math.min(Number(iter), 100000) }, kluc, 256);
  return rovnake(new Uint8Array(bity), zB64(hash));
}
const SESIA_HODIN = 12;
const hmacKluc = env => crypto.subtle.importKey('raw', te.encode('ec-admin|' + env.ADMIN_HESLO_HASH), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
export async function novaSesia(env) {
  const exp = Math.floor(Date.now() / 1000) + SESIA_HODIN * 3600;
  const sig = await crypto.subtle.sign('HMAC', await hmacKluc(env), te.encode('v1.' + exp));
  return `v1.${exp}.${b64u(sig)}`;
}
async function overSesiu(request, env) {
  const c = cookie(request, 'ec_adm');
  if (!c || !maHeslo(env)) return false;
  const [v, exp, sig] = c.split('.');
  if (v !== 'v1' || !(Number(exp) > Date.now() / 1000) || !sig) return false;
  try { return await crypto.subtle.verify('HMAC', await hmacKluc(env), zB64u(sig), te.encode('v1.' + exp)); } catch { return false; }
}
export const cookieSesie = (hodnota, request, maxAge = SESIA_HODIN * 3600) =>
  `ec_adm=${hodnota}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}` + (new URL(request.url).protocol === 'https:' || new URL(request.url).hostname === 'localhost' ? '; Secure' : '');

/* Rate limit prihlásenia: 5 zlých pokusov / 15 min na IP. Počítadlo v R2 (_sys/limit/…), bez R2 v pamäti izolátu. */
const LIMIT = 5, OKNO = 15 * 60e3, pamat = new Map();
async function ipKluc(request) {
  const ip = request.headers.get('CF-Connecting-IP') || 'lokal';
  return '_sys/limit/' + b64u(await crypto.subtle.digest('SHA-256', te.encode(ip))).slice(0, 22);
}
export async function limitStav(request, env) {
  const k = await ipKluc(request);
  let z = pamat.get(k);
  if (env.SUBORY) { const o = await env.SUBORY.get(k); z = o ? await o.json() : null; }
  if (!z || Date.now() - z.od > OKNO) return { k, z: { n: 0, od: Date.now() }, blok: false };
  return { k, z, blok: z.n >= LIMIT, zostava: Math.ceil((z.od + OKNO - Date.now()) / 60e3) };
}
export async function limitZly(stav, env) {
  const z = { n: stav.z.n + 1, od: stav.z.od };
  pamat.set(stav.k, z);
  if (env.SUBORY) await env.SUBORY.put(stav.k, JSON.stringify(z));
}
export async function limitReset(stav, env) {
  pamat.delete(stav.k);
  if (env.SUBORY) await env.SUBORY.delete(stav.k);
}

/* ---------- kto je prihlásený ---------- */
export function cookie(request, meno) {
  const c = request.headers.get('Cookie') || '';
  const m = c.split(/;\s*/).find(x => x.startsWith(meno + '='));
  return m ? m.slice(meno.length + 1) : null;
}
export async function kto(request, env) {
  const a = await overAccess(request, env);
  if (a) return a;
  if (await overSesiu(request, env)) return 'heslo';
  return null;
}
/* Strážca pre admin API. Zápis navyše vyžaduje hlavičku X-EC-Admin (iný web ju bez CORS nepošle) a rovnaký Origin. */
export async function strazca(request, env, zapis) {
  if (!maAccess(env) && !maHeslo(env)) return { r: chyba(503, 'Admin nie je nastavený (chýba Cloudflare Access aj ADMIN_HESLO_HASH).') };
  const k = await kto(request, env);
  if (!k) return { r: chyba(401, 'Neprihlásený.') };
  if (zapis) {
    if (request.headers.get('X-EC-Admin') !== '1') return { r: chyba(403, 'Chýba hlavička X-EC-Admin.') };
    const o = request.headers.get('Origin');
    if (o && o !== new URL(request.url).origin) return { r: chyba(403, 'Iný pôvod požiadavky.') };
  }
  if (zapis && !env.SUBORY) return { r: chyba(503, 'Úložisko R2 (binding SUBORY) nie je pripojené.'), kto: k };
  return { kto: k };
}
