import os

header_lines = []
header_lines.append('<div align="center">\n\n')
header_lines.append('```text\n')
header_lines.append('    ___    ____  __ __ __  ________   _____   __________  ____\n')
header_lines.append('   /   |  / __ \\\\/ //_// / / / ____/  /__  /  / ____/ __ \\\\/ __ \\\\\n')
header_lines.append('  / /| | / /_/ / ,<  / /_/ / __/       / /  / __/ / /_/ / / / /\n')
header_lines.append(' / ___ |/ _, _/ /| |/ __  / /___      / /__/ /___/ _, _/ /_/ /\n')
header_lines.append('/_/  |_/_/ |_/_/ |_/_/ /_/_____/     /____/_____/_/ |_|\\\\____/\n\n')
header_lines.append('SISTEMA DE AUTORÍA HUMANO-IA INICIADO ○_●\n')
header_lines.append('```\n\n')

header_lines.append('[![Python](https://img.shields.io/badge/Python-3.10+-00f3ff?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)\n')
header_lines.append('[![MCP](https://img.shields.io/badge/MCP-ACTIVE-ff00ff?style=for-the-badge&logo=protocols.io&logoColor=white)](https://modelcontextprotocol.io/)\n')
header_lines.append('[![Status](https://img.shields.io/badge/STATUS-LIVE-00ff00?style=for-the-badge&logo=statuspage&logoColor=black)]()\n')
header_lines.append('[![Glama](https://img.shields.io/badge/Glama_MCP-Verified-blue?style=for-the-badge&logo=ai&logoColor=white)](https://glama.ai/mcp/servers/@Marcorojas17/arkhe-zero-global)\n')
header_lines.append('[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)]()\n\n')

header_lines.append('**"La prueba de autoría ya no es un objeto inerte. Es un proceso vivo que se auto-produce y se verifica."**\n\n')
header_lines.append('*Manifest: `e8d9eac8` • PVA: `800b02b6` • Toluca 11:22 • KRONOS 27054*\n\n')
header_lines.append('</div>\n\n---\n\n')

header_lines.append('## 🎯 ACCESOS RÁPIDOS (Lo más importante)\n\n')
header_lines.append('| Documento | Descripción |\n')
header_lines.append('| :--- | :--- |\n')
header_lines.append('| 📜 **[TESIS.md](./TESIS.md)** | Documento principal de la investigación doctoral |\n')
header_lines.append('| 🧬 **[ECOSYSTEM.md](./ECOSYSTEM.md)** | Arquitectura del Hub & Spoke (Trust Layer) |\n')
header_lines.append('| 🐍 **[arkhe_server.py](./arkhe_server.py)** | Servidor MCP local con la regla 51/49 |\n')
header_lines.append('| ☁️ **[global_server.py](./global_server.py)** | Servidor MCP desplegado en Render |\n')
header_lines.append('| ⛓️ **[contracts/ArkheLicense.sol](./contracts/ArkheLicense.sol)** | Smart Contract de monetización |\n')
header_lines.append('| 📋 **[CERTIFICADO-FINAL.json](./CERTIFICADO-FINAL.json)** | Certificado sellado en Bitcoin (OTS) |\n')
header_lines.append('| 🏛️ **[README-ETERNO.md](./README-ETERNO.md)** | Manifiesto de los 3 Nodos Eternos |\n')
header_lines.append('| 💰 **[PAGO.md](./PAGO.md)** | Página de venta y links de MercadoPago |\n\n')

header_lines.append('### 🌐 Endpoints en Producción\n')
header_lines.append('- **MCP Cloud (Render):** `https://arkhe-zero-global.onrender.com/sse`\n')
header_lines.append('- **GitHub Pages:** `https://marcorojas17.github.io/kronos-protocol/`\n')
header_lines.append('- **IPFS (CID):** `QmfUcXQuktf8WAjB8RAa5rqLbonUf4QK3EZ7TYcwDBiVxf`\n')
header_lines.append('- **Glama Directory:** `https://glama.ai/mcp/servers/@Marcorojas17/arkhe-zero-global`\n\n')

header_lines.append('---\n\n## 🗺️ MAPA MAESTRO DEL REPOSITORIO (Enlaces a todo)\n\n')
header_lines.append('> **Nota:** Haz clic en cualquier carpeta o archivo para navegar directamente en GitHub.\n\n')

def generate_tree(startpath, max_depth=2):
    ignore = {'.git', 'node_modules', 'venv', '__pycache__', '.pytest_cache', '.vscode', 'dist', 'build', '.github'}
    md_tree = ""
    for root, dirs, files in os.walk(startpath):
        level = root.replace(startpath, '').count(os.sep)
        if level >= max_depth:
            del dirs[:]
            continue
            
        dirs[:] = [d for d in dirs if d not in ignore and not d.startswith('.')]
        
        indent = '  ' * level
        
        if level == 0:
            folder_name = "Raíz del Proyecto"
        else:
            folder_name = os.path.basename(root)
            rel_path = os.path.relpath(root, startpath).replace("\\\\", "/")
            md_tree += f"{indent}* **📁 [{folder_name}](./{rel_path})/**\n"
            
        subindent = '  ' * (level + 1)
        for f in sorted(files):
            if f.startswith('.') or f.endswith('.pyc') or f.endswith('.tar.gz') or f.endswith('.b64'): continue
            rel_path = os.path.relpath(os.path.join(root, f), startpath).replace("\\\\", "/")
            url_path = rel_path.replace(" ", "%20")
            md_tree += f"{subindent}* 📄 [{f}](./{url_path})\n"
    return md_tree

footer_lines = []
footer_lines.append('\n---\n\n<div align="center">\n\n')
footer_lines.append('```text\n')
footer_lines.append('+-------------------------------------------------------------------+\n')
footer_lines.append('|  > QUIERO ENTRAR_                                                 |\n')
footer_lines.append('+-------------------------------------------------------------------+\n')
footer_lines.append('```\n\n')
footer_lines.append('**Investigación desarrollada por Marco Antonio Rojas Valdovinos**\n')
footer_lines.append('*El legado no se hereda. Se firma. ○_●*\n\n')
footer_lines.append('[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-LIVE-00ff41?style=for-the-badge&logo=github)](https://marcorojas17.github.io/kronos-protocol/)\n\n')
footer_lines.append('</div>\n')

with open("README.md", "w", encoding="utf-8") as f:
    f.write("".join(header_lines))
    f.write(generate_tree(".", max_depth=2))
    f.write("".join(footer_lines))

print("✅ README.md actualizado y enlazado exitosamente.")
