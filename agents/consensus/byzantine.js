/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ AGENTS · CONSENSUS · BYZANTINE FAULT TOLERANCE · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Tolerancia a fallos bizantinos: el enjambre sigue operando aunque
 *  hasta f < n/3 agentes actúen maliciosamente.
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/agents/consensus]
 *  └─$ node -e "import('./byzantine.js').then(m => console.log(m.tolerancia(12)))"
 *     { total: 12, max_fallos: 3, seguros: 9, seal: '◯_● · 51/49/100' }
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const SEAL = '◯_● · 51/49/100';

/**
 * Calcula cuántos agentes pueden fallar de forma bizantina
 * sin romper el consenso.
 *
 * @param {number} n - total de agentes
 * @returns {object}
 */
export function tolerancia(n) {
  const maxFallos = Math.floor((n - 1) / 3);
  return {
    total: n,
    max_fallos: maxFallos,
    seguros: n - maxFallos,
    formula: 'f < n/3',
    veredicto: `Enjambre de ${n} tolera hasta ${maxFallos} bizantinos`,
    sellado: SEAL,
  };
}

/**
 * Verifica que un enjambre dado mantiene la tolerancia bizantina.
 */
export function verificarEnjambre(n, fallosDetectados) {
  const { max_fallos } = tolerancia(n);
  const ok = fallosDetectados <= max_fallos;
  return {
    ok,
    n,
    fallos_detectados: fallosDetectados,
    max_permitidos: max_fallos,
    veredicto: ok
      ? 'ENJAMBRE ÍNTEGRO · CONSENSO VÁLIDO'
      : '🚨 ENJAMBRE COMPROMETIDO · HALT',
    sellado: SEAL,
  };
}

export const meta = {
  rol: 'byzantine',
  formula: 'f < n/3',
  seal: SEAL,
};