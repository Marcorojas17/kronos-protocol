#!/usr/bin/env python3
"""API de escaneo real · Python sockets · puerto 5001"""
import json, socket, subprocess
from http.server import HTTPServer, BaseHTTPRequestHandler

PUERTOS_COMUNES = [21, 22, 23, 25, 53, 80, 110, 143, 443, 445, 3306, 3389, 5432, 8080, 8443, 5000, 5001]

def escanear(target="127.0.0.1", puertos=None):
    puertos = puertos or PUERTOS_COMUNES
    abiertos, cerrados = [], []
    for p in puertos:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(0.5)
        try:
            if s.connect_ex((target, p)) == 0:
                abiertos.append(p)
            else:
                cerrados.append(p)
        except Exception:
            cerrados.append(p)
        finally:
            s.close()
    return {"target": target, "abiertos": abiertos, "cerrados": cerrados, "total": len(puertos)}

class Handler(BaseHTTPRequestHandler):
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
    def do_OPTIONS(self):
        self.send_response(200); self._cors(); self.end_headers()
    def do_GET(self):
        if self.path == "/api/scan":
            r = escanear()
            self.send_response(200)
            self.send_header("Content-Type", "application/json"); self._cors(); self.end_headers()
            self.wfile.write(json.dumps(r).encode())
        else:
            self.send_response(404); self.end_headers()
    def do_POST(self):
        if self.path != "/api/scan":
            self.send_response(404); self.end_headers(); return
        try:
            length = int(self.headers.get("Content-Length", 0))
            data = json.loads(self.rfile.read(length).decode() or "{}")
            r = escanear(data.get("target", "127.0.0.1"), data.get("puertos", PUERTOS_COMUNES))
            self.send_response(200)
            self.send_header("Content-Type", "application/json"); self._cors(); self.end_headers()
            self.wfile.write(json.dumps(r).encode())
        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json"); self._cors(); self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
    def log_message(self, *a): pass

if __name__ == "__main__":
    print("◯_● API Scan · http://localhost:5001")
    HTTPServer(("0.0.0.0", 5001), Handler).serve_forever()
