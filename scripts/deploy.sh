#!/bin/bash
echo "🚀 Iniciando despliegue de ARKHÉ ZERO Core..."
cd core_system
docker compose up -d || echo "Usando Docker directo..."
