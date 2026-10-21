/* Verejné: GET /subory/zoznam.json — aktuálny zoznam pre web (päta a odkazy si ho načítajú, zaklad/subory.js);
            GET /subory/<meno>      — súbor z R2 so správnym Content-Type a Content-Disposition.
   Keď súbor v R2 nie je: položka statickej zálohy s externou URL → 302 na ňu; inak statický súbor zo staticky/subory/. */
import { json, zoznam, zaloha, TYPY, KLUC, MENO_RE, pripona, dec } from '../_lib/spolocne.js';

export async function onRequest({ request, env, params, next }) {
  if (!['GET', 'HEAD'].includes(request.method)) return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
  const cesta = [].concat(params.cesta || []).join('/');

  if (cesta === 'zoznam.json') {
    const subory = (await zoznam(env, request)).map(({ zdroj, verzia, ...s }) => s);
    return json({ verzia: 1, subory }, 200, { 'Cache-Control': 'public, max-age=60' });
  }
  if (!MENO_RE.test(cesta)) return next();

  if (env.SUBORY) {
    const o = await env.SUBORY.get(KLUC(cesta), { onlyIf: request.headers });
    if (o) {
      const typ = pripona(cesta);
      const h = new Headers();
      o.writeHttpMetadata(h);
      h.set('Content-Type', TYPY[typ].mime);
      h.set('ETag', o.httpEtag);
      h.set('Cache-Control', 'public, max-age=300');           // nahradenie drží URL → krátka cache
      h.set('X-Content-Type-Options', 'nosniff');
      h.set('Content-Security-Policy', "default-src 'none'; img-src 'self'; style-src 'unsafe-inline'; sandbox");
      const pekne = `${dec(o.customMetadata?.nazov) || cesta.replace(/\.[^.]+$/, '')}.${typ}`;
      h.set('Content-Disposition', `${TYPY[typ].inline ? 'inline' : 'attachment'}; filename="${cesta}"; filename*=UTF-8''${encodeURIComponent(pekne)}`);
      if (!o.body) return new Response(null, { status: 304, headers: h });   // podmienka (If-None-Match) splnená
      return new Response(request.method === 'HEAD' ? null : o.body, { headers: h });
    }
  }
  const z = (await zaloha(env, request)).find(x => x.meno === cesta);
  if (z && /^https:\/\//.test(z.url || '')) return Response.redirect(z.url, 302);
  // statický súbor zo staticky/subory/; Pages pri chýbajúcom súbore vracia úvod (200 text/html) → poctivé 404
  const a = await next();
  if (a.ok && !(a.headers.get('Content-Type') || '').includes('text/html')) return a;
  return new Response('Súbor sa nenašiel.', { status: 404, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } });
}
