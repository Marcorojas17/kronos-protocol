#!/bin/bash
# ARKHÉ ZERO · Restauración de respaldo
GREEN='\033[0;32m'; GOLD='\033[0;33m'; NC='\033[0m'

echo -e "${GOLD}◯_● Restauración ARKHÉ ZERO${NC}"
echo ""
echo "Respaldos disponibles:"
ls -1 ~/arkhe-zero/backups/*.tar.gz 2>/dev/null | nl

echo ""
echo -n "Número a restaurar: "
read -r NUM

FILE=$(ls -1 ~/arkhe-zero/backups/*.tar.gz | sed -n "${NUM}p")

if [ -z "$FILE" ]; then
    echo "Archivo no encontrado"
    exit 1
fi

echo ""
echo -e "${GOLD}Restaurando: $FILE${NC}"
tar -xzvf "$FILE" -C ~/
echo ""
echo -e "${GREEN}✓ Restauración completa${NC}"
