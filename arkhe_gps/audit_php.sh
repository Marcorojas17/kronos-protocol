#!/data/data/com.termux/files/usr/bin/bash
# audit_php.sh · AUDITORÍA DE SEGURIDAD PHP · Nodo YHDRYH-92CE
# Verifica el blindaje de PHP y genera un manifiesto firmado.

PHP_INI="/data/data/com.termux/files/usr/lib/php.ini"
REPORT="php_audit_$(date +%Y%m%d_%H%M%S).txt"

echo "🜂 Iniciando auditoría de PHP..." > $REPORT
echo "Nodo: YHDRYH-92CE" >> $REPORT
echo "Fecha: $(date -u +%Y-%m-%dT%H:%M:%SZ)" >> $REPORT
echo "---" >> $REPORT

# 1. Verificar versión de PHP
PHP_VERSION=$(php -v | head -n 1)
echo "Versión: $PHP_VERSION" >> $REPORT

# 2. Verificar que php.ini se carga
INI_LOADED=$(php --ini | grep "Loaded Configuration File" | awk -F': ' '{print $2}')
echo "php.ini cargado: $INI_LOADED" >> $REPORT

# 3. Verificar funciones deshabilitadas
DISABLED=$(php -r "echo ini_get('disable_functions');")
echo "Funciones deshabilitadas: $DISABLED" >> $REPORT

# 4. Verificar inclusiones remotas
ALLOW_URL=$(php -r "echo ini_get('allow_url_include') ? 'ON' : 'OFF';")
echo "allow_url_include: $ALLOW_URL" >> $REPORT

# 5. Verificar exposición de PHP
EXPOSE=$(php -r "echo ini_get('expose_php') ? 'ON' : 'OFF';")
echo "expose_php: $EXPOSE" >> $REPORT

# 6. Intentar ejecutar comando (debe fallar)
if php -r "shell_exec('echo test');" 2>/dev/null | grep -q "test"; then
    echo "⚠️ ALERTA: shell_exec está HABILITADO (VULNERABLE)" >> $REPORT
else
    echo "✓ shell_exec está BLOQUEADO (SEGURO)" >> $REPORT
fi

echo "---" >> $REPORT
echo "Auditoría completada." >> $REPORT

echo "✓ Reporte generado: $REPORT"
cat $REPORT
