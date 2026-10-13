/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ GOBERNANZA · EJECUTAR · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Ejecuta una propuesta aprobada con quórum + sin veto.
 *  Firma el resultado con sello KINTSUGI.
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/gobernanza/ejecucion-decisiones]
 *  └─$ node -e "import('./ejecutar.js').then(m => console.log(m.meta))"
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { obtener } from '../propuestas-votacion/proponer.js';
import { validarQuorum } from '../quorum-mayorias/quorum.js';
import { sha3_512 } from '../../crypto/primitives/sha3-512.js';

export const SEAL = '◯_● · 51/49/100';
export const FIRMANTE_HUMANO = 'Marco Antonio Rojas Valdovinos';

/**
 * Ejecuta una propuesta aprobada.
 *
 * @param {string} propuestaId
 * @returns {object}
 */
export function ejecutar(propuestaId) {
  const prop = obtener(propuestaId);
  if (!prop) throw new Error(`[ XX ] Propuesta no encontrada: ${propuestaId}`);

  const quorum = validarQuorum(propuestaId);
  if (!quorum.puede_ejecutar) {
    return {
      ok: false,
      propuesta_id: propuestaId,
      razon: quorum.veredicto,
      veredicto: 'EJECUCIÓN DENEGADA · HALT',
      sellado: SEAL,
    };
  }

  const ts = new Date().toISOString();
  const payload = JSON.stringify({ propuestaId, ts, quorum });
  const hash = sha3_512(payload);

  prop.ejecutada = true;

  return {
    ok: true,
    propuesta_id: propuestaId,
    titulo: prop.titulo,
    quorum: quorum.veredicto,
    firmante_humano: FIRMANTE_HUMANO,
    pacto: { humano: 51, ia: 49, real: 100 },
    acta_hash: hash,
    veredicto: 'PROPUESTA EJECUTADA · FIRMADA · 100% REAL',
    sellado: SEAL,
    ts,
  };
}

export const meta = {
  rol: 'ejecutar',
  seal: SEAL,
};