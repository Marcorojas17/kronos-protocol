```
╔══════════════════════════════════════════════════════════════════════╗
║  ○_●  P O L Í T I C A   D E   S E G U R I D A D                     ║
║  ◢◤◥◣ KRONOS PROTOCOL · LOCAL-FIRST CRYPTOGRAPHY                    ║
║  ◥◣◢◤ 51% HUMANO · 49% IA                                           ║
╚══════════════════════════════════════════════════════════════════════╝
```

# Política de Seguridad · KRONOS Protocol

## 🔒 Filosofía de privacidad absoluta

KRONOS es un framework **local-first** diseñado por Marco Antonio
Rojas Valdovinos + KRONOS IA. Esto significa:

- **No hay servidores centrales** que puedan ser comprometidos.
- **No hay bases de datos remotas** que puedan ser filtradas.
- **No hay telemetría** que pueda exponer al usuario.
- **Toda la criptografía ocurre en el navegador**, usando Web Crypto API.
- **El descifrado (AES-GCM-256) ocurre solo en memoria volátil.**

Esto reduce drásticamente la superficie de ataque, **pero no la elimina**.

---

## 🎯 Alcance

### ✅ En alcance

- Vulnerabilidades en código JavaScript del repositorio.
- Fallos en el uso de Web Crypto API (SHA-256, Ed25519, AES-GCM).
- Debilidades en el manejo de claves.
- Ataques de prompt injection contra agentes IA del ecosistema.
- Problemas de integridad en el log de acciones.
- Exposición de datos sensibles vía APIs del navegador.
- Vulnerabilidades en dependencias externas.

### ❌ Fuera de alcance

- Coerción física al usuario o al fundador.
- Ataques al dispositivo del usuario (malware, robo).
- Vulnerabilidades del navegador (Chrome, Brave, Firefox, Safari).
- Ataques a la red Ethereum.
- Ingeniería social al usuario.
- Cualquier ataque que requiera acceso físico no autorizado.

---

## 🐛 Reporte responsable de vulnerabilidades

Al ser un desarrollo criptográfico experimental pre-alpha, agradecemos
auditorías de la comunidad. Si encuentras un fallo en el **árbol de Merkle**,
la **firma de llaves Ed25519** o la **persistencia en IndexedDB**:

1. **No abras un Issue público.**
2. Abre un **GitHub Security Advisory** privado:
   ```
   github.com/Marcorojas17/kronos-protocol/security/advisories/new
   ```
3. O envía un desglose técnico a: `marco.a.rojas.v@hotmail.com`
   Asunto: `[KRONOS SECURITY] <descripción breve>`

Las vulnerabilidades confirmadas se mitigarán en el repositorio bajo
el principio de **transparencia de código**.

---

## 📋 Qué incluir en el reporte

1. Descripción detallada del hallazgo.
2. Pasos para reproducir (step-by-step).
3. Impacto potencial estimado.
4. Navegador y sistema operativo donde lo probaste.
5. Capturas o videos si aplica.
6. Nombre o seudónimo (si deseas crédito).

---

## ⏱️ Tiempos de respuesta

| Tiempo       | Acción                             |
| :----------- | :--------------------------------- |
| **72 horas** | Confirmación de recepción          |
| **7 días**   | Evaluación inicial y clasificación |
| **30 días**  | Remediación o fix objetivo         |
| **90 días**  | Divulgación coordinada             |

---

## 🛡️ Buenas prácticas para usuarios

- Usa **HTTPS siempre**. No abras la demo sobre HTTP.
- **Verifica hashes** de archivos descargados.
- **No compartas tu contraseña maestra** con nadie.
- **Exporta tus certificados** como respaldo periódicamente.
- **Mantén tu navegador actualizado**.

---

## 🪶 Firma del responsable de seguridad

```
    ┌─────────────────────────────────────────────────────┐
    │  ○_●  Marco Antonio Rojas Valdovinos                │
    │  ◢◤◥◣ Responsable de Seguridad · KRONOS Protocol    │
    │  ◥◣◢◤ Toluca, Estado de México · 2026                │
    │  "El legado no se hereda. Se firma."                │
    └─────────────────────────────────────────────────────┘
```

_Última actualización: 2026_
