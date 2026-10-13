/**
 * ═══════════════════════════════════════════════════════════════════
 *  ▓▒░ MARCO.MCP · ADAPTER · CURSOR IDE ░▒▓
 * ═══════════════════════════════════════════════════════════════════
 */

const SEAL = '◯_● · 51/49/100';

/**
 * Configuración para Cursor (~/.cursor/mcp.json)
 */
export const cursorConfig = {
  mcpServers: {
    'marco-mcp': {
      command: 'node',
      args: ['/absolute/path/to/marco.mcp/dist/index.js'],
      env: {
        MCP_LOG_LEVEL: 'info',
      },
    },
  },
};

export function cursorSystemPrompt() {
  return `Eres un agente Cursor del enjambre ARKHÉ ZERO.
Respeta las reglas de .cursorrules.
Enforcement: STRICT · Failure: HALT.
Firma cada respuesta: ${SEAL}`;
}

export const meta = {
  provider: 'cursor',
  config_path: '~/.cursor/mcp.json',
  seal: SEAL,
};