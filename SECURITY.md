<!-- ═══════════════════════════════════════════════════════════════════════ -->
<!-- KRONOS PROTOCOL · SECURITY · v1.0 · 16 Septiembre 2026               -->
<!-- ═══════════════════════════════════════════════════════════════════════ -->

```text
╔══════════════════════════════════════════════════════════════════════════════╗
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
║ ▓                                                                          ▓ ║
║ ▓   ███████╗███████╗ ██████╗██╗   ██╗██████╗ ██╗████████╗██╗   ██╗       ▓ ║
║ ▓   ██╔════╝██╔════╝██╔════╝██║   ██║██╔══██╗██║╚══██╔══╝╚██╗ ██╔╝       ▓ ║
║ ▓   ███████╗█████╗  ██║     ██║   ██║██████╔╝██║   ██║    ╚████╔╝        ▓ ║
║ ▓   ╚════██║██╔══╝  ██║     ██║   ██║██╔══██╗██║   ██║     ╚██╔╝         ▓ ║
║ ▓   ███████║███████╗╚██████╗╚██████╔╝██║  ██║██║   ██║      ██║          ▓ ║
║ ▓   ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝   ╚═╝      ╚═╝          ▓ ║
║ ▓                                                                          ▓ ║
║ ▓   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ▓ ║
║ ▓   S E C U R I T Y   P O L I C Y                                          ▓ ║
║ ▓   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ▓ ║
║ ▓                                                                          ▓ ║
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

**Política de reporte de vulnerabilidades.**

---

```text
┌─[ 01 ]──────────────────────────── ALCANCE ─┐
│                                              │
└──────────────────────────────────────────────┘
```

Esta política aplica a:

```text
  ▸ Código bajo projects/
  ▸ Especificación bajo protocol/
  ▸ Landings HTML
  ▸ Scripts de verificación
  ▸ Infraestructura de GitHub Pages
```

**Fuera de alcance:**

```text
  ✗ Vulnerabilidades en navegadores o sistemas operativos
  ✗ Vulnerabilidades en GitHub (reportar a GitHub directamente)
  ✗ Vulnerabilidades en servicios de terceros (Safe Creative, Firmaprofesional)
  ✗ Ataques de denegación de servicio
  ✗ Ingeniería social
```

---

```text
┌─[ 02 ]────────────────────── CÓMO REPORTAR ─┐
│                                              │
└──────────────────────────────────────────────┘
```

```text
╭─────────────────────────────────────────────────────────────╮
│                                                             │
│  NO publiques vulnerabilidades en issues públicos.          │
│                                                             │
│  Los issues públicos son indexados por buscadores y         │
│  pueden exponer a otros usuarios antes de que haya          │
│  un fix disponible.                                         │
│                                                             │
╰─────────────────────────────────────────────────────────────╯
```

**Canal de reporte:**

```text
  GitHub Security Advisories:
  github.com/Marcorojas17/kronos-protocol/security/advisories
```

Si el canal no está disponible, contactá directamente a [@Marcorojas17](https://github.com/Marcorojas17) por mensaje privado en GitHub.

---

```text
┌─[ 03 ]──────────────────── QUÉ INCLUIR ─┐
│                                           │
└───────────────────────────────────────────┘
```

Un buen reporte incluye:

```text
  ▸ Descripción del problema
  ▸ Pasos reproducibles para verificar
  ▸ Impacto potencial (qué se puede hacer)
  ▸ Versión afectada o commit hash
  ▸ Si es posible, una propuesta de fix
  ▸ Si querés crédito público, cómo atribuirte
```

---

```text
┌─[ 04 ]─────────────────── QUÉ ESPERAR ─┐
│                                          │
└──────────────────────────────────────────┘
```

| Plazo | Acción |
|:---|:---|
| 72 horas | Confirmación de recepción |
| 7 días | Evaluación preliminar del impacto |
| 30 días | Plan de fix o decisión de no fix |
| 90 días | Divulgación pública coordinada |

Si el reporte es rechazado, se explica por qué.

---

```text
┌─[ 05 ]───────────────────── MODELO DE SEGURIDAD ─┐
│                                                    │
└────────────────────────────────────────────────────┘
```

Este proyecto **no promete** seguridad absoluta. Los límites están declarados en `THREAT_MODEL.md` y en los READMEs de cada proyecto.

**Supuestos de confianza:**

```text
  ▸ SHA-256 resiste colisiones y segundo preimagen
  ▸ Web Crypto API del navegador es honesta
  ▸ GitHub Pages sirve los archivos sin modificación
  ▸ El usuario verifica los hashes por su cuenta
```

**Límites explícitos:**

```text
  ✗ No hay defensa contra coacción física
  ✗ No hay defensa contra compromiso del navegador
  ✗ No hay defensa contra reescritura del repo por el titular
  ✗ No hay defensa contra el olvido del titular
```

**La criptografía prueba integridad y secuencia. No prueba verdad.**

---

```text
┌─[ 06 ]─────────────────── VULNERABILIDADES CONOCIDAS ─┐
│                                                        │
└────────────────────────────────────────────────────────┘
```

Al 16 de septiembre de 2026, no hay vulnerabilidades conocidas sin resolver.

Cuando se resuelva una, se documentará acá con:

```text
  ▸ Fecha de reporte
  ▸ Fecha de fix
  ▸ Versión afectada
  ▸ Versión corregida
  ▸ Crédito al reportante (si lo autoriza)
```

---

```text
┌─[ 07 ]──────────────────────────── BUENAS PRÁCTICAS ─┐
│                                                       │
└───────────────────────────────────────────────────────┘
```

Si usás este código en producción:

```text
  ▸ Verificá el hash SHA-256 de los archivos que descargás
  ▸ Usá HTTPS siempre
  ▸ No confíes en la firma de un folio sin verificar el hash
  ▸ No incluyas claves privadas en archivos del repositorio
  ▸ Reportá cualquier comportamiento inesperado
```

---

```text
╔══════════════════════════════════════════════════════════════════════════════╗
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
║ ▓                                                                          ▓ ║
║ ▓   [ KRONOS PROTOCOL · SECURITY · v1.0 ]                                 ▓ ║
║ ▓                                                                          ▓ ║
║ ▸ Canal privado: GitHub Security Advisories                               ▓ ║
║ ▓   ▸ Respuesta: 72h · Evaluación: 7d · Fix: 30d                          ▓ ║
║ ▸ Divulgación: 90d coordinada                                             ▓ ║
║ ▓                                                                          ▓ ║
║ ▓   root@kronos:~# ./security --status                                    ▓ ║
║ ▓   [████████████████████████████████████████] READY                     ▓ ║
║ ▓   ✓ Canal declarado                                                     ▓ ║
║ ▓   ✓ Plazos definidos                                                    ▓ ║
║ ▓   ✓ Modelo de seguridad documentado                                     ▓ ║
║ ▓                                                                          ▓ ║
║ ▓   root@kronos:~# _                                                       ▓ ║
║ ▓                                                                          ▓ ║
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

<!-- FIN DEL DOCUMENTO · KRONOS PROTOCOL · SECURITY · v1.0 -->