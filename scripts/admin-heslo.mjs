// Vyrobí ADMIN_HESLO_HASH pre záložné prihlásenie do /admin/ (PBKDF2-SHA256, 100 000 iterácií, náhodná soľ).
// Použitie: node scripts/admin-heslo.mjs 'heslo'   → výstup vlož ako secret, nikdy do repa.
import { pbkdf2Sync, randomBytes } from 'node:crypto';
const heslo = process.argv[2];
if (!heslo || heslo.length < 12) { console.error('Zadaj heslo (aspoň 12 znakov): node scripts/admin-heslo.mjs \'heslo\''); process.exit(1); }
const sol = randomBytes(16);
const hash = pbkdf2Sync(heslo, sol, 100000, 32, 'sha256');
console.log(`pbkdf2$100000$${sol.toString('base64')}$${hash.toString('base64')}`);
