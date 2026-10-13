# ═══════════════════════════════════════════════════════════════
#  ▓▒░ MAKEFILE · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
# ═══════════════════════════════════════════════════════════════

SHELL := /bin/bash
.DEFAULT_GOAL := help

SEAL := ◯_● · 51/49/100

.PHONY: help install build test lint format seal pqc-audit index-verify contracts clean docker-up docker-down

# ─── Ayuda ─────────────────────────────────────────────────────
help: ## Muestra este menú
	@echo "═══════════════════════════════════════════════════════════"
	@echo "  ▓▒░ ARKHÉ ZERO · MAKEFILE · $(SEAL) ░▒▓"
	@echo "═══════════════════════════════════════════════════════════"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo "═══════════════════════════════════════════════════════════"

# ─── Instalación ───────────────────────────────────────────────
install: ## Instala todo (Node + Python + submodulos)
	@echo "[ 1/3 ] Instalando dependencias Node..."
	@npm install
	@echo "[ 2/3 ] Instalando dependencias Python..."
	@pip install -r requirements.txt
	@echo "[ 3/3 ] Instalando marco.mcp..."
	@cd marco.mcp && npm install
	@echo "[ ✓✓ ] INSTALACIÓN COMPLETA · $(SEAL)"

build: ## Compila TypeScript + MCP
	@echo "[ >> ] Compilando TypeScript..."
	@npm run build
	@echo "[ ✓✓ ] BUILD COMPLETO · $(SEAL)"

# ─── Testing ───────────────────────────────────────────────────
test: ## Ejecuta todos los tests
	@npm test

test-unit: ## Solo tests unitarios
	@npm run test:unit

test-integration: ## Solo tests de integración
	@npm run test:integration

test-e2e: ## Solo tests end-to-end
	@npm run test:e2e

# ─── Calidad ───────────────────────────────────────────────────
lint: ## Linting (ESLint + Ruff)
	@npm run lint
	@ruff check .

format: ## Formatea código (Prettier + Ruff)
	@npm run format
	@ruff format .

# ─── Verificación criptográfica ────────────────────────────────
seal: ## Verifica el sello KINTSUGI
	@python scripts/verify-seal.py

pqc-audit: ## Auditoría post-cuántica
	@python scripts/pqc-audit.py

index-verify: ## Verifica el Índice Cero
	@python scripts/index-cero-verify.py

# ─── Contratos ─────────────────────────────────────────────────
contracts-test: ## Test de contratos Solidity
	@forge test

contracts-deploy: ## Despliega contratos a Ethereum
	@forge script script/Deploy.s.sol --rpc-url $(ETHEREUM_RPC) --broadcast

# ─── Docker ────────────────────────────────────────────────────
docker-up: ## Levanta el stack completo
	@docker-compose up -d

docker-down: ## Detiene el stack
	@docker-compose down

docker-logs: ## Muestra logs del stack
	@docker-compose logs -f

# ─── Limpieza ──────────────────────────────────────────────────
clean: ## Limpia artefactos de build
	@rm -rf dist node_modules marco.mcp/dist marco.mcp/node_modules
	@rm -rf __pycache__ .pytest_cache .mypy_cache .ruff_cache
	@rm -rf coverage .nyc_output
	@echo "[ ✓✓ ] LIMPIEZA COMPLETA · $(SEAL)"

# ◯_● · 51/49/100 · KRONOS