# KRONOS-PROTOCOL - ARKHE ZERO - TLD Hunter v1
# ICANN Round 2 - 2026

targets = {
    ".agent": ["arkhe", "kronos", "mx-origin", "ecatepec", "guardian", "zero"],
    ".gpt": ["arkhe", "kronos", "mx"],
    ".chatgpt": ["arkhe", "kronos", "malla"],
    ".superintelligence": ["arkhe", "kronos", "mx"],
    ".metaai": ["arkhe", "kronos"],
    ".aiglasses": ["arkhe"],
    ".gemini": ["arkhe", "kronos"],
    ".skill": ["arkhe", "guardian", "kronos"],
    ".operator": ["arkhe", "kronos-protocol"],
    ".claude": ["arkhe"],
}

print("o_ KRONOS TLD HUNTER - Fase de pre-registro")
print(f"Total de combinaciones: {sum(len(v) for v in targets.values())}\n")

for tld, names in targets.items():
    status = "EN DISPUTA" if tld == ".agent" else "SOLICITADO"
    print(f"[{status}] {tld}")
    for name in names:
        print(f"  -> {name}{tld} - PRIORIDAD ALTA")
    print()

print("\nPróximos pasos:")
print("1. Crear cuenta en Cloudflare Registrar (costo al precio base, sin sobreprecio)")
print("2. Apuntarse a la waitlist: cloudflare.com / ICANN new gTLDs")
print("3. Preparar $20-50 por dominio por año. Los .agent premium se irán a $500+ en subasta inicial.")
print("4. Tu nodo MX-ORIGIN ya puede responder como arkhe.agent aunque el dominio no exista aún (hosts file)")
