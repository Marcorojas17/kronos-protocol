import os
import re
from collections import defaultdict

# Carpetas a ignorar
IGNORE_DIRS = {'.git', 'node_modules', 'venv', '__pycache__', '.pytest_cache', 'dist', 'build'}

def scan_repo():
    print("🔍 Escaneando lógica y vínculos de todo el repositorio (Sin borrar nada)...")
    
    python_imports = defaultdict(list)
    html_links = defaultdict(list)
    md_links = defaultdict(list)
    all_files = []

    for root, dirs, files in os.walk('.'):
        # Filtrar directorios ignorados
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        
        for file in files:
            filepath = os.path.join(root, file)
            rel_path = os.path.relpath(filepath, '.')
            all_files.append(rel_path)
            
            ext = os.path.splitext(file)[1].lower()
            
            # 1. Lógica de Python (Imports)
            if ext == '.py':
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                        imports = re.findall(r'^(?:from|import)\s+([a-zA-Z0-9_\.]+)', content, re.MULTILINE)
                        for imp in imports:
                            if not imp.startswith('_'):
                                python_imports[rel_path].append(imp)
                except:
                    pass
                    
            # 2. Vínculos HTML (Hrefs y Scripts)
            elif ext == '.html':
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                        links = re.findall(r'(?:href|src)="([^"]+)"', content)
                        for link in links:
                            if not link.startswith('http') and not link.startswith('#'):
                                html_links[rel_path].append(link)
                except:
                    pass
                    
            # 3. Vínculos Markdown
            elif ext == '.md':
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                        links = re.findall(r'\[([^\]]+)\]\(([^)]+)\)', content)
                        for text, link in links:
                            if not link.startswith('http') and not link.startswith('#'):
                                md_links[rel_path].append((text, link))
                except:
                    pass

    return python_imports, html_links, md_links, all_files

def generate_map():
    py_imports, html_links, md_links, all_files = scan_repo()

    with open('MASTER_ARCHITECTURE.md', 'w', encoding='utf-8') as f:
        f.write("# 🧠 MAPA LÓGICO Y DE VÍNCULOS - ARKHÉ ZERO\n\n")
        f.write("> Este documento fue generado automáticamente. Mapea la lógica interna y los vínculos de todo el repositorio sin alterar ni un solo archivo original.\n\n")
        
        f.write("## 🌌 Lógica de la Infraestructura (El Flujo)\n")
        f.write("```mermaid\ngraph TD\n")
        f.write("    Core[arkhe_server.py / global_server.py] -->|Expone API| MCP[Protocolo MCP]\n")
        f.write("    MCP -->|Conecta| IA[Google Gemini / Meta Llama]\n")
        f.write("    IA -->|Genera| Cert[CERTIFICADO-FINAL.json]\n")
        f.write("    Cert -->|Se sella en| BTC[Bitcoin OTS]\n")
        f.write("    Web[index.html] -->|Consulta| API[GitHub API]\n")
        f.write("    Web -->|Renderiza| Todos[3000+ Archivos]\n")
        f.write("```\n\n")

        f.write("## 🔗 Vínculos de los Documentos Principales\n")
        f.write("| Documento | Enlaces Internos Detectados |\n")
        f.write("| :--- | :--- |\n")
        for doc, links in list(md_links.items())[:20]: # Mostrar solo los primeros 20 para no saturar
            if links:
                f.write(f"| `{doc}` | {', '.join([l[1] for l in links[:5]])}... |\n")
        
        f.write("\n## 🐍 Dependencias de los Scripts Python\n")
        f.write("| Script | Importa |\n")
        f.write("| :--- | :--- |\n")
        for script, imports in py_imports.items():
            if imports:
                f.write(f"| `{script}` | `{', '.join(imports)}` |\n")

        f.write("\n## 🗺️ Inventario de Conexiones Web (HTML)\n")
        f.write("| Página HTML | Archivos vinculados (CSS, JS, IMG) |\n")
        f.write("| :--- | :--- |\n")
        for page, links in list(html_links.items())[:15]:
            if links:
                f.write(f"| `{page}` | `{', '.join(links[:5])}` |\n")

        f.write(f"\n## 📊 Resumen Total\n")
        f.write(f"- **Archivos escaneados:** {len(all_files)}\n")
        f.write(f"- **Scripts Python analizados:** {len(py_imports)}\n")
        f.write(f"- **Páginas HTML analizadas:** {len(html_links)}\n")
        f.write(f"- **Documentos Markdown analizados:** {len(md_links)}\n")

    print("✅ Mapa generado exitosamente: MASTER_ARCHITECTURE.md")

if __name__ == "__main__":
    generate_map()
