<!--
╔══════════════════════════════════════════════════════════════════════════╗
║  ▓▒░ LLAVE QUEMADA · EVIDENCIA · ARKHÉ ZERO ░▒▓                          ║
║  [ COMPROMISO ]  [ ROTACIÓN ]  [ ATESTACIÓN PÚBLICA ]                    ║
╚══════════════════════════════════════════════════════════════════════════╝
-->

# 🔥 Evidencia de Llave Quemada

## 🜂 Propósito

Registrar públicamente cuándo una clave privada fue **comprometida,
rotada o dada de baja**. Este documento garantiza transparencia y
permite que terceros **rechacen firmas con claves obsoletas**.

## 🜃 Registro Actual

```bash
┌─(kali㉿arkhe-zero)-[~/04_SEGURIDAD]
└─$ cat LLAVE_QUEMADA_EVIDENCIA.md | grep -c "comprometida"
0
```

**Estado:** ✅ **Ninguna clave comprometida hasta la fecha.**

## 🜄 Formato de Entrada

Cuando se queme una llave, se añade aquí:

```yaml
- id: "burn-2026-XX-XX-NNN"
  fecha: "YYYY-MM-DDTHH:MM:SSZ"
  clave: "ml-dsa-87-key-1"
  algoritmo: "ML-DSA-87"
  motivo: "compromiso | rotación programada | upgrade algoritmo"
  accion: "revocada | rotada | reemplazada"
  hash_clave_publica: "sha3-512:..."
  reemplazada_por: "ml-dsa-87-key-2"
  atestacion_tsa: "Firmaprofesional QTSA"
  anclaje_ethereum: "0x..."
```

## 🜁 Protocolo de Quema

```diff
+ 1. Detectar compromiso (automatico o manual)
+ 2. Activar HALT si es crítico
+ 3. Notificar al firmante humano (51%)
+ 4. Generar nueva clave en HSM
+ 5. Re-firmar todos los documentos afectados
+ 6. Registrar aquí el evento
+ 7. Anclar acta de quema a Ethereum
- NUNCA reutilizar clave comprometida
- NUNCA ocultar una quema
- NUNCA borrar del registro histórico
```

## 🜆 Historial

```text
Sin eventos registrados.
◯_● · 51/49/100 · KRONOS
```

---

`◯_● · 51/49/100 · KRONOS · llave-quemada`