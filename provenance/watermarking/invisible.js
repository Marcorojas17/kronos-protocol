/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ PROVENANCE · WATERMARKING · INVISIBLE · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Marca invisible basada en hash robusto. No altera percepción visual.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '../../crypto/primitives/sha3-512.js';
import { hkdf } from '@noble/hashes/hkdf';

export const SEAL = '◯_● · 51/49/100';

/**
 * Genera una marca invisible que se puede incrustar en el contenido.
 *
 * @param {object} opciones
 * @param {string} opciones.contenido_hash
 * @param {string} opciones.autor
 * @param {string} opciones.secreto
 * @returns {object}
 */
export function generarMarcaInvisible({ contenido_hash, autor, secreto }) {
  const ikm = new TextEncoder().encode(contenido_hash + autor);
  const salt = new TextEncoder().encode(secreto);
  const info = new TextEncoder().encode('arkhe-watermark-invisible-v1');

  const derivado = hkdf(sha3_512, ikm, salt, info, 32);
  const marca = Array.from(derivado).map((b) => b.toString(16).padStart(2, '0')).join('');

  return {
    ok: true,
    tipo: 'invisible',
    marca,
    metodo: 'HKDF-SHA3-512',
    contenido_hash,
    autor,
    sellado: SEAL,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Detecta si una marca coincide con un contenido.
 */
export function detectarMarca({ contenido_hash, autor, secreto, marca }) {
  const regenerada = generarMarcaInvisible({ contenido_hash, autor, secreto });
  return {
    ok: regenerada.marca === marca,
    veredicto: regenerada.marca === marca
      ? 'MARCA INVISIBLE DETECTADA'
      : 'MARCA INVISIBLE AUSENTE',
    sellado: SEAL,
  };
}

export const meta = {
  rol: 'watermark-invisible',
  metodo: 'HKDF-SHA3-512',
  seal: SEAL,
};