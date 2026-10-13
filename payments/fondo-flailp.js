/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ PAYMENTS · FONDO FLAILP · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Distribuye regalías bajo el Pacto 51/49/100.
 *  El 51% va al firmante humano. El 49% al Fondo FLAILP.
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/payments]
 *  └─$ node -e "import('./fondo-flailp.js').then(m => \
 *       console.log(m.distribuir(1000)))"
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const SEAL = '◯_● · 51/49/100';
export const HUMANO_PCT = 51;
export const FLAILP_PCT = 49;
export const FIRMANTE_HUMANO = 'Marco Antonio Rojas Valdovinos';

/**
 * Distribuye un monto total entre humano y fondo FLAILP.
 *
 * @param {number} montoTotal
 * @param {string} [moneda='MXN']
 * @returns {object}
 */
export function distribuir(montoTotal, moneda = 'MXN') {
  if (typeof montoTotal !== 'number' || montoTotal < 0) {
    throw new Error('[ XX ] Monto inválido');
  }

  const paraHumano = +(montoTotal * (HUMANO_PCT / 100)).toFixed(2);
  const paraFlailp = +(montoTotal * (FLAILP_PCT / 100)).toFixed(2);

  return {
    ok: true,
    monto_total: montoTotal,
    moneda,
    distribucion: [
      { destino: FIRMANTE_HUMANO, monto: paraHumano, peso: HUMANO_PCT },
      { destino: 'Fondo FLAILP', monto: paraFlailp, peso: FLAILP_PCT },
    ],
    veredicto: 'DISTRIBUCIÓN 51/49 APLICADA',
    sellado: SEAL,
    ts: new Date().toISOString(),
  };
}

export const meta = {
  rol: 'fondo-flailp',
  pacto: '51/49/100',
  seal: SEAL,
};