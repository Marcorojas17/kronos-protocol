# 🔌 MCP Server Spec · ARKHÉ ZERO

```bash
┌─(kali㉿arkhe-zero)-[~/docs/api]
└─$ ./mcp --spec

[ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 100%

╔══════════════════════════════════════════════════════════════════════════╗
║  MCP SERVER · marco.mcp                                                  ║
║  Protocolo · Model Context Protocol v1                                   ║
║  Transporte · stdio                                                      ║
║  Tools · 5                                                               ║
║  Resources · 5                                                           ║
║  Prompts · 3                                                             ║
╚══════════════════════════════════════════════════════════════════════════╝
```

## 🜂 Tools

| Tool | Input | Output |
|------|-------|--------|
| `marco.firmar` | contenido · tipo | firma · hash |
| `marco.verificar` | hash | veredicto |
| `marco.contextualizar` | agente · tema | prompt sistema |
| `marco.recordar` | decisión | id · hash |
| `marco.consultar` | campo | índice cero |

## 🜃 Resources

- `marco://identidad`
- `marco://proyectos`
- `marco://decisiones`
- `marco://voz`
- `marco://legado`

## 🜄 Prompts

- `prompt-maestro`
- `ceremonial-firma`
- `verificador-index-cero`

## 🜁 Configuración Claude

```json
{
  "mcpServers": {
    "marco-mcp": {
      "command": "node",
      "args": ["/path/to/marco.mcp/dist/index.js"]
    }
  }
}
```

---

`◯_● · 51/49/100 · API · MCP Spec`