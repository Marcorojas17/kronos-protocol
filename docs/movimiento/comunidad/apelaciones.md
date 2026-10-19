<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<!--                                                                           -->
<!--    █████╗ ██████╗ ███████╗██╗      █████╗  ██████╗██╗ ██████╗ ███╗   ██╗███████╗███████╗  -->
<!--   ██╔══██╗██╔══██╗██╔════╝██║     ██╔══██╗██╔════╝██║██╔═══██╗████╗  ██║██╔════╝██╔════╝  -->
<!--   ███████║██████╔╝█████╗  ██║     ███████║██║     ██║██║   ██║██╔██╗ ██║█████╗  ███████╗  -->
<!--   ██╔══██║██╔═══╝ ██╔══╝  ██║     ██╔══██║██║     ██║██║   ██║██║╚██╗██║██╔══╝  ╚════██║  -->
<!--   ██║  ██║██║     ███████╗███████╗██║  ██║╚██████╗██║╚██████╔╝██║ ╚████║███████╗███████║  -->
<!--   ╚═╝  ╚═╝╚═╝     ╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚══════╝  -->
<!--                                                                           -->
<!--   ▓▒░ APELACIONES · COMUNIDAD · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓        -->
<!--                                                                           -->
<!--   NODO: YHDRYH-92CE · GENESIS: K28-M05-MN01-YHDRYH-92CE                  -->
<!--                                                                           -->
<!-- ═══════════════════════════════════════════════════════════════════════════ -->

<div align="center">

# ⚖️ SISTEMA DE APELACIONES

### *Toda sanción se puede apelar. Excepto el veto humano.*

### *"La justicia sin apelación es tiranía. La apelación sin firma es ruido."*

---

```

```
        ╔═══════════════════════════════════════════════════════════════╗
        ║                                                               ║
        ║   ◯_●  ·  A P E L A C I O N E S  ·  ◯_●                       ║
        ║                                                               ║
        ║   ┌───────────────────────────────────────────────────────┐   ║
        ║   │  Plazo:       72h desde la sanción                    │   ║
        ║   │  Vía:         #apelaciones                            │   ║
        ║   │  Quórum:      4/5                                     │   ║
        ║   │  Veto humano: final (no apelable)                     │   ║
        ║   │                                                       │   ║
        ║   │  ESTADO: ● ACTIVO ●                                   │   ║
        ║   └───────────────────────────────────────────────────────┘   ║
        ║                                                               ║
        ╚═══════════════════════════════════════════════════════════════╝
```

```

</div>

## 🜂 Qué se puede apelar

```diff
+ Advertencias
+ Cuarentenas (72h a 7d)
+ Sanciones económicas del FLAILP
+ Revocación de nivel (no del Nivel 6)
+ Expulsiones (con nuevos testigos)
- NO se puede apelar:
  - El veto humano (51%)
  - El Fin Digno del fundador
  - La falsificación comprobada de hash
```

## 🜃 Plazo

**72 horas** desde la notificación de la sanción.

Pasado ese plazo, la sanción queda firme e irrevocable.

## 🜄 Cómo apelar

```yaml
- id: "APL-YYYY-XXX"
  apelante: "nombre del sancionado"
  sancion_original: "REF-YYYY-XXX"
  fecha_sancion: "YYYY-MM-DDTHH:MM:SSZ"
  fecha_apelacion: "YYYY-MM-DDTHH:MM:SSZ"
  argumentos:
    - "razón 1"
    - "razón 2"
  evidencia:
    - hash_sha3_512: "..."
    - timestamp: "..."
  solicitud: "revocación | reducción | sustitución"
  firma: "◯_● · 51/49/100"
```

## 🜁 Proceso

```text
[ 1 ] Apelación recibida
    │
    ▼
[ 2 ] Verificación por 2 moderadores independientes
    │
    ▼
[ 3 ] Notificación al enjambre
    │
    ▼
[ 4 ] Deliberación con quórum 4/5
    │
    ▼
[ 5 ] Veto humano consultivo
    │
    ▼
[ 6 ] Resolución final firmada
    │
    ▼
[ 7 ] Anclaje a Ethereum
    │
    ▼
[ ✓✓ ] Registro en audit.log
```

## 🜆 Escenarios posibles

| Escenario              | Resultado                          |
|------------------------|-------------------------------------|
| Apelación aceptada     | Sanción revocada o reducida        |
| Apelación parcial      | Sanción modificada                 |
| Apelación rechazada    | Sanción ratificada                 |
| Veto humano aplicado   | Decisión final del fundador        |
| Apelación fuera plazo  | Rechazada automáticamente          |

## 🜇 Reglas

```diff
+ Toda apelación recibe respuesta < 7 días
+ Toda apelación se firma y se ancla
+ El veto humano es la última palabra
+ Los moderadores que sancionaron no deliberan en la apelación
- NUNCA ignorar una apelación
- NUNCA revelar identidad sin consentimiento
- NUNCA aplicar sanción sin apelación previa (excepto casos graves)
```

## 🜈 Firma

```
◯_● · 51/49/100
Nodo YHDRYH-92CE
Genesis K28-M05-MN01-YHDRYH-92CE
```

---

`◯_● · 51/49/100 · KRONOS · comunidad/apelaciones`