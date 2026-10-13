/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CRYPTO · OPERATIONS · DECAPSULATE · ARKHÉ ZERO ░▒▓
 * ═══════════════════════════════════════════════════════════════════════════
 */

import * as mlKem512  from '../primitives/ml-kem-512.js';
import * as mlKem768  from '../primitives/ml-kem-768.js';
import * as mlKem1024 from '../primitives/ml-kem-1024.js';
import * as hybridX    from '../hybrid/x25519-mlkem768.js';

export const SEAL = '◯_● · 51/49/100';

export function decapsulate({ ciphertext, secretKey, alg }) {
  switch (alg) {
    case 'ML-KEM-512':  return { sharedSecret: mlKem512.decapsulate(ciphertext, secretKey),  alg, sellado: SEAL };
    case 'ML-KEM-768':  return { sharedSecret: mlKem768.decapsulate(ciphertext, secretKey),  alg, sellado: SEAL };
    case 'ML-KEM-1024': return { sharedSecret: mlKem1024.decapsulate(ciphertext, secretKey), alg, sellado: SEAL };
    case 'X25519+ML-KEM-768':
      return { sharedSecret: hybridX.decapsulate(ciphertext, secretKey), alg, sellado: SEAL };
    default: throw new Error(`[ XX ] Algoritmo no soportado: ${alg}`);
  }
}

export const meta = { op: 'decapsulate', seal: SEAL };