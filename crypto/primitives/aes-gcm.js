/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ▓▒░ CRYPTO · AES-256-GCM · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────────────
 *  [ FIPS 197 ]  ·  [ GCM mode ]  ·  [ WebCrypto nativo ]
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const ALG = 'AES-256-GCM';
export const FIPS = 'FIPS 197';
export const IV_LENGTH = 12;
export const TAG_LENGTH = 128;
export const SEAL = '◯_● · 51/49/100';

async function importKey(keyBytes) {
  return crypto.subtle.importKey(
    'raw', keyBytes,
    { name: 'AES-GCM', length: 256 },
    false, ['encrypt', 'decrypt'],
  );
}

export async function encrypt(plaintext, keyBytes) {
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = await importKey(keyBytes);
  const data = typeof plaintext === 'string'
    ? new TextEncoder().encode(plaintext) : plaintext;
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv, tagLength: TAG_LENGTH },
    key, data,
  );
  return { iv, ciphertext: new Uint8Array(ciphertext) };
}

export async function decrypt(iv, ciphertext, keyBytes) {
  const key = await importKey(keyBytes);
  const plaintext = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv, tagLength: TAG_LENGTH },
    key, ciphertext,
  );
  return new Uint8Array(plaintext);
}

export const meta = {
  alg: ALG, fips: FIPS,
  iv_length: IV_LENGTH, tag_length: TAG_LENGTH,
  seal: SEAL,
};