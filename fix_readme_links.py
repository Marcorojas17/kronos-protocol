with open("README.md", "r", encoding="utf-8") as f:
    content = f.read()

# Reemplazar las rutas viejas por las nuevas carpetas
content = content.replace("./TESIS.md", "./academic_thesis/TESIS.md")
content = content.replace("./ECOSYSTEM.md", "./academic_thesis/ECOSYSTEM.md")
content = content.replace("./arkhe_server.py", "./core_system/arkhe_server.py")
content = content.replace("./global_server.py", "./core_system/global_server.py")
content = content.replace("./contracts/ArkheLicense.sol", "./core_system/contracts/ArkheLicense.sol")
content = content.replace("./PAGO.md", "./experiments_and_lore/web/PAGO.md")

with open("README.md", "w", encoding="utf-8") as f:
    f.write(content)

print("✅ Enlaces del README actualizados a la nueva estructura.")
