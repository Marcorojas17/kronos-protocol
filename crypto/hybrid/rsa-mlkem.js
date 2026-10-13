/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CRYPTO · HÍBRIDO · RSA-4096 + ML-KEM-1024 · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Bridge temporal para sistemas legacy con RSA. NO recomendado para
 *  nuevos desarrollos (usar X25519+ML-KEM-768). Solo para migración.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import * as mlKem from '../primitives/ml-kem-1024.js';
import { sha3_512 } from '../primitives/sha3-512.js';
import { concatBytes, utf8ToBytes } from '@noble/hashes/utils';

export const ALG = 'RSA-4096+ML-KEM-1024';
export const SEAL = '◯_● · 51/49/100';

export async function keygen() {
  const rsaKeyPair = await crypto.subtle.generateKey(
    { name: 'RSA-OAEP', modulusLength: 4096, publicExponent: new Uint8Array([1,0,1]), hash: 'SHA-256' },
    true, ['encrypt', 'decrypt'],
  );
  const mlKemPair = mlKem.keygen();
  return { publicKey: { rsa: rsaKeyPair.publicKey, ml_kem_1024: mlKemPair.publicKey },
           secretKey: { rsa: rsaKeyPair.privateKey, ml_kem_1024: mlKemPair.secretKey } };
}

export async function encapsulate(publicKey) {
  // RSA: cifrar un secreto aleatorio
  const rsaSecret = crypto.getRandomValues(new Uint8Array(32));
  const rsaCipher = new Uint8Array(await crypto.subtle.encrypt(
    { name: 'RSA-OAEP' }, publicKey.rsa, rsaSecret,
  ));
  // ML-KEM
  const { cipherText, sharedSecret } = mlKem.encapsulate(publicKey.ml_kem_1024);
  // Combinar
  const combined = sha3_512(concatBytes(rsaSecret, sharedSecret));
  return {
    ciphertext: { rsa: rsaCipher, ml_kem_1024: cipherText },
    sharedSecret: utf8ToBytes(combined),
    alg: ALG, seal: SEAL,
    nota: 'Bridge legacy · migrar a X25519+ML-KEM-768',
  };
}

export async function decapsulate(ciphertext, secretKey) {
  const rsaSecret = new Uint8Array(await crypto.subtle.decrypt(
    { name: 'RSA-OAEP' }, secretKey.rsa, ciphertext.rsa,
  ));
  const sharedPqc = mlKem.decapsulate(ciphertext.ml_kem_1024, secretKey.ml_kem_1024);
  const combined = sha3_512(concatBytes(rsaSecret, sharedPqc));
  return utf8ToBytes(combined);
}

export const meta = {
  alg: ALG,
  estrategia: 'bridge legacy · NO recomendado para nuevos',
  seal: SEAL,
};