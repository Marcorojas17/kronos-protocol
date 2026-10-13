/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ SRC · MEMORY · CÁPSULAS · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Cápsulas de memoria que pueden reconstruirse en el futuro.
 *  Cada cápsula contiene: contexto, decisión, hash, sello.
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/src/memory]
 *  └─$ node -e "import('./capsulas.js').then(m => console.log(m.meta))"
 *     { rol: 'capsulas', seal: '◯_● · 51/49/100' }
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '../../crypto/primitives/sha3-512.js';

export const SEAL = '◯_● · 51/49/100';

/**
 * Crea una cápsula de memoria.
 *
 * @param {object} opciones
 * @param {string} opciones.contexto
 * @param {string} opciones.decision
 * @param {string} [opciones.autor]
 * @returns {object}
 */
export function crearCapsula({ contexto, decision, autor = 'Marco Antonio Rojas Valdovinos' }) {
  const payload = JSON.stringify({ contexto, decision, autor, ts: new Date().toISOString() });
  const hash = sha3_512(payload);

  return {
    ok: true,
    id: `cap-${hash.slice(0, 12)}`,
    contexto,
    decision,
    autor,
    hash,
    anclaje: 'arkhe://genesis/000-INDICE-CERO-KRONOS',
    reconstruible: true,
    sellado: SEAL,
    timestamp: new Date().toISOString(),
  };
}

export const meta = {
  rol: 'capsulas',
  seal: SEAL,
};