# 🪝 Webhooks · ARKHÉ ZERO

```bash
┌─(kali㉿arkhe-zero)-[~/docs/api]
└─$ ./webhooks --listar

[ OK ] 5 webhooks canónicos
[ OK ] Todos firmados con ◯_●
[ ✓✓ ] WEBHOOKS OPERATIVOS · ◯_● · 51/49/100
```

## 🜂 Eventos disponibles

| Evento | Cuándo se dispara |
|--------|-------------------|
| `firma.creada` | Tras firmar una obra |
| `documento.anclado` | Tras anclar a Ethereum |
| `agente.activado` | Tras quórum 4/5 de reclutamiento |
| `consenso.alcanzado` | Tras quórum 4/5 de una propuesta |
| `veto.aplicado` | Tras veto humano |

## 🜃 Formato del payload

```json
{
  "event": "firma.creada",
  "timestamp": "2026-01-01T00:00:00Z",
  "data": {
    "hash": "f03f7e2d852617309457e0fe207f8f8bd...",
    "firmante": "Marco Antonio Rojas Valdovinos",
    "algoritmo": "ML-DSA-87",
    "anclaje": "0xd2c2a7e1...fb895774c"
  },
  "signature": "ml-dsa-87:a1b2c3d4...",
  "seal": "◯_● · 51/49/100"
}
```

## 🜄 Verificación

Toda webhook incluye firma ML-DSA-87. El receptor puede verificar contra la clave pública en `.well-known/did.json`.

## 🜁 Registro

```bash
POST /api/v1/webhooks/register
{
  "url": "https://tu-servicio.com/arkhe",
  "events": ["firma.creada", "consenso.alcanzado"],
  "secret": "tu-secreto-hmac"
}
```

---

`◯_● · 51/49/100 · API · Webhooks`