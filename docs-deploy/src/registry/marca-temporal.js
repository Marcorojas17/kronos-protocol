/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ SRC · REGISTRY · MARCA TEMPORAL · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Timestamp verificable anclado al Índice Cero.
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/src/registry]
 *  └─$ node -e "import('./marca-temporal.js').then(m => \
 *       console.log(m.marcar({ evento: 'test' })))"
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '../../crypto/primitives/sha3-512.js';

export const SEAL = '◯_● · 51/49/100';

/**
 * Genera una marca temporal para un evento.
 *
 * @param {object} evento
 * @returns {object}
 */
export function marcar(evento) {
  const iso = new Date().toISOString();
  const payload = JSON.stringify({ evento, iso });
  const hash = sha3_512(payload);

  return {
    ok: true,
    evento,
    iso,
    hash,
    anclaje: 'Índice Cero · Safe Creative 2607146379465',
    sellado: SEAL,
  };
}

export function verificarMarca(marca, evento) {
  const payload = JSON.stringify({ evento, iso: marca.iso });
  return {
    ok: sha3_512(payload) === marca.hash,
    sellado: SEAL,
  };
}