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
import { RegistroFundacional } from "./registro.js";

const registro = new RegistroFundacional(core);
await registro.init();

const cupo = await registro.estadoCupo();
// cupo.disponibles, cupo.cerrado, etc.

const s = await registro.solicitar({
  tipo: "humano",
  nombre: "María Fernanda López",
  email: "maria@example.com",
  motivacion: "...",
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
