<!-- ═══════════════════════════════════════════════════════════════════════ -->
<!-- K4 FRAMEWORK · README · v1.0 · 17 Septiembre 2026                     -->
<!-- ═══════════════════════════════════════════════════════════════════════ -->

```text
╔══════════════════════════════════════════════════════════════════════════════╗
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
║ ▓                                                                          ▓ ║
║ ▓   ██╗  ██╗██╗  ██╗    ███████╗██████╗  █████╗ ███╗   ███╗███████╗       ▓ ║
║ ▓   ██║ ██╔╝██║  ██║    ██╔════╝██╔══██╗██╔══██╗████╗ ████║██╔════╝       ▓ ║
║ ▓   █████╔╝ ███████║    █████╗  ██████╔╝███████║██╔████╔██║█████╗         ▓ ║
║ ▓   ██╔═██╗ ╚════██║    ██╔══╝  ██╔══██╗██╔══██║██║╚██╔╝██║██╔══╝         ▓ ║
║ ▓   ██║  ██╗     ██║    ██║     ██║  ██║██║  ██║██║ ╚═╝ ██║███████╗       ▓ ║
║ ▓   ╚═╝  ╚═╝     ╚═╝    ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝       ▓ ║
║ ▓                                                                          ▓ ║
║ ▓   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ▓ ║
║ ▓   E D U C A T I O N A L   ·   N O T   A   S O L U T I O N                 ║
║ ▓   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ▓ ║
║ ▓                                                                          ▓ ║
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

**Ejercicio educativo de criptoanálisis sobre el texto K4 de Kryptos.**

**NO resuelve K4.** Es un framework didáctico que demuestra cómo atacar un cifrado por transposición + Vigenère, y por qué ese enfoque **no es suficiente** para K4.

---

```text
┌─[ 00 ]─────────────────────────────────── ADVERTENCIA ─┐
│                                                          │
└──────────────────────────────────────────────────────────┘
```

```text
╭─────────────────────────────────────────────────────────────╮
│                                                             │
│  K4 de Kryptos sigue ABIERTO desde 1990.                    │
│                                                             │
│  35 años sin resolver.                                      │
│  Jim Sanborn (el escultor) ha rechazado más de 30           │
│  "soluciones" públicas.                                     │
│                                                             │
│  Este framework NO es una solución.                         │
│  Es un EJERCICIO DE MÉTODO.                                 │
│                                                             │
│  Los candidatos generados NO son hallazgos verificados.     │
│  Son salidas del algoritmo, presentadas como ejercicio.     │
│                                                             │
╰─────────────────────────────────────────────────────────────╯
```

---

```text
┌─[ 01 ]───────────────────────────────────── QUÉ ES ESTO ─┐
│                                                            │
└────────────────────────────────────────────────────────────┘
```

Un repositorio educativo que contiene:

```text
  ▸ Un motor de criptoanálisis en JavaScript (Web Crypto API)
  ▸ Implementación de transposición matricial por permutación
  ▸ Implementación de Vigenère con clave configurable
  ▸ Análisis de entropía de Shannon
  ▸ Cadena de custodia con SHA-256 + Merkle Tree
  ▸ Firma digital RSA-2048
  ▸ Documentación completa del método y sus límites
```

Todo corre **100% en el navegador**. Sin backend, sin dependencias, sin servidor.

---

```text
┌─[ 02 ]──────────────────────────────────── QUÉ NO ES ─┐
│                                                         │
└─────────────────────────────────────────────────────────┘
```

```text
  ✗  No es una solución a K4.
  ✗  No es un hallazgo criptográfico.
  ✗  No ha sido validado por Jim Sanborn.
  ✗  No ha sido validado por la comunidad criptográfica.
  ✗  No prueba autoría ni titularidad.
  ✗  No es un sistema forense certificado.
  ✗  No es un producto comercial.
```

---

```text
┌─[ 03 ]─────────────────────────────────── CONTEXTO ─┐
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Kryptos** es una escultura de Jim Sanborn instalada en 1990 en la sede de la CIA en Langley, Virginia. Contiene cuatro pasajes cifrados:

```text
  K1  ──▶  RESUELTO (1998)
  K2  ──▶  RESUELTO (1998)
  K3  ──▶  RESUELTO (1999)
  K4  ──▶  ABIERTO (1990 — hoy)
```

**K4** tiene 97 caracteres y solo se conocen tres palabras crib publicadas por Sanborn:

```text
  BERLIN          (2010)
  CLOCK           (2014)
  NORTHEAST       (2020)
```

Sanborn ha declarado públicamente que **las palabras reveladas no son suficientes** para resolver K4, y que quien crea tener la solución debe enviársela directamente para validación.

---

```text
┌─[ 04 ]─────────────────────────────── QUÉ DEMUESTRA ─┐
│                                                       │
└───────────────────────────────────────────────────────┘
```

Este framework sirve para demostrar:

| # | Concepto |
|:---:|:---|
| 01 | Cómo funciona la transposición matricial |
| 02 | Cómo funciona Vigenère (Mod 26) |
| 03 | Por qué los cribs conocidos no bastan |
| 04 | Cómo calcular entropía de Shannon |
| 05 | Cómo construir un Merkle Tree desde cero |
| 06 | Cómo firmar un hash con RSA-2048 en el navegador |
| 07 | Por qué K4 sigue abierto después de 35 años |

---

```text
┌─[ 05 ]─────────────────────────────────── STACK ─┐
│                                                    │
└────────────────────────────────────────────────────┘
```

| Capa | Tecnología |
|------|-----------|
| Criptografía | Web Crypto API (SubtleCrypto) |
| Hash | SHA-256 |
| Firma | RSA-2048 (RSASSA-PKCS1-v1_5) |
| Cifrado simétrico | AES-256-CBC |
| Árbol | Merkle Tree con SHA-256 iterativo |
| Frontend | HTML5 + CSS3 + JavaScript ES6+ |
| Dependencias | Cero |

---

```text
┌─[ 06 ]───────────────────────────────── ESTRUCTURA ─┐
│                                                       │
└───────────────────────────────────────────────────────┘
```

```text
k4-framework/
├── README.md               ← este archivo
├── LIMITACIONES.md         ← por qué NO resuelve K4
├── dashboard.html          ← interfaz interactiva
├── candidates-sample.txt   ← 26 candidatos de ejemplo
└── docs/
    └── 01-metodologia.md   ← cómo funciona el ataque
```

---

```text
┌─[ 07 ]─────────────────────────────────── USO ─┐
│                                                  │
└──────────────────────────────────────────────────┘
```

### Opción 1 — Abrir el dashboard

```bash
# Clonar
git clone https://github.com/Marcorojas17/kronos-protocol.git
cd kronos-protocol/projects/k4-framework

# Abrir en el navegador
# index.html o dashboard.html
```

### Opción 2 — Usar los módulos de criptografía

Todos los módulos son independientes. Podés copiar el código de:

- `sha256()` — hash de archivos o texto
- `calcEntropy()` — entropía de Shannon
- `buildMerkleTree()` — árbol de Merkle
- `generateRSA()` — par de claves RSA-2048
- `aesEncrypt() / aesDecrypt()` — cifrado simétrico

---

```text
┌─[ 08 ]─────────────────────────────────── LICENCIA ─┐
│                                                      │
└──────────────────────────────────────────────────────┘
```

```text
  Código .......... MIT
  Documentación ... CC BY-NC-SA 4.0
  Uso comercial ... Permitido con atribución
```

---

```text
╔══════════════════════════════════════════════════════════════════════════════╗
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
║ ▓                                                                          ▓ ║
║ ▓   [ K4 FRAMEWORK · v1.0 · EDUCATIONAL ]                                 ▓ ║
║ ▓                                                                          ▓ ║
║ ▸ NO resuelve K4                                                          ▓ ║
║ ▓   ▸ Ejercicio de método, no hallazgo                                    ▓ ║
║ ▸ 7 módulos criptográficos reales                                         ▓ ║
║ ▓   ▸ 100% cliente · cero dependencias                                    ▓ ║
║ ▓                                                                          ▓ ║
║ ▓   root@k4-framework:~# ./verify --educational                            ▓ ║
║ ▓   [████████████████████████████████████████] READY                     ▓ ║
║ ▓   ✓ Contexto declarado                                                  ▓ ║
║ ▓   ✓ Límites explícitos                                                  ▓ ║
║ ▓   ✓ Método documentado                                                  ▓ ║
║ ▓   ⚠ NO es solución a K4                                                 ▓ ║
║ ▓                                                                          ▓ ║
║ ▓   root@k4-framework:~# _                                                 ▓ ║
║ ▓                                                                          ▓ ║
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

<!-- FIN DEL DOCUMENTO · K4 FRAMEWORK · v1.0 -->