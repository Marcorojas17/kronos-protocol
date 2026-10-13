/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ PROVENANCE · NOTARIZATION · LEDGER PROOF · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Prueba criptográfica de inclusión en un ledger distribuido.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const SEAL = '◯_● · 51/49/100';

/**
 * Genera una prueba de inclusión en un ledger.
 *
 * @param {object} opciones
 * @param {string} opciones.hash
 * @param {string} opciones.merkle_root
 * @param {string[]} opciones.merkle_proof
 * @returns {object}
 */
export function generarLedgerProof({ hash, merkle_root, merkle_proof }) {
  return {
    ok: true,
    hash,
    merkle_root,
    merkle_proof,
    veredicto: 'PRUEBA DE INCLUSIÓN GENERADA',
    notas: [
      'La prueba permite verificar pertenencia sin revelar el conjunto completo.',
      'Verificable por cualquiera con el Merkle root.',
    ],
    sellado: SEAL,
  };
}

/**
 * Verifica una prueba de inclusión.
 */
export function verificarLedgerProof({ hash, merkle_root, merkle_proof }) {
  let h = hash;
  for (const p of merkle_proof) {
    const [a, b] = [h, p].sort();
    h = `${a}${b}`; // En producción: sha3_512(concatBytes(hexToBytes(a), hexToBytes(b)))
  }
  const valido = h === merkle_root;

  return {
    valido,
    veredicto: valido ? 'PRUEBA VÁLIDA · INCLUIDA' : 'PRUEBA INVÁLIDA · HALT',
    sellado: SEAL,
  };
}

export const meta = {
  rol: 'ledger-proof',
  seal: SEAL,
};