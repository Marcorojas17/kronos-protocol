/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ SRC · CORE · ARKHÉ · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Núcleo del sistema. Punto de entrada único a la identidad,
 *  pacto, lex prima y sello.
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/src/core]
 *  └─$ node -e "import('./arkhe.js').then(m => console.log(m.ARKHE))"
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { Pacto } from './pacto.js';
import { LexPrima } from './lex-prima.js';
import { Sello } from './sello.js';

export const SEAL = '◯_● · 51/49/100';

export const ARKHE = Object.freeze({
  nombre: 'ARKHÉ ZERO',
  version: '1.0.0',
  autor: 'Marco Antonio Rojas Valdovinos',
  lugar: 'Toluca, México',
  anio: 2026,
  pacto: new Pacto(),
  lexPrima: new LexPrima(),
  sello: Sello,
  seal: SEAL,
});

export default ARKHE;