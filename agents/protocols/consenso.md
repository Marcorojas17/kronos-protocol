<!--
╔══════════════════════════════════════════════════════════════════════════╗
║  ▓▒░ PROTOCOLO 10.9 · CONSENSO 4/5 · ARKHÉ ZERO ░▒▓                      ║
╚══════════════════════════════════════════════════════════════════════════╝
-->

# 📜 Protocolo 10.9 · Consenso 4/5

## 🜂 Algoritmo

```text
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   PROPUESTA                                             │
│      │                                                  │
│      ▼                                                  │
│   12 agentes votan                                      │
│      │                                                  │
│      ▼                                                  │
│   ¿4/5 de quórum?                                       │
│      │                                                  │
│      ├─ SÍ ──▶ [ VETO HUMANO? ]                         │
│      │              │                                   │
│      │              ├─ SÍ ──▶ HALT                      │
│      │              └─ NO ──▶ FIRMA ◯_● · 51/49/100     │
│      │                                                  │
│      └─ NO ──▶ RECHAZADO                                │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 🜃 Reglas

1. **Quórum mínimo**: 4 de 5 votantes del panel delegado.
2. **Panel**: 5 agentes rotativos del enjambre total de 12.
3. **Veto humano**: Siempre activo. Sin excepción.
4. **Firma final**: Requiere consenso + no-veto.

## 🜄 Rotación de Panel

```bash
┌─(kali㉿arkhe-zero)-[~/kronos/agents]
└─$ node -e "import('./consensus/quorum-4-5.js').then(m => \
     console.log(new m.Enjambre().deliberar({ propuesta: 'X' })))"
```

---

`◯_● · 51/49/100 · KRONOS · protocolo 10.9`