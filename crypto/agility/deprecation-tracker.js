/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CRYPTO · AGILITY · DEPRECATION TRACKER · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Registra cuándo cada algoritmo queda obsoleto y alerta a tiempo.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const SEAL = '◯_● · 51/49/100';

export const DEPRECACIONES = Object.freeze({
  'rsa-2048':   { desde: '2026-01-01', hasta: '2028-12-31', motivo: 'Vulnerable a Shor' },
  'rsa-4096':   { desde: '2026-01-01', hasta: '2030-12-31', motivo: 'Vulnerable a Shor (plazo extendido)' },
  'ecdsa-p256': { desde: '2026-01-01', hasta: '2028-12-31', motivo: 'Vulnerable a Shor' },
  'ed25519':    { desde: '2030-01-01', hasta: '2035-12-31', motivo: 'Solo híbrido post-2030' },
  'x25519':     { desde: '2030-01-01', hasta: '2035-12-31', motivo: 'Solo híbrido post-2030' },
  'sha256':     { desde: '2035-01-01', hasta: '2040-12-31', motivo: 'Migrar a SHA3-512' },
});

/**
 * Estado de deprecación de un algoritmo.
 */
export function estadoDeprecacion(algoritmo) {
  const dep = DEPRECACIONES[algoritmo.toLowerCase()];
  if (!dep) return { ok: true, estado: 'estable', sellado: SEAL };
  const ahora = new Date().toISOString().slice(0, 10);
  if (ahora >= dep.hasta)   return { ok: false, estado: 'prohibido', ...dep, sellado: SEAL };
  if (ahora >= dep.desde)   return { ok: false, estado: 'en-deprecación', ...dep, sellado: SEAL };
  return { ok: true, estado: 'vigente-hasta-' + dep.desde, ...dep, sellado: SEAL };
}

export function alertasProximas(diasUmbral = 365) {
  const ahora = Date.now();
  const umbral = diasUmbral * 24 * 60 * 60 * 1000;
  return Object.entries(DEPRECACIONES)
    .filter(([, d]) => {
      const diff = new Date(d.desde).getTime() - ahora;
      return diff > 0 && diff < umbral;
    })
    .map(([alg, d]) => ({ alg, ...d }));
}

export const meta = { rol: 'deprecation-tracker', seal: SEAL };