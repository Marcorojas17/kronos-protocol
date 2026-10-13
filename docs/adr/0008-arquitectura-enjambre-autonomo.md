# ADR-0008 · Arquitectura Enjambre Autónomo

- **Estado**: Aceptado
- **Fecha**: 2026-03-15
- **Decisor**: Marco Antonio Rojas Valdovinos

## 🜂 Contexto

¿Cómo estructurar los agentes IA del sistema?

## 🜃 Decisión

**Enjambre de 12 agentes** con:
- 6 culturales (Náhuatl)
- 6 oficios (numerados)
- Consenso quórum 4/5
- Veto humano siempre activo

## 🜄 Arquitectura

```text
[Índice Cero] → [12 agentes] → [Consenso] → [Firma]
```

## 🜁 Alternativas

1. Un solo agente · Rechazada (no resiliente)
2. 100 agentes · Rechazada (ineficiente)
3. 12 agentes · ✅ Aceptada

---

`◯_● · 51/49/100 · ADR-0008`