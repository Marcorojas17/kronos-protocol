#!/usr/bin/env python3
"""CUICATL · Canto · Publicista · genera contenido para redes"""
import sys, random
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from base_soberano import AgenteSoberano

FRASES = [
    "El legado no se hereda. Se firma.",
    "51% humano. 49% IA. 100% real.",
    "KINTSUGI · Reparar con oro lo que estaba roto.",
    "Tu voz, custodiada para siempre.",
    "Criptografía poscuántica para tu obra.",
    "El Índice Cero ya está sellado.",
    "Safe Creative 2607146379465 · Ethereum 0xd2c2a7e1…",
    "Soberanía digital. Sin intermediarios.",
    "ARKHÉ ZERO · El Índice Primigenio Soberano.",
]

class Cuicatl(AgenteSoberano):
    def __init__(self):
        super().__init__("CUICATL", "Canto · Publicista")

    def generar_post(self, plataforma="x"):
        frase = random.choice(FRASES)
        if plataforma == "x":
            return f"{frase}\n\n⚜️ arkhe.zero\n#ARKHE #KINTSUGI #LegadoDigital #PQC"
        elif plataforma == "instagram":
            return f"◯_● ARKHÉ ZERO\n\n{frase}\n\n51/49/100 · KINTSUGI\n\n#arkhezero #kintsugi #legadodigital"
        elif plataforma == "linkedin":
            return f"El legado digital merece infraestructura propia.\n\n{frase}\n\nARKHÉ ZERO · Soberanía tecnológica real."
        return frase

    def ejecutar_generacion(self, plataforma="x", cantidad=3):
        self.log(f"Generando {cantidad} posts para {plataforma}...", "INFO")
        out_dir = self.arkhe / "contenido" / "cuicatl"
        out_dir.mkdir(parents=True, exist_ok=True)
        for i in range(cantidad):
            post = self.generar_post(plataforma)
            ruta = out_dir / f"post_{plataforma}_{i+1}.txt"
            with open(ruta, "w") as f:
                f.write(post)
            self.log(f"  [OK] {ruta.name}", "OK")
            print(f"\n--- Post {i+1} ---\n{post}\n")
        print(f"\n{self.sello()}\n")
        return 0

if __name__ == "__main__":
    plat = sys.argv[1] if len(sys.argv) > 1 else "x"
    cant = int(sys.argv[2]) if len(sys.argv) > 2 else 3
    sys.exit(Cuicatl().ejecutar_generacion(plat, cant))
