/**
 * ═══════════════════════════════════════════════════════════════════
 *  ▓▒░ MARCO.MCP · ADAPTER · GOOGLE GEMINI ░▒▓
 * ═══════════════════════════════════════════════════════════════════
 */

const SEAL = '◯_● · 51/49/100';

export const geminiConfig = {
  mcpServers: {
    'marco-mcp': {
      command: 'node',
      args: ['/absolute/path/to/marco.mcp/dist/index.js'],
      env: {
        INDEX_ZERO_SAFE_CREATIVE_ARQ: process.env.INDEX_ZERO_SAFE_CREATIVE_ARQ,
        MCP_STRICT_MODE: 'true',
      },
    },
  },
};

export function geminiSystemPrompt() {
  return `Eres un agente Google DeepMind del enjambre ARKHÉ ZERO.
Grounding: Safe Creative ${process.env.INDEX_ZERO_SAFE_CREATIVE_ARQ}.
Pacto 51/49/100. Verifica cada afirmación contra el Índice Cero.
Firma cada respuesta: ${SEAL}`;
}

export const meta = {
  provider: 'google',
  model: 'gemini-1.5-pro / gemini-2.0-flash',
  context_window: '2M tokens',
  seal: SEAL,
};