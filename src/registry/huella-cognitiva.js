/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ SRC · REGISTRY · HUELLA COGNITIVA · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Fingerprint cognitivo de un agente IA. Identidad única verificable.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '../../crypto/primitives/sha3-512.js';
import { hkdf } from '@noble/hashes/hkdf';

export const SEAL = '◯_● · 51/49/100';

/**
 * Genera la huella cognitiva de un agente.
 *
 * @param {object} opciones
 * @param {string} opciones.agente_id
 * @param {string} opciones.modelo
 * @param {string[]} opciones.capacidades
 * @param {string} opciones.secreto
 * @returns {object}
 */
export function generarHuella({ agente_id, modelo, capacidades, secreto }) {
  const ikm = new TextEncoder().encode(
    JSON.stringify({ agente_id, modelo, capacidades })
  );
  const salt = new TextEncoder().encode(secreto);
  const info = new TextEncoder().encode('arkhe-cognitive-fingerprint-v1');

  const huella = hkdf(sha3_512, ikm, salt, info, 32);
  const huellaHex = Array.from(huella).map((b) => b.toString(16).padStart(2, '0')).join('');

  return {
    ok: true,
    agente_id,
    huella_cognitiva: huellaHex,
    metodo: 'HKDF-SHA3-512',
    sellado: SEAL,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Verifica que una huella coincide con el agente.
 */
export function verificarHuella({ agente_id, modelo, capacidades, secreto, huella }) {
  const regenerada = generarHuella({ agente_id, modelo, capacidades, secreto });
  return {
    ok: regenerada.huella_cognitiva === huella,
    veredicto: regenerada.huella_cognitiva === huella
      ? 'HUELLA COGNITIVA VÁLIDA'
      : 'HUELLA COGNITIVA INVÁLIDA · HALT',
    sellado: SEAL,
  };
}

export const meta = {
  rol: 'huella-cognitiva',
  algoritmo: 'HKDF-SHA3-512',
  seal: SEAL,
};