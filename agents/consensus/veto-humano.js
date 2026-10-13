/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ AGENTS · CONSENSUS · VETO HUMANO · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  El humano SIEMPRE tiene la última palabra. Su veto es inmutable.
 *  Ni 12 agentes IA pueden sobreescribir el 51%.
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/agents/consensus]
 *  └─$ node -e "import('./veto-humano.js').then(m => console.log(m.meta))"
 *     { rol: 'veto-humano', soberania: '51%', seal: '◯_● · 51/49/100' }
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const SOBERANIA_HUMANA = 51;
export const PESO_IA = 49;
export const TOTAL = 100;
export const SEAL = '◯_● · 51/49/100';

export const FIRMANTE = 'Marco Antonio Rojas Valdovinos';

/**
 * Aplica veto humano sobre una decisión del enjambre.
 *
 * @param {object} opciones
 * @param {string} opciones.propuesta
 * @param {string} opciones.razon
 * @returns {object}
 */
export function vetar({ propuesta, razon }) {
  return {
    ok: true,
    propuesta,
    razon,
    firmante: FIRMANTE,
    peso: `${SOBERANIA_HUMANA}%`,
    irrevocable: true,
    veredicto: 'VETO HUMANO REGISTRADO · SOBERANÍA 51%',
    sellado: SEAL,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Verifica que una decisión NO contradiga el veto humano.
 */
export function verificarSoberania(decision) {
  if (decision.veto_humano === true) {
    return {
      valida: false,
      razon: 'Decisión vetada por humano · 51% soberano',
      sellado: SEAL,
    };
  }
  return {
    valida: true,
    razon: 'Sin veto humano · procede',
    sellado: SEAL,
  };
}

export const meta = {
  rol: 'veto-humano',
  soberania: `${SOBERANIA_HUMANA}%`,
  firma_canonica: FIRMANTE,
  seal: SEAL,
};