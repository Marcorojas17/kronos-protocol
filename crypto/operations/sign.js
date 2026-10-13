/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CRYPTO · SIGN · OPERACIÓN UNIFICADA · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  [ dispatcher ]  ·  [ SHA3-512 first ]  ·  [ híbrido opcional ]
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/crypto/operations]
 *  └─$ node -e "import('./sign.js').then(m => console.log(m.ALGORITMOS_SOPORTADOS))"
 *     [ 'ML-DSA-87', 'SLH-DSA-SHAKE-256s', 'Ed25519+ML-DSA-87' ]
 * ═══════════════════════════════════════════════════════════════════════════
 */

import * as mldsa from '../primitives/ml-dsa-87.js';
import * as slhdsa from '../primitives/slh-dsa-shake-256s.js';
import * as hybrid from '../hybrid/ed25519-mldsa87.js';
import { sha3_512 } from '../primitives/sha3-512.js';

export const ALGORITMOS_SOPORTADOS = [
  'ML-DSA-87',
  'SLH-DSA-SHAKE-256s',
  'Ed25519+ML-DSA-87',
];

export const SEAL = '◯_● · 51/49/100';

/**
 * Firma un contenido con el algoritmo indicado.
 *
 * @param {object} opciones
 * @param {string|Uint8Array} opciones.contenido
 * @param {string} opciones.alg - uno de ALGORITMOS_SOPORTADOS
 * @param {object} opciones.secretKey
 * @returns {Promise<{firma: any, hash: string, alg: string, sellado: string}>}
 */
export async function sign({ contenido, alg, secretKey }) {
  if (!ALGORITMOS_SOPORTADOS.includes(alg)) {
    throw new Error(`[ XX ] Algoritmo no soportado: ${alg}`);
  }

  const hash = sha3_512(contenido);

  let firma;
  switch (alg) {
    case 'ML-DSA-87':
      firma = mldsa.sign(secretKey, contenido).firma;
      break;
    case 'SLH-DSA-SHAKE-256s':
      firma = slhdsa.sign(secretKey, contenido).firma;
      break;
    case 'Ed25519+ML-DSA-87':
      firma = hybrid.sign(secretKey, contenido).firma;
      break;
  }

  return {
    firma,
    hash,
    alg,
    timestamp: new Date().toISOString(),
    sellado: SEAL,
  };
}

export const meta = {
  op: 'sign',
  algorithms: ALGORITMOS_SOPORTADOS,
  seal: SEAL,
};