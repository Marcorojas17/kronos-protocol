import os

# Configuración
REPO_URL = "https://github.com/Marcorojas17/kronos-protocol/blob/main/"
IGNORE_DIRS = {'.git', 'node_modules', 'venv', '__pycache__', '.pytest_cache', 'dist', 'build'}

def generar_arbol(directorio="."):
    print("🌳 Generando el Árbol Completo del Repositorio...")
    
    with open("ARBOL_COMPLETO.md", "w", encoding="utf-8") as f:
        f.write("# 🌳 ÁRBOL COMPLETO DEL REPOSITORIO - ARKHÉ ZERO\n\n")
        f.write("> **Instrucciones:** Haz clic en cualquier carpeta o archivo para abrirlo directamente en GitHub.\n\n")
        
        def walk_dir(path, level=0):
            try:
                entries = sorted(os.listdir(path))
            except PermissionError:
                return

            # Separar carpetas y archivos
            dirs = [e for e in entries if os.path.isdir(os.path.join(path, e)) and e not in IGNORE_DIRS and not e.startswith('.')]
            files = [e for e in entries if os.path.isfile(os.path.join(path, e)) and not e.startswith('.')]

            # Imprimir carpetas
            for d in dirs:
                rel_path = os.path.relpath(os.path.join(path, d), directorio).replace("\\", "/")
                indent = "    " * level
                f.write(f"{indent}📁 **[{d}](./{rel_path})/**\n")
                walk_dir(os.path.join(path, d), level + 1)

            # Imprimir archivos
            for file in files:
                rel_path = os.path.relpath(os.path.join(path, file), directorio).replace("\\", "/")
                # Codificar espacios en la URL para que funcione en GitHub
                url_path = rel_path.replace(" ", "%20")
                indent = "    " * level
                
                # Asignar emoji según extensión
                ext = os.path.splitext(file)[1].lower()
                icon = "📄"
                if ext == '.py': icon = "🐍"
                elif ext == ".md": icon = "📘"
                elif ext == ".html": icon = "🌐"
                elif ext == ".json": icon = "📋"
                elif ext == ".sh": icon = "⚙️"
                elif ext == ".sol": icon = "⛓️"
                elif ext in ['.png', '.jpg', '.webp']: icon = "🖼️"
                elif ext == ".wav": icon = "🔊"
                elif ext == ".ots": icon = "🔏"
                
                f.write(f"{indent}{icon} [{file}]({REPO_URL}{url_path})\n")

        walk_dir(directorio)

    print("✅ Árbol generado exitosamente en 'ARBOL_COMPLETO.md'")

if __name__ == "__main__":
    generar_arbol()
