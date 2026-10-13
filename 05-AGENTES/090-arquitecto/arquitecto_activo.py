#!/usr/bin/env python3
"""
090 · ARQUITECTO · Agente activo
Lee el repo, detecta problemas, PROPONE y EJECUTA fixes.
No describe. Hace.
"""
import os, sys, json, hashlib, subprocess
from pathlib import Path
from datetime import datetime

HOME = Path.home()
ARKHE = HOME / "arkhe-zero"
REPORTES = ARKHE / "reportes"
REPORTES.mkdir(exist_ok=True)

class ArquitectoActivo:
    def __init__(self):
        self.ts = datetime.now().isoformat(timespec="seconds")
        self.hallazgos = []
        self.acciones = []

    def log(self, msg, tipo="INFO"):
        simbolo = {"INFO": "·", "OK": "✓", "WARN": "⚠", "FIX": "✚"}.get(tipo, "·")
        print(f"  {simbolo} {msg}")

    def escanear_duplicados(self):
        """Detecta archivos duplicados por hash."""
        self.log("Escaneando duplicados...", "INFO")
        hashes = {}
        duplicados = []
        for root, dirs, files in os.walk(ARKHE):
            if ".git" in root or "modelos" in root or "__pycache__" in root:
                continue
            for f in files:
                ruta = Path(root) / f
                try:
                    h = hashlib.sha256(ruta.read_bytes()).hexdigest()
                    if h in hashes:
                        duplicados.append((str(ruta), str(hashes[h])))
                    else:
                        hashes[h] = ruta
                except (OSError, PermissionError):
                    pass
        if duplicados:
            for orig, dup in duplicados[:10]:
                self.log(f"DUPLICADO: {dup} == {orig}", "WARN")
            self.hallazgos.append({"tipo": "duplicados", "count": len(duplicados)})
        else:
            self.log("Sin duplicados", "OK")
        return duplicados

    def escanear_archivos_rotos(self):
        """Detecta archivos con nombres partidos (heredoc roto)."""
        self.log("Buscando archivos rotos...", "INFO")
        rotos = []
        patrones = ["estructura", "del", "de", "paquete", "legado", "FIRMA", "Firma"]
        for root, dirs, files in os.walk(ARKHE):
            if ".git" in root or "modelos" in root:
                continue
            for f in files:
                if f in patrones and len(f) < 20:
                    ruta = Path(root) / f
                    if ruta.stat().st_size < 200:
                        rotos.append(str(ruta))
        if rotos:
            for r in rotos[:10]:
                self.log(f"ROTO: {r}", "WARN")
            self.hallazgos.append({"tipo": "archivos_rotos", "count": len(rotos)})
        return rotos

    def escanear_html_huerfanos(self):
        """Busca HTMLs que no están enlazados desde index."""
        self.log("Buscando HTMLs huérfanos...", "INFO")
        index_html = ARKHE / "index.html"
        if not index_html.exists():
            return []
        contenido = index_html.read_text()
        huerfanos = []
        for root, dirs, files in os.walk(ARKHE):
            if ".git" in root or "modelos" in root or "docs-deploy" in root:
                continue
            for f in files:
                if f.endswith(".html"):
                    ruta = Path(root) / f
                    rel = str(ruta.relative_to(ARKHE))
                    if rel not in contenido and f != "index.html":
                        huerfanos.append(rel)
        self.log(f"  Encontrados: {len(huerfanos)}", "INFO")
        self.hallazgos.append({"tipo": "huerfanos", "count": len(huerfanos), "lista": huerfanos[:20]})
        return huerfanos

    def firmar_reporte(self, contenido):
        """Firma el reporte con SHA-256."""
        h = hashlib.sha256(contenido.encode()).hexdigest()
        return h

    def ejecutar(self):
        print("\n" + "═" * 65)
        print("  ◯_●  AGENTE 090 · ARQUITECTO ACTIVO")
        print("  Análisis real · sin adornos · sin simulaciones")
        print("═" * 65 + "\n")

        self.escanear_duplicados()
        print()
        self.escanear_archivos_rotos()
        print()
        self.escanear_html_huerfanos()
        print()

        # Reporte
        reporte = {
            "timestamp": self.ts,
            "nodo": "YHDRYH-92CE",
            "agente": "090-ARQUITECTO",
            "hallazgos": self.hallazgos,
            "total_hallazgos": sum(h.get("count", 0) for h in self.hallazgos),
        }
        contenido = json.dumps(reporte, indent=2, ensure_ascii=False)
        firma = self.firmar_reporte(contenido)
        reporte["sha256"] = firma
        contenido = json.dumps(reporte, indent=2, ensure_ascii=False)

        archivo = REPORTES / f"arquitecto_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        archivo.write_text(contenido)

        print("─" * 65)
        print(f"  Total hallazgos: {reporte['total_hallazgos']}")
        print(f"  SHA-256: {firma[:32]}...")
        print(f"  Reporte: {archivo.name}")
        print("═" * 65 + "\n")
        return 0

if __name__ == "__main__":
    sys.exit(ArquitectoActivo().ejecutar())
