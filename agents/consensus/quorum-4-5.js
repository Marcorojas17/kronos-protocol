/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ AGENTS · CONSENSUS · QUÓRUM 4/5 · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Algoritmo de consenso del enjambre. Requiere 4/5 del quórum
 *  para aprobar, pero el humano SIEMPRE puede vetar (51%).
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/agents/consensus]
 *  └─$ node -e "import('./quorum-4-5.js').then(m => console.log(m.meta))"
 *     { rol: 'quorum-4-5', quorum: '4/5', seal: '◯_● · 51/49/100' }
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const QUORUM_REQUERIDO = 4;
export const TOTAL_VOTANTES = 5;
export const SEAL = '◯_● · 51/49/100';
export const VETO_HUMANO = true;

export class Enjambre {
  constructor({ humanos = 1, ia = 12 } = {}) {
    this.humanos = humanos;
    this.ia = ia;
  }

  /**
   * Delibera sobre una propuesta.
   *
   * @param {object} opciones
   * @param {string} opciones.propuesta
   * @param {string[]} opciones.votos_ia
   * @param {boolean} [opciones.veto_humano=false]
   * @returns {Promise<object>}
   */
  async deliberar({ propuesta, votos_ia = [], veto_humano = false }) {
    if (veto_humano) {
      return {
        ok: false,
        quorum: 'vetado por humano',
        propuesta,
        votos_ia: votos_ia.length,
        veto_humano: true,
        firmado: false,
        veredicto: 'VETO HUMANO · 51% · PROPUESTA DETENIDA',
        sellado: SEAL,
      };
    }

    const votosValidos = votos_ia.slice(0, TOTAL_VOTANTES);
    const quorumOk = votosValidos.length >= QUORUM_REQUERIDO;

    return {
      ok: quorumOk,
      quorum: `${votosValidos.length}/${TOTAL_VOTANTES}`,
      propuesta,
      votos_ia: votosValidos,
      veto_humano: false,
      firmado: quorumOk,
      veredicto: quorumOk
        ? 'QUÓRUM SUPERADO · 51/49/100 · FIRMADO'
        : 'QUÓRUM INSUFICIENTE · RECHAZADO',
      sellado: SEAL,
      timestamp: new Date().toISOString(),
    };
  }
}

export const meta = {
  rol: 'quorum-4-5',
  quorum: `${QUORUM_REQUERIDO}/${TOTAL_VOTANTES}`,
  veto_humano: VETO_HUMANO,
  seal: SEAL,
};