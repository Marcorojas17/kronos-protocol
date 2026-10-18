<!--
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║                     ◯_●  A R K H É   Z E R O  ◯_●                        ║
║                                                                          ║
║             "El legado no se hereda. Se firma." — KINTSUGI 2026          ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
-->

# ◯_● ARKHÉ ZERO · Índice Primigenio Soberano

**ARKHÉ ZERO** es una infraestructura de propiedad intelectual programable, diseñada bajo un modelo de **Zero-Trust** y **Local-First**. Construida para blindar activos digitales con criptografía post-cuántica, anclaje en Bitcoin y gobernanza Humano-IA (Pacto 51/49/100).

## 🛡️ Capacidades Criptográficas

*   **Firmas Híbridas:** Ed25519 (clásica) + ML-DSA-65 (post-cuántica, NIST FIPS 204).
*   **Anclaje Descentralizado:** Sellos de tiempo (OpenTimestamps) validados contra la red de Bitcoin.
*   **Nodo Soberano:** Implementación y sincronización del nodo Floresta (Utreexo) en hardware móvil.
*   **Verificación Pública:** Certificados visuales con QR generado offline y validación en navegador (Web Crypto API).

## 🏛️ Arquitectura del Sistema

*   `docs/`: Constitución (10 libros), ADRs y el sitio web público (PWA).
*   `runtime/`: Motores de ejecución (Mandate Gate, Emisor de Licencias, Guardians).
*   `agentes/`: Enjambre de agentes autónomos (Tonal, Tlachixqui, Cuicatl, etc.).
*   `07-LLAVES/`: Bóveda pública de atestaciones y llaves fundacionales (V3).
*   `crypto/`: Núcleo de criptografía y pruebas de vectores NIST.

## 🚀 Entorno de Ejecución y Arranque

El sistema está diseñado para correr de forma soberana sobre Debian (vía Termux/proot-distro).

### Requisitos
*   Termux (F-Droid)
*   Debian (vía `proot-distro`)
*   Python 3, OpenSSL, Rust (para compilación de Floresta)

### Arranque Automático
El nodo Bitcoin y el entorno se levantan automáticamente al encender el dispositivo:
```bash
# El script de arranque se encuentra en:
~/.termux/boot/start-arkhe

---

### 🎬 PASO 2 — Crear el README de las llaves (07-LLAVES)

Pega **solo este bloque**:

```bash
cat > 07-LLAVES/README.md << 'FINMD'
# 🔑 07-LLAVES · Bóveda de Atestaciones

Esta carpeta contiene **exclusivamente** información pública, certificados, firmas y sellos de tiempo (TSA/OTS). 

## 🜂 Regla de Oro
**NUNCA** se deben subir claves privadas, seeds o mnemonics a este repositorio. 

Las llaves privadas maestras de ARKHÉ ZERO viven estrictamente en el dispositivo local del Arquitecto:
*   **Ruta privada:** `~/.arkhe-private/` (fuera del control de versiones).
*   **Llave activa:** `fundador-v3.key` (Ed25519).
*   **Llave post-cuántica:** `post-quantum/fundador-mldsa65.key` (ML-DSA-65).

## 🜃 Contenido Permitido

*   `FUNDADOR-V3/`: Llave pública para validación de firmas.
*   `ATESTACIONES/`: JSONs firmados, certificados TSA (RFC 3161) y pruebas OpenTimestamps (`.ots`).
*   `LICENCIAS/`: Registro público de licencias emitidas y sus firmas.

## 🜄 Verificación
Para verificar cualquier artefacto de esta carpeta, utiliza la llave pública `FUNDADOR-V3/fundador-v3.pub`.

---
`◯_● · 51/49/100 · Nodo YHDRYH-92CE`
