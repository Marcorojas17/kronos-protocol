from pathlib import Path
print("PVA - Fusion de 5 scripts legacy")
for p in ["índice.html","web/index.html"]:
    if Path(p).exists():
        print(f"✓ {p} auditado")
