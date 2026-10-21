/* PUT    /api/subory/:meno — multipart so súborom = nová verzia na tej istej URL (rovnaký typ);
                             JSON {nazov, popis, pata} = zmena zobrazovaného názvu / popisu / zobrazenia v päte.
   DELETE /api/subory/:meno — zmazanie z R2 (položka zo statickej zálohy sa vráti na zálohu). */
import { json, chyba, strazca, zaloha, pripona, sediObsah, maxBajtov, TYPY, KLUC, MENO_RE, enc, dec, cistiText, zR2 } from '../../_lib/spolocne.js';

export async function onRequestPut({ request, env, params }) {
  const s = await strazca(request, env, true);
  if (s.r) return s.r;
  const meno = String(params.id || '');
  if (!MENO_RE.test(meno)) return chyba(400, 'Neplatné meno súboru.');
  const typ = pripona(meno);
  const stary = await env.SUBORY.get(KLUC(meno));
  const zal = (await zaloha(env, request)).find(x => x.meno === meno);
  if (!stary && !zal) return chyba(404, 'Súbor neexistuje.');
  const m = stary ? { ...stary.customMetadata } : { nazov: enc(zal.nazov), popis: enc(zal.popis || ''), pata: zal.pata ? '1' : '0', verzia: '0' };

  if ((request.headers.get('Content-Type') || '').startsWith('multipart/form-data')) {
    // nová verzia súboru
    if (stary) await stary.body.cancel();
    if (Number(request.headers.get('Content-Length') || 0) > maxBajtov(env) + 64 * 1024) return chyba(413, `Súbor je väčší ako ${maxBajtov(env) / 1048576} MB.`);
    let f;
    try { f = (await request.formData()).get('subor'); } catch { return chyba(400, 'Chýba súbor.'); }
    if (!f || typeof f === 'string' || !f.size) return chyba(400, 'Chýba súbor.');
    if (pripona(f.name) !== typ) return chyba(415, `Nová verzia musí byť tiež ${typ.toUpperCase()} — adresa súboru končí .${typ}. Iný typ nahrajte ako nový súbor.`);
    if (f.size > maxBajtov(env)) return chyba(413, `Súbor je väčší ako ${maxBajtov(env) / 1048576} MB.`);
    const bajty = await f.arrayBuffer();
    if (!sediObsah(typ, bajty)) return chyba(415, `Obsah súboru nezodpovedá typu ${typ.toUpperCase()}.`);
    const o = await env.SUBORY.put(KLUC(meno), bajty, {
      httpMetadata: { contentType: TYPY[typ].mime },
      customMetadata: { ...m, verzia: String((Number(m.verzia) || 0) + 1), povodny: enc(f.name.slice(0, 120)), nahral: enc(s.kto) },
    });
    return json({ ok: true, subor: zR2(o) });
  }

  // zmena textov
  if (!stary) return chyba(409, 'Táto položka je zatiaľ len v statickej zálohe — najprv nahrajte súbor cez „Nahradiť“.');
  let d;
  try { d = await request.json(); } catch { await stary.body.cancel(); return chyba(400, 'Neplatné dáta.'); }
  const nm = { ...m };
  if ('nazov' in d) { const n = cistiText(d.nazov); if (!n) { await stary.body.cancel(); return chyba(400, 'Názov nesmie byť prázdny.'); } nm.nazov = enc(n); }
  if ('popis' in d) nm.popis = enc(cistiText(d.popis, 60));
  if ('pata' in d) nm.pata = d.pata ? '1' : '0';
  // R2 nevie meniť metadáta na mieste → prepíšeme objekt tými istými bajtmi
  const bajty = await stary.arrayBuffer();
  const o = await env.SUBORY.put(KLUC(meno), bajty, { httpMetadata: stary.httpMetadata, customMetadata: nm });
  return json({ ok: true, subor: zR2(o), nazov: dec(nm.nazov) });
}

export async function onRequestDelete({ request, env, params }) {
  const s = await strazca(request, env, true);
  if (s.r) return s.r;
  const meno = String(params.id || '');
  if (!MENO_RE.test(meno)) return chyba(400, 'Neplatné meno súboru.');
  const o = await env.SUBORY.head(KLUC(meno));
  if (!o) return chyba(404, 'Súbor nie je v úložisku (položky zo statickej zálohy sa mažú v repe, subory/zoznam.json).');
  await env.SUBORY.delete(KLUC(meno));
  return json({ ok: true });
}
