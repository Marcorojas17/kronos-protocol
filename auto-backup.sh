#!/bin/bash
# ARKHÉ ZERO · AUTO-BACKUP · NODO YHDRYH-92CE · SCDR-001
MODE="${1:-daily}"

GREEN='\033[0;32m'; GOLD='\033[0;33m'; RED='\033[0;31m'
CYAN='\033[0;36m'; DIM='\033[2m'; NC='\033[0m'

NODO="YHDRYH-92CE"
SELLO="SCDR-001"
HOME_DIR="$HOME"
ARKHE_DIR="$HOME/arkhe-zero"
BACKUP_ROOT="$HOME/arkhe-backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_DIR="$ARKHE_DIR/logs"
LOG_FILE="$LOG_DIR/autobackup-$(date +%Y%m).log"

log() { local msg="[$(date '+%Y-%m-%d %H:%M:%S')] $*"; echo -e "${CYAN}${msg}${NC}"; echo "$msg" >> "$LOG_FILE"; }
ok()  { local msg="[$(date '+%Y-%m-%d %H:%M:%S')] [ OK ] $*"; echo -e "${GREEN}${msg}${NC}"; echo "$msg" >> "$LOG_FILE"; }
err() { local msg="[$(date '+%Y-%m-%d %H:%M:%S')] [FAIL] $*"; echo -e "${RED}${msg}${NC}"; echo "$msg" >> "$LOG_FILE"; }

create_backup() {
    local type="$1"
    local dest_dir="$BACKUP_ROOT/$type"
    local file="arkhe-zero-${type}-${TIMESTAMP}.tar.gz"
    mkdir -p "$dest_dir"
    cd "$HOME_DIR"
    log "Creando backup tipo: $type"
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
    local sha=$(sha256sum "$dest_dir/$file" | awk '{print $1}')
    local size=$(ls -lh "$dest_dir/$file" | awk '{print $5}')
    echo "$sha  $file" > "$dest_dir/$file.sha256"
    ok "Backup creado: $file ($size)"
    echo "$sha" > "$dest_dir/last.sha256"
    echo "$file" > "$dest_dir/last.file"
    echo "[$(date -Iseconds)] $type | $file | $size | $sha" >> "$BACKUP_ROOT/manifest.log"
}

rotate_dir() {
    local dir="$1"; local keep="$2"; local label="$3"
    [ ! -d "$dir" ] && return
    local count=$(ls -1 "$dir"/*.tar.gz 2>/dev/null | wc -l | tr -d ' ')
    if [ "$count" -le "$keep" ]; then
        log "  $label: $count (dentro del límite de $keep)"
        return
    fi
    local to_delete=$((count - keep))
    ls -1t "$dir"/*.tar.gz 2>/dev/null | tail -n "$to_delete" | while read -r old; do
        rm -f "$old" "$old.sha256"
        log "  Eliminado: $(basename $old)"
    done
    ok "  $label: rotados $to_delete antiguos"
}

rotate_backups() {
    log "Rotando backups antiguos..."
    rotate_dir "$BACKUP_ROOT/daily" 7 "diarios"
    rotate_dir "$BACKUP_ROOT/weekly" 4 "semanales"
    rotate_dir "$BACKUP_ROOT/monthly" 12 "mensuales"
    rotate_dir "$BACKUP_ROOT/quick" 24 "quick"
    ok "Rotación completa"
}

case "$MODE" in
    quick)   create_backup "quick" ;;
    daily)   create_backup "daily" ;;
    weekly)  create_backup "weekly"; rotate_backups ;;
    monthly) create_backup "monthly"; rotate_backups ;;
    rotate)  rotate_backups ;;
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
    *) echo "Uso: auto-backup.sh [quick|daily|weekly|monthly|rotate|status]"; exit 1 ;;
esac
exit 0
