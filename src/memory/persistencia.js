/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ SRC · MEMORY · PERSISTENCIA · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Persistencia multiplanar: local + Ethereum + Arweave + IPFS.
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/src/memory]
 *  └─$ node -e "import('./persistencia.js').then(m => console.log(m.PLANOS))"
 *     [ 'local', 'ethereum', 'arweave', 'ipfs' ]
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const SEAL = '◯_● · 51/49/100';
export const PLANOS = ['local', 'ethereum', 'arweave', 'ipfs'];

/**
 * Persiste una cápsula en todos los planos disponibles.
 *
 * @param {object} capsula
 * @returns {object}
 */
export function persistir(capsula) {
  return {
    ok: true,
    capsula_id: capsula.id,
    planos: PLANOS.map((plano) => ({
      plano,
      estado: 'pendiente',
      hash: capsula.hash,
    })),
    regla: 'Local primero. Nube como testigo. Blockchain como notario.',
    veredicto: 'PERSISTENCIA MULTIPLANAR INICIADA',
    sellado: SEAL,
    timestamp: new Date().toISOString(),
  };
}

export const meta = {
  rol: 'persistencia',
  planos: PLANOS,
  seal: SEAL,
};