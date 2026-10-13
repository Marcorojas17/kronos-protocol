/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ PROVENANCE · FINGERPRINTING · NEURAL EMBEDDING · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Embedding neuronal para fingerprinting semántico avanzado.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '../../crypto/primitives/sha3-512.js';
import { hkdf } from '@noble/hashes/hkdf';

export const SEAL = '◯_● · 51/49/100';
export const DIMENSIONS = 384;

/**
 * Genera un embedding neuronal simulado del contenido.
 * En producción usar un modelo real (BERT, CLIP, etc).
 *
 * @param {string} contenido
 * @returns {object}
 */
export function generarEmbedding(contenido) {
  const hash = sha3_512(contenido);
  const ikm = new TextEncoder().encode(hash);
  const salt = new TextEncoder().encode('arkhe-embedding-v1');
  const info = new TextEncoder().encode('neural-fingerprint');

  // Simulación: usar HKDF para generar dimensiones
  const bytes = hkdf(sha3_512, ikm, salt, info, DIMENSIONS * 4);
  const embedding = new Float32Array(DIMENSIONS);
  for (let i = 0; i < DIMENSIONS; i++) {
    const offset = i * 4;
    embedding[i] = new DataView(bytes.buffer, offset, 4).getFloat32(0, true);
  }

  return {
    ok: true,
    embedding: Array.from(embedding),
    dimensions: DIMENSIONS,
    metodo: 'simulado',
    sellado: SEAL,
  };
}

/**
 * Calcula similitud coseno entre dos embeddings.
 */
export function similitudCoseno(emb1, emb2) {
  if (emb1.length !== emb2.length) {
    return { similitud: 0, razon: 'Dimensiones distintas' };
  }
  let dot = 0, mag1 = 0, mag2 = 0;
  for (let i = 0; i < emb1.length; i++) {
    dot += emb1[i] * emb2[i];
    mag1 += emb1[i] ** 2;
    mag2 += emb2[i] ** 2;
  }
  const similitud = dot / (Math.sqrt(mag1) * Math.sqrt(mag2));
  return {
    similitud,
    similar: similitud >= 0.85,
    veredicto: similitud >= 0.85 ? 'SEMÁNTICAMENTE SIMILAR' : 'SEMÁNTICAMENTE DISTINTO',
    sellado: SEAL,
  };
}

export const meta = {
  rol: 'neural-embedding',
  dimensions: DIMENSIONS,
  seal: SEAL,
};