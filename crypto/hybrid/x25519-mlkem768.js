/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CRYPTO · HÍBRIDO · X25519 + ML-KEM-768 · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Combinación clásica + post-cuántica para KEM (intercambio de claves).
 *  Si uno falla → falla toda la operación. Defensa en profundidad.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { x25519 } from '@noble/curves/ed25519';
import * as mlKem from '../primitives/ml-kem-768.js';
import { sha3_512 } from '../primitives/sha3-512.js';
import { concatBytes } from '@noble/hashes/utils';

export const ALG = 'X25519+ML-KEM-768';
export const SEAL = '◯_● · 51/49/100';

export function keygen() {
  const x25519Sk = crypto.getRandomValues(new Uint8Array(32));
  const x25519Pk = x25519.getPublicKey(x25519Sk);
  const { publicKey: mlPk, secretKey: mlSk } = mlKem.keygen();
  return {
    publicKey: { x25519: x25519Pk, ml_kem_768: mlPk },
    secretKey: { x25519: x25519Sk, ml_kem_768: mlSk },
  };
}

export function encapsulate(publicKey) {
  // Clásico
  const ephSk = crypto.getRandomValues(new Uint8Array(32));
  const ephPk = x25519.getPublicKey(ephSk);
  const sharedClassic = x25519.getSharedSecret(ephSk, publicKey.x25519);
  // Post-cuántico
  const { cipherText, sharedSecret } = mlKem.encapsulate(publicKey.ml_kem_768);
  // Combinar (KDF sobre la concatenación)
  const combined = sha3_512(concatBytes(sharedClassic, sharedSecret));
  return {
    ciphertext: { x25519: ephPk, ml_kem_768: cipherText },
    sharedSecret: new TextEncoder().encode(combined),
    alg: ALG, seal: SEAL,
  };
}

export function decapsulate(ciphertext, secretKey) {
  const sharedClassic = x25519.getSharedSecret(secretKey.x25519, ciphertext.x25519);
  const sharedPqc = mlKem.decapsulate(ciphertext.ml_kem_768, secretKey.ml_kem_768);
  const combined = sha3_512(concatBytes(sharedClassic, sharedPqc));
  return new TextEncoder().encode(combined);
}

export const meta = {
  alg: ALG,
  estrategia: 'defensa en profundidad · KEM híbrido',
  seal: SEAL,
};