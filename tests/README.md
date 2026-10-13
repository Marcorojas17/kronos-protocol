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

🔴 **CERO tests implementados.**

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
