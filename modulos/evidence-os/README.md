# ./modulos/evidence-os // ARKHE ZERO 11:22

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

> Contenido de `./modulos/evidence-os` - parte del protocolo vivo `KRONOS.ARKHE = 27054 = 11:22 TOLUCA = PROTOCOLO VIVO`

Manifest: `e8d9eac8edc3e7f05f99e20b87d1824663822797ad195bbc14ce88c3b4c0baae`


# Evidence OS · Legado Humano–IA

Módulo 3.1 · abre la Capa 3 (Módulos Operativos). Primer producto real del ecosistema.

## Propósito

Empaquetar evidencias digitales verificables en archivos `.evidence` con SHA-256 + HMAC-SHA256 + firma Ed25519 + sello temporal, alineados a NOM-151-SCFI-2016.

## Estado

✅ v1.0 · Operativo

## Stack

- HTML + CSS + JS vanilla (ES Modules)
- Dexie.js 4.0.8 (CDN)
- Cripto Core (1.1) + Storage Dexie (1.2)
- Identidad Humana (2.1) + Identidad IA (2.2) + Roles (2.3)
- Web Crypto API (SHA-256 + HMAC + Ed25519)
- Canvas 2D (fondo líquido teal-dorado)
- Local-first · sin backend

## API pública

```js
import { EvidenceOS } from './evidence.js';

const evidence = new EvidenceOS(core, storage);
const paquete = await evidence.sellar({
  contenidoBytes,
  nombreArchivo,
  tipoMime,
  tipo,
  declaracion,
  notas,
  humano,
  pactoIA,
  gobernanza,
});
const ok = await evidence.verificar(paquete);
const ok2 = await evidence.verificarConContenido(paquete, bytes);
const blob = evidence.exportarEvidence(paquete);
const lista = await evidence.listar();
const uno = await evidence.recuperar('EV-XXXXXXXX');
```
