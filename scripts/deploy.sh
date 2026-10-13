#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
#  ▓▒░ DEPLOY.SH · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
# ═══════════════════════════════════════════════════════════════

set -euo pipefail

SEAL="◯_● · 51/49/100"
ENV="${1:-prod}"

banner() {
  echo "╔═══════════════════════════════════════════════════════════╗"
  echo "║  DEPLOY ARKHÉ ZERO · env=$ENV · $SEAL"
  echo "╚═══════════════════════════════════════════════════════════╝"
}

step() {
  echo "[ $(date +%H:%M:%S) ] $1"
}

banner

step "1/6 · Verificando Índice Cero..."
python3 scripts/index-cero-verify.py

step "2/6 · Auditando PQC..."
python3 scripts/pqc-audit.py

step "3/6 · Verificando sello..."
python3 scripts/verify-seal.py --strict

step "4/6 · Compilando..."
npm run build

step "5/6 · Ejecutando tests..."
npm test

step "6/6 · Desplegando a $ENV..."
case "$ENV" in
  local)    docker-compose up -d ;;
  staging)  docker-compose -f docker-compose.yml -f docker-compose.staging.yml up -d ;;
  prod)     docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d ;;
  *)        echo "Ambiente desconocido: $ENV"; exit 1 ;;
esac

echo
echo "[ ✓✓ ] DEPLOY COMPLETO · $SEAL"