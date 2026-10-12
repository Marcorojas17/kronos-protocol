#!/usr/bin/env python3
"""096 HUNTER · Ciberseguridad ofensiva · nmap REAL"""
import os, sys, subprocess
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from base import Agente

class Hunter(Agente):
    def __init__(self):
        super().__init__("HUNTER-096", "Ciberseguridad · Red Team")

    def escanear(self, target="127.0.0.1"):
        self.log(f"Escanenado {target}...", "INFO")
        try:
            r = subprocess.run(["nmap", "-sV", "-p", "22,80,443,8080", target],
                             capture_output=True, text=True, timeout=60)
            for linea in r.stdout.split("\n"):
                if "open" in linea or "Nmap" in linea or "Host is" in linea:
                    self.log(f"  {linea.strip()}", "SCAN")
            self.log("Escaneo completo", "OK")
            return 0
        except FileNotFoundError:
            self.log("nmap no instalado · apt install nmap", "ERROR")
            return 1
        except subprocess.TimeoutExpired:
            self.log("Timeout del escaneo", "ERROR")
            return 1

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "127.0.0.1"
    sys.exit(Hunter().escanear(target))
