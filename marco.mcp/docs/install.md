# 📘 Instalación · marco.mcp

## Requisitos
- Node.js `>=20`
- npm `>=10`
- Acceso al árbol `ARKHÉ-ZERO/` (para leer `AI-MANIFEST.json`, `MEMORY.md`)

## Instalación estándar

```bash
cd ARKHE-ZERO/marco.mcp
npm install
cp .env.example .env
# editar .env con tus valores reales
npm run build
npm test

```markdown
# 📘 Instalación · marco.mcp

## Requisitos
- Node.js `>=20`
- npm `>=10`
- Acceso al árbol `ARKHÉ-ZERO/` (para leer `AI-MANIFEST.json`, `MEMORY.md`)

## Instalación estándar

```bash
cd ARKHE-ZERO/marco.mcp
npm install
cp .env.example .env
# editar .env con tus valores reales
npm run build
npm test
```

Verificación

```bash
npm run seal
# → [ OK ] Índice Cero verificado
# → [ OK ] Pacto 51/49/100 operativo
# → [ ✓✓ ] marco.mcp listo
```

Claude Desktop

Editar ~/Library/Application Support/Claude/claude_desktop_config.json:

```json
{
  "mcpServers": {
    "marco-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/marco.mcp/dist/index.js"]
    }
  }
}
```

Cursor

Añadir a ~/.cursor/mcp.json:

```json
{
  "mcpServers": {
    "marco-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/marco.mcp/dist/index.js"]
    }
  }
}
```

VS Code + Copilot

Añadir a .vscode/settings.json:

```json
{
  "github.copilot.chat.mcpServers": {
    "marco-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/marco.mcp/dist/index.js"]
    }
  }
}
```

---

◯_● · 51/49/100 · KRONOS · marco.mcp

```