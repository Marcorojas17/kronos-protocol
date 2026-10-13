#!/usr/bin/env python3
"""Memoria temática · guarda conversaciones por tema"""
import json, hashlib
from pathlib import Path
from datetime import datetime

HOME = Path.home()
MEM = HOME / "arkhe-zero" / "ia" / "memoria"
MEM.mkdir(parents=True, exist_ok=True)
TEMAS_FILE = MEM / "temas.json"

def cargar_temas():
    if TEMAS_FILE.exists():
        with open(TEMAS_FILE) as f:
            return json.load(f)
    return {"temas": {}, "actual": "general"}

def guardar_temas(t):
    with open(TEMAS_FILE, "w") as f:
        json.dump(t, f, indent=2, ensure_ascii=False)

def agregar(tema, prompt, respuesta):
    t = cargar_temas()
    if tema not in t["temas"]:
        t["temas"][tema] = []
    t["temas"][tema].append({
        "ts": datetime.now().isoformat(timespec="seconds"),
        "p": prompt,
        "r": respuesta,
        "h": hashlib.sha256((prompt+respuesta).encode()).hexdigest()[:12],
    })
    t["temas"][tema] = t["temas"][tema][-30:]
    guardar_temas(t)

def contexto_tema(tema, ultimas=4):
    t = cargar_temas()
    sesiones = t["temas"].get(tema, [])[-ultimas:]
    if not sesiones:
        return ""
    ctx = f"\nHILO SOBRE '{tema}':\n"
    for s in sesiones:
        ctx += f"Tú: {s['p'][:70]}\n■_□: {s['r'][:100]}\n"
    return ctx

def listar_temas():
    t = cargar_temas()
    return {n: len(v) for n, v in t["temas"].items()}
