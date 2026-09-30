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
import { QuorumMayorias } from "./quorum.js";

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
