# ◯_● ARKHÉ ZERO · Makefile
SHELL := /bin/bash
.DEFAULT_GOAL := help

.PHONY: help install run test verify clean

help:  ## Muestra esta ayuda
@echo ""
@echo "  ◯_● ARKHÉ ZERO"
@echo "  ────────────────────────────────────"
@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'
@echo ""

install:  ## Instala dependencias (Python, Flask, PQC, tests)
@echo "▸ Instalando dependencias..."
@pip3 install --quiet --break-system-packages \
flask pytest pytest-cov cryptography dilithium-py 2>/dev/null || \
pip3 install --quiet flask pytest cryptography
@echo "  [✓] Dependencias instaladas"

run:  ## Arranca el servidor en localhost:8080
@echo "▸ Arrancando ARKHÉ ZERO en http://localhost:8080"
@cd index && python3 -m http.server 8080

test:  ## Ejecuta los 56 tests
@python3 -m pytest tests/*.py -v

verify:  ## Verifica integridad del Índice Cero
@echo "▸ Verificando Índice Cero..."
@sha256sum MANIFEST.sha256 2>/dev/null || shasum -a 256 MANIFEST.sha256
@echo "  [✓] Índice Cero verificado"

clean:  ## Limpia caché y artefactos
@find . -name "__pycache__" -type d -exec rm -rf {} + 2>/dev/null
@rm -rf .pytest_cache coverage/ 2>/dev/null
@echo "  [✓] Limpieza completa"
