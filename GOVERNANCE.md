<!-- ═══════════════════════════════════════════════════════════════════════ -->
<!-- KRONOS PROTOCOL · CONTRIBUTING · v1.0 · 16 Septiembre 2026           -->
<!-- ═══════════════════════════════════════════════════════════════════════ -->

```text
╔══════════════════════════════════════════════════════════════════════════════╗
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
║ ▓                                                                          ▓ ║
║ ▓   ██████╗ ██████╗ ███╗   ██╗████████╗██████╗ ██╗██████╗                ▓ ║
║ ▓  ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██║██╔══██╗               ▓ ║
║ ▓  ██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝██║██████╔╝               ▓ ║
║ ▓  ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██║██╔══██╗               ▓ ║
║ ▓  ╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║██║██║  ██║               ▓ ║
║ ▓   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝               ▓ ║
║ ▓                                                                          ▓ ║
║ ▓   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ▓ ║
║ ▓   C O N T R I B U T I N G                                                ▓ ║
║ ▓   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ▓ ║
║ ▓                                                                          ▓ ║
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

**Cómo contribuir al proyecto. Qué aceptamos, qué no, y por qué.**

---

```text
┌─[ 01 ]────────────────────────────────────── ESTADO ─┐
│                                                       │
└───────────────────────────────────────────────────────┘
```

```text
╭─────────────────────────────────────────────────────────────╮
│                                                             │
│  ESTADO ACTUAL: NO ACEPTAMOS CONTRIBUCIONES EXTERNAS.       │
│                                                             │
│  El proyecto no tiene equipo de revisión asignado,          │
│  no tiene canal de moderación formalizado, y no hay         │
│  capacidad operativa para gestionar Pull Requests           │
│  externos en este momento.                                  │
│                                                             │
│  Esto cambia cuando haya tracción real. Ver §5.             │
│                                                             │
╰─────────────────────────────────────────────────────────────╯
```

**Lo que sí podés hacer aunque no aceptemos PRs:**

```text
  ▸ Abrir un issue con un bug reproducible
  ▸ Abrir un issue con una sugerencia bien argumentada
  ▸ Usar el código bajo los términos de LICENSE
  ▸ Forkear el repositorio y adaptarlo a tu caso
```

---

```text
┌─[ 02 ]───────────────────────────── QUÉ BUSCAMOS ─┐
│                                                    │
└────────────────────────────────────────────────────┘
```

| Prioridad | Área | Ejemplo |
|:---:|:---|:---|
| 🔴 Alta | Correctitud criptográfica | Bug en SHA-256, JWS o PAdES |
| 🔴 Alta | Seguridad | Reportar vulnerabilidad (ver `SECURITY.md`) |
| 🟠 Media | Portabilidad | Que el código corra en más navegadores |
| 🟠 Media | Accesibilidad | WCAG, lectores de pantalla, contraste |
| 🟡 Baja | Documentación | Corregir errata, mejorar explicaciones |
| 🟡 Baja | Traducciones | Inglés, portugués, náhuatl, hebreo |
| ⚪ No prioritario | Nuevas features | Antes de aceptar, discutir en issue |

---

```text
┌─[ 03 ]─────────────────────────── QUÉ NO ACEPTAMOS ─┐
│                                                      │
└──────────────────────────────────────────────────────┘
```

```text
  ✗  Cambios que rompan la separación real / narrativa
  ✗  Claims sin fuente verificable
  ✗  Promesas de perpetuidad o invulnerabilidad
  ✗  Dependencias externas sin justificación
  ✗  Marcas o nombres que sugieran afiliación
  ✗  Traducciones automáticas sin revisión humana
  ✗  Refactorizaciones grandes sin issue previo
```

---

```text
┌─[ 04 ]─────────────────── PROCESO (CUANDO ABRAMOS) ─┐
│                                                      │
└──────────────────────────────────────────────────────┘
```

```text
  1 · Abrí un issue describiendo el problema o la mejora
  2 · Esperá feedback antes de escribir código
  3 · Si el issue es aprobado, hacé fork y crea una rama
  4 · Firmá tus commits con GPG cuando sea posible
  5 · Abrí un Pull Request describiendo el cambio
  6 · El PR se revisa contra los 5 principios de GOVERNANCE.md
  7 · Si pasa, se mergea. Si no, se discute en el mismo PR
```

**Reglas para PRs aceptados:**

```text
  ▸ Un PR = un cambio lógico. No mezclar temas
  ▸ Sin datos personales de terceros
  ▸ Sin certificados privados ni claves
  ▸ Sin evidencia real en ejemplos (solo datos sintéticos)
```

---

```text
┌─[ 05 ]────────────────────── CUÁNDO ABRIMOS ─┐
│                                               │
└───────────────────────────────────────────────┘
```

Abrimos el canal de contribuciones cuando ocurra **al menos una**:

```text
  ▸ El proyecto tenga un mantenedor activo además del titular
  ▸ Haya una comunidad que reporte bugs con regularidad
  ▸ Exista un caso de uso real en producción que lo requiera
  ▸ Se cree una entidad legal que lo respalde
```

Hasta entonces, el repositorio se mantiene en modo **unipersonal**.

---

```text
┌─[ 06 ]───────────────────────── CÓMO REPORTAR ─┐
│                                                 │
└─────────────────────────────────────────────────┘
```

```text
  Bugs y sugerencias ..... github.com/Marcorojas17/kronos-protocol/issues
  Vulnerabilidades ....... ver SECURITY.md (canal privado)
  Contacto directo ....... @Marcorojas17
```

---

```text
┌─[ 07 ]─────────────────────────── LICENCIA ─┐
│                                              │
└──────────────────────────────────────────────┘
```

Todo lo que contribuyas queda bajo la licencia del repositorio:

```text
  Código .......... MIT
  Documentación ... CC BY-NC-SA 4.0
```

Ver `LICENSE` para el detalle completo.

---

```text
╔══════════════════════════════════════════════════════════════════════════════╗
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
║ ▓                                                                          ▓ ║
║ ▓   [ KRONOS PROTOCOL · CONTRIBUTING · v1.0 ]                             ▓ ║
║ ▓                                                                          ▓ ║
║ ▓   ▸ Estado: no aceptamos PRs externos por ahora                         ▓ ║
║ ▸ Issues: sí                                                              ▓ ║
║ ▓   ▸ Forks: sí, bajo LICENSE                                             ▓ ║
║ ▸ Seguridad: por canal privado                                            ▓ ║
║ ▓                                                                          ▓ ║
║ ▓   root@kronos:~# ./contributing --status                                 ▓ ║
║ ▓   [████████████████████████████████████████] READY                     ▓ ║
║ ▓   ✓ Estado declarado                                                    ▓ ║
║ ▓   ✓ Qué sí, qué no                                                      ▓ ║
║ ▓   ✓ Ruta de apertura                                                    ▓ ║
║ ▓                                                                          ▓ ║
║ ▓   root@kronos:~# _                                                       ▓ ║
║ ▓                                                                          ▓ ║
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

<!-- FIN DEL DOCUMENTO · KRONOS PROTOCOL · CONTRIBUTING · v1.0 -->