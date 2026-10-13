# 🛡️ Política de Seguridad · ARKHÉ ZERO

## 🜂 Versiones soportadas

| Versión | Soportada |
|---------|-----------|
| 1.x     | ✅ Sí     |
| 0.x     | ❌ No     |

## 🜃 Reportar vulnerabilidad

**NO abras issue público**. Usa:

- 📧 Email: `security@arkhe.zero`
- 📄 RFC 9116: `.well-known/security.txt`
- 🔐 PGP / ML-KEM pubkey: solicitar

## 🜄 Proceso

1. **Reporte** · recibimos en < 24h
2. **Triaje** · verificamos en 72h
3. **Fix** · parche en < 30 días
4. **Disclosure** · pública tras parche + 30 días
5. **Crédito** · mención en `SECURITY-HALL-OF-FAME.md`

## 🜁 Alcance

**In scope:**
- API Attribution
- Servidor MCP (marco.mcp)
- Contratos Solidity
- Criptografía (FIPS 203/204/205)
- Web hub

**Out of scope:**
- Ataques de fuerza bruta sin bypass
- DoS volumétrico sin amplificación
- Self-XSS
- Bugs en dependencias de terceros (reportar arriba)

## 🜆 Reglas de oro

```diff
+ Reporta en privado
+ Da tiempo razonable para parchear
+ No accedas a datos ajenos
+ No modifiques el sistema
- NUNCA publiques exploit antes del parche
- NUNCA extorsiones
- NUNCA vendas la vulnerabilidad
```

## 🜇 Reconocimiento

Otorgamos insignia `🔐 Guardián` en el Movimiento ARKHÉ.

---

`◯_● · 51/49/100 · KRONOS · security`