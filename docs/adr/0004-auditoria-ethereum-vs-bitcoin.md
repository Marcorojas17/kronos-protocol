# ADR-0004 · Auditoría Ethereum vs Bitcoin

- **Estado**: Aceptado
- **Fecha**: 2026-02-01
- **Decisor**: Marco Antonio Rojas Valdovinos

## 🜂 Contexto

¿Dónde anclar los Merkle roots? Ethereum o Bitcoin.

## 🜃 Decisión

**Ethereum** como primario + **Bitcoin** (OpenTimestamps) como secundario.

| Aspecto | Ethereum | Bitcoin |
|---------|----------|---------|
| Velocidad | 12s | 10 min |
| Costo | ~$0.50 | ~$0.10 |
| Programable | ✅ Sí | ⚠️ Limitado |
| Adopción legal | ✅ Alta | ⚠️ Media |
| Smart contracts | ✅ Sí | ❌ No |

## 🜄 Consecuencias

- Ethereum: anclaje de hashes + smart contracts
- Bitcoin: anclaje secundario vía OpenTimestamps
- Doble redundancia blockchain

## 🜁 Alternativas

1. Solo Ethereum · Rechazada (sin redundancia)
2. Solo Bitcoin · Rechazada (sin smart contracts)
3. Polkadot · Rechazada (menos adoptada)

---

`◯_● · 51/49/100 · ADR-0004`