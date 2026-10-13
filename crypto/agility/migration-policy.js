/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CRYPTO · AGILITY · MIGRATION POLICY · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Define cómo migrar de algoritmos legacy a PQC sin romper firmas antiguas.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { REGISTRY, STATUS } from './algorithm-registry.js';

export const SEAL = '◯_● · 51/49/100';

export const MIGRACIONES = Object.freeze({
  'rsa-2048':   'ml-dsa-87',
  'rsa-4096':   'ml-dsa-87',
  'ecdsa-p256': 'ml-dsa-65',
  'ecdsa-p384': 'ml-dsa-87',
  'sha256':     'sha3-512',
  'md5':        'sha3-512',
  'sha1':       'sha3-512',
});

export const POLITICA = Object.freeze({
  legacy_aceptado_hasta: '2030-12-31',
  doble_firma_obligatoria: true,
  anclaje_obligatorio: true,
  nota: 'Firmas nuevas usan PQC. Legacy se mantiene verificable hasta 2030.',
});

/**
 * Plan de migración para un algoritmo legacy.
 */
export function planMigracion(algoritmo) {
  const destino = MIGRACIONES[algoritmo.toLowerCase()];
  if (!destino) {
    return {
      ok: false,
      razon: 'Algoritmo sin plan de migración',
      sellado: SEAL,
    };
  }
  return {
    ok: true,
    origen: algoritmo,
    destino,
    doble_firma: true,
    periodo_transicion: 'hasta 2030-12-31',
    sellado: SEAL,
  };
}

export function listarMigraciones() {
  return Object.entries(MIGRACIONES).map(([from, to]) => ({
    from, to,
    estado: REGISTRY[from]?.status || 'desconocido',
  }));
}

export const meta = { rol: 'migration-policy', seal: SEAL };