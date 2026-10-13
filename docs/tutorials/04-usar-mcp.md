# 🎓 Tutorial 04 · Usar MCP

```bash
┌─(kali㉿arkhe-zero)-[~/docs/tutorials]
└─$ ./tutorial 04
```

## 🜂 Configuración

### 1 · Build del servidor

```bash
cd marco.mcp
npm install
npm run build
```

### 2 · Configurar Claude

Editar `~/Library/Application Support/Claude/claude_desktop_config.json`:

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

### 3 · Reiniciar Claude

Al abrir, verás las tools disponibles.

### 4 · Usar

En Claude, prueba:

```
Usa marco.firmar con contenido "Mi decisión"
```

Respuesta:

```json
{
  "ok": true,
  "hash_sha3_512": "f03f7e2d...",
  "sellado": "◯_● · 51/49/100"
}
```

---

`◯_● · 51/49/100 · TUTORIAL 04`