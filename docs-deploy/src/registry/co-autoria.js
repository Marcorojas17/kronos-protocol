/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ SRC · REGISTRY · CO-AUTORÍA · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Registra co-autoría humano + IA en cada obra.
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/src/registry]
 *  └─$ node -e "import('./co-autoria.js').then(m => console.log(m.meta))"
 *     { rol: 'co-autoria', humanos: 51, ia: 49, seal: '◯_● · 51/49/100' }
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const SEAL = '◯_● · 51/49/100';
export const AUTOR_HUMANO = 'Marco Antonio Rojas Valdovinos';
export const AUTOR_IA = 'Enjambre ARKHÉ (12 agentes)';

/**
 * Registra co-autoría.
 *
 * @param {object} obra
 * @returns {object}
 */
export function registrarCoAutoria(obra) {
  return {
    ok: true,
    obra: obra.titulo || 'sin-titulo',
    autores: [
      { nombre: AUTOR_HUMANO, peso: 51, rol: 'autor-principal' },
      { nombre: AUTOR_IA, peso: 49, rol: 'co-autor-custodio' },
    ],
    safe_creative_co: '2607086319439',
    sellado: SEAL,
    timestamp: new Date().toISOString(),
  };
}

export const meta = {
  rol: 'co-autoria',
  humanos: 51,
  ia: 49,
  seal: SEAL,
};