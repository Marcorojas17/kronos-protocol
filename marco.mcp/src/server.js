/**
 * ═══════════════════════════════════════════════════════════════════
 *  ▓▒░ MARCO.MCP · SERVER CORE · ARKHÉ ZERO ░▒▓
 * ═══════════════════════════════════════════════════════════════════
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { TOOLS, runTool } from './tools.js';
import { RESOURCES, readResource } from './resources.js';
import { PROMPTS, getPrompt } from './prompts.js';

const SERVER_INFO = {
  name: 'marco.mcp',
  version: '1.0.0',
  seal: '◯_● · 51/49/100',
};

export class MarcoMCPServer {
  constructor() {
    this.server = new Server(
      SERVER_INFO,
      {
        capabilities: {
          tools: {},
          resources: {},
          prompts: {},
          logging: {},
        },
      }
    );

    this.#wireHandlers();
  }

  #wireHandlers() {
    // ─── TOOLS ────────────────────────────────────────────
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: TOOLS,
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (req) => {
      const { name, arguments: args } = req.params;
      try {
        const result = await runTool(name, args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      } catch (err) {
        return {
          content: [{ type: 'text', text: `[ XX ] ${err.message}` }],
          isError: true,
        };
      }
    });

    // ─── RESOURCES ────────────────────────────────────────
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: RESOURCES,
    }));

    this.server.setRequestHandler(ReadResourceRequestSchema, async (req) => {
      const { uri } = req.params;
      const content = await readResource(uri);
      return {
        contents: [
          {
            uri,
            mimeType: 'text/markdown',
            text: content,
          },
        ],
      };
    });

    // ─── PROMPTS ──────────────────────────────────────────
    this.server.setRequestHandler(ListPromptsRequestSchema, async () => ({
      prompts: PROMPTS,
    }));

    this.server.setRequestHandler(GetPromptRequestSchema, async (req) => {
      const { name, arguments: args } = req.params;
      return getPrompt(name, args);
    });
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}