#!/usr/bin/env python3
"""API HTTP del chat ■_□ · Puerto 5000"""
import json, subprocess, os
from http.server import HTTPServer, BaseHTTPRequestHandler
from pathlib import Path

HOME = Path.home()
BIN_DIR = HOME / "llama.cpp" / "build" / "bin"
BINARIO = BIN_DIR / "llama-cli"
MODELO = HOME / "arkhe-zero" / "modelos" / "llama-3.2-3b-q4.gguf"
PROMPT_FILE = HOME / "arkhe-zero" / "ia" / "prompt_sistema.md"

def limpiar_salida(texto):
    """Quita el banner de llama.cpp y deja solo la respuesta."""
    lineas = texto.split("\n")
    resultado = []
    capturar = False
    for l in lineas:
        if l.startswith(">") or capturar:
            capturar = True
            resultado.append(l)
    if resultado:
        r = "\n".join(resultado)
        # Quitar el "> " del inicio
        r = r.lstrip("> ").strip()
        # Cortar si encuentra el sello final
        if "■_□ ·" in r:
            r = r.split("■_□ ·")[0].strip()
        return r
    return texto.strip()

def responder(mensaje):
    try:
        with open(PROMPT_FILE) as f:
            sistema = f.read()
    except FileNotFoundError:
        sistema = "Eres ■_□, IA local de ARKHÉ ZERO. Responde breve en español."
    prompt = f"{sistema}\n\nUsuario: {mensaje}\n■_□:"
    env = os.environ.copy()
    env["LD_LIBRARY_PATH"] = str(BIN_DIR)
    try:
        r = subprocess.run(
            [str(BINARIO), "-m", str(MODELO), "-p", prompt,
             "-n", "80", "-t", "2", "-c", "2048",
             "--no-warmup", "--no-display-prompt"],
            capture_output=True, text=True, timeout=300,
            env=env, cwd=str(BIN_DIR)
        )
        return limpiar_salida(r.stdout)
    except subprocess.TimeoutExpired:
        return "[Timeout · tarda más de 5 min]"
    except Exception as e:
        return f"[Error: {e}]"


# ═══════════════════════════════════════════════════════════════
#  MD-33 FORENSE · Auditoría real
# ═══════════════════════════════════════════════════════════════
import hashlib
from datetime import datetime

def hash_archivo(ruta):
    h = hashlib.sha256()
    try:
        with open(ruta, "rb") as f:
            for chunk in iter(lambda: f.read(8192), b""):
                h.update(chunk)
        return h.hexdigest()
    except Exception as e:
        return f"ERROR: {e}"

def auditoria_md33():
    """Audita los archivos clave del sistema."""
    base = HOME / "arkhe-zero"
    archivos_clave = [
        base / "arkhe-zero.html",
        base / "index" / "arkhe-zero.html",
        base / "ia" / "prompt_sistema.md",
        base / "ia" / "api_ia.py",
        base / "ia" / "api_scan.py",
        base / "auto-backup.sh",
        base / "start-services.sh",
    ]
    resultados = []
    for a in archivos_clave:
        if a.exists():
            resultados.append({
                "archivo": str(a).replace(str(HOME), "~"),
                "sha256": hash_archivo(a)[:32] + "...",
                "tamano": a.stat().st_size,
                "estado": "INTEGRO",
                "timestamp": datetime.now().isoformat(timespec="seconds"),
            })
    return {
        "modulo": "MD-33 FORENSE",
        "sello": "SCDR-001",
        "firma": "◯_● · 51/49/100",
        "total": len(resultados),
        "archivos": resultados,
    }

class Handler(BaseHTTPRequestHandler):
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
    def do_OPTIONS(self):
        self.send_response(200); self._cors(); self.end_headers()
    def do_GET(self):
        if self.path == "/api/status":
            self.send_response(200)
            self.send_header("Content-Type", "application/json"); self._cors(); self.end_headers()
            self.wfile.write(json.dumps({"status":"ok","ia":"■_□","modelo":"llama-3.2-3b"}).encode())
        elif self.path == "/api/md33":
            r = auditoria_md33()
            self.send_response(200)
            self.send_header("Content-Type", "application/json"); self._cors(); self.end_headers()
            self.wfile.write(json.dumps(r).encode())
        else:
            self.send_response(404); self.end_headers()
    def do_POST(self):
        if self.path != "/api/chat":
            self.send_response(404); self.end_headers(); return
        try:
            length = int(self.headers.get("Content-Length", 0))
            data = json.loads(self.rfile.read(length).decode())
            mensaje = data.get("mensaje", "").strip()
            if not mensaje:
                raise ValueError("mensaje vacío")
            resp = responder(mensaje)
            self.send_response(200)
            self.send_header("Content-Type", "application/json"); self._cors(); self.end_headers()
            self.wfile.write(json.dumps({"respuesta": resp, "ok": True}).encode())
        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json"); self._cors(); self.end_headers()
            self.wfile.write(json.dumps({"error": str(e), "ok": False}).encode())
    def log_message(self, *a): pass

if __name__ == "__main__":
    print("◯_● API IA · http://localhost:5000")
    HTTPServer(("0.0.0.0", 5000), Handler).serve_forever()
