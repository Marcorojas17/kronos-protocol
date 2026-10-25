#!/data/data/com.termux/files/usr/bin/bash
# check_php_swarm.sh · Verifica PHP y lo integra al Enjambre (Blindado para Cron)
PHP_INI="/data/data/com.termux/files/usr/etc/php.ini"

echo "🜂 Verificando blindaje de PHP para el Enjambre..."

# 1. Comprobar si php.ini se carga (usando la ruta por defecto de Termux)
INI_LOADED=$(php --ini | grep "Loaded Configuration File" | sed 's/.*: //' | xargs)

if [[ -z "$INI_LOADED" || "$INI_LOADED" == *"(none)"* ]]; then
    echo "✗ ALERTA: php.ini no está cargado. El blindaje está inactivo."
    echo "  (Buscando en: $INI_LOADED)"
    exit 1
fi

# 2. Comprobar funciones deshabilitadas
DISABLED=$(php -r "echo ini_get('disable_functions');")
if [[ -z "$DISABLED" ]]; then
    echo "✗ ALERTA: No hay funciones deshabilitadas."
    exit 1
fi

echo "✓ Blindaje PHP activo en: $INI_LOADED"
echo "✓ Funciones bloqueadas: $DISABLED"

# 3. Generar manifiesto de seguridad PHP
REPORT="php_security_$(date +%Y%m%d_%H%M%S).json"
php -r "
\$report = [
    'nodo' => 'YHDRYH-92CE',
    'agente' => 'OBSERVER-49',
    'componente' => 'PHP',
    'version' => phpversion(),
    'php_ini' => '$INI_LOADED',
    'disable_functions' => '$DISABLED',
    'expose_php' => ini_get('expose_php') ? 'ON' : 'OFF',
    'timestamp' => date('c')
];
file_put_contents('$REPORT', json_encode(\$report, JSON_PRETTY_PRINT));
" 2>/dev/null

echo "✓ Reporte de seguridad PHP generado: $REPORT"
echo "  └─ Listo para ser empaquetado en el Enjambre (.arkhe)"
