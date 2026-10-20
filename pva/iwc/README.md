# ./pva/iwc // ARKHE ZERO 11:22

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

> Contenido de `./pva/iwc` - parte del protocolo vivo `KRONOS.ARKHE = 27054 = 11:22 TOLUCA = PROTOCOLO VIVO`

Manifest: `e8d9eac8edc3e7f05f99e20b87d1824663822797ad195bbc14ce88c3b4c0baae`


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

_PVA · Protocolo Vida Autopoiética_
