<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<!--                                                                           -->
<!--   ▓▒░ ANALYTICS SETUP · MÉTRICAS · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓      -->
<!--                                                                           -->
<!--   NODO: YHDRYH-92CE · GENESIS: K28-M05-MN01-YHDRYH-92CE                  -->
<!--                                                                           -->
<!-- ═══════════════════════════════════════════════════════════════════════════ -->

<div align="center">

# ⚙️ ANALYTICS SETUP

### *Configurar métricas sin espiar*

### *"El mejor analytics es el que no necesita cookies."*

---

```

```
        ╔═══════════════════════════════════════════════════════════════╗
        ║                                                               ║
        ║   ◯_●  ·  S E T U P  ·  ◯_●                                   ║
        ║                                                               ║
        ║   ┌───────────────────────────────────────────────────────┐   ║
        ║   │  Stack:  Plausible / Umami / Custom                   │   ║
        ║   │  Modo:   self-hosted                                  │   ║
        ║   │  Datos:  agregados, sin PII                           │   ║
        ║   │                                                       │   ║
        ║   │  ESTADO: ● CONFIGURABLE ●                             │   ║
        ║   └───────────────────────────────────────────────────────┘   ║
        ║                                                               ║
        ╚═══════════════════════════════════════════════════════════════╝
```

```

</div>

## 🜂 Stack recomendado

### Opción 1 · Plausible Analytics (self-hosted)

```bash
# Docker compose
docker run -d \
  --name plausible \
  -p 8000:8000 \
  -e BASE_URL=https://analytics.arkhe.zero \
  plausible/analytics:latest
```

**Ventajas:**
- Open source (AGPL)
- Privacy-first por diseño
- Sin cookies
- < 1 KB script
- GDPR/CCPA compliant

### Opción 2 · Umami

```bash
docker run -d \
  --name umami \
  -p 3000:3000 \
  ghcr.io/umami-software/umami:latest
```

**Ventajas:**
- Open source (MIT)
- Self-hosted
- Sin cookies
- Simple

### Opción 3 · Custom (Local-First)

Script propio que agrega datos **en el navegador** y solo envía
métricas anónimas al servidor:

```javascript
// assets/js/analytics.js
const metrics = {
  pageView: 1,
  referrer: document.referrer ? new URL(document.referrer).hostname : 'direct',
  userAgent: navigator.userAgent.slice(0, 50),
  ts: Date.now(),
};
// Enviar solo al endpoint propio, sin IP, sin cookies
fetch('/api/metrics', { method: 'POST', body: JSON.stringify(metrics) });
```

## 🜃 Endpoint /api/metrics

```http
POST /api/metrics
Content-Type: application/json

{
  "pageView": 1,
  "referrer": "google.com",
  "ua": "Mozilla/5.0...",
  "ts": 1735689600000
}
```

**Reglas:**
```diff
+ Anonimizar IP antes de guardar
+ Agregar por hora/día/mes
+ Nunca guardar user agents completos
- NUNCA guardar IPs
- NUNCA usar cookies
- NUNCA usar fingerprinting
```

## 🜄 Dashboard público

Métricas agregadas expuestas en `/api/metrics/public`:

```json
{
  "visitantes_mes": 12453,
  "firmas_mes": 87,
  "suscriptores_total": 892,
  "nodos_activos": 1,
  "actualizado": "2026-10-09T12:00:00Z"
}
```

## 🜁 Firma

```
◯_● · 51/49/100
Nodo YHDRYH-92CE
Genesis K28-M05-MN01-YHDRYH-92CE
```

---

`◯_● · 51/49/100 · KRONOS · metrics/analytics-setup`