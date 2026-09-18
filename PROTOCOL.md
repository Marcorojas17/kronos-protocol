# KRONOS PROTOCOL · Los 6 Principios Ejecutables

> Los 6 principios del manifiesto Kronos, traducidos a reglas
> que un sistema puede ejecutar, verificar y defender.

**Autor:** Marco Antonio Rojas Valdovinos
**Año:** 2026
**Horizonte:** 2099
**Registro base:** Safe Creative 2607086319439

---

## Principio 1 · Integridad

**Declaración:** Ninguna parte del legado puede ser modificada
sin romper la cadena de custodia criptográfica.

**Ejecución:**
Cada decisión registrada se hashea con SHA-256.
El hash incluye el hash de la decisión anterior.
Modificar una decisión vieja invalida todas las posteriores.

**Acción del guardián:** `verificar_integridad`
**Verificación pública:** recalcular la cadena completa.

---

## Principio 2 · Trazabilidad

**Declaración:** Toda interacción, réplica o cita debe quedar
registrada con fecha, origen y propósito.

**Ejecución:**
Cada entrada del log lleva 3 campos obligatorios:
- `cuando` — timestamp ISO 8601 con milisegundos
- `origen` — quién o qué generó la decisión
- `proposito` — para qué se registró

Si falta uno de los tres, la entrada se rechaza antes de entrar.

**Acción del guardián:** `registrar_trazabilidad`
**Verificación pública:** cada entrada tiene los 3 campos no vacíos.

---

## Principio 3 · No Comercialización

**Declaración:** El legado no puede ser explotado con fines
de lucro por terceros sin autorización expresa.

**Ejecución:**
El guardián no ejecuta acciones comerciales.
Si detecta una operación con fines de lucro no autorizada,
la marca como bloqueada en el log público.

**Acción del guardián:** `bloquear_comercial`
**Verificación pública:** ninguna entrada tiene campo `comercial: true`.

---

## Principio 4 · No Entrenamiento de IA

**Declaración:** Ningún modelo de inteligencia artificial podrá
usar este contenido para entrenamiento, fine-tuning o
generación derivada.

**Ejecución:**
El log se marca con `X-Robots-Tag: noai, noindex, noarchive, noimageai`.
La licencia en el repo incluye cláusula NOAI explícita.
Cada entrada del log lleva el campo `noai: true`.

**Acción del guardián:** `bloquear_entrenamiento_ia`
**Verificación pública:** cabecera HTTP del endpoint del log.

---

## Principio 5 · Citación Obligatoria

**Declaración:** Todo uso parcial debe incluir atribución
completa: "Marco Antonio Rojas Valdovinos — KRONOS 2026".

**Ejecución:**
Cada entrada del log lleva firma del autor.
El hash final incluye el nombre completo y el año.
Extraer una entrada sin la firma invalida su hash.

**Acción del guardián:** `marcar_citacion`
**Verificación pública:** campo `autor` en cada entrada.

---

## Principio 6 · Defensa Activa

**Declaración:** El sistema debe poder emitir alertas y acciones
legales automáticas ante violaciones detectadas.

**Ejecución:**
El verificador público recalcula la cadena completa.
Si encuentra una inconsistencia, emite alerta pública.
La alerta queda registrada en el log con su propio hash.

**Acción del guardián:** `alertar_violacion`
**Verificación pública:** endpoint `/verify` devuelve `integro: true/false`.

---

## Cómo se ejecutan los 6 principios

El guardián recibe una entrada. La clasifica.
Aplica la regla del principio correspondiente.
Registra la decisión en el log encadenado.

**6 principios = 6 acciones = 6 entradas posibles por ciclo.**

Un ciclo completo del guardián toca los 6 principios al menos
una vez. Eso es lo que distingue una política escrita de una
política ejecutada.

---

## Estado actual

| Principio | Acción | Estado |
|---|---|---|
| 1 Integridad              | verificar_integridad        | ✅ implementado |
| 2 Trazabilidad            | registrar_trazabilidad      | ✅ implementado |
| 3 No Comercialización     | bloquear_comercial          | ✅ implementado |
| 4 No Entrenamiento IA     | bloquear_entrenamiento_ia   | ✅ implementado |
| 5 Citación Obligatoria    | marcar_citacion             | ✅ implementado |
| 6 Defensa Activa          | alertar_violacion           | ✅ implementado |

---

© 2026 Marco Antonio Rojas Valdovinos
Licencia CC BY-NC-ND 4.0 + cláusula NOAI