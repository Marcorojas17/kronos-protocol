# FSDBG - Análisis de Almacenamiento

Herramienta de diagnóstico para logs `fsdbg` del subsistema de almacenamiento (UFS/eMMC), UIC y contadores de LUN. Probado con dumps de Samsung S9+ (G9650ZHU9FWC3).

## Formatos soportados

| Formato | Detección | Contenido |
|---------|-----------|-----------|
| `m0_history` | `type : err` en el texto | Errores de storage con contadores GE/CC/ECC/WP/OOR/CRC/TMO/HALT/CQEN/RPMB |
| `u_history`  | `"OPERR"` presente | UIC errors |
| `us_history` | `"MEDIUM"` presente | US / hardware errors |
| `ulc_history`| Header + línea numérica | Contador ULC |
| `raw` (fsdbg*.txt) | Prefijo `H4sIAAAAAAAAA` | Dump gzip+base64 (no parseado aún) |

## ¿Qué hace?

`parser.js` detecta el tipo de cada archivo, divide por entradas `[N] - fsdbg : TIMESTAMP`, y extrae:
- **m0**: cada línea de error (sbc, cmd, data, stop, busy) y los contadores acumulados al final.
- **u / us**: pares clave-valor entre comillas.
- **ulc**: valor numérico único por entrada.

Expone:
- `window.FSDBG.detectType(text)`
- `window.FSDBG.parse(text)`
- `window.FSDBG.summarize(parsed)`

`index.html` es un dashboard multi-archivo:
- Carga múltiple de `.txt`
- Detecta tipo por archivo
- Tarjetas resumen (archivos, entradas, anomalías, contadores)
- Tabla de anomalías
- Gráfico de barras por día (Chart.js vía CDN)
- Tabla de contadores acumulados m0

## ¿Cómo se usa?

1. Abre `fsdbg/index.html` en el navegador.
2. Selecciona los archivos `.txt` de historial (`m0_history_*.txt`, `u_history_*.txt`, etc.).
3. Presiona **Analizar**.
4. Opcional: **Ver ejemplo** carga un `m0_history` de prueba.

## Notas

- Los dumps crudos (`fsdbg*.txt`) empiezan con `H4sIAAAAAAAAA` (gzip+base64). El parser los detecta como `raw` pero no los descomprime todavía. Se pueden decodificar con `pako.inflate` en el navegador.
- El dashboard funciona 100% en el navegador, sin backend.

---
*PVA · Protocolo Vida Autopoiética*