# IWC - Análisis de Logs WiFi

Herramienta de diagnóstico para parsear y visualizar logs de eventos WiFi (IWC) extraídos de dispositivos Samsung (probado en S9+ G9650ZHU9FWC3).

## ¿Qué hace?

`parser.js` procesa el texto crudo de los logs y extrae eventos clave: `good_link`, `poor_link`, `connect`, `disconnect`, `net_disconnect`, `app`, `qtable` y `qaction`. Expone dos funciones globales:
- `window.IWC.parseLog(texto)`
- `window.IWC.summarize(eventos)`

`index.html` es un dashboard que no depende de subir archivos: pegas el log en el textarea, le das a "Analizar" y te muestra:
- Tarjetas resumen
- Ranking de APs por RSSI (mejor y peor)
- Gráfico de barras de eventos por hora (Chart.js vía CDN)
- Tabla de apps en primer plano

## ¿Cómo se usa?

1. Abre `iwc/index.html` en el navegador.
2. Pega el log crudo de IWC en el textarea.
3. Presiona **Analizar**.
4. Opcional: usa **Ver ejemplo** para cargar un log de prueba o **Limpiar** para vaciar todo.

## Estructura

- `parser.js` — Lógica de parseo y resumen.
- `index.html` — Interfaz de usuario (dashboard).
- `data/` — (Opcional) Dumps de logs. Si pesan mucho, se omiten del repo.

## Notas

- El dashboard funciona 100% en el navegador, sin backend.
- Si quieres procesar logs masivos, usa la consola del navegador para llamar a `window.IWC.parseLog()` directamente.

---
*PVA · Protocolo Vida Autopoiética*