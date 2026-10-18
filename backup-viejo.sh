#!/bin/bash
G='\033[0;32m'; Y='\033[0;33m'; N='\033[0m'
D=/root/kronos-protocol/backups
mkdir -p "$D"
TS=$(date +%Y%m%d-%H%M)
tar -czf "$D/arkhe-$TS.tar.gz" -C ~ arkhe-zero 2>/dev/null
SIZE=$(du -h "$D/arkhe-$TS.tar.gz" | awk '{print $1}')
echo -e "${G}✓ Backup:${N} arkhe-$TS.tar.gz ($SIZE)"
ls -t "$D"/*.tar.gz | tail -n +6 | xargs rm -f 2>/dev/null
