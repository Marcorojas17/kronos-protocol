# ADR-0006 · Migración SHA3-512 vs FNV

- **Estado**: Aceptado
- **Fecha**: 2026-02-15
- **Decisor**: Marco Antonio Rojas Valdovinos

## 🜂 Contexto

¿Qué función hash usar para el Índice Cero?

## 🜃 Decisión

**SHA3-512** (FIPS 202).

| Aspecto | SHA3-512 | FNV |
|---------|----------|-----|
| Estándar | FIPS 202 | No |
| Seguridad | 256 bits | 32-64 bits |
| Resistencia cuántica | ✅ Sí | ❌ No |
| Aceptación legal | ✅ Alta | ❌ Baja |

## 🜄 Consecuencias

- Índice Cero con SHA-256 (compatible Safe Creative)
- Contenido con SHA3-512 (post-cuántico)
- Doble hash para redundancia

## 🜁 Alternativas

1. FNV · Rechazada (no criptográfica)
2. MD5 · Rechazada (roto)
3. SHA-1 · Rechazada (roto)

---

`◯_● · 51/49/100 · ADR-0006`