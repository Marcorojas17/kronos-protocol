#!/usr/bin/env python3
"""CUICATL con IA local · genera contenido usando ■_□"""
import sys, subprocess
from pathlib import Path

WRAPPER = Path.home() / "arkhe-zero" / "ia" / "■_□.py"

def cuicatl_ia(tema):
    prompt = f"Genera un post corto y poético sobre ARKHÉ ZERO. Tema: {tema}"
    r = subprocess.run(["python3", str(WRAPPER), prompt],
                      capture_output=True, text=True, timeout=600)
    return r.stdout

if __name__ == "__main__":
    tema = " ".join(sys.argv[1:]) or "KINTSUGI"
    print(f"\n◯_● CUICATL · Generando post sobre: {tema}\n")
    print(cuicatl_ia(tema))
    print("◯_● · ■_□ · 51/49/100\n")
