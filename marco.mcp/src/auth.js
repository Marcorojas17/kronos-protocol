/**
 * ═══════════════════════════════════════════════════════════════════
 *  ▓▒░ MARCO.MCP · AUTH · ÍNDICE CERO LOADER ░▒▓
 * ═══════════════════════════════════════════════════════════════════
 */

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const SEAL = '◯_● · 51/49/100';

export async function loadIndexZero() {
  const manifestPath = process.env.MANIFEST_PATH || '../AI-MANIFEST.json';

  let manifest;
  try {
    const raw = await readFile(join(process.cwd(), manifestPath), 'utf8');
    manifest = JSON.parse(raw);
  } catch (err) {
    // Fallback: construir desde env
    manifest = {
      index_zero: {
        sha256: process.env.INDEX_ZERO_SHA256,
        safe_creative_arq: process.env.INDEX_ZERO_SAFE_CREATIVE_ARQ,
        safe_creative_co: process.env.INDEX_ZERO_SAFE_CREATIVE_CO,
        blockchain: process.env.INDEX_ZERO_ETHEREUM,
        eidas_seal: process.env.INDEX_ZERO_EIDAS,
      },
    };
  }

  // Verificación mínima
  const sha256 = manifest.index_zero?.sha256;
  if (!sha256 || sha256.length !== 64) {
    throw new Error('Índice Cero corrupto: SHA-256 inválido o ausente');
  }

  return {
    ok: true,
    sha256,
    safe_creative_arq: manifest.index_zero.safe_creative_arq,
    safe_creative_co: manifest.index_zero.safe_creative_co,
    ethereum: manifest.index_zero.blockchain,
    eidas: manifest.index_zero.eidas_seal,
    seal: SEAL,
  };
}

export function requireGovernance() {
  const humano = parseInt(process.env.GOVERNANCE_HUMANO || '51', 10);
  const ia = parseInt(process.env.GOVERNANCE_IA || '49', 10);
  const real = parseInt(process.env.GOVERNANCE_REAL || '100', 10);

  if (humano + ia !== real) {
    throw new Error(`Pacto roto: ${humano} + ${ia} ≠ ${real}`);
  }
  if (humano !== 51 || ia !== 49 || real !== 100) {
    throw new Error('Pacto alterado: los valores canónicos son 51/49/100');
  }

  return { humano, ia, real, seal: SEAL };
}