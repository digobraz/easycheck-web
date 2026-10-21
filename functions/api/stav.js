/* GET /api/stav — čo je nastavené a či je používateľ prihlásený (admin si podľa toho vyberie obrazovku). */
import { json, maAccess, maHeslo, kto, maxBajtov } from '../_lib/spolocne.js';

export async function onRequestGet({ request, env }) {
  return json({
    r2: !!env.SUBORY,
    access: maAccess(env),
    heslo: maHeslo(env),
    kto: await kto(request, env),
    maxMB: maxBajtov(env) / 1048576,
  });
}
