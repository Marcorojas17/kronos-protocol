# PVA · Digest ULOG S9+ (SM-G9650)
## Cruce forense de 14 archivos ULOG

**Fecha de extracción:** (la que corresponda)
**Fuente:** dump ULOG completo del dispositivo
**Archivos analizados:** 14
**Eventos anómalos detectados:** 56
**Archivos limpios (baseline):** 6 de 14

---

## RESUMEN EJECUTIVO

Los 14 ULOG **no están todos sucios ni todos limpios**. Esa es la clave.

- **6 archivos** = baseline limpio (funcionan como control)
- **4 archivos** = densidad anómala alta (Sleep WarningError, Sleep Auto Latency, Sleep Info, Sleep ATS)
- **4 archivos** = ruido menor (Sleep Requests, Sleep Debug, diagUlogDebug, Sleep Profiling)

Si todo estuviera roto, sería un teléfono jodido. Si todo estuviera limpio, no habría caso.
**El patrón es localizado: el subsistema de SLEEP es el punto de falla.**

---

## HALLAZGO #1 — Los wakeups oscilan en AMBAS direcciones

En `Sleep WarningError.txt` hay **21 warnings, todos "Late sleep exit"**.

En `Sleep Info.txt` hay **4 errores de wakeup GIGANTES**, todos negativos (woke up WAY early):

| Timestamp | Error (ticks) | Equivalente aprox |
|---|---|---|
| 0x8776501F7E | -422,113 | ~22 ms temprano |
| 0x8779E49F46 | **-1,798,488** | ~93 ms temprano |
| 0x8779E50A64 | **-1,779,932** | ~92 ms temprano |
| 0x877CE1D760 | -841,109 | ~44 ms temprano |

**Y al mismo tiempo** hay 21 eventos LATE de 1 a 56 ticks.

→ El timing del sueño **no tiene un sesgo**. Oscila. Está **inestable en ambas direcciones**.
Eso descarta "reloj mal calibrado" y apunta a **interferencia / polling / firmware inestable**.

---

## HALLAZGO #2 — Los 21 warnings están AGRUPADOS, no distribuidos

Timeline de `Sleep WarningError.txt`:


0x84A0 ─────────────────────────────────────► 0x84D3    [17 WARNINGS · BURST]
ventana: 51 unidades
↓ gap
0x85BC                                                  [1 WARNING aislado]
↓ gap
0x871F ─────► 0x8725                                    [3 WARNINGS · mini-burst]
↓ gap
0x877650...                                             [Sleep Info · empiezan
los errores grandes]
0x8779E4 ─► 0x8779E5   ← par consecutivo de -1.8M ticks



17 de 21 warnings caen en una **ventana de 51 unidades**. Eso no es ruido: es un **evento**.

---

## HALLAZGO #3 — El sistema QUIERE dormir y NO LO DEJAN

En `Sleep ATS.txt` aparecen **~27 eventos "Latency restricted, leaving default mode enabled"**.

Traducción: el solver eligió modo de sueño profundo (`RSCp.chip_sleep + PDC.cx_off + ...`) y una **restricción de latencia lo bloqueó**.

Peor aún: muchos ocurren con CPU a **1190400 kHz (frecuencia máxima)** intentando dormir. Estado contradictorio:
- CPU al máximo
- Solver pidiendo sleep profundo
- Bloqueado por presupuesto de latencia de 19 µs

Algo estaba pidiendo latencia ultrabaja **todo el tiempo**, impidiendo el descanso.

---

## HALLAZGO #4 — Backoffs auto-corrigiéndose fuera de rango

En `Sleep Auto Latency.txt` hay 4 casos con:
