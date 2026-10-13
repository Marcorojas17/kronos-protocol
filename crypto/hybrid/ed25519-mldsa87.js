/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CRYPTO · FIRMA HÍBRIDA · ED25519 + ML-DSA-87 · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Defensa en profundidad: clásico + post-cuántico en paralelo.
 *  Si una capa cae, la otra sostiene el legado.
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/crypto/hybrid]
 *  └─$ node -e "import('./ed25519-mldsa87.js').then(m => console.log(m.meta))"
 *     { alg: 'Ed25519+ML-DSA-87', estrategia: 'defensa en profundidad', ... }
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { ed25519 } from '@noble/curves/ed25519';
import * as mldsa from '../primitives/ml-dsa-87.js';
import { sha3_512 } from '../primitives/sha3-512.js';

export const ALG = 'Ed25519+ML-DSA-87';
export const MODE = 'hybrid';
export const SEAL = '◯_● · 51/49/100';

/**
 * Genera el par híbrido (Ed25519 + ML-DSA-87).
 */
export function keygen() {
  const edSeed = crypto.getRandomValues(new Uint8Array(32));
  const ed = ed25519.keygen(edSeed);
  const ml = mldsa.keygen();
  return {
    publicKey: { ed25519: ed.publicKey, ml_dsa_87: ml.publicKey },
    secretKey: { ed25519: ed.secretKey, ml_dsa_87: ml.secretKey },
  };
}

/**
 * Firma doble: Ed25519 + ML-DSA-87.
 *
 * @param {object} secretKey - { ed25519, ml_dsa_87 }
 * @param {string|Uint8Array} contenido
 * @returns {{ firma: object, hash: string, algoritmo: string, sellado: string }}
 */
export function sign(secretKey, contenido) {
  const hash = sha3_512(contenido);
  const msg = typeof contenido === 'string'
    ? new TextEncoder().encode(contenido)
    : contenido;

  const firmaEd = ed25519.sign(secretKey.ed25519, msg);
  const firmaMl = mldsa.sign(secretKey.ml_dsa_87, contenido).firma;

  return {
    firma: { ed25519: firmaEd, ml_dsa_87: firmaMl },
    hash,
    algoritmo: ALG,
    sellado: SEAL,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Verifica ambas firmas. Ambas deben ser válidas.
 *
 * @param {object} publicKey - { ed25519, ml_dsa_87 }
 * @param {object} firma - { ed25519, ml_dsa_87 }
 * @param {string|Uint8Array} contenido
 * @returns {{ valida: boolean, ed25519: boolean, ml_dsa_87: boolean, veredicto: string }}
 */
export function verify(publicKey, firma, contenido) {
  const msg = typeof contenido === 'string'
    ? new TextEncoder().encode(contenido)
    : contenido;

  const okEd = ed25519.verify(firma.ed25519, msg, publicKey.ed25519);
  const okMl = mldsa.verify(publicKey.ml_dsa_87, firma.ml_dsa_87, contenido);

  const valida = okEd && okMl;

  return {
    valida,
    ed25519: okEd,
    ml_dsa_87: okMl,
    veredicto: valida
      ? 'HÍBRIDA VÁLIDA · ANCLADA AL CIMIENTO'
      : 'HÍBRIDA RECHAZADA · ALERTA',
    sellado: SEAL,
  };
}

export const meta = {
  alg: ALG,
  mode: MODE,
  estrategia: 'defensa en profundidad',
  seal: SEAL,
};