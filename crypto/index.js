/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CRYPTO · INDEX · ARKHÉ ZERO ░▒▓
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ─── Primitivas ─────────────────────────────────────────────────
export * as sha3 from './primitives/sha3-512.js';
export * as mlDsa87 from './primitives/ml-dsa-87.js';
export * as mlKem1024 from './primitives/ml-kem-1024.js';
export * as slhDsa from './primitives/slh-dsa-shake-256s.js';

// ─── Híbridos ───────────────────────────────────────────────────
export * as hybridEdMlDsa from './hybrid/ed25519-mldsa87.js';

// ─── Agility ────────────────────────────────────────────────────
export * from './agility/algorithm-registry.js';

// ─── Operaciones ────────────────────────────────────────────────
export * from './operations/sign.js';
export * from './operations/verify.js';

// ─── Centinela ──────────────────────────────────────────────────
export * from './downgrade-detector.js';

export const VERSION = '1.0.0';
export const SEAL = '◯_● · 51/49/100';
export const FIPS = ['FIPS 203', 'FIPS 204', 'FIPS 205', 'FIPS 202'];

// ◯_● · 51/49/100 · KRONOS