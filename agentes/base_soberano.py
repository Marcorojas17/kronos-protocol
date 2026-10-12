#!/usr/bin/env python3
"""
Agente soberano · sin APIs externas · sin dependencias de terceros.
Solo Python estándar + herramientas del sistema.
"""
import os, json, hashlib, subprocess
from datetime import datetime
from pathlib import Path

class AgenteSoberano:
    def __init__(self, nombre, rol, tipo="cultural"):
        self.nombre = nombre
        self.rol = rol
        self.tipo = tipo
        self.home = Path.home()
        self.arkhe = self.home / "arkhe-zero"
        self.logs = self.arkhe / "logs"
        self.logs.mkdir(parents=True, exist_ok=True)

    def log(self, mensaje, tipo="INFO"):
        ts = datetime.now().isoformat(timespec="seconds")
        linea = f"[{ts}] [{self.nombre}] [{tipo}] {mensaje}"
        print(linea)
        with open(self.logs / f"{self.nombre.lower()}.log", "a") as f:
            f.write(linea + "\n")

    def sha256(self, ruta):
        h = hashlib.sha256()
        with open(ruta, "rb") as f:
            for chunk in iter(lambda: f.read(8192), b""):
                h.update(chunk)
        return h.hexdigest()

    def ejecutar(self, cmd):
        """Ejecuta comando del sistema y devuelve stdout."""
        try:
            r = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
            return r.stdout, r.returncode
        except Exception as e:
            return str(e), 1

    def sello(self):
        return "◯_● · 51/49/100 · KINTSUGI"
