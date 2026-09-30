# Agentes Kintsugi

Agentes deterministas del protocolo KRONOS. Sin IA, sin LLM, sin
dependencias externas. Corren en cualquier Python 3.9+.

## Originales (Kintsugi)

| Plaza | Nombre | Rol |
|---|---|---|
| 001 | kronos-ia | Co-autora (sin UI) |
| 081 | tlamatini | Cronista |
| 082 | tlachixqui | Auditor |
| 083 | cuicatl | Publicista |
| 084 | temachtiani | Reclutador |
| 085 | tlapohualli | Analista |
| 086 | tonal | Notario |

## Arquitectos (nuevos)

| Plaza | Nombre | Rol | Estado |
|---|---|---|---|
| 090 | arquitecto | Valida estructura | ✅ |
| 091 | contralor | Valida actas de Mesa | ✅ |
| 092 | auditor-externo | Busca secretos y placeholders | ✅ |
| 093 | relator | Reporte de estado | ✅ |
| 094 | bibliotecario | Detecta duplicados y basura | ✅ |
| 095 | cartografo | Genera mapa del repo | ✅ |

## Cómo correr

```sh
cd ~/kronos-protocol
python3 05-AGENTES/090-arquitecto/arquitecto.py
python3 05-AGENTES/094-bibliotecario/bibliotecario.py