# ./gobernanza/quorum-mayorias // ARKHE ZERO 11:22

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

> Contenido de `./gobernanza/quorum-mayorias` - parte del protocolo vivo `KRONOS.ARKHE = 27054 = 11:22 TOLUCA = PROTOCOLO VIVO`

Manifest: `e8d9eac8edc3e7f05f99e20b87d1824663822797ad195bbc14ce88c3b4c0baae`


# Quórum y Mayorías · KRONOS Protocol

Módulo 4.2 · Capa 4 (Gobernanza). Umbrales de decisión por tipo de propuesta.

## Propósito

Definir cuántos votos se necesitan para aprobar cada tipo de propuesta. Los cambios
criptográficos requieren más consenso que las mejoras menores.

## Estado

✅ v1.0 · Operativo

## Reglas declaradas

| Tipo                 | Quórum | Mayoría    |
| :------------------- | :----: | :--------- |
| Cambio menor         |  20%   | Simple     |
| Cambio estructural   |  50%   | Absoluta   |
| Cambio criptográfico |  66%   | Calificada |
| Adopción             |  50%   | Absoluta   |
| Recurso              |  33%   | Simple     |

## API pública

```js
import { QuorumMayorias } from './quorum.js';

const q = new QuorumMayorias();

const v = q.veredicto(resultados, ciudadanosActivos, tipo, estado);
// v.verdicto → 'aprobada' | 'rechazada' | 'sin_quorum' | 'en_curso' | 'lista_para_cerrar'
```

## Archivos

- `quorum.js` — Motor de quórum y mayorías
- `index.html` — UI con simulador
- `manual.html` — Manuales (usuario, admin, seguridad)
- `README.md` — Este documento

## Limitaciones v1.0

- Conteo de ciudadanos activos aún manual.
- Sin verificación anti-Sybil criptográfica.
- Los umbrales son orientativos y ajustables.

## Autoría

Marco A. Rojas V. + KRONOS IA (co-autora simbiótica)

_"El legado no se hereda. Se firma."_
