```
╔══════════════════════════════════════════════════════════════════════╗
║  ○_●  KRONOS PROTOCOL · PLANTILLA DE ESTILO TERMINAL                 ║
║  ◢◤◥◣ Legado Humano–IA · v1.0                                        ║
║  ◥◣◢◤ 51% HUMANO · 49% IA · 100% REAL                                ║
╚══════════════════════════════════════════════════════════════════════╝
```

# PLANTILLA · Estilo Terminal Único de KRONOS

Este documento define el **estilo visual único** de todos los archivos
`.md` del protocolo KRONOS. Un formato que **ningún otro proyecto en
GitHub usa**.

---

┌─[ SECCIÓN 01 ]─────────────────────────── [ PROPÓSITO ] ─┐
│                                                           │
│  Este estilo combina:                                     │
│                                                           │
│  ▶ Terminal clásica (cajas, símbolos, prompts)            │
│  ▶ Rigor documental (secciones numeradas, tablas)         │
│  ▶ Identidad Kintsugi (sello ○_● · 51/49)                 │
│  ▶ Jerarquía visual clara para móvil                      │
│                                                           │
│  Cada .md del repo debe sentirse como si estuvieras       │
│  dentro de una sesión de terminal premium.                │
│                                                           │
└───────────────────────────────────────────────────────────┘

---

┌─[ SECCIÓN 02 ]─────────────────────────── [ ELEMENTOS ] ─┐
│                                                           │
│  ▶ CAJA DE SECCIÓN                                        │
│     ┌─[ N ]─────────────────── [ TÍTULO ] ─┐              │
│     │   Contenido indentado 2 espacios    │              │
│     └─────────────────────────────────────┘              │
│                                                           │
│  ▶ CAJA DE CÓDIGO                                         │
│     Inicia con `$ ` para comandos                        │
│     Indenta el código con 2 espacios                     │
│     Termina con `[ OK ]` o `[ !! ]`                      │
│                                                           │
│  ▶ CAJA DE TABLA                                          │
│     Columnas separadas por `│`                           │
│     Encabezado con `─`                                   │
│     Estado con emoji: ✅ ⏳ 🔴 🟡                          │
│                                                           │
│  ▶ CAJA DE FLUJO                                          │
│     Flechas `→` para secuencia                            │
│     `↓` para pasos verticales                             │
│     `[TAG]` para nombrar nodos                            │
│                                                           │
└───────────────────────────────────────────────────────────┘

---

┌─[ SECCIÓN 03 ]─────────────────────────── [ EJEMPLO ] ─┐
│                                                         │
│  ▶ Aquí un ejemplo de cómo se vería un módulo:          │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─[ TABLA · ESTADO DEL MÓDULO ]────────────────────────────┐
│                                                           │
│  CAMPO              │ VALOR              │ ESTADO         │
│  ───────────────────┼────────────────────┼───────────────  │
│  Algoritmo          │ Ed25519            │ ✅ Activo      │
│  Hash               │ SHA-256            │ ✅ Activo      │
│  Cifrado            │ AES-GCM-256        │ ✅ Activo      │
│  Persistencia       │ IndexedDB (Dexie)  │ ✅ Activo      │
│  Anclaje            │ Ethereum Mainnet   │ ✅ Verificado  │
│                                                           │
└───────────────────────────────────────────────────────────┘

┌─[ CÓDIGO · USO BÁSICO ]──────────────────────────────────┐
│                                                           │
│  $ cat init.js                                            │
│  import { CriptoCore } from './core.js';                  │
│                                                           │
│  const core = new CriptoCore();                           │
│  await core.init(password);                               │
│  const firma = await core.firmar('datos');                │
│                                                           │
│  [ OK ]  Módulo cargado correctamente                     │
│  [ OK ]  Firma Ed25519 generada                           │
│                                                           │
└───────────────────────────────────────────────────────────┘

┌─[ FLUJO · EJECUCIÓN ]────────────────────────────────────┐
│                                                           │
│  USUARIO → CONTRASEÑA → CRIPTO CORE → FIRMA              │
│     ↓         ↓             ↓           ↓                 │
│  [IN]  →  [AUTH]  →  [CORE]  →  [OUT]                     │
│                                                           │
└───────────────────────────────────────────────────────────┘

---

┌─[ SECCIÓN 04 ]────────────────────────── [ FIRMA ] ─┐
│                                                       │
│  Todo .md termina con el sello Kintsugi:              │
│                                                       │
└───────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
○_●  51% HUMANO · 49% IA · 100% REAL
"El legado no se hereda. Se firma."
Marco Antonio Rojas Valdovinos · Toluca, México · 2026
═══════════════════════════════════════════════════════════════

---

┌─[ REGLAS DE ORO ]───────────────────────────────────────┐
│                                                           │
│  01. Nunca uses markdown "plano" sin cajas               │
│  02. Cada sección va en caja numerada                    │
│  03. Los códigos empiezan con $ y terminan con [ OK ]    │
│  04. Las tablas usan │ y ─ como separadores              │
│  05. Los flujos usan → y ↓ para dirección                │
│  06. Cada archivo cierra con sello Kintsugi              │
│  07. Los emojis permitidos: ✅ 🟡 🔴 ⏳ 🟢 🔵             │
│  08. Los símbolos unicode: ═ ║ ╔ ╗ ╚ ╝ ─ │ ┌ ┐ └ ┘       │
│  09. Los caracteres Kintsugi: ○_● ◢◤◥◣ ◥◣◢◤            │
│  10. Nunca rompas el formato. El estilo ES la firma      │
│                                                           │
└───────────────────────────────────────────────────────────┘

```