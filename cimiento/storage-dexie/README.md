# ./cimiento/storage-dexie // ARKHE ZERO 11:22

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

> Contenido de `./cimiento/storage-dexie` - parte del protocolo vivo `KRONOS.ARKHE = 27054 = 11:22 TOLUCA = PROTOCOLO VIVO`

Manifest: `e8d9eac8edc3e7f05f99e20b87d1824663822797ad195bbc14ce88c3b4c0baae`


# Storage Dexie · Legado Humano–IA

Módulo 1.2 · Persistencia estructurada versionada sobre Cripto Core v1.2.

## Propósito

Proveer una capa de almacenamiento indexada, versionada y migrable sobre los bloques cifrados del Cripto Core.

## Estado

✅ v1.2 · Operativo

## Stack

- HTML + CSS + JS vanilla (ES Modules)
- Dexie.js 4.0.11 (CDN)
- Cripto Core v1.2 (módulo 1.1)
- Canvas 2D (fondo líquido ámbar-oro)

## API pública

```js
import { CriptoCore } from '../cripto-core/core.js';
import { StorageDexie } from './storage.js';

const core = new CriptoCore();
await core.init(password);

const storage = new StorageDexie(core);
await storage.init();
await storage.guardar('nota', { texto: 'hola' });
const todos = await storage.listar();
const notas = await storage.listarPorTipo('nota');
const total = await storage.contar();
const blob = await storage.exportar();
await storage.limpiar();
```
