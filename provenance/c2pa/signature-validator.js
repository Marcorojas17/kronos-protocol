/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ PROVENANCE · C2PA · SIGNATURE VALIDATOR · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  [ C2PA 2.1 ]  ·  [ firma híbrida ]  ·  [ verificación independiente ]
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '../../crypto/primitives/sha3-512.js';
import * as mldsa from '../../crypto/primitives/ml-dsa-87.js';
import { ed25519 } from '@noble/curves/ed25519';

export const SEAL = '◯_● · 51/49/100';

/**
 * Valida la firma de un manifiesto C2PA.
 *
 * @param {object} manifiesto
 * @param {object} publicKey
 * @returns {object}
 */
export function validarFirma(manifiesto, publicKey) {
  const { claim, hash, firma } = manifiesto;

  if (!claim || !hash) {
    return {
      valida: false,
      razon: 'Manifiesto incompleto',
      sellado: SEAL,
    };
  }

  // Verificar hash interno del claim
  const hashCalculado = sha3_512(JSON.stringify(claim));
  const hashOk = hashCalculado === hash;

  // Si hay firma PQC, verificarla
  let firmaOk = true;
  if (firma && publicKey) {
    firmaOk = mldsa.verify(publicKey.ml_dsa_87, firma.ml_dsa_87, hashCalculado);
    if (publicKey.ed25519 && firma.ed25519) {
      firmaOk = firmaOk && ed25519.verify(firma.ed25519, new TextEncoder().encode(hashCalculado), publicKey.ed25519);
    }
  }

  const valida = hashOk && firmaOk;

  return {
    valida,
    hash_ok: hashOk,
    firma_ok: firmaOk,
    veredicto: valida
      ? 'MANIFIESTO C2PA VÁLIDO'
      : 'MANIFIESTO C2PA INVÁLIDO · HALT',
    sellado: SEAL,
  };
}

export const meta = {
  rol: 'c2pa-signature-validator',
  seal: SEAL,
};