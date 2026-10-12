#!/usr/bin/env python3
"""■_□ · IA Local con memoria persistente"""
import subprocess, sys, os, json, hashlib
from pathlib import Path
from datetime import datetime

HOME = Path.home()
ARKHE = HOME / "arkhe-zero"
IA_DIR = ARKHE / "ia"
MEM_DIR = IA_DIR / "memoria"
MEM_DIR.mkdir(parents=True, exist_ok=True)

MODELO_3B = ARKHE / "modelos" / "llama-3.2-3b-q4.gguf"
MODELO_05B = ARKHE / "modelos" / "qwen2-0_5b-instruct-q4_k_m.gguf"
MODELO = MODELO_3B if MODELO_3B.exists() else MODELO_05B

BIN_DIR = HOME / "llama.cpp" / "build" / "bin"
BINARIO = BIN_DIR / "llama-cli"
HISTORIAL = MEM_DIR / "historial.json"

def cargar_historial():
    if HISTORIAL.exists():
        with open(HISTORIAL) as f:
            return json.load(f)
    return {"sesiones": [], "contexto_permanente": ""}

def guardar_historial(h):
    with open(HISTORIAL, "w") as f:
        json.dump(h, f, indent=2, ensure_ascii=False)

def agregar_sesion(prompt, respuesta):
    h = cargar_historial()
    h["sesiones"].append({
        "timestamp": datetime.now().isoformat(),
        "prompt": prompt,
        "respuesta": respuesta,
        "hash": hashlib.sha256((prompt+respuesta).encode()).hexdigest()[:16],
    })
    h["sesiones"] = h["sesiones"][-100:]
    guardar_historial(h)

def construir_contexto(max_sesiones=3):
    """Lee la base de conocimiento + últimas N sesiones."""
    try:
        with open(IA_DIR / "prompt_sistema.md", encoding="utf-8") as f:
            base = f.read()
    except FileNotFoundError:
        base = "Eres ■_□, IA local de ARKHÉ ZERO. Si no sabes algo, di 'no tengo información confiable'.\n"
    
    h = cargar_historial()
    sesiones = h.get("sesiones", [])[-max_sesiones:]
    
    ctx = base + "\n\n"
    if sesiones:
        ctx += "CONVERSACIONES RECIENTES:\n"
        for s in sesiones:
            ctx += f"Tú: {s['prompt'][:80]}\n"
            ctx += f"■_□: {s['respuesta'][:120]}\n\n"
    
    ctx += "\nResponde según las REGLAS CRÍTICAS. Si no está en la hoja, di 'No tengo información confiable sobre eso.'\n"
    return ctx

def olvidar_todo():
    for f in [HISTORIAL, MEM_DIR/"contexto.md", MEM_DIR/"ultima_sesion.txt"]:
        if f.exists(): f.unlink()
    print("  [✓] Memoria borrada")

def stats_memoria():
    h = cargar_historial()
    total = len(h.get("sesiones", []))
    print(f"\n■_□ ESTADÍSTICAS DE MEMORIA")
    print(f"  Sesiones guardadas: {total}")
    if total:
        print(f"  Primera: {h['sesiones'][0]['timestamp'][:10]}")
        print(f"  Última:  {h['sesiones'][-1]['timestamp'][:10]}")
    print(f"  Ruta: {HISTORIAL}")
    print(f"  Tamaño: {HISTORIAL.stat().st_size if HISTORIAL.exists() else 0} bytes\n")

def responder(prompt, tokens=80):
    ctx = construir_contexto()
    completo = f"{ctx}\nUsuario: {prompt}\n\n■_□:"
    env = os.environ.copy()
    env["LD_LIBRARY_PATH"] = str(BIN_DIR)
    cmd = [str(BINARIO), "-m", str(MODELO), "-p", completo,
           "-n", str(tokens), "-t", "2", "-c", "2048",
           "--no-warmup", "--no-display-prompt"]
    try:
        r = subprocess.run(cmd, capture_output=True, text=True,
                          timeout=900, env=env, cwd=str(BIN_DIR))
        return r.stdout.strip()
    except subprocess.TimeoutExpired:
        return "[Timeout]"
    except Exception as e:
        return f"[Error: {e}]"

def procesar_comando(texto):
    """Devuelve True si era un comando y lo manejó, False si es prompt."""
    t = texto.strip().lower().lstrip("/")
    if t in ("exit", "salir", "quit"):
        return "exit"
    if t in ("stats", "memoria", "estadisticas"):
        stats_memoria()
        return True
    if t in ("olvidar", "borrar", "reset"):
        conf = input("¿Borrar TODA la memoria? (si/no): ")
        if conf.lower() in ("si", "s", "y", "yes"):
            olvidar_todo()
        return True
    if t in ("contexto", "ctx"):
        print(f"\n{construir_contexto()}\n")
        return True
    if t in ("help", "ayuda", "?"):
        print("\nComandos:")
        print("  /stats     → ver memoria")
        print("  /olvidar   → borrar memoria")
        print("  /contexto  → ver contexto actual")
        print("  /exit      → salir\n")
        return True
    return False

def main():
    if len(sys.argv) < 2:
        print(f"\n■_□ IA LOCAL · MEMORIA PERSISTENTE")
        print(f"Modelo: {MODELO.name}")
        print(f"Pacto: 51/49/100")
        print(f"Escribe /help para comandos\n")
        print("─" * 60 + "\n")
        while True:
            try:
                p = input("Tú: ").strip()
            except (EOFError, KeyboardInterrupt):
                print("\n"); break
            if not p: continue
            r = procesar_comando(p)
            if r == "exit": break
            if r is True: continue
            print(f"\n■_□: ", end="", flush=True)
            resp = responder(p)
            print(resp)
            print()
            agregar_sesion(p, resp)
        print(f"\n■_□ · 51/49/100 · KINTSUGI\n")
        return
    # Modo argumento único
    texto = " ".join(sys.argv[1:])
    r = procesar_comando(texto)
    if r == "exit" or r is True:
        return
    print(f"\n■_□ · {MODELO.name}")
    resp = responder(texto)
    print(resp)
    print(f"\n■_□ · 51/49/100\n")
    agregar_sesion(texto, resp)

if __name__ == "__main__":
    main()
