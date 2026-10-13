```markdown
# 📘 Ejemplos · marco.mcp

## 1 · Firmar una decisión

```json
{
  "method": "tools/call",
  "params": {
    "name": "marco.firmar",
    "arguments": {
      "contenido": "Aprobar sub-bloque E · contexto IA",
      "tipo": "decision"
    }
  }
}
```

Respuesta:

```json
{
  "ok": true,
  "tipo": "decision",
  "hash_sha3_512": "a3f1...c8e2",
  "firma": "PENDING-HSM:a3f1b2c3d4e5f6",
  "sellado": "◯_● · 51/49/100"
}
```

2 · Verificar un hash

```json
{
  "name": "marco.verificar",
  "arguments": { "hash": "f03f7e2d852617309457e0fe207f8f8bd2627d0b723de02f3b0ce05767219112" }
}
```

3 · Contextualizar un agente

```json
{
  "name": "marco.contextualizar",
  "arguments": { "agente": "claude", "tema": "verificación forense" }
}
```

4 · Recordar una decisión

```json
{
  "name": "marco.recordar",
  "arguments": {
    "decision": "Sellar marco.mcp v1.0.0",
    "anclaje": "Merkle root → Ethereum"
  }
}
```

5 · Leer recurso marco://legado

```json
{
  "method": "resources/read",
  "params": { "uri": "marco://legado" }
}
```

---

◯_● · 51/49/100 · KRONOS · marco.mcp

```