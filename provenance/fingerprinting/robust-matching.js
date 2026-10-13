/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ PROVENANCE · FINGERPRINTING · ROBUST MATCHING · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Emparejamiento robusto entre fingerprints bajo transformaciones.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { pHash, compararPHash } from './perceptual-hash.js';
import { generarEmbedding, similitudCoseno } from './neural-embedding.js';

export const SEAL = '◯_● · 51/49/100';

/**
 * Matching robusto combinando pHash + embedding.
 *
 * @param {string} contenido1
 * @param {string} contenido2
 * @returns {object}
 */
export function matchingRobusto(contenido1, contenido2) {
  const phash1 = pHash(contenido1);
  const phash2 = pHash(contenido2);
  const comp1 = compararPHash(phash1.phash, phash2.phash);

  const emb1 = generarEmbedding(contenido1);
  const emb2 = generarEmbedding(contenido2);
  const comp2 = similitudCoseno(emb1.embedding, emb2.embedding);

  const promedio = (comp1.similitud + comp2.similitud) / 2;
  const match = promedio >= 0.85;

  return {
    ok: true,
    match,
    similitud_phash: comp1.similitud,
    similitud_embedding: comp2.similitud,
    promedio,
    veredicto: match ? 'MATCH CONFIRMADO' : 'SIN MATCH',
    sellado: SEAL,
  };
}

export const meta = {
  rol: 'robust-matching',
  seal: SEAL,
};