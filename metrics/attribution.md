<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<!--                                                                           -->
<!--   ▓▒░ ATTRIBUTION · ATRIBUCIÓN DE FUENTE · ARKHÉ ZERO · ◯_● ░▒▓         -->
<!--                                                                           -->
<!--   NODO: YHDRYH-92CE · GENESIS: K28-M05-MN01-YHDRYH-92CE                  -->
<!--                                                                           -->
<!-- ═══════════════════════════════════════════════════════════════════════════ -->

<div align="center">

# 🔗 ATTRIBUTION

### *Saber de dónde viene sin invadir*

### *"La atribución respeta. El tracking viola."*

---

```

```
        ╔═══════════════════════════════════════════════════════════════╗
        ║                                                               ║
        ║   ◯_●  ·  A T T R I B U T I O N  ·  ◯_●                       ║
        ║                                                               ║
        ║   ┌───────────────────────────────────────────────────────┐   ║
        ║   │  Método:      Referrer header (público)               │   ║
        ║   │  Anonimato:   100%                                    │   ║
        ║   │  Retención:   agregado, sin PII                       │   ║
        ║   │                                                       │   ║
        ║   │  ESTADO: ● ACTIVO ●                                   │   ║
        ║   └───────────────────────────────────────────────────────┘   ║
        ║                                                               ║
        ╚═══════════════════════════════════════════════════════════════╝
```

```

</div>

## 🜂 Cómo funciona

La atribución usa **solo el header `Referrer`** (público, sin cookies):

```javascript
const referrer = document.referrer
  ? new URL(document.referrer).hostname
  : 'direct';
```

## 🜃 Categorías canónicas

| Categoría         | Fuente                            |
|-------------------|-----------------------------------|
| `organic-search`  | google.com · bing.com · ddg.gg    |
| `ai-search`       | perplexity.ai · chatgpt.com · claude.ai |
| `social`          | twitter.com · linkedin.com · mastodon |
| `direct`          | (sin referrer)                    |
| `internal`        | arkhe.zero                        |
| `referral`        | cualquier otro dominio            |

## 🜄 Reglas

```diff
+ Solo se guarda el hostname del referrer
+ Datos agregados por categoría
+ Sin tracking individual
- NUNCA guardar URL completa del referrer
- NUNCA usar cookies o UTM intrusivos
- NUNCA fingerprinting
```

## 🜁 Ejemplo de salida

```json
{
  "periodo": "2026-10",
  "categorias": {
    "organic-search": 4200,
    "ai-search": 2500,
    "social": 1200,
    "direct": 1800,
    "internal": 600,
    "referral": 153
  },
  "total": 10453
}
```

## 🜆 Firma

```
◯_● · 51/49/100
Nodo YHDRYH-92CE
Genesis K28-M05-MN01-YHDRYH-92CE
```

---

`◯_● · 51/49/100 · KRONOS · metrics/attribution`