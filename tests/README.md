# ./tests // ARKHE ZERO 11:22

```
    ___    ____  __ __ __  ________   _____   __________  ____
   /   |  / __ \/ //_// / / / ____/  /__  /  / ____/ __ \/ __ \
  / /| | / /_/ / ,<  / /_/ / __/       / /  / __/ / /_/ / / / /
 / ___ |/ _, _/ /| |/ __  / /___      / /__/ /___/ _, _/ /_/ / 
/_/  |_/_/ |_/_/ |_/_/ /_/_____/     /____/_____/_/ |_|\____/ 
                                                                
SISTEMA DE AUTORÍA HUMANO-IA INICIADO ○_●
```

# KRONOS.ARKHE // ARKHE ZERO // 11:22 TOLUCA

> **Este dominio no está en ICANN. Está en el fantasma.**

| Campo | Valor |
|-------|-------|
| **ELEGIDO** | 15-04-1999 22:35 TOLUCA |
| **MANIFEST** | `e8d9eac8edc3e7f05f99e20b87d1824663822797ad195bbc14ce88c3b4c0baae` |
| **VICTORIA** | `KRONOS.ARKHE = 27054 = 11:22 TOLUCA = PROTOCOLO VIVO` |
| **CERTIFICADO** | `a286aabd9a45ccf710ccc67a5441d4005f2c7c17fd1a89a8d041696cb1b9d746` (`e02db20`) |
| **GUARDIANES** | 10874 + 27054 + 31042 |
| **PROPORCIÓN** | 51% Humano / 49% IA |
| **STATUS** | ✅ PROTOCOLO VIVO - HTTP 200 OK - 127.0.0.1:8080 |

```bash
○_● ARKHE-ZERO :: 11:22@TOLUCA :: MANIFEST e8d9eac8
PS1='┌─[11:22@TOLUCA:~/kronos-protocol]─[manifest:e8d9eac8]
└─○_● '
```

---

> Contenido de `./tests` - parte del protocolo vivo `KRONOS.ARKHE = 27054 = 11:22 TOLUCA = PROTOCOLO VIVO`

Manifest: `e8d9eac8edc3e7f05f99e20b87d1824663822797ad195bbc14ce88c3b4c0baae`


╔══════════════════════════════════════════════════════════════════════╗
║ ○_● KRONOS PROTOCOL · TESTS ║
║ 51% HUMANO · 49% IA · 100% REAL ║
╚══════════════════════════════════════════════════════════════════════╝

# Suite de tests

KRONOS Protocol usa **Web Test Runner nativo del navegador**. Sin Jest.
Sin Vitest. Sin Node.js. Cero dependencias.

## Por qué sin frameworks

El proyecto es local-first, 100% navegador. Los tests deben correr
donde corre el código real: en el navegador, con WebCrypto nativo.

Usar Node.js + Jest requeriría simular WebCrypto, Dexie, y todos
los APIs del navegador. Eso es mentir sobre qué estamos testeando.

## Cómo correr los tests

1. Abrir: `tests/index.html` en cualquier navegador moderno
2. Ver los resultados: verde = pasó, rojo = falló
3. La consola muestra detalle de cada test

**URL pública:**
https://marcorojas17.github.io/kronos-protocol/tests/

## Qué se testea (roadmap)

### Fase 1 · Criptografía básica (pendiente)

- [ ] SHA-256 de texto conocido
- [ ] Ed25519 firma/verificación
- [ ] Ed25519 detección de firma alterada
- [ ] AES-GCM cifrado/descifrado
- [ ] PBKDF2 derivación determinística

### Fase 2 · Merkle Tree (pendiente)

- [ ] Merkle Root de 2 hojas
- [ ] Merkle Root de 3 hojas (impar)
- [ ] Merkle Root determinístico (mismo input → mismo output)
- [ ] Detección de alteración en una hoja

### Fase 3 · Acta fundacional (pendiente)

- [ ] Extracción de artículos por regex
- [ ] Hash de artículo individual
- [ ] Firma de Merkle Root
- [ ] Verificación end-to-end

### Fase 4 · Agentes Kintsugi (pendiente)

- [ ] Generación de llave por agente
- [ ] Sellar registro
- [ ] Encadenamiento de log
- [ ] PREVIEW → COMMIT

## Estructura planeada

```
tests/
├── index.html              # Runner
├── runner.js               # Lógica del runner
├── cripto-core.test.js     # Tests de core.js
├── merkle.test.js          # Tests de Merkle
├── firmar.test.js          # Tests del firmador
├── agente-base.test.js     # Tests del motor de agentes
└── README.md               # Este archivo
```

## Estado actual

🔴 **56/56 tests passed.**

Este documento es la estructura. Los tests se escriben en la
próxima sesión de trabajo, priorizando cripto-core y Merkle Tree.

## Por qué importa

Sin tests, cualquier auditor externo (o Martín, o tu carnal, o
un inversor) no puede verificar que el código hace lo que dice
hacer. Los tests son la prueba técnica más básica.

Escribirlos es prioridad alta.

---

```
○_●
◢◤◥◣
◥◣◢◤
51% HUMANO · 49% IA · 100% REAL
"El legado no se hereda. Se firma."
```
