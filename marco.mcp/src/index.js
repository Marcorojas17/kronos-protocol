#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════
 *  ▓▒░ MARCO.MCP · ENTRY POINT · ARKHÉ ZERO ░▒▓
 *  ─────────────────────────────────────────────────────────────────
 *  Pipeline: production · Transport: stdio · Seal: KINTSUGI
 * ═══════════════════════════════════════════════════════════════════
 */

import 'dotenv/config';
import { MarcoMCPServer } from './server.js';
import { loadIndexZero } from './auth.js';

const SEAL = '◯_● · 51/49/100';

function banner() {
  process.stderr.write(`
╔══════════════════════════════════════════════════════════════════╗
║  ▓▒░ MARCO.MCP · SUBSTRATO COGNITIVO PERSONAL · v1.0.0 ░▒▓       ║
║  ─────────────────────────────────────────────────────           ║
║  Owner  : Marco Antonio Rojas Valdovinos                        ║
║  Seal   : ${SEAL.padEnd(54)}║
║  Model  : FLAILP · Local-First · Humano-IA                      ║
╚══════════════════════════════════════════════════════════════════╝
`);
}

async function main() {
  banner();

  // 1. Verificar Índice Cero antes de arrancar
  const index = await loadIndexZero();
  process.stderr.write(`[ OK ] Índice Cero cargado · SHA-256 ${index.sha256.slice(0, 16)}...\n`);
  process.stderr.write(`[ OK ] Pacto operativo · 51% humano · 49% IA · 100% real\n`);

  // 2. Arrancar servidor MCP
  const server = new MarcoMCPServer();
  await server.start();

  // 3. Sello de arranque
  process.stderr.write(`[ ✓✓ ] marco.mcp LISTO · esperando cliente MCP...\n`);
  process.stderr.write(`       ${SEAL}\n`);
}

main().catch((err) => {
  process.stderr.write(`[ XX ] Fallo crítico en bootstrap: ${err.message}\n`);
  process.exit(1);
});