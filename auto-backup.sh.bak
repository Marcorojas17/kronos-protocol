#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════
#  ARKHÉ ZERO · AUTO-BACKUP CON ROTACIÓN INTELIGENTE
#  NODO YHDRYH-92CE · SCDR-001 · ◯_● · 51/49/100
# ═══════════════════════════════════════════════════════════════════════════

# ─── MODO DE EJECUCIÓN ──────────────────────────────────────────────────────
# Uso: auto-backup.sh [quick|daily|weekly|monthly|rotate|status]
MODE="${1:-daily}"

# ─── COLORES ────────────────────────────────────────────────────────────────
GREEN='\033[0;32m'
GOLD='\033[0;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
DIM='\033[2m'
NC='\033[0m'

# ─── CONSTANTES ─────────────────────────────────────────────────────────────
NODO="YHDRYH-92CE"
SELLO="SCDR-001"
HOME_DIR="$HOME"
ARKHE_DIR="$HOME/arkhe-zero"
BACKUP_ROOT="$HOME/arkhe-backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DATE_SHORT=$(date +%Y%m%d)
LOG_DIR="$ARKHE_DIR/logs"
LOG_FILE="$LOG_DIR/autobackup-$(date +%Y%m).log"

# ─── UTILIDADES ─────────────────────────────────────────────────────────────
log() {
    local msg="[$(date '+%Y-%m-%d %H:%M:%S')] $*"
    echo -e "${CYAN}${msg}${NC}"
    echo "$msg" >> "$LOG_FILE"
}

ok() {
    local msg="[$(date '+%Y-%m-%d %H:%M:%S')] [ OK ] $*"
    echo -e "${GREEN}${msg}${NC}"
    echo "$msg" >> "$LOG_FILE"
}

err() {
    local msg="[$(date '+%Y-%m-%d %H:%M:%S')] [FAIL] $*"
    echo -e "${RED}${msg}${NC}"
    echo "$msg" >> "$LOG_FILE"
}

# ─── CREAR BACKUP ───────────────────────────────────────────────────────────
create_backup() {
    local type="$1"           # quick | daily | weekly | monthly
    local dest_dir="$BACKUP_ROOT/$type"
    local file="arkhe-zero-${type}-${TIMESTAMP}.tar.gz"

    mkdir -p "$dest_dir"
    cd "$HOME_DIR"

    log "Creando backup tipo: $type"

    # Excluir backups previos, logs y temporales
    tar -czf "$dest_dir/$file" \
        --exclude='arkhe-zero/backups' \
        --exclude='arkhe-zero/logs' \
        --exclude='arkhe-zero/.git' \
        --exclude='*.tmp' \
        --exclude='*.cache' \
        --exclude='.DS_Store' \
        --exclude='node_modules' \
        arkhe-zero/ 2>/dev/null

    if [ ! -f "$dest_dir/$file" ]; then
        err "Fallo al crear backup: $file"
        return 1
    fi

    # SHA-256 y tamaño
    local sha=$(sha256sum "$dest_dir/$file" | awk '{print $1}')
    local size=$(ls -lh "$dest_dir/$file" | awk '{print $5}')

    echo "$sha  $file" > "$dest_dir/$file.sha256"

    ok "Backup creado: $file ($size)"
    echo "$sha" > "$dest_dir/last.sha256"
    echo "$file" > "$dest_dir/last.file"

    # Guardar info en el manifest
    echo "[$(date -Iseconds)] $type | $file | $size | $sha" >> "$BACKUP_ROOT/manifest.log"
}

# ─── PUSH A GITHUB ──────────────────────────────────────────────────────────
push_github() {
    if [ ! -d "$ARKHE_DIR/.git" ]; then
        log "Sin repositorio git · saltando GitHub"
        return 0
    fi

    cd "$ARKHE_DIR"

    if git diff --quiet 2>/dev/null && git diff --cached --quiet 2>/dev/null; then
        log "Sin cambios para GitHub"
        return 0
    fi

    git add -A 2>/dev/null
    git commit -m "◯_● Auto-backup $(date -Iseconds) · NODO $NODO" 2>/dev/null || true

    if git remote get-url origin >/dev/null 2>&1; then
        git push origin main 2>&1 | tail -1 && ok "Push GitHub exitoso" || err "Push GitHub falló"
    fi
}

# ─── ROTACIÓN DE ANTIGUOS ───────────────────────────────────────────────────
rotate_backups() {
    log "Rotando backups antiguos..."

    # Diarios: mantener últimos 7
    rotate_dir "$BACKUP_ROOT/daily" 7 "diarios"

    # Semanales: mantener últimas 4
    rotate_dir "$BACKUP_ROOT/weekly" 4 "semanales"

    # Mensuales: mantener últimos 12
    rotate_dir "$BACKUP_ROOT/monthly" 12 "mensuales"

    # Quick: mantener últimos 24 (cada 6h = 4/día * 6 días)
    rotate_dir "$BACKUP_ROOT/quick" 24 "quick"

    ok "Rotación completa"
}

rotate_dir() {
    local dir="$1"
    local keep="$2"
    local label="$3"

    if [ ! -d "$dir" ]; then
        return
    fi

    local count=$(ls -1 "$dir"/*.tar.gz 2>/dev/null | wc -l | tr -d ' ')

    if [ "$count" -le "$keep" ]; then
        log "  $label: $count (dentro del límite de $keep)"
        return
    fi

    # Eliminar los más antiguos
    local to_delete=$((count - keep))
    ls -1t "$dir"/*.tar.gz 2>/dev/null | tail -n "$to_delete" | while read -r old; do
        rm -f "$old" "$old.sha256"
        log "  Eliminado: $(basename $old)"
    done

    ok "  $label: rotados $to_delete antiguos"
}

# ─── VERIFICAR INTEGRIDAD DEL ÚLTIMO BACKUP ─────────────────────────────────
verify_last() {
    local type="${1:-daily}"
    local dir="$BACKUP_ROOT/$type"

    if [ ! -f "$dir/last.sha256" ] || [ ! -f "$dir/last.file" ]; then
        return 0
    fi

    local expected=$(cat "$dir/last.sha256")
    local file=$(cat "$dir/last.file")
    local actual=$(sha256sum "$dir/$file" | awk '{print $1}')

    if [ "$expected" = "$actual" ]; then
        ok "Integridad verificada: $file"
    else
        err "CORRUPCIÓN DETECTADA en: $file"
        return 1
    fi
}

# ─── COMANDO PRINCIPAL ──────────────────────────────────────────────────────
case "$MODE" in
    quick)
        create_backup "quick"
        ;;
    daily)
        create_backup "daily"
        push_github
        verify_last "daily"
        ;;
    weekly)
        create_backup "weekly"
        push_github
        verify_last "weekly"
        rotate_backups
        ;;
    monthly)
        create_backup "monthly"
        push_github
        verify_last "monthly"
        rotate_backups
        ;;
    rotate)
        rotate_backups
        ;;
    status)
        echo ""
        echo -e "${GOLD}◯_● ARKHÉ ZERO · ESTADO DE BACKUPS${NC}"
        echo -e "${GOLD}═══════════════════════════════════════════════════════════${NC}"
        echo ""
        for type in quick daily weekly monthly; do
            dir="$BACKUP_ROOT/$type"
            if [ -d "$dir" ]; then
                count=$(ls -1 "$dir"/*.tar.gz 2>/dev/null | wc -l | tr -d ' ')
                total=$(du -sh "$dir" 2>/dev/null | awk '{print $1}')
                last=$(cat "$dir/last.file" 2>/dev/null || echo "—")
                printf "  %-10s · %3d archivos · %6s · %s\n" "$type" "$count" "$total" "$last"
            fi
        done
        echo ""
        echo -e "${GOLD}═══════════════════════════════════════════════════════════${NC}"
        echo -e "  Nodo:    $NODO"
        echo -e "  Sello:   $SELLO"
        echo -e "  Firma:   ◯_● · 51/49/100 · KINTSUGI"
        echo ""
        ;;
    *)
        echo "Uso: auto-backup.sh [quick|daily|weekly|monthly|rotate|status]"
        exit 1
        ;;
esac

exit 0
