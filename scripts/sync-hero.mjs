// Zrkadli hero prototyp (WEB-hero/prototyp/live.html) do public/index.html.
// Homepage sa needituje tu — zdroj pravdy je prototyp. Jediny rozdiel = robots noindex
// (testovacia domena stk.digobraz.sk nesmie kanibalizovat easycheck.sk).
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const proto = resolve(root, '../WEB-hero/prototyp');

const ANCHOR = '<title>EASYCHECK</title>';
const HEAD = `<!-- ZRKADLO prototypu: EASYCHECK/vystupy/WEB-hero/prototyp/live.html (1:1).
     Needituj tu — uprav zdroj a spusti \`npm run sync-hero\`. Jediny pridany riadok = robots noindex. -->
<meta name="robots" content="noindex, nofollow">
${ANCHOR}`;

const html = readFileSync(resolve(proto, 'live.html'), 'utf8');
if (!html.includes(ANCHOR)) throw new Error('Kotva <title> v live.html nenajdena — sync zastaveny.');
writeFileSync(resolve(root, 'public/index.html'), html.replace(ANCHOR, HEAD), 'utf8');

// Len assety, ktore hero realne pouziva. Zdrojove sady (assets/sets, *-lit, *.png) do repa nejdu.
const ASSETS = ['hala.png', 'logo-outline.svg',
  ...['beetle', 'truck', 'moto'].flatMap(k => [`${k}-scene.png`, `${k}-scene-reflect.png`])];
mkdirSync(resolve(root, 'public/assets'), { recursive: true });
for (const a of ASSETS) copyFileSync(resolve(proto, 'assets', a), resolve(root, 'public/assets', a));

console.log(`sync-hero: index.html + ${ASSETS.length} assetov`);
