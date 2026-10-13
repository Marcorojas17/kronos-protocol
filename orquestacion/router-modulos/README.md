<!--
╔══════════════════════════════════════════════════════════════════════════╗
║  ▓▒░ ROUTER MÓDULOS · ORQUESTACIÓN · ARKHÉ ZERO ░▒▓                      ║
╚══════════════════════════════════════════════════════════════════════════╝
-->

# 🔀 router-modulos/ · Router

```bash
┌─(kali㉿arkhe-zero)-[~/kronos/orquestacion/router-modulos]
└─$ node -e "import('./router.js').then(m => \
     console.log(Object.keys(m.RUTAS_REGISTRADAS)))"

[ 'sign','verify','sha3_512','anclar','persistir',
  'certificar','notarizar','proponer','votar','quorum' ]
```

## 🜂 Rutas Registradas

| Acción       | Módulo destino                                    |
|--------------|---------------------------------------------------|
| `sign`       | `crypto/operations/sign.js`                       |
| `verify`     | `crypto/operations/verify.js`                     |
| `sha3_512`   | `crypto/primitives/sha3-512.js`                   |
| `anclar`     | `cimiento/anclaje-ethereum/anchor.js`             |
| `persistir`  | `cimiento/storage-dexie/storage.js`               |
| `certificar` | `certificacion/manifest-integridad/manifest.js`   |
| `notarizar`  | `certificacion/notario-kronos/notario.js`         |
| `proponer`   | `gobernanza/propuestas-votacion/proponer.js`      |
| `votar`      | `gobernanza/propuestas-votacion/votar.js`         |
| `quorum`     | `gobernanza/quorum-mayorias/quorum.js`            |

## 🜃 Uso

```javascript
import { Router } from './router.js';
const r = new Router();
await r.ejecutar('sha3_512', 'ARKHÉ ZERO');
```

---

`◯_● · 51/49/100 · KRONOS · router-modulos`