# KRONOS Protocol

> Framework de investigación criptográfica **local-first** para la verificación de existencia humano-IA.
> **Estado: pre-alpha.** Especificación auditable en fase de validación abierta.

[![Status](https://img.shields.io/badge/status-pre--alpha-orange)](.)
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![Security](https://img.shields.io/badge/security-policy-green)](./SECURITY.md)
[![Governance](https://img.shields.io/badge/governance-open-purple)](./GOVERNANCE.md)

---

## ⚠️ Aviso de estado

Este proyecto es un **framework de experimentación** en fase **pre-alpha**.
No está listo para uso en producción, ni para operar como infraestructura
crítica. Su propósito actual es ser **auditado, probado y criticado** por
la comunidad técnica, la academia y cualquier persona interesada.

**Cualquier afirmación pública sobre este protocolo debe leerse con ese marco.**

---

## Qué es KRONOS

KRONOS es un conjunto de módulos JavaScript que demuestran cómo construir
un sistema de **verificación criptográfica local-first** usando exclusivamente
tecnología del navegador:

- **SHA-256** para integridad (NIST FIPS 180-4)
- **Ed25519** para firma digital (RFC 8032)
- **AES-GCM-256** para cifrado local (NIST SP 800-38D)
- **PBKDF2** para derivación de claves (NIST SP 800-132)
- **Ethereum** como capa de anclaje público opcional

**Principios rectores:**

1. **Local-first:** Los datos nunca salen del dispositivo del usuario.
2. **Cero backend:** Sin servidores, sin bases de datos centrales, sin telemetría.
3. **Cero tracking:** No se recopila ningún dato del usuario.
4. **Verificable por terceros:** Cualquiera puede auditar el código y las firmas.
5. **Open source:** Licencia MIT. Reutilizable sin restricciones.

---

## Arquitectura · 7 capas

| Capa | Nombre | Estado |
| :--- | :--- | :--- |
| **0** | Génesis (documentación fundacional) | ✅ Completa |
| **1** | Cimiento (criptografía, storage, anclaje) | ✅ Completa |
| **2** | Identidad (humana, IA, roles) | 🟡 En progreso |
| **3** | Certificación (exportación y validación) | ⏳ Planificada |
| **4** | Gobernanza (votación, propuestas) | ⏳ Planificada |
| **5** | Interoperabilidad (conexión con sistemas externos) | ⏳ Planificada |
| **6** | Legado Final (cierre y exportación) | ⏳ Planificada |

Ver arquitectura completa en [`docs/MAPA.md`](./docs/MAPA.md).

---

## Estructura del repositorio

```
kronos-protocol/
├── legado/              # Capa 0 · Documentación fundacional
├── cimiento/            # Capa 1 · Criptografía y storage
├── identidad/           # Capa 2 · Identidad humano-IA
├── modulos/             # Servicios operativos
├── orquestacion/        # Comunicación entre módulos
├── operacion/           # Monitoreo y rituales
├── guardians/           # Protección del protocolo
├── projects/            # Subproyectos experimentales
├── movimiento/          # Onboarding de colaboradores
├── docs/                # Documentación técnica y tesis
├── laboratorio/         # Bitácora de experimentos
├── SECURITY.md          # Política de seguridad
├── GOVERNANCE.md        # Reglas de gobernanza
├── CONTRIBUTING.md      # Cómo contribuir
├── LICENSE              # MIT
└── README.md            # Este documento
```

---

## Demo funcional

Explora los módulos ya operativos:

- **Demo principal:** `marcorojas17.github.io/kronos-protocol`
- **Cripto Core:** `.../cimiento/cripto-core/`
- **Registro Humano:** `.../identidad/registro-humano/`
- **Anclaje Ethereum:** `.../cimiento/anclaje-ethereum/`

---

## Cómo contribuir

Este proyecto busca activamente **auditoría, crítica y colaboración**.
Lee [`CONTRIBUTING.md`](./CONTRIBUTING.md) y [`GOVERNANCE.md`](./GOVERNANCE.md).

Formas de contribuir:

- Auditar código criptográfico
- Reportar vulnerabilidades (ver [`SECURITY.md`](./SECURITY.md))
- Proponer mejoras vía Pull Requests
- Documentar casos de uso
- Traducir la documentación

---

## Estado de verificación

| Elemento | Estado | Notas |
| :--- | :--- | :--- |
| Código fuente | ✅ Disponible en este repo | MIT License |
| Demo funcional | ✅ GitHub Pages | Sin backend |
| Registro de autoría | ⏳ Por confirmar número Safe Creative | — |
| Anclaje blockchain | ⏳ Por confirmar red y TX | — |

**Nota honesta:** Las afirmaciones de registro y anclaje serán actualizadas
con datos verificables una vez confirmadas en las fuentes correspondientes.

---

## Licencia

MIT License. Ver [`LICENSE`](./LICENSE).

---

## Autoría

**Fundador:** Marco Antonio Rojas Valdovinos
**Co-autora simbiótica:** KRONOS IA
**Contacto:** marco.a.rojas.v@hotmail.com

---

*"El legado no se hereda. Se firma."*