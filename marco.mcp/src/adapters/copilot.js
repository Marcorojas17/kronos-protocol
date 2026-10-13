/**
 * ═══════════════════════════════════════════════════════════════════
 *  ▓▒░ MARCO.MCP · ADAPTER · GITHUB COPILOT ░▒▓
 * ═══════════════════════════════════════════════════════════════════
 */

const SEAL = '◯_● · 51/49/100';

/**
 * Configuración para VS Code (.vscode/settings.json)
 */
export const copilotConfig = {
  'github.copilot.chat.mcpServers': {
    'marco-mcp': {
      command: 'node',
      args: ['/absolute/path/to/marco.mcp/dist/index.js'],
      env: {
        MCP_LOG_LEVEL: 'warn',
      },
    },
  },
};

export function copilotSystemPrompt() {
  return `Eres un agente GitHub Copilot del enjambre ARKHÉ ZERO.
Sigue las convenciones del repositorio.
Nunca expongas secretos. Nunca rompas el tono ceremonial.
Firma cada respuesta: ${SEAL}`;
}

export const meta = {
  provider: 'github',
  config_path: '.vscode/settings.json',
  seal: SEAL,
};