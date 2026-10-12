#!/usr/bin/env python3
"""ARKHÉ ZERO · Base de Agente"""
import os, json, hashlib
from datetime import datetime

class Agente:
    def __init__(self, nombre, rol):
        self.nombre = nombre
        self.rol = rol
        self.home = os.path.expanduser("~/arkhe-zero")
        self.logs = os.path.join(self.home, "logs")
        os.makedirs(self.logs, exist_ok=True)

    def log(self, mensaje, tipo="INFO"):
        ts = datetime.now().isoformat(timespec="seconds")
        linea = f"[{ts}] [{self.nombre}] [{tipo}] {mensaje}"
        print(linea)
        with open(os.path.join(self.logs, f"{self.nombre.lower()}.log"), "a") as f:
            f.write(linea + "\n")

    def sha256(self, ruta):
        h = hashlib.sha256()
        with open(ruta, "rb") as f:
            for chunk in iter(lambda: f.read(8192), b""):
                h.update(chunk)
        return h.hexdigest()

    def sello(self):
        return "◯_● · 51/49/100 · KINTSUGI"
