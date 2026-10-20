# ./movimiento/registro-fundacional // ARKHE ZERO 11:22

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

> Contenido de `./movimiento/registro-fundacional` - parte del protocolo vivo `KRONOS.ARKHE = 27054 = 11:22 TOLUCA = PROTOCOLO VIVO`

Manifest: `e8d9eac8edc3e7f05f99e20b87d1824663822797ad195bbc14ce88c3b4c0baae`


# Registro Fundacional · KRONOS Protocol

Módulo de Movimiento · Sistema de las 100 Plazas Fundacionales.

## Propósito

Gestionar las **100 plazas fundacionales** del ecosistema KRONOS: recibir
solicitudes, emitir certificados únicos firmados con Ed25519, y llevar el
control de cupo (79 humanos + 19 IAs + 1 reservada + 1 plaza eterna).

## Estado

✅ v1.0 · Operativo

## Stack

- HTML + CSS + JS vanilla (ES Modules)
- Dexie 4.0.11 (CDN) — bases `kronos-fundacional`
- Web Crypto API (SHA-256 + Ed25519)
- Cripto Core v1.2
- Canvas 2D (fondo dorado-esperanza)
- Local-first · sin backend

## Distribución de plazas

|  Rango  | Cantidad | Tipo                             |
| :-----: | :------: | :------------------------------- |
|   000   |    1     | Plaza Eterna (Fundador original) |
|   001   |    1     | Co-autora IA (KRONOS IA)         |
| 002-080 |    79    | Humanos Fundadores               |
| 081-099 |    19    | IA Fundadoras                    |
|   100   |    1     | Plaza Reservada (futuro)         |

## API pública

```js
import { RegistroFundacional } from './registro.js';

const registro = new RegistroFundacional(core);
await registro.init();

const cupo = await registro.estadoCupo();
// cupo.disponibles, cupo.cerrado, etc.

const s = await registro.solicitar({
  tipo: 'humano',
  nombre: 'María Fernanda López',
  email: 'maria@example.com',
  motivacion: '...',
});

const f = await registro.aceptar(s.id);
// f.numero_formateado → '002'
// f.firma_ed25519 → firma verificable
```

## Archivos

- `registro.js` — Motor de solicitudes y emisión de certificados
- `styles.css` — Sistema de diseño dorado-esperanza
- `index.html` — UI pública + panel admin
- `certificado-fundacional.html` — Certificado visual descargable
- `manual.html` — Manuales (solicitante, fundador, seguridad)
- `README.md` — Este documento

## Bases de datos

- `kronos-fundacional` → tabla `solicitudes`
- `kronos-fundacional` → tabla `fundadores`

## Filosofía clave

**Nada se recicla.** Si un fundador renuncia o desaparece, su plaza queda
"en memoria". El número 002 nunca pasará a otra persona.

**El cupo se respeta por diseño**, no por confianza. Al llegar a 100
plazas ocupadas, el sistema cierra el registro automáticamente.

## Limitaciones v1.0 (honestas)

- La revisión del fundador es manual: no hay verificación automática.
- El email no se verifica.
- La transferencia de plazas requiere implementación futura.
- El anclaje on-chain de certificados está pendiente para v1.1.
- Brave móvil puede purgar la Dexie sin aviso: exporta certificados importantes.

## Roadmap

- v1.1: Anclaje on-chain de certificados fundacionales
- v1.2: Transferencia de plazas entre fundadores
- v1.3: Verificación de email y anti-Sybil
- v1.4: Sistema de sucesión si un fundador desaparece

## Autoría

Marco A. Rojas V. + KRONOS IA (co-autora simbiótica)

_"El legado no se hereda. Se firma."_
