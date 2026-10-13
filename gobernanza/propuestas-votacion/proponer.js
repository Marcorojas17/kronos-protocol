/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ GOBERNANZA · PROPONER · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Crea una propuesta para el enjambre. Requiere agente proponente activo.
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/gobernanza/propuestas-votacion]
 *  └─$ node -e "import('./proponer.js').then(m => \
 *       console.log(m.proponer({ titulo: 'Test', agente: 'cuicatl' })))"
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '../../crypto/primitives/sha3-512.js';

export const SEAL = '◯_● · 51/49/100';

const PROPUESTAS = new Map();
let COUNTER = 0;

/**
 * Crea una nueva propuesta en el sistema de gobernanza.
 *
 * @param {object} opciones
 * @param {string} opciones.titulo
 * @param {string} opciones.agente  - ID del agente proponente
 * @param {string} [opciones.descripcion]
 * @returns {object}
 */
export function proponer({ titulo, agente, descripcion = '' }) {
  if (!titulo) throw new Error('[ XX ] Título requerido');
  if (!agente) throw new Error('[ XX ] Agente proponente requerido');

  COUNTER++;
  const id = `prop-${new Date().getFullYear()}-${String(COUNTER).padStart(3, '0')}`;
  const ts = new Date().toISOString();
  const hash = sha3_512(`${id}|${titulo}|${agente}|${ts}`);

  const propuesta = {
    id,
    titulo,
    descripcion,
    agente,
    hash,
    votos: [],
    quorum_alcanzado: false,
    vetada: false,
    ejecutada: false,
    ts,
    sellado: SEAL,
  };

  PROPUESTAS.set(id, propuesta);

  return {
    ok: true,
    propuesta,
    veredicto: 'PROPUESTA CREADA · EN ESPERA DE VOTOS',
    sellado: SEAL,
  };
}

export function obtener(id) {
  return PROPUESTAS.get(id) || null;
}

export function listar() {
  return Array.from(PROPUESTAS.values());
}

export const meta = {
  rol: 'proponer',
  seal: SEAL,
};