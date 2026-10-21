/* POST /api/prihlasenie {heslo} → cookie ec_adm (12 h). DELETE → odhlásenie.
   Len záloha pre prípad, že Cloudflare Access nebude zapnutý. 5 zlých pokusov / 15 min na IP. */
import { json, chyba, maHeslo, overHeslo, novaSesia, cookieSesie, limitStav, limitZly, limitReset } from '../_lib/spolocne.js';

export async function onRequestPost({ request, env }) {
  if (!maHeslo(env)) return chyba(503, 'Prihlásenie heslom nie je zapnuté.');
  if (request.headers.get('X-EC-Admin') !== '1') return chyba(403, 'Chýba hlavička X-EC-Admin.');
  const stav = await limitStav(request, env);
  if (stav.blok) return chyba(429, `Priveľa pokusov. Skúste znova o ${stav.zostava} min.`);
  let heslo = '';
  try { heslo = String((await request.json()).heslo || ''); } catch { /* prázdne */ }
  if (!heslo || heslo.length > 200 || !(await overHeslo(heslo, env))) {
    await limitZly(stav, env);
    await new Promise(r => setTimeout(r, 400));
    return chyba(401, 'Nesprávne heslo.');
  }
  await limitReset(stav, env);
  return json({ ok: true }, 200, { 'Set-Cookie': cookieSesie(await novaSesia(env), request) });
}

export async function onRequestDelete({ request }) {
  return json({ ok: true }, 200, { 'Set-Cookie': cookieSesie('', request, 0) });
}
