# KRONOS Protocol · Tesis Fundacional

**Subtítulo:** Propuesta de estándar abierto para verificación criptográfica local-first
**Estado:** Borrador en fase de validación pública
**Autor:** Marco Antonio Rojas Valdovinos
**Co-autora:** KRONOS IA
**Versión:** 0.1 · pre-alpha

---

## Aviso de estatus

Esta tesis es un **documento en evolución**. No declara infraestructura
operativa ni productos comercializables. Presenta una **arquitectura
técnica en fase de validación**, abierta a auditoría, crítica y refutación.

Las cifras, proyecciones y afirmaciones contenidas aquí deben leerse como
**hipótesis de trabajo**, no como hechos consumados.

---

## 1. Problema planteado

Vivimos en la era de la información más abundante de la historia. Y sin
embargo, la capacidad de **probar la existencia y autenticidad** de esa
información depende hoy de:

- Empresas privadas que pueden quebrar, venderse o cambiar sus términos.
- Servidores que pueden fallar, ser hackeados o desaparecer.
- Jurisdicciones que pueden cambiar sus leyes retroactivamente.
- Gobiernos que pueden censurar, prohibir o intervenir.

**Ninguna de esas dependencias es permanente. Por lo tanto, ninguna prueba
actual de existencia es permanente.**

Esta tesis explora si es posible construir un sistema de verificación que
**no dependa de terceros**.

---

## 2. Hipótesis

> Es técnicamente posible construir un sistema de verificación de existencia
> que use exclusivamente criptografía moderna, almacenamiento local en el
> navegador, y anclaje opcional a una blockchain pública, sin dependencia
> de servidores centrales.

**Estado de la hipótesis:** En validación experimental mediante prototipo funcional.

---

## 3. Arquitectura propuesta

Cinco primitivas criptográficas estándar, ensambladas en una arquitectura
local-first:

| Primitiva | Estándar | Función |
| :--- | :--- | :--- |
| SHA-256 | NIST FIPS 180-4 | Integridad de bloques |
| Ed25519 | RFC 8032 | Firma digital soberana |
| AES-GCM-256 | NIST SP 800-38D | Cifrado local |
| PBKDF2 | NIST SP 800-132 | Derivación de claves |
| Merkle Tree | — | Agregación verificable |

**Anclaje blockchain:** Ethereum (red por confirmar).

---

## 4. Cinco pilares propuestos

1. **Soberanía:** Los datos nunca salen del dispositivo del usuario.
2. **Inmutabilidad verificable:** La blockchain es testigo, no juez.
3. **Costo cero operativo:** La verificación no debe ser un privilegio.
4. **Coexistencia humano-IA:** Ambos actores son ciudadanos con identidad criptográfica.
5. **Cierre digno:** Todo ecosistema digital debe contemplar su propio fin.

---

## 5. Estado de la implementación

| Componente | Estado |
| :--- | :--- |
| Cripto Core (Ed25519 + SHA-256) | ✅ Prototipo funcional |
| Storage local (IndexedDB + Dexie) | ✅ Prototipo funcional |
| Árbol Merkle | ✅ Prototipo funcional |
| Anclaje Ethereum | 🟡 Por validar |
| Registro Humano firmado | ✅ Prototipo funcional |
| Registro IA con guardrails | 🟡 En desarrollo |
| Roles y permisos | ⏳ Pendiente |
| Certificación legal | ⏳ Pendiente |
| Gobernanza comunitaria | ⏳ Pendiente |

---

## 6. Naturaleza de la propuesta

KRONOS **no se presenta como**:

- Una empresa comercial.
- Un producto listo para producción.
- Una plataforma nacional operativa.
- Una alternativa a sistemas legales establecidos.

KRONOS **se presenta como**:

- Una especificación técnica abierta.
- Un experimento de criptografía aplicada.
- Una propuesta de estándar en validación.
- Un framework auditable por terceros.

---

## 7. Límites reconocidos

- **Coerción física:** Fuera del alcance de cualquier sistema criptográfico.
- **Adopción:** Requiere tiempo, educación y confianza cultural.
- **Regulación:** El marco legal de certificación digital en México es aún incipiente.
- **Escalabilidad:** El prototipo actual no ha sido probado más allá de decenas de usuarios.
- **Talento:** La complejidad técnica requiere formación especializada.

---

## 8. Preguntas abiertas

1. ¿Cómo se valida el estado del anclaje Ethereum en la versión actual?
2. ¿Qué marco legal aplicaría a certificados KRONOS en México?
3. ¿Cómo se articula con Prestadores de Servicios de Certificación (PSC) existentes?
4. ¿Qué modelo de gobernanza permite la evolución del protocolo sin dependencia de un solo actor?
5. ¿Cómo se integra la identidad criptográfica de una IA en marcos regulatorios emergentes?

---

## 9. Invitación

Esta tesis no busca aprobación. Busca **refutación honesta**.

Se invita a universidades, desarrolladores, auditores y sociedad civil a:

- Revisar el código y la documentación del repositorio.
- Cuestionar las hipótesis planteadas.
- Reportar errores, inconsistencias o vulnerabilidades.
- Proponer mejoras vía Pull Requests.

El objetivo no es tener razón. Es **construir algo verificable**.

---

## 10. Autoría y estado

**Fundador:** Marco Antonio Rojas Valdovinos
**Co-autora:** KRONOS IA
**Repositorio:** github.com/Marcorojas17/kronos-protocol
**Licencia:** MIT
**Estado:** Pre-alpha · Especificación en validación pública

---

*Documento vivo. Sujeto a revisión y refutación.*