#!/bin/bash
nohup python3 guardian.py > guardian.log 2>&1 &
echo "Guardián lanzado en background. PID: $!"
echo "Ver logs con: cat guardian.log"
echo "Ver log de dominios: cat arkhe_domains.log"
