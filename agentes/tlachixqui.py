#!/usr/bin/env python3
"""TLACHIXQUI · Observador · Auditor de sistema"""
import os, sys, re
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from base import Agente

class Tlachixqui(Agente):
    def __init__(self):
        super().__init__("TLACHIXQUI", "Observador · Auditor")

    def auditar(self):
        self.log("Iniciando auditoría del sistema...")
        problemas = []
        logs_dir = self.logs
        for f in os.listdir(logs_dir):
            if f.endswith(".log"):
                ruta = os.path.join(logs_dir, f)
                with open(ruta, "r", errors="ignore") as fh:
                    contenido = fh.read()
                errores = len(re.findall(r"ERROR|FAIL|CRITICAL", contenido))
                if errores > 0:
                    problemas.append(f"{f}: {errores} errores")
                else:
                    self.log(f"  [OK] {f}", "CHECK")
        if problemas:
            for p in problemas:
                self.log(f"  [ALERTA] {p}", "WARN")
            return 1
        self.log("Auditoría completa · 0 problemas", "OK")
        return 0

if __name__ == "__main__":
    sys.exit(Tlachixqui().auditar())
