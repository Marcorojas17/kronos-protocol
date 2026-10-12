#!/usr/bin/env python3
"""
ARKHÉ ZERO · Módulo de Auditoría Cuántica
Verifica que el sistema NO tenga criptografía vulnerable a cuántica.
100% autónomo. Solo Python + OpenSSL.
"""
import os, sys, subprocess, hashlib, json
from datetime import datetime
from pathlib import Path

HOME = Path.home()
ARKHE = HOME / "arkhe-zero"
REPORTES = ARKHE / "reportes"
REPORTES.mkdir(exist_ok=True)

# Algoritmos prohibidos (vulnerables a computación cuántica)
PROHIBIDOS = {
    "RSA": "Vulnerable al algoritmo de Shor. Reemplazar con ML-KEM.",
    "ECDSA": "Vulnerable a Shor. Reemplazar con ML-DSA.",
    "ECDH": "Vulnerable a Shor. Reemplazar con ML-KEM.",
    "DSA": "Vulnerable a Shor. Reemplazar con ML-DSA.",
    "DH": "Vulnerable a Shor. Reemplazar con ML-KEM.",
    "MD5": "Colisiones triviales. Reemplazar con SHA-3.",
    "SHA-1": "Colisiones factibles. Reemplazar con SHA-3.",
}

# Algoritmos aprobados NIST post-cuánticos
APROBADOS = {
    "ML-KEM": "FIPS 203 · Encapsulamiento",
    "ML-DSA": "FIPS 204 · Firmas",
    "SLH-DSA": "FIPS 205 · Firmas larga duración",
    "SHA-256": "Integridad (transitorio)",
    "SHA-3": "Integridad post-cuántica",
    "Ed25519": "Curva Edwards (transitorio, no PQC)",
    "AES-256": "Cifrado simétrico (cuánticamente resistente)",
}

class AuditoriaCuantica:
    def __init__(self):
        self.hallazgos = []
        self.aprobados = []
        self.criticos = 0

    def log(self, msg, tipo="INFO"):
        ts = datetime.now().isoformat(timespec="seconds")
        simbolo = {"INFO": "·", "OK": "✓", "WARN": "⚠", "CRIT": "✗"}.get(tipo, "·")
        print(f"[{ts}] {simbolo} {msg}")

    def scan_archivos(self):
        """Busca claves RSA/ECDSA en archivos del sistema."""
        self.log("Escaneando archivos del sistema...")
        extensiones_sospechosas = {".pem", ".key", ".crt", ".cer", ".pub"}
        for root, dirs, files in os.walk(ARKHE):
            if ".git" in root or "backups" in root:
                continue
            for f in files:
                ruta = Path(root) / f
                if ruta.suffix in extensiones_sospechosas:
                    self._analizar_archivo(ruta)

    def _analizar_archivo(self, ruta):
        try:
            with open(ruta, "r", errors="ignore") as fh:
                contenido = fh.read()
            for algo, razon in PROHIBIDOS.items():
                if algo in contenido:
                    self.hallazgos.append({
                        "archivo": str(ruta),
                        "algoritmo": algo,
                        "razon": razon,
                        "severidad": "CRIT",
                    })
                    self.criticos += 1
                    self.log(f"  [CRIT] {algo} en {ruta.name}", "CRIT")
                    return
            for algo, desc in APROBADOS.items():
                if algo in contenido:
                    self.aprobados.append({
                        "archivo": str(ruta),
                        "algoritmo": algo,
                        "descripcion": desc,
                    })
                    self.log(f"  [OK] {algo} en {ruta.name}", "OK")
                    return
        except Exception:
            pass

    def test_sha3(self):
        """Verifica que SHA-3 esté disponible (resistente a cuántica)."""
        self.log("Verificando SHA-3...")
        try:
            h = hashlib.sha3_256(b"ARKHE ZERO")
            self.log(f"  [OK] SHA-3-256 disponible: {h.hexdigest()[:16]}...", "OK")
            return True
        except Exception as e:
            self.log(f"  [CRIT] SHA-3 no disponible: {e}", "CRIT")
            self.criticos += 1
            return False

    def test_openssl_pqc(self):
        """Verifica si OpenSSL soporta algoritmos PQC."""
        self.log("Verificando soporte PQC en OpenSSL...")
        try:
            r = subprocess.run(["openssl", "list", "-public-key-algorithms"],
                             capture_output=True, text=True, timeout=10)
            soporta_mldsa = "ML-DSA" in r.stdout or "mldsa" in r.stdout.lower()
            soporta_mlkem = "ML-KEM" in r.stdout or "mlkem" in r.stdout.lower()
            if soporta_mldsa and soporta_mlkem:
                self.log("  [OK] OpenSSL soporta ML-DSA y ML-KEM", "OK")
            else:
                self.log("  [WARN] OpenSSL actual no soporta PQC nativo", "WARN")
                self.log("         → instalar liboqs (openssl PQC fork)", "INFO")
            return soporta_mldsa and soporta_mlkem
        except Exception as e:
            self.log(f"  [WARN] No se pudo verificar: {e}", "WARN")
            return False

    def test_ed25519_disponible(self):
        """Verifica firma Ed25519 (transitorio, no PQC pero útil)."""
        self.log("Verificando Ed25519...")
        firma_dir = ARKHE / "firma"
        firma_dir.mkdir(exist_ok=True)
        priv = firma_dir / "privada.pem"
        if not priv.exists():
            subprocess.run(["openssl", "genpkey", "-algorithm", "ED25519",
                          "-out", str(priv)], check=True)
        self.log("  [OK] Ed25519 operativo (usar mientras ML-DSA se despliega)", "OK")
        return True

    def scan_red_puertos(self):
        """Escaneo local de puertos abiertos (auditoría defensiva)."""
        self.log("Escaneando puertos locales...")
        try:
            r = subprocess.run(["ss", "-tlnp"], capture_output=True, text=True, timeout=10)
            lineas = [l for l in r.stdout.split("\n") if "LISTEN" in l]
            for l in lineas[:10]:
                self.log(f"  {l.strip()[:80]}", "INFO")
        except Exception:
            self.log("  [INFO] ss no disponible · instalar iproute2", "INFO")

    def generar_reporte(self):
        """Genera reporte JSON + Markdown."""
        ts = datetime.now().strftime("%Y%m%d_%H%M%S")
        reporte = {
            "timestamp": datetime.now().isoformat(),
            "nodo": "YHDRYH-92CE",
            "sello": "SCDR-001",
            "firma": "◯_● · 51/49/100 · KINTSUGI",
            "hallazgos_criticos": self.hallazgos,
            "algoritmos_aprobados": self.aprobados,
            "total_criticos": self.criticos,
            "estado": "CRITICO" if self.criticos > 0 else "APROBADO",
        }
        json_path = REPORTES / f"quantum_audit_{ts}.json"
        with open(json_path, "w") as f:
            json.dump(reporte, f, indent=2, ensure_ascii=False)

        md_path = REPORTES / f"quantum_audit_{ts}.md"
        with open(md_path, "w") as f:
            f.write(f"# Auditoría Cuántica · {reporte['timestamp']}\n\n")
            f.write(f"**Nodo**: YHDRYH-92CE · **Sello**: SCDR-001\n\n")
            f.write(f"**Estado**: {'🔴 CRÍTICO' if self.criticos else '🟢 APROBADO'}\n\n")
            f.write(f"## Hallazgos críticos\n\n")
            for h in self.hallazgos:
                f.write(f"- `{h['algoritmo']}` en `{h['archivo']}`\n  → {h['razon']}\n")
            f.write(f"\n## Algoritmos aprobados\n\n")
            for a in self.aprobados:
                f.write(f"- `{a['algoritmo']}`: {a['descripcion']}\n")
            f.write(f"\n---\n\n_{reporte['firma']}_\n")

        self.log(f"Reporte: {json_path.name}", "OK")
        return json_path

    def ejecutar(self):
        print("\n╔══════════════════════════════════════════════════════════════════════╗")
        print("║  ⚛  AUDITORÍA CUÁNTICA · ARKHÉ ZERO                                  ║")
        print("║  NODO YHDRYH-92CE · SCDR-001 · ◯_● · 51/49/100                       ║")
        print("╚══════════════════════════════════════════════════════════════════════╝\n")
        self.scan_archivos()
        self.test_sha3()
        self.test_openssl_pqc()
        self.test_ed25519_disponible()
        self.scan_red_puertos()
        ruta = self.generar_reporte()
        print(f"\n  Estado: {'🔴 CRITICO' if self.criticos else '🟢 APROBADO'}")
        print(f"  Reporte: {ruta}\n")
        print("◯_● 51/49/100 · KINTSUGI · SCDR-001\n")
        return 0 if self.criticos == 0 else 1

if __name__ == "__main__":
    sys.exit(AuditoriaCuantica().ejecutar())
