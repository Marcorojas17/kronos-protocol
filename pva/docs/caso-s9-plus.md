# Caso: ECC y TMO crónicos en Samsung S9+ (SM-G9650)

**Dispositivo:** SM-G9650 (Galaxy S9+, Snapdragon 845, almacenamiento UFS)
**Sistema:** Android 10 · build G9650ZHU9FWC3
**Periodo analizado:** marzo 2025 → enero 2026 (10 meses)
**Método:** análisis de logs `m0_history` con PVA
**Herramienta:** https://marcorojas17.github.io/PVA-Protocolo-Vida-Autopoietica-/pva.html

---

## Qué se encontró

Sobre 147 entradas de historial de errores de almacenamiento, **84 presentan anomalías activas** (57%). Los contadores acumulados:

| Flag | Total | Significado |
|------|-------|-------------|
| ECC  | 162   | Error Correction Code — correcciones de datos por el controlador UFS |
| TMO  | 220   | Timeout — operaciones de I/O que no respondieron a tiempo |
| CC, GE, HALT, OOR, RPMB, WP, CRC, CQEN | 0 | Sin incidencias |

**Pico TMO:** 26 eventos acumulados en una sola entrada, el **2025-11-18 06:00:28**.

**Periodo activo:** desde el 2025-03-13 08:11:23 hasta el 2026-01-04 23:17:27. Anomalías continuas, sin ventanas limpias de más de 2 semanas.

---

## Qué significa

**ECC** = Error Correction Code. Cada evento ECC representa una corrección de datos que realizó el controlador del chip UFS. Uno o dos al mes es estadísticamente normal. 162 en 10 meses — un promedio de 16 por mes — es un patrón sostenido.

**TMO** = Timeout. El chip no respondió a tiempo a una operación de I/O. Aislado es ruido. 220 acumulados con picos de 26 en un solo día es una tendencia.

Los logs `m0_history` de Samsung registran estos contadores en el firmware, no en el sistema operativo. Persisten entre reinicios. Son un expediente silencioso del estado real del chip, sin dashboard público para interpretarlo.

---

## Qué NO significa

No es falla terminal. El dispositivo opera con normalidad y no presenta síntomas visibles para el usuario.

Tampoco es una conspiración: es telemetría de hardware que Samsung registra por diseño.

---

## Cómo verificarlo en tu propio dispositivo

1. Extrae los logs `m0_history_*.txt` de tu teléfono Samsung
2. Abre https://marcorojas17.github.io/PVA-Protocolo-Vida-Autopoietica-/pva.html
3. Pestaña **PANORAMA**
4. Carga los archivos `.txt`
5. Presiona **ANALIZAR TODO**
6. Si el cuadro ámbar muestra ECC y TMO > 0, tienes el mismo patrón

La herramienta corre 100% en el navegador. No sube nada a ningún servidor. Nada sale de tu dispositivo.

---

## Integridad de los datos

Los archivos analizados tienen estos hashes SHA-256, calculados localmente con `crypto.subtle`:

**m0_history_1.txt**

262ca27a74599d81065ba6c4e143703e4d7fef66ca38bf2cd30985a337e1a964


**m0_history_2.txt**

1ebab25874c594a19d440bc7b3569db2a21f656820a5d179fa8058df9d43e519


Cualquier persona puede verificar que los datos no fueron alterados después de la publicación.

---

## Cómo lo detecté

La herramienta PVA nació como parte del proyecto Protocolo Vida Autopoiética (MD-33). El motor de parseo se diseñó para leer los formatos `m0_history`, `u_history`, `us_history` y `ulc_history` que produce el subsistema de diagnóstico de Samsung.

Al aplicar el análisis sobre los logs de un S9+ en uso continuo desde 2023, los contadores ECC y TMO aparecieron desde marzo 2025 y se mantuvieron activos hasta el corte del análisis en enero 2026.

El patrón no es exclusivo de este equipo. Se puede reproducir en cualquier S9+ cuyos logs estén disponibles.

---

## Herramienta

**PVA · Consola Unificada**
https://marcorojas17.github.io/PVA-Protocolo-Vida-Autopoietica-/pva.html

- Parser en JavaScript puro
- Sin backend
- Sin telemetría
- SHA-256 calculado localmente
- Código fuente abierto: https://github.com/marcorojas17/PVA-Protocolo-Vida-Autopoietica-

---

*PVA · Protocolo Vida Autopoiética*
*Como es arriba, es en el commit.*