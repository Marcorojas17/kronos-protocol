<!--
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║    ███████╗███████╗ ██████╗██╗   ██╗██████╗ ██╗████████╗██╗   ██╗        ║
║    ██╔════╝██╔════╝██╔════╝██║   ██║██╔══██╗██║╚══██╔══╝╚██╗ ██╔╝        ║
║    ███████╗█████╗  ██║     ██║   ██║██████╔╝██║   ██║    ╚████╔╝         ║
║    ╚════██║██╔══╝  ██║     ██║   ██║██╔══██╗██║   ██║     ╚██╔╝          ║
║    ███████║███████╗╚██████╗╚██████╔╝██║  ██║██║   ██║      ██║           ║
║    ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝   ╚═╝      ╚═╝           ║
║                                                                          ║
║    ▓▒░ SECURITY · POLÍTICAS DE SEGURIDAD · ARKHÉ ZERO ░▒▓                ║
║    ──────────────────────────────────────────────────────                ║
║    [ ZERO-TRUST ]  [ PQC ]  [ HSM ]  [ AUDIT ]  [ INCIDENT ]             ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
-->

# 🛡️ security/ · Políticas de Seguridad

```bash
┌─(kali㉿arkhe-zero)-[~/kronos/security]
└─$ ./security --audit --full

[ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 100%

╔══════════════════════════════════════════════════════════════════════════╗
║  ÁREA               · CONTROL                    · ESTADO                ║
╠══════════════════════════════════════════════════════════════════════════╣
║  Autenticación      · Zero-Trust · PQC firma     · ✓ ACTIVO              ║
║  Criptografía       · FIPS 203/204/205           · ✓ ACTIVO              ║
║  Claves             · HSM / vault cifrado        · ✓ ACTIVO              ║
║  Auditoría          · Logs inmutables            · ✓ ACTIVO              ║
║  Incidentes         · Plan de respuesta          · ✓ DOCUMENTADO         ║
║  Secretos           · Nunca en código ni logs    · ✓ REGLA DE ORO        ║
╚══════════════════════════════════════════════════════════════════════════╝

[ ✓✓ ] SEGURIDAD · 6/6 controles · ◯_● · 51/49/100
```

## 🜂 Principios

```diff
+ Zero-Trust: nada es confiable por defecto
+ Post-cuántica: FIPS 203/204/205 como base
+ HSM-first: claves nunca salen del hardware
+ Todo log es inmutable y trazable
+ Fail-safe: en duda, HALT
- NUNCA secretos en repositorio
- NUNCA downgrade sin alerta
- NUNCA borrar logs
```

## 🜃 Reglas de Oro

1. **Secretos**: `.env` local, nunca en git.
2. **Claves**: HSM o vault cifrado.
3. **Firmas**: ML-DSA-87 + Ed25519 (híbrido).
4. **Logs**: append-only, con hash.
5. **Downgrade**: alerta automática del centinela.
6. **Veto humano**: siempre disponible.

---

`◯_● · 51/49/100 · KRONOS · security/`