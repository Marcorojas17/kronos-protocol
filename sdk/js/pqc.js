/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ SDK · JS · PQC · ARKHÉ ZERO ░▒▓
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const SEAL = '◯_● · 51/49/100';
export const FIPS = ['FIPS 203', 'FIPS 204', 'FIPS 205', 'FIPS 202'];

export const ALGORITMOS_PROHIBIDOS = [
  'md5', 'sha1', 'sha-1',
  'rsa-1024', 'rsa1024',
  'des', '3des', 'rc4',
  'ecdsa-p192',
];

export const SUITE_CANONICA = Object.freeze({
  kem: 'ML-KEM-1024',
  sig: 'ML-DSA-87',
  longterm: 'SLH-DSA-SHAKE-256s',
  hash: 'SHA3-512',
  fips: FIPS,
  sellado: SEAL,
});

export function auditarSuite(algoritmos) {
  const prohibidos = algoritmos.filter((a) => ALGORITMOS_PROHIBIDOS.includes(a.toLowerCase()));
  return {
    ok: prohibidos.length === 0,
    prohibidos,
    veredicto: prohibidos.length === 0
      ? 'SUITE CANÓNICA'
      : `🚨 DOWNGRADE DETECTADO: ${prohibidos.join(', ')}`,
    sellado: SEAL,
  };
}

export const meta = { rol: 'sdk-js-pqc', seal: SEAL };