import os

# Archivos y carpetas a ignorar
IGNORE = {'.git', 'node_modules', 'venv', '__pycache__', '.pytest_cache', '.vscode', 'Pinata_Download', '.github'}
IGNORE_FILES = {'.env', 'generate_readme.py'}

# Extensiones de imagen y binarios (para no linkear con vista de texto)
BINARY_EXT = {'.png', '.jpg', '.jpeg', '.webp', '.gif', '.wav', '.mp3', '.tar.gz', '.zip', '.apk', '.pdf', '.ots', '.b64'}

def build_tree(path, level=0):
    items = []
    try:
        entries = sorted(os.listdir(path))
    except:
        return items

    # Separar carpetas y archivos
    dirs = [e for e in entries if os.path.isdir(os.path.join(path, e)) and e not in IGNORE and not e.startswith('.')]
    files = [e for e in entries if os.path.isfile(os.path.join(path, e)) and e not in IGNORE_FILES]

    # Carpetas primero
    for d in dirs:
        rel = os.path.relpath(os.path.join(path, d))
        items.append(f"{'  '*level}📁 **[{d}](./{rel})/**")
        items.extend(build_tree(os.path.join(path, d), level + 1))

    # Luego archivos
    for f in files:
        full = os.path.join(path, f)
        rel = os.path.relpath(full)
        size = os.path.getsize(full)
        size_str = f"{size/1024:.1f}KB" if size > 1024 else f"{size}B"
        ext = os.path.splitext(f)[1].lower()
        icon = "📄"
        if ext in {'.py'}: icon = "🐍"
        elif ext in {'.md'}: icon = "📘"
        elif ext in {'.json'}: icon = "📋"
        elif ext in {'.sh'}: icon = "⚙️"
        elif ext in {'.html'}: icon = "🌐"
        elif ext in {'.sol'}: icon = "⛓️"
        elif ext in BINARY_EXT: icon = "🔒"
        items.append(f"{'  '*level}{icon} [{f}](./{rel}) `{size_str}`")

    return items

tree_lines = build_tree('.')
tree_text = "\n".join(tree_lines)

readme = f"""<div align="center">

```text
    ___    ____  __ __ __  ________   _____   __________  ____
   /   |  / __ \\/ //_// / / / ____/  /__  /  / ____/ __ \\/ __ \\
  / /| | / /_/ / ,<  / /_/ / __/       / /  / __/ / /_/ / / / /
 / ___ |/ _, _/ /| |/ __  / /___      / /__/ /___/ _, _/ /_/ /
/_/  |_/_/ |_/_/ |_/_/ /_/_____/     /____/_____/_/ |_|\\____/

SISTEMA DE AUTORÍA HUMANO-IA INICIADO ○_●
https://img.shields.io/badge/Python-3.10+-00f3ff?style=for-the-badge&logo=python&logoColor=white
https://img.shields.io/badge/MCP-ACTIVE-ff00ff?style=for-the-badge&logo=protocols.io&logoColor=white
https://img.shields.io/badge/STATUS-LIVE-00ff00?style=for-the-badge&logo=statuspage&logoColor=black
https://img.shields.io/badge/Glama_MCP-Verified-blue?style=for-the-badge&logo=ai&logoColor=white
https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge

"La prueba de autoría ya no es un objeto inerte. Es un proceso vivo que se auto-produce y se verifica."

Manifest: e8d9eac8 • PVA: 800b02b6 • Toluca 11:22 • KRONOS 27054

</div>

---

🎯 ACCESOS RÁPIDOS (Lo más importante)

Documento Descripción
📜 TESIS.md Documento principal de la investigación doctoral
🧬 ECOSYSTEM.md Arquitectura del Hub & Spoke (Trust Layer)
🐍 arkhe_server.py Servidor MCP local con la regla 51/49
☁️ global_server.py Servidor MCP desplegado en Render
⛓️ contracts/ArkheLicense.sol Smart Contract de monetización
📋 CERTIFICADO-FINAL.json Certificado sellado en Bitcoin (OTS)
🏛️ README-ETERNO.md Manifiesto de los 3 Nodos Eternos
💰 PAGO.md Página de venta y links de MercadoPago
📣 PITCH_WHATSAPP.txt Texto de venta para redes sociales

🌐 Endpoints en Producción

· MCP Cloud (Render): https://arkhe-zero-global.onrender.com/sse
· GitHub Pages: https://marcorojas17.github.io/kronos-protocol/
· IPFS (CID): QmfUcXQuktf8WAjB8RAa5rqLbonUf4QK3EZ7TYcwDBiVxf
· Glama Directory: https://glama.ai/mcp/servers/@Marcorojas17/arkhe-zero-global

---

🧬 ARQUITECTURA DEL SISTEMA

```mermaid
graph TD
    classDef human fill:#00f3ff,stroke:#0088cc,stroke-width:2px,color:#000;
    classDef ai fill:#ff00ff,stroke:#cc00cc,stroke-width:2px,color:#000;
    classDef server fill:#ffcc00,stroke:#cc9900,stroke-width:3px,color:#000;
    classDef hash fill:#00ff00,stroke:#009900,stroke-width:2px,color:#000;
    classDef blockchain fill:#ffffff,stroke:#333,stroke-width:2px,color:#000;

    H([Humano <br/> 51%]):::human --> MCP
    AI([IA <br/> 49%]):::ai --> MCP
    MCP((Servidor MCP <br/> ARKHÉ ZERO)):::server --> HASH([Hash SHA-256 <br/> Determinista]):::hash
    HASH --> BC[(Blockchain <br/> Bitcoin OTS / Arbitrum)]:::blockchain
    EXT([Agentes IA: <br/> Gemini, Llama, etc.]):::ai -.->|API / SSE| MCP
```

---

📂 MAPA COMPLETO DEL REPOSITORIO

Nota: Los archivos marcados con 🔒 son binarios (imágenes, audio, comprimidos) o están anclados en la blockchain. Los enlaces te llevan directamente al archivo en GitHub.

{tree_text}

---

<div align="center">

```text
+-------------------------------------------------------------------+
|  > QUIERO ENTRAR_                                                 |
+-------------------------------------------------------------------+
```

Investigación desarrollada por Marco Antonio Rojas Valdovinos
El legado no se hereda. Se firma. ○_●

https://img.shields.io/badge/GitHub_Pages-LIVE-00ff41?style=for-the-badge&logo=github

</div>
"""

with open("README.md", "w", encoding="utf-8") as f:
f.write(readme)

print(f"✅ README.md generado con {len(tree_lines)} elementos del repositorio.")
print(f"📄 Tamaño del archivo: {len(readme)/1024:.1f} KB")
