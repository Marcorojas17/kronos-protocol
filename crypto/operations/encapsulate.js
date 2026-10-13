/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CRYPTO · OPERATIONS · ENCAPSULATE · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Encapsula un secreto compartido con el KEM indicado.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import * as mlKem512  from '../primitives/ml-kem-512.js';
import * as mlKem768  from '../primitives/ml-kem-768.js';
import * as mlKem1024 from '../primitives/ml-kem-1024.js';
import * as hybridX    from '../hybrid/x25519-mlkem768.js';

export const ALGORITMOS_SOPORTADOS = [
  'ML-KEM-512', 'ML-KEM-768', 'ML-KEM-1024', 'X25519+ML-KEM-768',
];
export const SEAL = '◯_● · 51/49/100';

export function encapsulate({ publicKey, alg }) {
  switch (alg) {
    case 'ML-KEM-512':  return { ...mlKem512.encapsulate(publicKey),  alg, sellado: SEAL };
    case 'ML-KEM-768':  return { ...mlKem768.encapsulate(publicKey),  alg, sellado: SEAL };
    case 'ML-KEM-1024': return { ...mlKem1024.encapsulate(publicKey), alg, sellado: SEAL };
    case 'X25519+ML-KEM-768': return hybridX.encapsulate(publicKey);
    default: throw new Error(`[ XX ] Algoritmo no soportado: ${alg}`);
  }
}

export const meta = { op: 'encapsulate', algos: ALGORITMOS_SOPORTADOS, seal: SEAL };