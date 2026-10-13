<!--
╔══════════════════════════════════════════════════════════════════════════╗
║  ▓▒░ POLÍTICA DE SECRETOS · ARKHÉ ZERO ░▒▓                               ║
╚══════════════════════════════════════════════════════════════════════════╝
-->

# 🔒 Política de Secretos

## 🜂 Reglas Absolutas

```diff
+ Secretos viven en .env (gitignored)
+ Claves privadas viven en HSM o vault cifrado
+ Contraseñas derivadas con HKDF-SHA3-512
+ Rotación documentada en agility/
+ Auditoría de accesos en audit.log
- NUNCA commitear .env
- NUNCA loggear claves
- NUNCA exponer en mensajes de error
- NUNCA duplicar sin ceremonia
```

## 🜃 Checklist Pre-Commit

```bash
┌─(kali㉿arkhe-zero)-[~/kronos]
└─$ git diff --cached | grep -E "(sk_|pk_|secret|password|token)" || echo "[ OK ] Sin secretos"
```

## 🜄 Si se filtra un secreto

1. Rotar inmediatamente.
2. Revocar tokens activos.
3. Registrar incidente en `security/incidentes/`.
4. Firmar acta de incidente con sello ◯_●.

---

`◯_● · 51/49/100 · KRONOS · política-secretos`