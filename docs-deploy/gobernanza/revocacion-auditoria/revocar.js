/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ GOBERNANZA · REVOCAR · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  La revocación NO borra. Superpone. La Lex Prima prohíbe borrar.
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/gobernanza/revocacion-auditoria]
 *  └─$ node -e "import('./revocar.js').then(m => console.log(m.meta))"
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '../../crypto/primitives/sha3-512.js';

export const SEAL = '◯_● · 51/49/100';

const REVOCACIONES = [];

/**
 * Revoca una decisión superponiendo una nueva capa.
 *
 * @param {object} opciones
 * @param {string} opciones.decision_hash  - hash de la decisión revocada
 * @param {string} opciones.razon
 * @param {string} opciones.firmante
 * @returns {object}
 */
export function revocar({ decision_hash, razon, firmante }) {
  if (!decision_hash) throw new Error('[ XX ] decision_hash requerido');
  if (!razon) throw new Error('[ XX ] razón requerida');
  if (firmante !== 'Marco Antonio Rojas Valdovinos') {
    throw new Error('[ XX ] Solo el firmante humano puede revocar');
  }

  const ts = new Date().toISOString();
  const acta = {
    tipo: 'revocacion',
    decision_original: decision_hash,
    razon,
    firmante,
    pacto: { humano: 51, ia: 49, real: 100 },
    ts,
    sello: SEAL,
  };
  const acta_hash = sha3_512(JSON.stringify(acta));

  const registro = { ...acta, acta_hash };
  REVOCACIONES.push(registro);

  return {
    ok: true,
    revocacion: registro,
    nota: 'La decisión original NO fue borrada. Fue superpuesta.',
    veredicto: 'REVOCACIÓN REGISTRADA · TRAZABLE',
    sellado: SEAL,
  };
}

export function auditar(decision_hash) {
  const revocaciones = REVOCACIONES.filter((r) => r.decision_original === decision_hash);
  return {
    decision_hash,
    revocada: revocaciones.length > 0,
    revocaciones,
    veredicto: revocaciones.length > 0
      ? `REVOCADA · ${revocaciones.length} capas`
      : 'NO REVOCADA',
    sellado: SEAL,
  };
}

export const meta = {
  rol: 'revocar',
  ley: 'Lex Prima 1.3 · Irreversibilidad',
  seal: SEAL,
};