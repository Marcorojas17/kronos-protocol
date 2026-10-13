# Arquitectura

**Versión:** 1.0.0

## Visión general

KRONOS verifica firmas digitales sin almacenar el contenido firmado.

Cliente (local) → firma con llave privada → API (remoto) valida payload, aplica rate limit, verifica firma, audita → Respuesta (VERIFICADO o NO_AUTORIZADO).

La llave privada nunca sale del cliente.

## Componentes

**Núcleo** (src/kronos360/crypto/):

- hashing.py — SHA3-512
- signatures.py — Ed25519 + DOMAIN_SEPARATOR
- keyfile.py — PBKDF2 + AES-256-GCM
- audit_log.py — JSONL con rotación
- guard.py — Rate limiter + timeout

**API** (apps/api/):

- main.py — Flask, endpoints
- schemas.py — Validación

## Modelo de amenazas

**Protege contra:** falsificación de firma, alteración de mensaje, cross-protocol attack, robo de llave en reposo, DoS, fuga en logs.

**No protege contra:** compromiso del cliente, ataques cuánticos (hasta ~2030), correlación de metadata.

## Decisiones de diseño

**Ed25519 no RSA:** firmas pequeñas (64 vs 256 bytes), verificación rápida.

**Sin blockchain:** no se necesita cadena para verificar firmas.

**Flask no FastAPI:** FastAPI requiere Pydantic v2 (Rust). Flask es Python puro.

## Riesgos conocidos

- Marca no registrada — Pendiente IMPI
- Sin S.A. de C.V. — Persona física con RESICO
- Rate limiter por proceso — Redis futuro

## Pendiente

- Migrar rate limiter a Redis
- Métricas Prometheus
- Rotación automatizada de llaves

---

Marco Antonio Rojas Valdovinos (#000)
