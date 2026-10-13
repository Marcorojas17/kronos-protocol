```
╔══════════════════════════════════════════════════════════════════════════╗
║  📊 DASHBOARDS · 6 dashboards JSON de métricas                          ║
║  [ NODO: YHDRYH-92CE ]  [ SEC 23 · MÉTRICAS ]                           ║
╚══════════════════════════════════════════════════════════════════════════╝
```

# 📊 DASHBOARDS

> *"Cada dashboard es una ventana al sistema."*

## 🎯 Contenido

```
┌──────────────────────────────────────────────────────────────────┐
│  ARCHIVO                  │  PROPÓSITO                            │
├───────────────────────────┼───────────────────────────────────────┤
│  trafico.json             │  Visitas y comportamiento             │
│  conversion.json          │  Conversión y funnel                  │
│  viralidad.json           │  Coeficiente K y loops                │
│  comunidades.json         │  Niveles y engagement                 │
│  geo-visibilidad.json     │  Distribución geográfica              │
│  custom.json              │  Personalizable por usuario           │
└───────────────────────────┴───────────────────────────────────────┘
```

## 🎨 Formato

Todos siguen el mismo esquema:

```json
{
  "dashboard": "nombre",
  "version": "1.0.0",
  "kronos": { nodo, seal, folio, scdr },
  "titulo": "...",
  "descripcion": "...",
  "actualizado": "ISO 8601",
  "metricas": [...],
  "series_temporales": {...},
  "por_categoria": [...]
}
```

## 🔌 API

Cada dashboard se expone vía:
```
GET /api/v1/dashboards/{nombre}
```

## 📋 Roadmap

- [ ] Implementar endpoints de dashboard
- [ ] Crear frontend de visualización
- [ ] Caché de 5 minutos
- [ ] WebSocket para tiempo real
- [ ] Exportación a PDF

---

◯_● · 51/49/100 · KRONOS · Sec 23