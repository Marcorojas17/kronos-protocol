# ADR-0016 · Sesión Fundacional 2026-10-15

- **Estado**: Aceptado
- **Fecha**: 2026-10-15
- **Decisor**: Marco Antonio Rojas Valdovinos
- **Nodo**: YHDRYH-92CE

## 🜂 Contexto

El sistema ARKHÉ ZERO llevaba meses en fase de diseño documental: constitución escrita, agentes definidos, atestaciones esquematizadas. Pero las firmas criptográficas eran placeholders, los sellos de tiempo no estaban anclados, y no existía una capa de verificación soberana.

Se requería un **acto fundacional** que materializara el sistema: convertir la doctrina escrita en criptografía verificable.

## 🜃 Decisión

Ejecutar una sesión fundacional que:

1. Firmara el Pacto 51/49 con criptografía real (Ed25519)
2. Anclara los documentos fundacionales en la blockchain de Bitcoin vía OpenTimestamps
3. Generara llaves Ed25519 para los 7 agentes del enjambre
4. Publicara el sistema completo como sitio web navegable
5. Estableciera una política formal de gestión de llaves

## 🜄 Ejecución

### Fase 1 · Criptografía

- Generación de `fundador-v3.key` (Ed25519)
- Firma del Pacto 51/49: `pacto-5149-canonico.sig` (64 bytes)
- Verificación con OpenSSL: `Signature Verified Successfully`

### Fase 2 · Anclaje Bitcoin

- Génesis K28 · tx `8ecf89d2...`
- Pacto 51/49 · tx `34842cc1...` + `ae0ce809...`
- Manifiesto maestro 2026-10-15 · `Success! Timestamp complete`

### Fase 3 · Atestaciones de agentes

- 8 atestaciones firmadas: génesis + 7 agentes
- 7 pares de llaves Ed25519 generados
- Llaves privadas movidas a `~/.arkhe-private/agentes/`
- Todas las firmas verificadas con `openssl pkeyutl -verify`

### Fase 4 · Publicación web

- 448 archivos HTML generados desde markdown
- Portada ceremonial con contador Bitcoin en vivo
- Fondo KINTSUGI GOLD DUST (partículas doradas + constelaciones)
- Publicado en `https://marcorojas17.github.io/kronos-protocol/`

### Fase 5 · Gestión de llaves

- Detección de llaves privadas en historial de git
- Limpieza con `git filter-repo` (2 pasadas)
- Rotación: `fundador-v2` → `fundador-v3` (activa)
- Documentación en `07-LLAVES/SUCESION-LLAVES.md`

## 🜁 Alternativas consideradas

1. **No firmar criptográficamente** · Rechazada (compromete el modelo legal)
2. **Usar servicios externos** (Safe Creative, notarías) · Rechazada (rompe soberanía)
3. **Firmas solo con Ed25519** · Aceptada provisionalmente, post-cuántico pendiente
4. **Sesión fundacional única** · ✅ Aceptada

## 🜀 Consecuencias

### Positivas

- El Pacto 51/49 es criptográficamente verificable por terceros
- Los sellos Bitcoin son inmutables e independientes de servidores
- El sistema es navegable públicamente
- Existe política formal de gestión de llaves

### Pendientes

- Integración post-cuántica real (ML-DSA-65 / Dilithium)
- Nodo Bitcoin propio para verificación 100% soberana
- Publicación en IPFS / dominios descentralizados
- Auditoría externa de las llaves de agentes

---

`◯_● · 51/49/100 · Nodo YHDRYH-92CE · 2026-10-15`
