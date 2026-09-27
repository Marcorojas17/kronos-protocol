# Política de Seguridad · KRONOS Protocol

## Modelo de seguridad

KRONOS es un framework **local-first**. Esto significa:

- **No hay servidores centrales** que puedan ser comprometidos.
- **No hay bases de datos remotas** que puedan ser filtradas.
- **No hay telemetría** que pueda exponer al usuario.
- **Toda la criptografía ocurre en el navegador** del usuario, usando Web Crypto API.

Esto reduce drásticamente la superficie de ataque, pero **no la elimina**.

---

## Alcance

### En alcance

- Vulnerabilidades en código JavaScript del repositorio.
- Fallos en el uso de Web Crypto API (SHA-256, Ed25519, AES-GCM).
- Debilidades en el manejo de claves (almacenamiento, derivación, exposición).
- Ataques de prompt injection contra agentes IA del ecosistema.
- Problemas de integridad en el log de acciones.
- Exposición de datos sensibles a través de APIs del navegador.
- Vulnerabilidades en dependencias externas (Dexie, ethers.js, fuentes, CDNs).

### Fuera de alcance

- Coerción física al usuario o al fundador.
- Ataques al dispositivo del usuario (malware, robo físico).
- Vulnerabilidades del navegador (Chrome, Brave, Firefox, Safari).
- Ataques a la red Ethereum (fuera de nuestro control).
- Ingeniería social al usuario.
- Cualquier ataque que requiera acceso físico no autorizado.

---

## Cómo reportar una vulnerabilidad

**Canal exclusivo y privado:**

Por favor, abre un **GitHub Security Advisory** en:

```
github.com/Marcorojas17/kronos-protocol/security/advisories/new
```

**NO abras un Issue público** para reportar vulnerabilidades. Un Issue público
expone el problema antes de que pueda ser corregido.

**NO publiques en redes sociales** ni en foros públicos.

---

## Qué incluir en el reporte

Para que podamos evaluar y responder rápidamente, incluye:

1. **Descripción detallada** del hallazgo.
2. **Pasos para reproducir** (step-by-step).
3. **Impacto potencial estimado** (qué se compromete, en qué condiciones).
4. **Versión del navegador y sistema operativo** donde lo probaste.
5. **Capturas o videos** si aplica.
6. **Tu nombre o seudónimo** (si quieres ser acreditado).

---

## Tiempos de respuesta

| Tiempo | Acción |
| :--- | :--- |
| **72 horas** | Confirmación de recepción del reporte |
| **7 días** | Evaluación inicial y clasificación (crítico, medio, bajo) |
| **30 días** | Remediación o fix objetivo |
| **90 días** | Divulgación coordinada (coordinated disclosure) |

Si el reporte es válido y significativo, te acreditaremos en el CHANGELOG
del repositorio (si así lo deseas).

---

## Historial de vulnerabilidades conocidas

**Al día de esta versión:** Ninguna vulnerabilidad activa conocida.

Esta sección se actualizará a medida que se reporten y resuelvan hallazgos.

---

## Buenas prácticas para usuarios

- **Usa HTTPS siempre.** No abras la demo sobre HTTP.
- **Verifica los hashes** de los archivos que descargues.
- **No compartas tu contraseña maestra** con nadie, ni con KRONOS IA.
- **Exporta tus certificados** como respaldo periódicamente.
- **Mantén tu navegador actualizado** para tener Web Crypto API moderna.

---

## Contacto

Para temas de seguridad **no críticos** o consultas generales:

- Email: marco.a.rojas.v@hotmail.com
- Asunto: `[KRONOS SECURITY] <descripción breve>`

---

## Reconocimiento

Agradecemos a toda persona que dedique tiempo a auditar este proyecto.
La seguridad de un protocolo abierto es responsabilidad de la comunidad
que lo construye y lo cuestiona.

---

*Última actualización: 2026*