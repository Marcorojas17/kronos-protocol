/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CRYPTO · DOWNGRADE DETECTOR · CENTINELA · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  Detecta intentos de degradar la suite criptográfica
 *  (p. ej. forzar SHA-1, RSA-1024, MD5) y emite alerta.
 *
 *  ┌─(kali㉿arkhe-zero)-[~/kronos/crypto]
 *  └─$ node -e "import('./downgrade-detector.js').then(m => \
 *       console.log(m.auditarSuite(['md5','sha3-512'])))"
 *     { ok: false, alerta: '🚨 DOWNGRADE DETECTADO...', ... }
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const ALGORITMOS_PROHIBIDOS = [
  'md5', 'sha1', 'sha-1',
  'rsa-1024', 'rsa1024',
  'des', '3des', 'rc4',
  'ecdsa-p192',
];

export const ALGORITMOS_CANONICOS = [
  'sha3-512', 'sha-3-512',
  'ml-kem-1024', 'ml-dsa-87', 'slh-dsa-shake-256s',
  'ed25519', 'x25519',
  'aes-256-gcm', 'hkdf-sha3-512',
];

export const SEAL = '◯_● · 51/49/100';

/**
 * Audita una suite de algoritmos propuesta.
 *
 * @param {string[]} suite
 * @returns {{ ok: boolean, alerta: string|null, permitidos: string[], prohibidos: string[] }}
 */
export function auditarSuite(suite) {
  const normalizados = suite.map((a) => a.toLowerCase().trim());
  const prohibidos = normalizados.filter((a) => ALGORITMOS_PROHIBIDOS.includes(a));

  if (prohibidos.length > 0) {
    return {
      ok: false,
      alerta: `🚨 DOWNGRADE DETECTADO · algoritmos prohibidos: ${prohibidos.join(', ')}`,
      permitidos: normalizados.filter((a) => !prohibidos.includes(a)),
      prohibidos,
      sellado: SEAL,
    };
  }

  return {
    ok: true,
    alerta: null,
    permitidos: normalizados,
    prohibidos: [],
    veredicto: 'SUITE CANÓNICA · 100% REAL',
    sellado: SEAL,
  };
}

export const meta = {
  rol: 'centinela',
  seal: SEAL,
};