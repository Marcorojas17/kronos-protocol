/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ GOBERNANZA · VOTAR · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Registra votos de agentes IA y humanos sobre una propuesta.
 *  Regla: máximo 5 votos efectivos (quórum 4/5). Veto humano siempre activo.
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/gobernanza/propuestas-votacion]
 *  └─$ node -e "import('./votar.js').then(m => console.log(m.meta))"
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { obtener } from './proponer.js';

export const SEAL = '◯_● · 51/49/100';
export const QUORUM_REQUERIDO = 4;
export const MAX_VOTANTES = 5;

/**
 * Vota en una propuesta existente.
 *
 * @param {string} propuestaId
 * @param {string[]} agentes - IDs de agentes votantes
 * @param {object} [opciones]
 * @param {boolean} [opciones.veto_humano=false]
 * @param {string} [opciones.razon_veto]
 * @returns {object}
 */
export function votar(propuestaId, agentes = [], opciones = {}) {
  const prop = obtener(propuestaId);
  if (!prop) throw new Error(`[ XX ] Propuesta no encontrada: ${propuestaId}`);
  if (prop.ejecutada) throw new Error('[ XX ] Propuesta ya ejecutada');
  if (prop.vetada) throw new Error('[ XX ] Propuesta vetada · HALT');

  if (opciones.veto_humano) {
    prop.vetada = true;
    prop.votos = [];
    return {
      ok: false,
      propuesta_id: propuestaId,
      veto_humano: true,
      razon: opciones.razon_veto || 'Veto humano sin razón especificada',
      veredicto: 'VETO HUMANO APLICADO · PROPUESTA DETENIDA',
      sellado: SEAL,
      ts: new Date().toISOString(),
    };
  }

  const votosUnicos = [...new Set(agentes)].slice(0, MAX_VOTANTES);
  prop.votos = votosUnicos;
  prop.quorum_alcanzado = votosUnicos.length >= QUORUM_REQUERIDO;

  return {
    ok: true,
    propuesta_id: propuestaId,
    votos: votosUnicos,
    total: votosUnicos.length,
    quorum_requerido: QUORUM_REQUERIDO,
    quorum_alcanzado: prop.quorum_alcanzado,
    veredicto: prop.quorum_alcanzado
      ? `QUÓRUM ${votosUnicos.length}/${MAX_VOTANTES} · APROBADO`
      : `QUÓRUM ${votosUnicos.length}/${MAX_VOTANTES} · INSUFICIENTE`,
    sellado: SEAL,
    ts: new Date().toISOString(),
  };
}

export const meta = {
  rol: 'votar',
  quorum: `${QUORUM_REQUERIDO}/${MAX_VOTANTES}`,
  seal: SEAL,
};