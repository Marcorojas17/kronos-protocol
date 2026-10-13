ARKHE-ZERO/ ─────────────────────────────────────────── RAÍZ SOBERANA
│
│ ═══════════ CAPA 0 · IDENTIDAD Y MANIFIESTO ═══════════
├── 📄 README.md
├── 📄 AI-CONTEXT.md
├── 📄 AI-MANIFEST.json
├── 📄 AI-MCP-SERVER.md
├── 📄 AGENTS.md
├── 📄 PROMPT-MAESTRO.md
├── 📄 CLAUDE.md
├── 📄 GEMINI.md
├── 📄 .cursorrules
├── 📄 llms.txt                         ← NUEVO estándar LLMs
├── 📄 KRONOS-CONTEXTO-EXTENDIDO.md     ← Contexto extendido
├── 📄 CONTEXTO-PORTATIL-KRONOS-v3.12   ← Contexto portátil
├── 📄 MEMORY.md                        ← §VI Persistencia
├── 📄 GOVERNANCE.md                    ← §II
├── 📄 GLOSSARY.md
├── 📄 ROADMAP.md
├── 📄 AUTHORS.md
├── 📄 CONTRIBUTORS.md
├── 📄 CHANGELOG.md
├── 📄 CITATION.cff
├── 📄 NOTICE
├── 📄 COPYRIGHT.md
├── 📄 MAPA.md                          ← Mapa del repo
├── 📄 ARCHITECTURE.md
├── 📄 ARQUITECTURA-VIVA.md
├── 📄 PROTOCOL.md
├── 📄 OPERATIONS.md
├── 📄 COMPLIANCE.md
├── 📄 ONBOARDING.json                  ← (renombrado de BLOCKED)
├── 📄 REPORTE-SALUD.md
├── 📄 RISK_DISCLOSURE.md
├── 📄 TESIS.md                         ← (unificado de 4 archivos)
├── 📄 EXPLICACION-UNIVERSAL.md
│
│ ═══════════ CAPA 1 · LICENCIAS Y LEGAL ═══════════
├── 📄 LICENSE                          ← §III LGU
├── 📄 LICENSE-MIT
├── 📄 LICENSE-APACHE
├── 📄 LICENSE-CC-BY-4.0
├── 📄 LICENSE-CC-BY-NC-ND              ← Heredado de KRONOS
├── 📄 LICENSE-CODE
├── 📄 LICENSE-TRADEMARK
├── 📄 TRADEMARK.md
├── 📄 PATENTS.md
├── 📄 PRIVACY.md
├── 📄 TERMS.md
├── 📄 DPA.md
├── 📄 SECURITY.md
├── 📄 CODE_OF_CONDUCT.md
│
│ ═══════════ CAPA 2 · CONFIGURACIÓN RAÍZ ═══════════
├── 📄 MANIFEST.sha256                  ← §VI Verificación íntegra
├── 📄 .gitignore
├── 📄 .gitattributes
├── 📄 .gitmessage
├── 📄 .editorconfig
├── 📄 .dockerignore
├── 📄 .env.example
├── 📄 .nvmrc
├── 📄 .python-version
├── 📄 .pre-commit-config.yaml
├── 📄 .all-contributorsrc
├── 📄 .mailmap
├── 📄 requirements.txt
├── 📄 pyproject.toml
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 tsconfig.json
├── 📄 Makefile
├── 📄 Dockerfile
├── 📄 docker-compose.yml
├── 📄 Procfile
├── 📄 railway.json
├── 📄 nginx.conf
├── 📄 Caddyfile
├── 📄 netlify.toml
├── 📄 _config.yml                      ← Jekyll (GitHub Pages)
│
│ ═══════════ CAPA 3 · APLICACIONES WEB ═══════════
├── 🌐 apps/
│   ├── 🌐 index.html
│   ├── 🌐 index2.html
│   ├── 🌐 index3.html
│   ├── 🌐 index4.html
│   ├── 🌐 404.html
│   ├── 🌐 admin.html
│   ├── 🌐 creativo.html
│   ├── 🌐 luxury.html
│   ├── 🌐 servicios.html
│   ├── 🌐 registrar.html
│   ├── 🌐 verificar-certificado.html   ← (unificado verifier)
│   ├── 🌐 manifest.webmanifest
│   ├── 🌐 manifest.json
│   ├── 🌐 favicon.svg
│   ├── 🌐 robots.txt
│   └── 🌐 sitemap.xml
│
├── 🌐 .well-known/
│   ├── 📄 security.txt
│   ├── 📄 did.json
│   ├── 📄 webfinger
│   ├── 📄 nodeinfo
│   └── 📄 agent-card.json
│
│ ═══════════ CAPA 4 · GOBERNANZA GITHUB ═══════════
├── 📁 .github/
│   ├── 📁 workflows/
│   │   ├── ⚙️ ci.yml
│   │   ├── ⚙️ deploy.yml
│   │   ├── ⚙️ deploy-pages.yml
│   │   ├── ⚙️ pqc-audit.yml            ← §IV
│   │   ├── ⚙️ seal-verify.yml          ← §VI
│   │   ├── ⚙️ coauthor-check.yml       ← §VII
│   │   ├── ⚙️ agent-consensus.yml      ← §X
│   │   ├── ⚙️ fiscal-report.yml        ← §VIII
│   │   ├── ⚙️ provenance-verify.yml    ← C2PA
│   │   ├── ⚙️ link-check.yml
│   │   ├── ⚙️ 090-arquitecto.yml       ← NUEVO oficio
│   │   ├── ⚙️ 091-contralor.yml        ← NUEVO oficio
│   │   ├── ⚙️ 092-auditor-externo.yml  ← NUEVO oficio
│   │   ├── ⚙️ 093-relator.yml          ← NUEVO oficio
│   │   ├── ⚙️ 094-bibliotecario.yml    ← NUEVO oficio
│   │   ├── ⚙️ 095-cartografo.yml       ← NUEVO oficio
│   │   ├── ⚙️ detectar-secretos.yml
│   │   ├── ⚙️ formatear.yml
│   │   ├── ⚙️ guardian.yml
│   │   ├── ⚙️ indices.yml
│   │   ├── ⚙️ limpiar.yml
│   │   ├── ⚙️ salud-repo.yml
│   │   ├── ⚙️ test-kronos360.yml
│   │   ├── ⚙️ todo.yml
│   │   ├── ⚙️ verificar-acta.yml
│   │   └── ⚙️ verificar.yml
│   ├── 📁 ISSUE_TEMPLATE/
│   │   ├── 📄 bug_report.md
│   │   ├── 📄 feature_request.md
│   │   ├── 📄 legal_proposal.md
│   │   ├── 📄 agent_proposal.md
│   │   └── 📄 config.yml
│   ├── 📄 CODEOWNERS
│   ├── 📄 FUNDING.yml
│   ├── 📄 PULL_REQUEST_TEMPLATE.md
│   └── 📄 dependabot.yml
│
│ ═══════════ CAPA 5 · DOCUMENTACIÓN ═══════════
├── 📁 docs/
│   ├── 📄 index.md
│   ├── 📄 manifiesto.md
│   │
│   ├── 📁 adr/                         ← 9 ADR + template
│   │   ├── 📄 0001-adopcion-pacto-51-49.md
│   │   ├── 📄 0002-seleccion-ml-kem-1024.md
│   │   ├── 📄 0003-sellos-eidas-firmaprofesional.md
│   │   ├── 📄 0004-auditoria-ethereum-vs-bitcoin.md
│   │   ├── 📄 0005-modelo-flailp-vs-persona-electronica.md
│   │   ├── 📄 0006-migracion-sha3-512-vs-fnv.md
│   │   ├── 📄 0007-adopcion-c2pa-provenance.md
│   │   ├── 📄 0008-arquitectura-enjambre-autonomo.md
│   │   ├── 📄 0009-identidad-cultural-nahuatl.md ← NUEVO
│   │   └── 📄 template.md
│   │
│   ├── 📁 i-lex-prima/
│   ├── 📁 ii-pacto-51-49/
│   ├── 📁 iii-lgu/
│   ├── 📁 iv-guardianes/
│   ├── 📁 v-indice-cero/
│   ├── 📁 vi-memoria-perpetua/
│   ├── 📁 vii-co-autoria-hibrida/
│   ├── 📁 viii-fiscalidad-global/
│   ├── 📁 ix-jurisdiccion-ancla/
│   ├── 📁 x-agentes-arquitectura/
│   │
│   ├── 📁 CIUDAD/                      ← NUEVO · Gobernanza civil
│   │   ├── 📄 CONSTITUCION.md
│   │   ├── 📄 DERECHOS.md
│   │   ├── 📄 CIUDADANOS.md
│   │   ├── 📄 CONVIVENCIA.md
│   │   ├── 📄 MONEDA.md
│   │   ├── 📄 AUDITORIA-IA.md
│   │   ├── 📄 AUDITOR_HOSTIL.js
│   │   ├── 📄 GUIA-AUDITOR.md
│   │   ├── 📄 REGULATORY-MATCH.md
│   │   ├── 📄 index.html
│   │   ├── 📄 firmar.html
│   │   ├── 📄 firmar.js
│   │   ├── 📄 lector.html
│   │   ├── 📄 verificar.html
│   │   └── 📄 certificado.html
│   │
│   ├── 📁 IP/
│   │   └── 📄 README.md
│   │
│   ├── 📁 legal/
│   │   ├── 📄 analisis-vacios-legales.md
│   │   ├── 📄 jurisdiccion-comparada.md
│   │   ├── 📄 roadmap-regulatorio-2026-2030.md
│   │   └── 📄 precedentes-citables.md
│   │
│   ├── 📁 api/
│   │   ├── 📄 openapi.yaml
│   │   ├── 📄 asyncapi.yaml
│   │   └── 📄 graphql-schema.graphql
│   │
│   ├── 📁 architecture/
│   ├── 📁 tutorials/
│   ├── 📁 guides/
│   ├── 📁 reference/
│   │
│   ├── 📄 PLANTILLA-TERMINAL.md
│   ├── 📄 TESIS-VISUAL.md
│   ├── 📄 demos-oficiales.html
│   ├── 📄 kronos-para-ninos.html
│   └── 📄 tesis-visual.html
│
│ ═══════════ CAPA 6 · NÚCLEO Y CRIPTOGRAFÍA ═══════════
├── 📁 core/src/atribucion/             ← 7 módulos
│   ├── 📄 attribution-engine.js
│   ├── 📄 authorship-tracker.js
│   ├── 📄 rights-manager.js
│   ├── 📄 license-resolver.js
│   ├── 📄 royalty-distributor.js
│   ├── 📄 provenance-chain.js
│   └── 📄 dispute-resolver.js
│
├── 📁 crypto/
│   ├── 📁 primitives/
│   │   ├── 📄 ml-kem-512.js
│   │   ├── 📄 ml-kem-768.js
│   │   ├── 📄 ml-kem-1024.js
│   │   ├── 📄 ml-dsa-44.js
│   │   ├── 📄 ml-dsa-65.js
│   │   ├── 📄 ml-dsa-87.js
│   │   └── 📄 slh-dsa-shake-256s.js
│   ├── 📁 hybrid/
│   ├── 📁 agility/
│   ├── 📁 hsm/
│   └── 📁 test-vectors/
│
├── 📁 cimiento/                        ← NUEVO · Capa física
│   ├── 📁 anclaje-ethereum/
│   │   ├── 📄 AUTORIA
│   │   ├── 📄 README.md
│   │   ├── 📄 anchor-v1.js
│   │   ├── 📄 anchor.js
│   │   ├── 📄 certificado.html
│   │   ├── 📄 index.html
│   │   ├── 📄 manual.html
│   │   └── 📄 styles.css
│   ├── 📁 cripto-core/
│   │   ├── 📄 AUTORIA
│   │   ├── 📄 core.js
│   │   ├── 📄 index.html
│   │   ├── 📄 manual.html
│   │   └── 📄 styles.css
│   ├── 📁 storage-dexie/
│   │   ├── 📄 AUTORIA
│   │   ├── 📄 storage.js
│   │   ├── 📄 storage-v2.js
│   │   ├── 📄 index.html
│   │   ├── 📄 manual.html
│   │   └── 📄 styles.css
│   └── 📄 AUTORIA
│
│ ═══════════ CAPA 7 · PROVENANCE Y ATRIBUCIÓN ═══════════
├── 📁 provenance/
│   ├── 📁 c2pa/
│   ├── 📁 watermarking/
│   ├── 📁 fingerprinting/
│   ├── 📁 timestamping/
│   └── 📁 notarization/
│
├── 📁 atribucion/                      ← 9 archivos
│
├── 📁 certificacion/                   ← NUEVO · Operacional
│   ├── 📁 anclaje-manifest/
│   │   ├── 📄 anclaje.js
│   │   ├── 📄 index.html
│   │   └── 📄 manual.html
│   ├── 📁 emisor-certificados/
│   │   ├── 📄 certificado-visual.html
│   │   ├── 📄 certificados.js
│   │   ├── 📄 index.html
│   │   └── 📄 manual.html
│   ├── 📁 manifest-integridad/
│   │   ├── 📄 index.html
│   │   ├── 📄 manifest.js
│   │   └── 📄 styles.css
│   ├── 📁 notario-kronos/
│   │   ├── 📄 README.md
│   │   ├── 📄 certificado-notarial.html
│   │   ├── 📄 index.html
│   │   ├── 📄 manual.html
│   │   ├── 📄 notario.js
│   │   ├── 📄 politica.md
│   │   └── 📄 prompt.md
│   ├── 📁 sello-tiempo/
│   │   ├── 📄 index.html
│   │   ├── 📄 manual.html
│   │   └── 📄 sello-tiempo.js
│   ├── 📁 verificador-publico/
│   │   ├── 📄 index.html
│   │   ├── 📄 manual.html
│   │   └── 📄 verificador.js
│   └── 📄 certificado-maestro.html
│
│ ═══════════ CAPA 8 · REGISTRO Y MEMORIA ═══════════
├── 📁 src/
│   ├── 📁 core/
│   ├── 📁 registry/
│   ├── 📁 memory/
│   └── 📁 viral/
│
├── 📁 00-SCHEMA/                       ← NUEVO · Esquemas
│   ├── 📄 ejemplo.registro.json
│   └── 📄 registro.schema.json
│
├── 📁 02-VERIFICADOR/
│   ├── 📄 INDICE.md
│   └── 📄 verificador.html
│
├── 📁 evidence/
│   └── 📄 manifest.json
│
├── 📁 logs/
│   └── 📄 log.json
│
│ ═══════════ CAPA 9 · AGENTES IA Y ENJAMBRE ═══════════
├── 📁 agents/                          ← §X núcleo
│   ├── 📁 registry/
│   ├── 📁 roles/
│   ├── 📁 protocols/
│   ├── 📁 consensus/
│   └── 📁 mcp/
│
├── 📁 05-AGENTES/                      ← NUEVO · Agentes numerados
│   ├── 📁 090-arquitecto/
│   │   ├── 📄 arquitecto.py
│   │   └── 📄 ultimo.json
│   ├── 📁 091-contralor/
│   │   ├── 📄 contralor.py
│   │   └── 📄 ultimo.json
│   ├── 📁 092-auditor-externo/
│   │   ├── 📄 auditor.py
│   │   └── 📄 ultimo.json
│   ├── 📁 093-relator/
│   │   ├── 📄 relator.py
│   │   └── 📄 ultimo.json
│   ├── 📁 094-bibliotecario/
│   │   ├── 📄 bibliotecario.py
│   │   └── 📄 ultimo.json
│   ├── 📁 095-cartografo/
│   │   ├── 📄 cartografo.py
│   │   └── 📄 ultimo.json
│   ├── 📁 _base/
│   │   ├── 📄 agente-base.py
│   │   └── 📄 agente_base.py
│   └── 📄 README.md
│
├── 📁 agentes/                         ← NUEVO · Enjambre cultural náhuatl
│   ├── 📁 cuicatl-publicista/
│   │   ├── 📄 index.html
│   │   ├── 📄 politica.md
│   │   └── 📄 prompt.md
│   ├── 📁 temachtiani-reclutador/
│   │   ├── 📄 index.html
│   │   └── 📄 politica.md
│   ├── 📁 tlachixqui-auditor/
│   │   ├── 📄 index.html
│   │   └── 📄 politica.md
│   ├── 📁 tlamatini-cronista/
│   │   ├── 📄 index.html
│   │   ├── 📄 politica.md
│   │   └── 📄 prompt.md
│   ├── 📁 tlapohualli-analista/
│   │   ├── 📄 index.html
│   │   └── 📄 politica.md
│   ├── 📁 tonal-notario/
│   │   ├── 📄 index.html
│   │   └── 📄 politica.md
│   ├── 📄 agente-base.js
│   └── 📄 README.md
│
├── 📁 orquestacion/                    ← NUEVO · Backbone del enjambre
│   ├── 📁 event-bus/
│   │   ├── 📄 AUTORIA
│   │   ├── 📄 bus.js
│   │   ├── 📄 index.html
│   │   ├── 📄 manual.html
│   │   └── 📄 styles.css
│   └── 📁 router-modulos/
│       ├── 📄 AUTORIA
│       ├── 📄 router.js
│       ├── 📄 index.html
│       ├── 📄 manual.html
│       └── 📄 styles.css
│
├── 📁 ai-recognition/
├── 📁 mesh/
├── 📁 kaf/
├── 📁 robotics/
├── 📁 guards/
├── 📁 engine/
│
│ ═══════════ CAPA 10 · GOBERNANZA Y CUMPLIMIENTO ═══════════
├── 📁 gobernanza/                      ← NUEVO · Mecanismos 51/49
│   ├── 📁 ejecucion-decisiones/
│   │   ├── 📄 README.md
│   │   ├── 📄 ejecucion.js
│   │   ├── 📄 index.html
│   │   └── 📄 manual.html
│   ├── 📁 propuestas-votacion/
│   │   ├── 📄 README.md
│   │   ├── 📄 index.html
│   │   ├── 📄 manual.html
│   │   ├── 📄 propuestas.js
│   │   ├── 📄 styles.css
│   │   └── 📄 votacion.js
│   ├── 📁 quorum-mayorias/
│   │   ├── 📄 README.md
│   │   ├── 📄 index.html
│   │   ├── 📄 manual.html
│   │   └── 📄 quorum.js
│   └── 📁 revocacion-auditoria/
│       ├── 📄 README.md
│       ├── 📄 index.html
│       ├── 📄 manual.html
│       └── 📄 revocacion.js
│
├── 📁 guardians/                       ← §IV · expansión
│   ├── 📄 GUARDIAN-ACTA.md
│   ├── 📄 GUARDIAN-MRR.md
│   ├── 📄 GUARDIAN-SHA.md
│   ├── 📄 GUARDIAN-TSA.md
│   └── 📄 GUARDIAN-VAULT.md
│
├── 📁 compliance/                      ← §VIII
├── 📁 jurisdiction/                    ← §IX
├── 📁 payments/
├── 📁 security/
├── 📁 legal/
│
│ ═══════════ CAPA 11 · IDENTIDAD ═══════════
├── 📁 identidad/                       ← NUEVO · Concreta §VII
│   ├── 📁 registro-humano/
│   │   ├── 📄 AUTORIA
│   │   ├── 📄 README.md
│   │   ├── 📄 identidad.js
│   │   ├── 📄 index.html
│   │   ├── 📄 manual.html
│   │   ├── 📄 pasaporte-visual.html
│   │   └── 📄 styles.css
│   ├── 📁 registro-ia/
│   │   ├── 📄 AUTORIA
│   │   ├── 📄 README.md
│   │   ├── 📄 guardrails.js
│   │   ├── 📄 ia.js
│   │   ├── 📄 index.html
│   │   ├── 📄 log-acciones.js
│   │   ├── 📄 manual.html
│   │   ├── 📄 pasaporte-ia.html
│   │   ├── 📄 politica.js
│   │   └── 📄 styles.css
│   └── 📁 roles-permisos/
│       ├── 📄 AUTORIA
│       ├── 📄 README.md
│       ├── 📄 certificado-rol.html
│       ├── 📄 index.html
│       ├── 📄 manual.html
│       ├── 📄 permisos.js
│       ├── 📄 roles.js
│       └── 📄 styles.css
│
├── 📁 07-LLAVES/                       ← NUEVO · Custodia criptográfica
│   ├── 📁 ATESTACIONES/
│   │   ├── 📄 082-tlachixqui.json
│   │   └── 📄 esquema.json
│   └── 📁 FUNDADOR-V2/
│       ├── 📄 fundador-v2.key
│       └── 📄 fundador-v2.pub
│
├── 📁 04_SEGURIDAD_Y_OPERACIONES/
│   └── 📄 LLAVE_QUEMADA_EVIDENCIA.md
│
│ ═══════════ CAPA 12 · API Y SDK ═══════════
├── 📁 api/
│   ├── 📄 __init__.py
│   ├── 📄 main.py
│   └── 📄 schemas.py
│
├── 📁 sdk/
│   ├── 📁 python/
│   └── 📁 js/
│
├── 📁 apps/api/                        ← FastAPI
│   ├── 📄 __init__.py
│   ├── 📄 main.py
│   └── 📄 schemas.py
│
│ ═══════════ CAPA 13 · SMART CONTRACTS ═══════════
├── 📁 contracts/
│   ├── 📄 RegistroGenesis.sol
│   ├── 📄 LicenciaGlobalUnica.sol
│   ├── 📄 Pacto5149.sol
│   ├── 📄 FondoFLAILP.sol
│   ├── 📄 CoAutoria.sol
│   ├── 📄 AgenteReclutamiento.sol
│   └── 📄 ReporteCARF.sol
│
├── 📁 protocol/
│   └── 📄 KTP-001.md                   ← Kronos Transfer Protocol
│
│ ═══════════ CAPA 14 · INFRAESTRUCTURA ═══════════
├── 📁 infra/
│   ├── 📁 k8s/
│   ├── 📁 terraform/
│   ├── 📁 observability/
│   └── 📁 backup/
│
├── 📁 operacion/                       ← NUEVO · Salud operacional
│   ├── 📁 dashboard-salud/
│   │   ├── 📄 AUTORIA
│   │   ├── 📄 dashboard.js
│   │   ├── 📄 index.html
│   │   ├── 📄 manual.html
│   │   └── 📄 styles.css
│   └── 📁 rituales/
│       ├── 📄 AUTORIA
│       ├── 📄 index.html
│       ├── 📄 manual.html
│       ├── 📄 rituales.js
│       └── 📄 styles.css
│
│ ═══════════ CAPA 15 · ASSETS Y AUTOMATIZACIÓN ═══════════
├── 📁 assets/
│   ├── 📁 css/
│   │   ├── 📄 main.css
│   │   ├── 📄 components.css
│   │   └── 📄 animations.css
│   ├── 📁 data/
│   │   └── 📄 folios.json
│   ├── 📁 js/
│   │   ├── 📄 app.js
│   │   ├── 📄 admin.js
│   │   ├── 📄 certificate-renderer.js
│   │   ├── 📄 crypto-handler.js
│   │   ├── 📄 particles.js
│   │   ├── 📄 registrar.js
│   │   └── 📄 verifier.js
│   ├── 📁 svg/
│   ├── 📁 ascii/
│   ├── 📁 badges/
│   └── 📁 fonts/
│
├── 📁 _data/
│   └── 📄 navigation.yml
│
├── 📁 scripts/
│   ├── 🐍 build.py
│   ├── 🐍 verify-seal.py
│   ├── 🐍 pqc-audit.py
│   ├── 🐍 agent-health.py
│   ├── 🐍 fiscal-report.py
│   ├── 🐍 index-cero-verify.py
│   ├── 🐍 c2pa-sign.py
│   ├── 🐍 generate-badges.py
│   ├── 🐍 consensus-simulator.py
│   └── 🐍 deploy.sh
│
├── 📄 guardian.py                      ← Heredado
├── 📄 verifier.py                      ← Heredado
│
│ ═══════════ CAPA 16 · TESTS ═══════════
├── 📁 tests/
│   ├── 📁 unit/
│   ├── 📁 integration/
│   ├── 📁 e2e/
│   ├── 🧪 test_api.py
│   ├── 🧪 test_audit_log.py
│   ├── 🧪 test_guard.py
│   ├── 🧪 test_hashing.py
│   ├── 🧪 test_keyfile.py
│   └── 🧪 test_signatures.py
│
├── 📁 src/kronos360/                   ← Heredado
│   ├── 📁 crypto/
│   ├── 📁 models/
│   └── 📁 services/
│
│ ═══════════ CAPA 17 · COMUNIDAD ═══════════
├── 📁 movimiento/                      ← NUEVO · Incorporación humana
│   ├── 📁 assets/
│   │   ├── 📁 art/
│   │   ├── 📁 img/
│   │   ├── 🖼️ hero-kronos.png
│   │   ├── 🖼️ hero-monumento.png
│   │   ├── 🖼️ hero-prisma.png
│   │   └── 🖼️ k-avatar.png
│   ├── 📁 registro-fundacional/
│   │   ├── 📄 README.md
│   │   ├── 📄 certificado-fundacional.html
│   │   ├── 📄 index.html
│   │   ├── 📄 manual.html
│   │   ├── 📄 registro.js
│   │   └── 📄 styles.css
│   ├── 📄 carta-bienvenida.html
│   ├── 📄 faq.md
│   ├── 📄 fundador.html
│   ├── 📄 genesis.md
│   ├── 📄 gracias.html
│   ├── 📄 index.html
│   ├── 📄 iniciacion.html
│   ├── 📄 manifiesto.md
│   ├── 📄 roadmap.md
│   └── 📄 solicitar_plaza.html
│
├── 📁 00-FUNDACION/
│   └── 📄 VERIFICADOR-OFICIAL.md
│
│ ═══════════ CAPA 18 · CICLO DE VIDA ═══════════
├── 📁 cierre/                          ← NUEVO · Fin digno del legado
│   ├── 📁 export-cifrado/
│   │   ├── 📄 AUTORIA
│   │   ├── 📄 README.md
│   │   ├── 📄 export-audit.js
│   │   ├── 📄 export.js
│   │   ├── 📄 index.html
│   │   ├── 📄 manual.html
│   │   └── 📄 styles.css
│   └── 📁 fin-digno/
│       ├── 📄 AUTORIA
│       ├── 📄 README.md
│       ├── 📄 fin.js
│       ├── 📄 index.html
│       ├── 📄 manual.html
│       └── 📄 styles.css
│
│ ═══════════ CAPA 19 · PORTFOLIO DEL LEGADO ═══════════
├── 📁 projects/                        ← NUEVO · Obras del Índice
│   ├── 📁 acta/
│   ├── 📁 bobeda/
│   ├── 📁 boveda/
│   ├── 📁 cymatic/
│   ├── 📁 dmd-33/
│   ├── 📁 evidence-os/
│   ├── 📁 genesis-miner/
│   ├── 📁 k4-framework/
│   ├── 📁 kronos-vault/
│   ├── 📁 md33/
│   └── 📁 yejida/
│
├── 📁 modulos/                         ← NUEVO · Módulos reutilizables
│   ├── 📁 boveda-voz/
│   │   ├── 📄 AUTORIA
│   │   ├── 📄 README.md
│   │   ├── 📄 boveda.js
│   │   ├── 📄 index.html
│   │   ├── 📄 manual.html
│   │   └── 📄 styles.css
│   └── 📁 evidence-os/
│       ├── 📄 AUTORIA
│       ├── 📄 README.md
│       ├── 📄 evidence.js
│       ├── 📄 index.html
│       ├── 📄 manual.html
│       └── 📄 styles.css
│
├── 📁 legado/                          ← NUEVO · Pilares filosóficos
│   ├── 📁 autoria/
│   ├── 📁 filosofia/
│   ├── 📁 genesis/
│   └── 📁 manifiesto/
│
│ ═══════════ CAPA 20 · ARCHIVO Y OUTPUT ═══════════
├── 📁 archive/
│   └── 📄 README.md
│
├── 📁 certificates/
│   └── 📄 README.md
│
├── 📁 laboratorio/
│   └── 📄 README.md
│
├── 📁 reportes/
│   ├── 📄 arquitecto.json
│   ├── 📄 auditor.json
│   ├── 📄 bibliotecario.json
│   ├── 📄 cartografo.json
│   ├── 📄 contralor.json
│   └── 📄 relator.json
│
├── 📁 public/
│
├── 📁 .vscode/
│
├── 📄 eslint.config.js
├── 📄 prettier.config.js
├── 📄 jest.config.js
├── 📄 vite.config.js
│
└── 📄 kodice-secreto/
    └── 📄 index.html