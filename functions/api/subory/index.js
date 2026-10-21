/* GET  /api/subory — zoznam pre admin (R2 + statická záloha, so zdrojom).
   POST /api/subory — nahranie nového súboru (multipart: subor, nazov, popis, pata). */
import { json, chyba, strazca, zoznam, pripona, slug, sediObsah, maxBajtov, TYPY, KLUC, enc, cistiText, zR2 } from '../../_lib/spolocne.js';

export async function onRequestGet({ request, env }) {
  const s = await strazca(request, env, false);
  if (s.r) return s.r;
  return json({ subory: await zoznam(env, request), kto: s.kto });
}

export async function onRequestPost({ request, env }) {
  const s = await strazca(request, env, true);
  if (s.r) return s.r;
  const dlzka = Number(request.headers.get('Content-Length') || 0);
  if (dlzka > maxBajtov(env) + 64 * 1024) return chyba(413, `Súbor je väčší ako ${maxBajtov(env) / 1048576} MB.`);
  let form;
  try { form = await request.formData(); } catch { return chyba(400, 'Chýba súbor.'); }
  const f = form.get('subor');
  if (!f || typeof f === 'string') return chyba(400, 'Chýba súbor.');
  const typ = pripona(f.name);
  if (!typ) return chyba(415, 'Povolené sú len PDF, DOCX, XLSX, JPG a PNG.');
  if (f.size > maxBajtov(env)) return chyba(413, `Súbor je väčší ako ${maxBajtov(env) / 1048576} MB.`);
  if (f.size === 0) return chyba(400, 'Súbor je prázdny.');
  const bajty = await f.arrayBuffer();
  if (!sediObsah(typ, bajty)) return chyba(415, `Obsah súboru nezodpovedá typu ${typ.toUpperCase()}.`);

  const nazov = cistiText(form.get('nazov')) || cistiText(f.name.replace(/\.[^.]+$/, ''));
  const popis = cistiText(form.get('popis'), 60);
  const pata = form.get('pata') === '1' ? '1' : '0';
  // meno = URL; z názvu súboru (bez diakritiky). Obsadené meno (aj v statickej zálohe) dostane -2, -3…
  const zaklad = slug(f.name.replace(/\.[^.]+$/, ''));
  const obsadene = new Set((await zoznam(env, request)).map(x => x.meno));
  let meno = `${zaklad}.${typ}`;
  for (let i = 2; obsadene.has(meno); i++) meno = `${zaklad}-${i}.${typ}`;

  const o = await env.SUBORY.put(KLUC(meno), bajty, {
    httpMetadata: { contentType: TYPY[typ].mime },
    customMetadata: { nazov: enc(nazov), popis: enc(popis), pata, verzia: '1', povodny: enc(f.name.slice(0, 120)), nahral: enc(s.kto) },
  });
  return json({ ok: true, subor: zR2(o) }, 201);
}
