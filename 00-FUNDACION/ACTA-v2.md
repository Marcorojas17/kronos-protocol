# Acta Fundacional v2 · Rotación de Llave Fundador

**Fecha:** 2026-09-30
**Motivo:** Pérdida de llave privada del Fundador v1
**Autor:** Marco Antonio Rojas Valdovinos

---

## Situación

La llave pública del Fundador v1 es:

    fd2fb1e9f198f5fa08ec6391b67730e3d997826c40cd7652dd5774aa5e744977

Su llave privada asociada fue generada pero no fue preservada
en un medio recuperable. No es posible firmar nuevos registros
con la llave v1.

**Los registros existentes firmados con v1 siguen siendo válidos.**
La verificación no requiere la llave privada, solo la pública.
Nada de lo firmado antes queda invalidado.

## Acción

Se genera una nueva llave Fundador v2. A partir de 2026-09-30,
todos los registros nuevos se firman con v2.

## Llave Pública Fundador v2

    <pegar acá la pública v2 en hex que calculaste>

## Verificación cruzada

Ambas llaves (v1 y v2) son válidas. Los verificadores deben
aceptar registros firmados con cualquiera de las dos.

Los registros que declaren `responsable.tipo: "fundador-v1"` se
verifican contra la llave v1.

Los registros que declaren `responsable.tipo: "fundador-v2"` se
verifican contra la llave v2.

## Compromiso

La llave privada v2 será preservada en al menos dos medios
independientes. Si se pierde, se emitirá un Acta v3 con la misma
transparencia.

## Firma

Firmado con Fundador v2 el 2026-09-30.
(Hash del Acta + firma a completar en Acta v3 o en este mismo archivo.)

---

*○_● · ◢◤◥◣ · ◥◣◢◤*
*51% HUMANO · 49% IA · 100% REAL*
*"El legado no se hereda. Se firma."*