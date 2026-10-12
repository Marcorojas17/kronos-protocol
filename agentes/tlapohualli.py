#!/usr/bin/env python3
"""TLAPOHUALLI · Contador · Métricas reales"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from base import Agente

class Tlapohualli(Agente):
    def __init__(self):
        super().__init__("TLAPOHUALLI", "Contador · Analista")

    def contar(self):
        home = self.home
        total_archivos = 0
        total_bytes = 0
        for root, dirs, files in os.walk(home):
            if ".git" in root or "backups" in root:
                continue
            for f in files:
                ruta = os.path.join(root, f)
                try:
                    total_archivos += 1
                    total_bytes += os.path.getsize(ruta)
                except OSError:
                    pass
        backups = os.path.expanduser("~/arkhe-backups")
        backups_size = 0
        backups_count = 0
        if os.path.isdir(backups):
            for root, dirs, files in os.walk(backups):
                for f in files:
                    try:
                        backups_count += 1
                        backups_size += os.path.getsize(os.path.join(root, f))
                    except OSError:
                        pass
        self.log(f"Archivos del proyecto: {total_archivos}", "METRIC")
        self.log(f"Tamaño del proyecto:   {total_bytes//1024} KB", "METRIC")
        self.log(f"Backups en disco:      {backups_count}", "METRIC")
        self.log(f"Tamaño backups:        {backups_size//1024} KB", "METRIC")
        return 0

if __name__ == "__main__":
    sys.exit(Tlapohualli().contar())
