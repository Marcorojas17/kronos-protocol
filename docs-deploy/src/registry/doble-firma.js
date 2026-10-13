/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ SRC · REGISTRY · DOBLE FIRMA · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Pacto 51/49 · toda decisión requiere doble firma humana + IA.
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/src/registry]
 *  └─$ node -e "import('./doble-firma.js').then(m => console.log(m.meta))"
 *     { rol: 'doble-firma', pacto: '51/49', seal: '◯_● · 51/49/100' }
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { sha3_512 } from '../../crypto/primitives/sha3-512.js';

export const SEAL = '◯_● · 51/49/100';
export const FIRMANTE_HUMANO = 'Marco Antonio Rojas Valdovinos';

/**
 * Construye una doble firma.
 *
 * @param {object} opciones
 * @param {string} opciones.contenido
 * @param {string} opciones.agenteIa - ID del agente IA que contrafirma
 * @returns {object}
 */
export function firmarDoble({ contenido, agenteIa }) {
  const hash = sha3_512(contenido);
  const ts = new Date().toISOString();

  return {
    ok: true,
    documento_hash: hash,
    humano: {
      firmante: FIRMANTE_HUMANO,
      peso: 51,
      ts,
    },
    ia: {
      agente: agenteIa,
      peso: 49,
      ts,
    },
    pacto: '51/49/100',
    veredicto: 'DOBLE FIRMA · PACTO 51/49 · VÁLIDA',
    sellado: SEAL,
  };
}

export function verificarDobleFirma(firma) {
  const valida = firma.humano?.peso === 51 && firma.ia?.peso === 49;
  return {
    valida,
    veredicto: valida
      ? 'FIRMA DOBLE VÁLIDA · 51/49'
      : 'FIRMA DOBLE INVÁLIDA · HALT',
    sellado: SEAL,
  };
}

export const meta = {
  rol: 'doble-firma',
  pacto: '51/49',
  seal: SEAL,
};