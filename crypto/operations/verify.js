/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CRYPTO · VERIFY · OPERACIÓN UNIFICADA · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  [ dispatcher ]  ·  [ fail-safe ]  ·  [ veredicto ceremonial ]
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/crypto/operations]
 *  └─$ node -e "import('./verify.js').then(m => console.log(m.meta))"
 *     { op: 'verify', seal: '◯_● · 51/49/100' }
 * ═══════════════════════════════════════════════════════════════════════════
 */

import * as mldsa from '../primitives/ml-dsa-87.js';
import * as slhdsa from '../primitives/slh-dsa-shake-256s.js';
import * as hybrid from '../hybrid/ed25519-mldsa87.js';
import { sha3_512 } from '../primitives/sha3-512.js';

export const SEAL = '◯_● · 51/49/100';

/**
 * Verifica contenido + firma + hash contra las claves públicas.
 *
 * @param {object} opciones
 * @param {string|Uint8Array} opciones.contenido
 * @param {any} opciones.firma
 * @param {any} opciones.publicKey
 * @param {string} opciones.alg
 * @param {string} [opciones.hashEsperado]
 * @returns {Promise<{valido, hash_ok, firma_ok, veredicto, sellado}>}
 */
export async function verify({
  contenido,
  firma,
  publicKey,
  alg,
  hashEsperado,
}) {
  const hashActual = sha3_512(contenido);
  const hashOk = !hashEsperado || hashActual === hashEsperado;

  let firmaOk;
  switch (alg) {
    case 'ML-DSA-87':
      firmaOk = mldsa.verify(publicKey, firma, contenido);
      break;
    case 'SLH-DSA-SHAKE-256s':
      firmaOk = slhdsa.verify(publicKey, firma, contenido);
      break;
    case 'Ed25519+ML-DSA-87':
      firmaOk = hybrid.verify(publicKey, firma, contenido).valida;
      break;
    default:
      throw new Error(`[ XX ] Algoritmo no soportado: ${alg}`);
  }

  const integro = hashOk && firmaOk;

  return {
    valido: integro,
    hash_ok: hashOk,
    firma_ok: firmaOk,
    hash_calculado: hashActual,
    hash_esperado: hashEsperado || hashActual,
    veredicto: integro
      ? 'DOCUMENTO ÍNTEGRO · ANCLADO AL ÍNDICE CERO'
      : 'ALTERACIÓN DETECTADA · TRAZABILIDAD ROTA',
    sellado: SEAL,
  };
}

export const meta = {
  op: 'verify',
  seal: SEAL,
};