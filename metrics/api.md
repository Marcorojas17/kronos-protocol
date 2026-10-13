<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<!--                                                                           -->
<!--    █████╗ ██████╗ ██╗                                                     -->
<!--   ██╔══██╗██╔══██╗██║                                                     -->
<!--   ███████║██████╔╝██║                                                     -->
<!--   ██╔══██║██╔═══╝ ██║                                                     -->
<!--   ██║  ██║██║     ██║                                                     -->
<!--   ╚═╝  ╚═╝╚═╝     ╚═╝                                                     -->
<!--                                                                           -->
<!--   ▓▒░ API · MÉTRICAS · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓                 -->
<!--                                                                           -->
<!--   NODO: YHDRYH-92CE · GENESIS: K28-M05-MN01-YHDRYH-92CE                  -->
<!--                                                                           -->
<!-- ═══════════════════════════════════════════════════════════════════════════ -->

<div align="center">

# 🔌 API DE MÉTRICAS

### *Métricas públicas, sin auth, sin tracking*

### *"La transparencia se expone. No se pide."*

---

```

```
        ╔═══════════════════════════════════════════════════════════════╗
        ║                                                               ║
        ║   ◯_●  ·  A P I  ·  ◯_●                                       ║
        ║                                                               ║
        ║   ┌───────────────────────────────────────────────────────┐   ║
        ║   │  GET /api/metrics/public      ·  métricas agregadas   │   ║
        ║   │  GET /api/metrics/kpis        ·  6 KPIs canónicos     │   ║
        ║   │  GET /api/metrics/export      ·  export en formato    │   ║
        ║   │  POST /api/metrics/event      ·  evento (anónimo)     │   ║
        ║   │                                                       │   ║
        ║   │  AUTH:  ninguna                                      │   ║
        ║   │  RATE:  100 req/h por IP                             │   ║
        ║   └───────────────────────────────────────────────────────┘   ║
        ║                                                               ║
        ╚═══════════════════════════════════════════════════════════════╝
```

```

</div>

## 🜂 GET /api/metrics/public

```json
{
  "visitantes_mes": 12453,
  "firmas_mes": 87,
  "suscriptores_total": 892,
  "nodos_activos": 1,
  "actualizado": "2026-10-09T12:00:00Z",
  "sellado": "◯_● · 51/49/100"
}
```

## 🜃 GET /api/metrics/kpis

```json
{
  "kpis": [
    { "id": "visitantes_unicos",   "meta": 10000, "actual": 12453 },
    { "id": "firmas_mes",          "meta": 100,   "actual": 87 },
    { "id": "suscriptores",        "meta": 1000,  "actual": 892 },
    { "id": "embajadores_e1",      "meta": 5,     "actual": 0 },
    { "id": "indice_conversion",   "meta": 1.0,   "actual": 0.7 },
    { "id": "nodos_activos",       "meta": 5,     "actual": 1 }
  ],
  "sellado": "◯_● · 51/49/100"
}
```

## 🜄 GET /api/metrics/export

```
?formato=csv|json|md&periodo=YYYY-MM
```

Devuelve el archivo exportable con sello.

## 🜁 POST /api/metrics/event

```json
{
  "tipo": "pageview | share | signup",
  "pagina": "/apps/verificar.html",
  "referrer": "google.com",
  "anonimizado": true
}
```

## 🜆 Reglas

```diff
+ Sin auth · todo público
+ Rate limit generoso
+ Sin tracking individual
+ Todos los eventos anonimizados
- NUNCA guardar IP
- NUNCA guardar user agent
- NUNCA guardar cookies
```

## 🜇 Firma

```
◯_● · 51/49/100
Nodo YHDRYH-92CE
Genesis K28-M05-MN01-YHDRYH-92CE
```

---

`◯_● · 51/49/100 · KRONOS · metrics/api`