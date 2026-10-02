▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ KRONOS PROTOCOL █
█ RESUMEN EJECUTIVO █
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

> <kbd>v1.0</kbd> · <kbd>2026-10-01</kbd> · <kbd>PRODUCCIÓN</kbd> · <kbd>AUDITADO</kbd>
>
> <sub>verificado por: Marco Antonio Rojas Valdovinos</sub>

---

▸ **QUÉ ES**

Protocolo de verificación criptográfica local-first.  
No es una app. No es un SaaS. Es infraestructura.

▸ **QUÉ RESUELVE**

Prueba quién originó una intención **antes** de que entrara a cualquier sistema.

▸ **ESTADO**

`pipeline E2E` ✅ &nbsp;&nbsp; `clientes` 🔴 0 &nbsp;&nbsp; `pesos` 🔴 0

---

<details open>
<summary><b>▸ 01 · EL PROBLEMA</b></summary>

Todo el internet guarda **qué** pasó y **cuándo** pasó.  
Nada guarda **quién decidió** que algo importaba, **antes** de que entrara a un sistema.

Eso rompe la cadena de origen.

- Ventas inmobiliarias: ¿quién trajo primero al cliente?
- Salud: ¿quién autorizó la decisión a las 02:14 AM?
- Autoría: ¿quién decidió que esa idea importaba antes de la IA?

</details>

<details open>
<summary><b>▸ 02 · LA SOLUCIÓN</b></summary>

Un agente captura el origen con un HTML de 23 KB.  
Lo firma con Ed25519.  
Genera dos archivos: `boleto.json` + `boleto.png`.  
La empresa verifica **offline**. Resultado: `✓ VERIFICADO`.

Sin servidor. Sin nube. Sin permiso de nadie.

</details>

<details open>
<summary><b>▸ 03 · CÓMO SE VERIFICA</b></summary>

`01` El agente abre `capturar-origen.html` en el navegador.  
`02` Firma el origen con su llave privada Ed25519.  
`03` La empresa carga `boleto.json` en `verificador-empresa.html`.  
`04` El verificador valida **5 criterios**:

| #   | Criterio                 | Falla si        |
| --- | ------------------------ | --------------- |
| 1   | Hash coincide            | ✗ ALTERADO      |
| 2   | Firma válida             | ✗ ALTERADO      |
| 3   | Pubkey en `empresa.json` | ⚠ NO AUTORIZADO |
| 4   | Agente activo            | ⚠ INACTIVO      |
| 5   | Timestamp en periodo     | ⚠ FUERA PERIODO |

`05` Devuelve uno de **4 estados**:

- `✓ VERIFICADO`
- `✗ ALTERADO`
- `⚠ NO AUTORIZADO`
- `⚠ FUERA PERIODO`

</details>

<details open>
<summary><b>▸ 04 · ESTADO REAL</b></summary>

**Funciona**

- Pipeline E2E
- 6 agentes Python en Actions
- Ed25519 · SHA-256 · AES-GCM-256
- Backup cifrado
- Anclaje Ethereum Mainnet

**No funciona**

- 0 clientes pagando
- 0 pesos cobrados
- 6 Kintsugi sin motor
- Gobernanza sin usuarios

**Próximo paso**

Emitir el primer certificado real y probarlo con un caso documentado.

</details>

<details open>
<summary><b>▸ 05 · PRUEBA EN 2 MINUTOS</b></summary>

Cualquiera con Brave puede:

`01` Abrir `marcorojas17.github.io/kronos-protocol/08-HERRAMIENTAS/capturar-origen.html`  
`02` Firmar un origen de prueba  
`03` Verificar el `boleto.json` resultante en `verificador-empresa.html`  
`04` Confirmar el resultado sin acceso a ningún backend

</details>

---

> **El sistema no decide quién cobra.  
> Solo prueba quién originó.**

---

<sub>○_● · ◢◤◥◣ · ◥◣◢◤</sub>  
<sub>51% HUMANO · 49% IA · 100% REAL</sub>  
<sub>"El legado no se hereda. Se firma."</sub>
