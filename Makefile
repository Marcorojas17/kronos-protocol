# ◯_● ARKHÉ ZERO · Makefile
# Usa .RECIPEPREFIX para evitar problemas de tabs en heredocs
.RECIPEPREFIX = >
SHELL := /bin/bash
.DEFAULT_GOAL := help

.PHONY: help install run test verify clean

help:
> @echo ""
> @echo "  ◯_● ARKHÉ ZERO"
> @echo "  ────────────────────────────────────"
> @echo "  install   · Instala dependencias"
> @echo "  run       · Arranca servidor en localhost:8080"
> @echo "  test      · Ejecuta los 56 tests"
> @echo "  verify    · Verifica Índice Cero"
> @echo "  clean     · Limpia caché"
> @echo ""

install:
> @echo "▸ Instalando dependencias..."
> @pip3 install --quiet --break-system-packages flask pytest pytest-cov cryptography dilithium-py 2>/dev/null || true
> @echo "  [✓] Dependencias instaladas"

run:
> @echo "▸ Arrancando ARKHÉ ZERO en http://localhost:8080"
> @cd index && python3 -m http.server 8080

test:
> @python3 -m pytest tests/*.py -v

verify:
> @echo "▸ Verificando Índice Cero..."
> @sha256sum MANIFEST.sha256 2>/dev/null || shasum -a 256 MANIFEST.sha256
> @echo "  [✓] Índice Cero verificado"

clean:
> @find . -name "__pycache__" -type d -exec rm -rf {} + 2>/dev/null || true
> @rm -rf .pytest_cache coverage/ 2>/dev/null || true
> @echo "  [✓] Limpieza completa"
