#!/usr/bin/env python3
"""TONAL · Notario · Firma archivos con openssl Ed25519"""
import os, sys, subprocess
sys.path.insert(0, str(__import__('pathlib').Path.home() / 'arkhe-zero' / 'runtime'))
from mandate_gate import verificar as verificar_mandato
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from base import Agente

class Tonal(Agente):
    def __init__(self):
        super().__init__("TONAL", "Día · Notario")

    def firmar(self, archivo):
        # Mandate Gate: verificar permiso
        permitido, razon = verificar_mandato("tonal", "firmar_archivo")
        if not permitido:
            self.log(f"Mandate Gate DENEGÓ: {razon}", "ERROR")
            return 1
        if not os.path.exists(archivo):
            self.log(f"Archivo no existe: {archivo}", "ERROR")
            return 1
        firma_dir = os.path.join(self.home, "firma")
        os.makedirs(firma_dir, exist_ok=True)
        priv_key = os.path.join(firma_dir, "privada.pem")
        if not os.path.exists(priv_key):
            self.log("Generando clave Ed25519...", "INFO")
            subprocess.run(["openssl", "genpkey", "-algorithm", "ED25519",
                          "-out", priv_key], check=True)
            pub_key = os.path.join(firma_dir, "publica.pem")
            subprocess.run(["openssl", "pkey", "-in", priv_key,
                          "-pubout", "-out", pub_key], check=True)
        firma = archivo + ".sig"
        subprocess.run(["openssl", "pkeyutl", "-sign", "-inkey", priv_key,
                       "-rawin", "-in", archivo, "-out", firma], check=True)
        h = self.sha256(archivo)
        self.log(f"Firmado: {archivo}", "OK")
        self.log(f"  SHA-256: {h[:32]}...", "INFO")
        self.log(f"  Firma:   {firma}", "INFO")
        print(f"\n{self.sello()}\n")
        return 0

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: tonal.py <archivo>")
        sys.exit(1)
    sys.exit(Tonal().firmar(sys.argv[1]))
