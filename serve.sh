#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════
#  ▓▒░ SERVE.SH · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
#  ─────────────────────────────────────────────────────────────────────────
#  Levanta un servidor HTTP local para navegar todas las páginas.
#
#  Uso:
#    ./serve.sh              → puerto por defecto (8080)
#    ./serve.sh 3000         → puerto personalizado
#    ./serve.sh 8080 --open  → abre el navegador automáticamente
#    ./serve.sh --help       → muestra ayuda
# ═══════════════════════════════════════════════════════════════════════════

set -euo pipefail

# ─── Colores ────────────────────────────────────────────────────────────────
GOLD='\033[0;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
CYAN='\033[0;36m'
DIM='\033[2m'
RESET='\033[0m'

SEAL="◯_● · 51/49/100"

# ─── Ayuda ──────────────────────────────────────────────────────────────────
show_help() {
  cat << EOF
${GOLD}
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║   ▓▒░ SERVE.SH · ARKHÉ ZERO · ${SEAL}              ░▒▓
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
${RESET}

${CYAN}USO:${RESET}
  ./serve.sh [PUERTO] [OPCIONES]

${CYAN}OPCIONES:${RESET}
  --open        Abre el navegador automáticamente
  --port N      Puerto específico (alternativa al primer argumento)
  --host HOST   Host específico (default: localhost)
  --help        Muestra esta ayuda
  --clean       Mata cualquier proceso previo en el puerto antes de iniciar
  --list         Lista las URLs de las páginas principales

${CYAN}EJEMPLOS:${RESET}
  ./serve.sh                     # Puerto 8080 por defecto
  ./serve.sh 3000                # Puerto 3000
  ./serve.sh 8080 --open         # Puerto 8080 y abre navegador
  ./serve.sh --clean --open      # Limpia puerto 8080 y abre navegador

${DIM}${SEAL}${RESET}
EOF
}

# ─── Listar URLs ────────────────────────────────────────────────────────────
list_urls() {
  local port="${1:-8080}"
  local base="http://localhost:${port}"
  cat << EOF
${GOLD}
╔══════════════════════════════════════════════════════════════════════════╗
║  URLS PRINCIPALES · ${SEAL}                        ║
╚══════════════════════════════════════════════════════════════════════════╝
${RESET}
${CYAN}HUB & VARIANTES:${RESET}
  ${base}/                                 Hub principal
  ${base}/apps/index-kintsugi.html         KINTSUGI
  ${base}/apps/index-light.html            Modo claro
  ${base}/apps/index-dark.html             Modo oscuro
  ${base}/apps/web-hub.html                Índice completo
  ${base}/apps/sitemap.html                Sitemap interactivo

${CYAN}SERVICIOS CORE:${RESET}
  ${base}/apps/verificar.html              Verificador público
  ${base}/apps/registrar.html              Registrar obra
  ${base}/apps/composer.html               Compositor ceremonial

${CYAN}GOBERNANZA + AGENTES:${RESET}
  ${base}/apps/governance.html             Quórum 4/5
  ${base}/apps/governance-vote.html        Votar
  ${base}/apps/agentes.html                Enjambre
  ${base}/apps/agents-monitor.html         Monitor en vivo

${CYAN}MOVIMIENTO:${RESET}
  ${base}/movimiento/index.html            Movimiento ARKHÉ
  ${base}/movimiento/fundador.html         Carta del fundador
  ${base}/movimiento/registro-fundacional/index.html

${CYAN}PORTFOLIO:${RESET}
  ${base}/projects/index.html              Portfolio del legado

${DIM}${SEAL}${RESET}
EOF
}

# ─── Detectar servidor HTTP disponible ──────────────────────────────────────
detect_server() {
  if command -v python3 &> /dev/null; then
    echo "python3"
  elif command -v python &> /dev/null; then
    echo "python"
  elif command -v npx &> /dev/null; then
    echo "npx"
  elif command -v php &> /dev/null; then
    echo "php"
  elif command -v ruby &> /dev/null; then
    echo "ruby"
  else
    echo "none"
  fi
}

# ─── Iniciar servidor ───────────────────────────────────────────────────────
start_server() {
  local server="$1"
  local port="$2"
  local host="$3"

  case "$server" in
    python3|python)
      "$server" -m http.server "$port" --bind "$host"
      ;;
    npx)
      npx --yes serve -l "$port" -s . --listen "$host"
      ;;
    php)
      php -S "${host}:${port}"
      ;;
    ruby)
      ruby -run -e httpd . -p "$port" -b "$host"
      ;;
    *)
      echo -e "${RED}[ XX ] No hay servidor HTTP disponible.${RESET}"
      echo -e "${DIM}Instala uno de: python3, npx (Node.js), php, ruby${RESET}"
      exit 1
      ;;
  esac
}

# ─── Abrir navegador ────────────────────────────────────────────────────────
open_browser() {
  local url="$1"
  sleep 1.5
  if command -v xdg-open &> /dev/null; then
    xdg-open "$url" &> /dev/null
  elif command -v open &> /dev/null; then
    open "$url" &> /dev/null  # macOS
  elif command -v start &> /dev/null; then
    start "$url" &> /dev/null  # Windows Git Bash
  else
    echo -e "${DIM}[ INFO ] Abre manualmente: ${url}${RESET}"
  fi
}

# ─── Matar proceso previo en el puerto ──────────────────────────────────────
kill_port() {
  local port="$1"
  local pids

  if command -v lsof &> /dev/null; then
    pids=$(lsof -ti ":$port" 2>/dev/null || true)
    if [ -n "$pids" ]; then
      echo -e "${DIM}[ >> ] Matando proceso previo en puerto ${port}: ${pids}${RESET}"
      kill -9 $pids 2>/dev/null || true
      sleep 1
    fi
  elif command -v fuser &> /dev/null; then
    fuser -k "${port}/tcp" 2>/dev/null || true
    sleep 1
  fi
}

# ─── Banner ─────────────────────────────────────────────────────────────────
banner() {
  local port="$1"
  local server="$2"
  cat << EOF
${GOLD}
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║   ▓▒░ ARKHÉ ZERO · SERVIDOR LOCAL · ${SEAL}         ░▒▓
║   ──────────────────────────────────────────────────────────────         ║
║                                                                          ║
║   [ SERVER ]  ${server}                                                  ║
║   [ PORT   ]  ${port}                                                    ║
║   [ URL    ]  http://localhost:${port}/                                  ║
║   [ STOP   ]  Ctrl + C                                                   ║
║                                                                          ║
║   Páginas clave:                                                         ║
║     · http://localhost:${port}/                                          ║
║     · http://localhost:${port}/apps/sitemap.html                         ║
║     · http://localhost:${port}/apps/web-hub.html                         ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
${RESET}
EOF
}

# ─── MAIN ───────────────────────────────────────────────────────────────────
main() {
  local port=8080
  local host="localhost"
  local auto_open=false
  local clean_first=false
  local show_list=false

  # Parseo de argumentos
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --help|-h)
        show_help
        exit 0
        ;;
      --open|-o)
        auto_open=true
        shift
        ;;
      --clean|-c)
        clean_first=true
        shift
        ;;
      --list|-l)
        show_list=true
        shift
        ;;
      --port|-p)
        port="$2"
        shift 2
        ;;
      --host)
        host="$2"
        shift 2
        ;;
      [0-9]*)
        port="$1"
        shift
        ;;
      *)
        echo -e "${RED}[ XX ] Opción no reconocida: $1${RESET}"
        echo -e "${DIM}Usa ./serve.sh --help para ver las opciones${RESET}"
        exit 1
        ;;
    esac
  done

  if [ "$show_list" = true ]; then
    list_urls "$port"
    exit 0
  fi

  # Verificar que estamos en el directorio correcto
  if [ ! -f "index.html" ] && [ ! -d "apps" ]; then
    echo -e "${RED}[ XX ] No parece ser la raíz de ARKHÉ ZERO.${RESET}"
    echo -e "${DIM}[ >> ] Ejecuta este script desde la raíz del proyecto.${RESET}"
    echo -e "${DIM}[ >> ] Actual: $(pwd)${RESET}"
    exit 1
  fi

  # Detectar servidor
  local server
  server=$(detect_server)
  if [ "$server" = "none" ]; then
    echo -e "${RED}[ XX ] No hay servidor HTTP disponible.${RESET}"
    echo -e "${DIM}Instala uno:${RESET}"
    echo -e "${DIM}  · python3 · https://www.python.org/${RESET}"
    echo -e "${DIM}  · Node.js · https://nodejs.org/${RESET}"
    exit 1
  fi

  # Limpiar puerto si se pidió
  if [ "$clean_first" = true ]; then
    kill_port "$port"
  fi

  # Banner + abrir navegador
  banner "$port" "$server"

  if [ "$auto_open" = true ]; then
    open_browser "http://localhost:${port}/"
  fi

  # Iniciar servidor
  echo -e "${GREEN}[ ✓✓ ] Servidor iniciado · ${SEAL}${RESET}\n"
  start_server "$server" "$port" "$host"
}

main "$@"