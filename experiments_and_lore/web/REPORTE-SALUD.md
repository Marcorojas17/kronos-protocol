# 💚 REPORTE DE SALUD · ARKHÉ ZERO

> Este reporte se actualiza SOLO con métricas medidas.
> Sin números inventados. Sin promesas sin evidencia.

## Estado verificado (13 oct 2026 · 09:15 AM)

### Tests criptográficos

- **56 / 56 PASSED** · 4.43 segundos
- Comando: `python3 -m pytest tests/*.py -v`
- Fuente: ejecución local verificable

### Cifras reales del repo

- Archivos: **1371** (medido con `find`)
- Secciones: **24 / 24**
- Commits: ver `git log`
- Último commit: `28ba05c`

### Anclajes verificables

- Safe Creative: `2607146379465` (público)
- Co-creatividad: `2607086319439` (público)
- Ethereum TX: `0xd2c2a7e1...774c` (verificable en Etherscan)
- eIDAS QTSA: Firmaprofesional (verificable)

## Medido (13 oct 2026)

### Verificaciones SHA-256 locales (50 corridas)

- **Definición:** hash SHA-256 + recomparación de igualdad, payload ~1.2 KB
- **Éxito:** 50/50 · 100%
- **min:** 0.0042 ms
- **p50:** 0.0042 ms
- **p95:** 0.0045 ms
- **p99:** 0.0069 ms
- **max:** 0.0078 ms
- **media:** 0.0043 ms
- **Script:** `/tmp/bench_sha256.py` (warmup 5 fuera de medición)
- **Meta semanal p95 <500ms:** ✅ CUMPLE (p95 = 0.0045 ms)

## Pendiente de medir

### Latencia POST /verify (end-to-end)

- **Definición:** tiempo de respuesta de api_ia.py en verificar un hash
- **Meta:** <500ms p95
- **Estado:** por medir

## Eliminado (falso)

Los siguientes números aparecían en reportes anteriores sin evidencia:

- ❌ "p99 145ms" (inventado)
- ❌ "uptime 99.99%" (inventado)
- ❌ "247 defensas activas" (era simbólico)

**Se eliminan hasta ser medibles.**

---

**Firma:** ◯*● · ■*□ · 51/49/100
**Nodo:** YHDRYH-92CE · SCDR-001
