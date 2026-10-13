/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ SDK · JS · AGENTS · ARKHÉ ZERO ░▒▓
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const SEAL = '◯_● · 51/49/100';

export const CULTURALES = ['cuicatl', 'temachtiani', 'tlachixqui', 'tlamatini', 'tlapohualli', 'tonal'];
export const OFICIOS = ['090-arquitecto', '091-contralor', '092-auditor-externo',
                        '093-relator', '094-bibliotecario', '095-cartografo'];

export function listarAgentes() {
  return {
    culturales: CULTURALES,
    oficios: OFICIOS,
    total: CULTURALES.length + OFICIOS.length,
    sellado: SEAL,
  };
}

export function infoAgente(agente_id) {
  const todos = [...CULTURALES, ...OFICIOS];
  if (!todos.includes(agente_id)) {
    return { error: `agente no encontrado: ${agente_id}`, sellado: SEAL };
  }
  return {
    id: agente_id,
    tipo: CULTURALES.includes(agente_id) ? 'cultural' : 'oficio',
    estado: 'activo',
    sellado: SEAL,
  };
}

export function verificarQuorum(votos) {
  const requerido = 4;
  const maxVotantes = 5;
  const votosUnicos = [...new Set(votos)].slice(0, maxVotantes);
  return {
    votos: votosUnicos,
    total: votosUnicos.length,
    requerido,
    alcanzado: votosUnicos.length >= requerido,
    veredicto: `QUÓRUM ${votosUnicos.length}/${maxVotantes}`,
    sellado: SEAL,
  };
}

export const meta = { rol: 'sdk-js-agents', seal: SEAL };