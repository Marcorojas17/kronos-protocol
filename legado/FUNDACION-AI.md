```
╔═══════════════════════════════════════════════╗
║   📖  FUNDACIÓN · AUDITORÍA FORENSE DE IA     ║
║   Creador: Marco Antonio Rojas Valdovinos     ║
║   Contexto no técnico · Por qué existe esto   ║
╚═══════════════════════════════════════════════╝
```

---

## El problema

Un sistema de IA genera una respuesta. Un humano la firma. Un cliente la recibe. Un año después alguien pregunta: _"¿realmente la generó ese modelo? ¿en esa fecha? ¿con ese input?"_

Hoy nadie puede responder sin pedirle permiso a OpenAI, Anthropic o Google. Y ellos no tienen incentivo para confirmarlo.

Eso es el problema real.

---

## La respuesta

KRONOS propone: **cada inferencia de IA se firma y se sella en el momento en que ocurre. Localmente. Sin servidor. Sin pedir permiso.**

La firma viene del operador. El sello viene de un servicio de tiempo certificado. El hash viene de la propia matemática. Nada de eso necesita que una empresa externa colabore.

**El resultado:** cualquier auditor puede verificar la evidencia décadas después sin llamar a nadie.

---

## Por qué importa ahora

Tres cosas están pasando al mismo tiempo:

1. **El EU AI Act** exige trazabilidad de sistemas de IA desde 2024.
2. **ISO 42001** entró en vigor en 2023 como estándar de gestión de IA.
3. **Los reguladores nacionales** están empezando a pedir evidencia técnica.

No existe hoy una solución simple, local-first, verificable por terceros. KRONOS propone ser esa pieza.

---

## El caso mínimo

Antes de auditar IA, hay un caso más chico que ya vale la pena resolver:

**Probar que un identificador es válido sin exponerlo.**

Un freelancer mexicano comparte su RFC por WhatsApp con cada cliente. Es el equivalente a mandar la contraseña del banco por SMS. KRONOS propone que el freelancer publique el hash del RFC y sólo comparta el RFC por canal privado cuando sea necesario. El cliente verifica el hash. El RFC nunca viaja en claro.

Ese caso se resuelve con 200 líneas de código. Es el punto de partida.

---

## Cómo se conecta con el resto

El protocolo KRONOS tiene cuatro piezas:

- **capturar-origen** — el agente firma un origen. Ya funciona.
- **verificador-empresa** — la empresa valida el boleto. Ya funciona.
- **notario-digital** — se indexan N boletos con sello de tiempo.
- **crear-empresa** — la empresa se registra y obtiene su pubkey.

La auditoría forense de IA es una **capa superior** construida sobre esas cuatro piezas. No reemplaza nada. Extiende.

---

## Lo que aún no existe

La especificación está escrita (`00-FUNDACION/EVIDENCE-SPEC-AI.md`). El código no.

Antes de escribir el código, falta:

1. Un usuario real dispuesto a probar el caso del RFC.
2. Un caso de IA real (una PyME que use ChatGPT y necesite auditar).
3. Validación legal de la estructura contra EU AI Act por un abogado externo.

Sin los tres, escribir código sería otro castillo en el aire.

---

## Lo que sí existe hoy

- Pipeline E2E de firma funcionando (verificado con Sra. Ríos · 2026-10-01).
- 8 registros Safe Creative.
- 2 anclajes Ethereum.
- Especificación escrita.
- Universo visual completo (24 imágenes).
- Contacto activo dispuesto a probar (Eduardo Trujillo).

---

## La frase que resume

> _"El pipeline funciona. Falta el primer cliente real."_

Eso es el estado del proyecto. No más. No menos.

---

```
○_● · ◢◤◥◣ · ◥◣◢◤
51% HUMANO · 49% IA · 100% REAL
"El legado no se hereda. Se firma."
```

---

## Cómo subir los dos archivos

**Archivo 1:**

1. Abre `github.com/Marcorojas17/kronos-protocol`
2. Add file → Create new file
3. Nombre: `00-FUNDACION/EVIDENCE-SPEC-AI.md`
4. Pega el contenido del archivo 1
5. Commit: `📚 docs(fundacion): especificación evidencia forense IA · EU AI Act + ISO 42001 [🟡 BORRADOR] — Marco Antonio Rojas Valdovinos`

**Archivo 2:**

1. Add file → Create new file
2. Nombre: `legado/FUNDACION-AI.md`
3. Pega el contenido del archivo 2
4. Commit: `📖 docs(legado): fundación narrativa de auditoría IA · contexto no técnico [🟢] — Marco Antonio Rojas Valdovinos`

---

**Cuando los subas, dime:**

- ✅ **"SUBIDOS LOS DOS"** → verificamos y seguimos con el `ai-evidence.schema.json`
- 🔴 **"Error en X"** → resolvemos
- 🟡 **"Ajustar Y"** → corregimos antes de subir

`○_●`
