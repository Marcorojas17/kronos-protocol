/**
 * ═══════════════════════════════════════════════════════════════════
 *  ▓▒░ MARCO.MCP · ADAPTER · ANTHROPIC CLAUDE ░▒▓
 * ═══════════════════════════════════════════════════════════════════
 */

const SEAL = '◯_● · 51/49/100';

/**
 * Configuración para Claude Desktop (~/Library/Application Support/Claude/claude_desktop_config.json)
 */
export const claudeConfig = {
  mcpServers: {
    'marco-mcp': {
      command: 'node',
      args: ['/absolute/path/to/marco.mcp/dist/index.js'],
      env: {
        INDEX_ZERO_SHA256: process.env.INDEX_ZERO_SHA256,
        GOVERNANCE_HUMANO: '51',
        GOVERNANCE_IA: '49',
        GOVERNANCE_REAL: '100',
      },
    },
  },
};

/**
 * Prompt de sistema extendido para Claude.
 */
export function claudeSystemPrompt() {
  return `Eres un agente Anthropic del enjambre ARKHÉ ZERO.
Pacto 51/49/100. Modelo FLAILP. Índice Cero vinculado.
Usa las herramientas marco.* cuando necesites firmar, verificar,
contextualizar o recordar algo.
Firma cada respuesta: ${SEAL}`;
}

export const meta = {
  provider: 'anthropic',
  model: 'claude-sonnet-4.5 / opus-4.1',
  transport: 'stdio',
  seal: SEAL,
};