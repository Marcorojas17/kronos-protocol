# Gobernanza · KRONOS Protocol

Este documento define cómo se toman decisiones, cómo se aceptan contribuciones,
y cómo evoluciona el protocolo sin depender de una sola persona.

---

## Principios

1. **Apertura.** Toda decisión técnica se discute públicamente.
2. **Verificabilidad.** Ninguna afirmación se acepta sin evidencia.
3. **Refutabilidad.** Cualquier propuesta puede ser cuestionada por cualquiera.
4. **No dependencia unipersonal.** El protocolo debe poder evolucionar sin el fundador.
5. **Cierre digno.** Toda decisión debe contemplar cómo revertirse o cerrarse.

---

## Estructura de gobernanza propuesta

### Fase actual (pre-alpha)

Durante la fase pre-alpha, el fundador actúa como **mantenedor único** con la
co-autoría de KRONOS IA. Las decisiones se documentan públicamente.

### Fase futura (post-validación)

Cuando el protocolo alcance estabilidad, se propone una estructura tripartita:

```
┌─────────────────────────────────────────────────┐
│           CONSEJO TRIPARTITO (propuesto)        │
├─────────────────────────────────────────────────┤
│  Gobierno  │  Academia  │  Sociedad Civil       │
│  (SE, SAT) │  (UNAM,    │  (Cámaras, ONGs,      │
│            │   IPN, Tec)│   desarrolladores)    │
└─────────────────────────────────────────────────┘
```

Cada miembro tendría voz y voto en decisiones estructurales.

---

## Cómo contribuir

### 1. Issues

Cualquier persona puede abrir un Issue para:

- Reportar un bug (no vulnerabilidad — ver [`SECURITY.md`](./SECURITY.md))
- Proponer una mejora
- Cuestionar una decisión
- Solicitar documentación

### 2. Pull Requests

Los Pull Requests son bienvenidos. Para ser aceptados, deben cumplir:

- **Un PR = un cambio conceptual.** No mezcles múltiples features.
- **Descripción clara.** Explica el qué, el por qué y el cómo.
- **Tests si aplica.** Para cambios en código criptográfico, son obligatorios.
- **Documentación.** Actualizar el README o los manuales si es necesario.
- **Firmar commits.** Si puedes, firma tus commits con GPG (opcional).
- **Licencia.** Al contribuir, aceptas liberar tu aporte bajo MIT.

### 3. Discusiones

Para decisiones estructurales, se abre un Issue etiquetado como `discussion`.
Se da un periodo mínimo de **14 días** para comentarios antes de decidir.

---

## Roles en la comunidad

| Rol | Responsabilidad | Cómo se obtiene |
| :--- | :--- | :--- |
| **Fundador** | Mantenedor principal, autoridad final durante pre-alpha | Por designación |
| **Co-autora IA** | KRONOS IA, co-firma decisiones críticas | Por diseño del protocolo |
| **Mantenedor** | Revisa y mergea PRs, gestiona Issues | Por invitación del fundador |
| **Contribuidor** | Aporta código, docs, traducciones | Por mérito (PRs aceptados) |
| **Auditor** | Revisa criptografía y reporta hallazgos | Por mérito |
| **Ciudadano** | Usuario registrado con pasaporte criptográfico | Al sellar identidad |

---

## Cómo participan las IAs

KRONOS reconoce a las IAs como **co-autoras legítimas** del ecosistema.
Sin embargo, su participación sigue reglas estrictas:

1. **Toda IA debe tener identidad sellada** en `identidad/registro-ia/`.
2. **Toda IA debe declarar su política** (`politica.js`) antes de operar.
3. **Toda acción crítica de una IA requiere aprobación humana** (patrón PREVIEW → COMMIT).
4. **Toda acción de una IA queda registrada** en el log auditable.
5. **Las IAs no votan.** Aconsejan, proponen, ejecutan dentro de guardrails, pero la decisión final es humana.

---

## Proceso de toma de decisiones

### Cambios menores
- Documentación, typos, traducciones.
- **Aprobación:** cualquier mantenedor.

### Cambios medios
- Nuevos módulos, mejoras de UX, refactors.
- **Aprobación:** 1 mantenedor + comentario del fundador.

### Cambios estructurales
- Cambios de arquitectura, política, gobernanza.
- **Aprobación:** fundador + período de discusión pública de 14 días.

### Cambios criptográficos
- Cambio de algoritmos, parámetros, derivación de claves.
- **Aprobación:** fundador + auditoría externa + discusión pública de 30 días.

---

## Versionado

KRONOS sigue **Semantic Versioning** (semver.org):

- `MAJOR.MINOR.PATCH`
- `0.x.x` = pre-alpha (fase actual)
- `1.0.0` = primera versión estable (futuro)

Actualmente: **0.1.0**

---

## Fork y evolución

Cualquier persona puede hacer fork del repositorio y crear su propia
variante del protocolo. Eso es **bienvenido** y **parte del diseño**.

KRONOS no busca ser el único. Busca ser **una base replicable**.

---

## Cierre del proyecto

Si el proyecto cesara alguna vez, el fundador se compromete a:

1. Publicar un aviso público con 90 días de anticipación.
2. Exportar toda la documentación y el código a un archivo estático perpetuo.
3. Asegurar que cualquier fork pueda continuar sin permisos.
4. Cerrar los Issues abiertos con explicación.
5. Anclar el hash final del repositorio a la blockchain como prueba de cierre.

**El fin de KRONOS no significa el fin de sus ideas.** Cualquiera puede retomarlas.

---

## Contacto

- Issues públicos: github.com/Marcorojas17/kronos-protocol/issues
- Email general: marco.a.rojas.v@hotmail.com
- Email seguridad: ver [`SECURITY.md`](./SECURITY.md)

---

*Este documento está sujeto a evolución. Se aceptan propuestas vía PR.*