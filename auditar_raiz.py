import os
import subprocess

print("🔍 INICIANDO AUDITORÍA DE LA RAÍZ - ARKHÉ ZERO\n")

# 1. Archivos CRÍTICOS que deben existir sí o sí
criticos = [
    "index.html", "README.md", "TESIS.md", "arkhe_server.py", 
    "global_server.py", "run_local.py", "ECOSYSTEM.md", 
    "glama.json", "README-ETERNO.md", "CERTIFICADO-FINAL.json",
    "CERTIFICADO-FINAL.json.ots", "Dockerfile", "generate_readme.py", "INVENTARIO.md"
]

faltantes = []
print("📌 1. VERIFICANDO ARCHIVOS CRÍTICOS:")
for archivo in criticos:
    if os.path.exists(archivo):
        print(f"  ✅ {archivo}")
    else:
        print(f"  ❌ FALTA: {archivo}")
        faltantes.append(archivo)

# 2. Buscar archivos basura o temporales
print("\n🗑️  2. BUSCANDO ARCHIVOS BASURA EN LA RAÍZ:")
basura = [f for f in os.listdir('.') if os.path.isfile(f) and (f.endswith('.log') or f.endswith('.tmp') or f.startswith('test_') and f.endswith('.txt'))]
if basura:
    for b in basura:
        print(f"  ⚠️  Archivo temporal: {b}")
else:
    print("  ✨ Limpio. No hay archivos .log o .tmp sueltos.")

# 3. Verificar la estructura de Carpetas clave
print("\n📁 3. VERIFICANDO ESTRUCTURA DE CARPETAS:")
carpetas = ["web", "contracts", ".github/workflows", "scripts"]
for c in carpetas:
    if os.path.isdir(c):
        print(f"  ✅ Carpeta {c}/ existe")
    else:
        print(f"  ❌ FALTA Carpeta {c}/")

# 4. Verificar el estado de Git
print("\n🐙 4. ESTADO DE GIT (¿Todo subido?):")
try:
    status = subprocess.run(["git", "status", "--porcelain"], capture_output=True, text=True).stdout
    if not status.strip():
        print("  ✅ Todo está commiteado y sincronizado con GitHub.")
    else:
        print("  ⚠️  Tienes cambios sin guardar o subir:")
        print(status)
except:
    print("  ❌ Error al leer Git.")

# 5. Resumen Final
print("\n" + "="*50)
if not faltantes:
    print("🏆 RESULTADO: La raíz está en perfecto estado. Nada crítico falta.")
else:
    print(f"⚠️  RESULTADO: Faltan {len(faltantes)} archivos críticos. Revisa la lista de arriba.")
print("="*50)
