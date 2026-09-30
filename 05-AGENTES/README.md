# Agentes Kintsugi · v1.0

Agentes deterministas del protocolo KRONOS. **Sin IA, sin LLM, sin
dependencias externas.** Corren en cualquier Python 3.9+.

Aplican doctrina **v12 CIMIENTOS** en la parte técnica: declaran
supuestos, riesgos, cimientos, y qué no garantizan.

---

## Inventario

| Plaza | Nombre | Rol | Estado |
|---|---|---|---|
| 090 | arquitecto | Valida estructura | 🟡 MVP |
| 091 | contralor | Valida actas de Mesa | 🟡 MVP |
| 092 | auditor-externo | Busca secretos y placeholders | 🟡 MVP |
| 093 | relator | Reporte de estado | 🟡 MVP |
| 094 | bibliotecario | Detecta duplicados y basura | 🟡 MVP |
| 095 | cartografo | Genera mapa del repo | 🟡 MVP |

**Todos 🟡 MVP.** Ninguno es 🟢 PRODUCTO todavía. Para pasar a 🟢 hay
que probarlos en 2+ entornos y confirmar que no fallan.

---

## Cómo correr

```sh
cd ~/kronos-protocol
python3 05-AGENTES/090-arquitecto/arquitecto.py
python3 05-AGENTES/094-bibliotecario/bibliotecario.py
python3 05-AGENTES/095-cartografo/cartografo.py 