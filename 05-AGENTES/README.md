# Agentes Kintsugi · v2.0

Agentes deterministas del protocolo KRONOS. **Sin IA, sin LLM, sin
dependencias externas.** Corren en cualquier Python 3.9+.

Aplican doctrina **v12 CIMIENTOS** en la parte técnica.

---

## Inventario con clasificación real

| Plaza | Nombre | Estado | Rol | ¿Útil hoy? |
|---|---|---|---|---|
| 090 | arquitecto | 🟡 MVP | 🚪 ENTRADA | ✅ Sí |
| 091 | contralor | 🔴 MAQUETA | 🚪 ENTRADA | ❌ Falta Mesa |
| 092 | auditor-externo | 🟡 MVP | 🔔 ALERTA | ✅ Sí |
| 093 | relator | 🔴 MAQUETA | ⚙️ PROCESO | ❌ Falta comparación |
| 094 | bibliotecario | 🟡 MVP | 🚪 ENTRADA | ✅ Sí |
| 095 | cartografo | 🟡 MVP | 📤 SALIDA | ✅ Sí |

**3 MVP reales. 3 maquetas.** No es fracaso. Es honestidad.

---

## Clasificación de estado

| Icono | Nivel | Significado |
|---|---|---|
| 🔴 | MAQUETA | Corre pero no aporta valor todavía |
| 🟠 | PROTOTIPO | Funciona parcialmente |
| 🟡 | MVP | Funciona end-to-end en 1 caso |
| 🟢 | PRODUCTO | Probado, documentado |
| ✅ | PRODUCCIÓN | Verificado en múltiples entornos |

---

## Rol en el pipeline

| Icono | Rol | Función |
|---|---|---|
| 🚪 | ENTRADA | Detecta estado actual |
| ⚙️ | PROCESO | Transforma o analiza |
| 📤 | SALIDA | Genera artefacto |
| 🔔 | ALERTA | Notifica si algo está mal |

---

## Cómo correr

```sh
cd ~/kronos-protocol
python3 05-AGENTES/090-arquitecto/arquitecto.py
python3 05-AGENTES/094-bibliotecario/bibliotecario.py
python3 05-AGENTES/095-cartografo/cartografo.py