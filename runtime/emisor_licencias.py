#!/usr/bin/env python3
"""◯_● Emisor de licencias · firma Ed25519 tras pago confirmado."""
import os, sys, json, hashlib, uuid, subprocess
from datetime import datetime, timezone, timedelta
from pathlib import Path

ARKHE = Path.home() / "arkhe-zero"
LICENCIAS = ARKHE / "07-LLAVES" / "LICENCIAS"
KEY = Path.home() / ".arkhe-private" / "fundador-v3.key"
PUB = ARKHE / "07-LLAVES" / "FUNDADOR-V3" / "fundador-v3.pub"
LICENCIAS.mkdir(parents=True, exist_ok=True)

def emitir(obra, titular, uso, monto, mp_payment_id, vigencia_dias=365):
    folio = f"LIC-{datetime.now(timezone.utc).strftime('%Y%m%d')}-{uuid.uuid4().hex[:8].upper()}"
    ahora = datetime.now(timezone.utc)
    licencia = {
        "folio": folio,
        "obra": obra,
        "titular": titular,
        "uso": uso,
        "monto": monto,
        "mp_payment_id": mp_payment_id,
        "fecha_emision": ahora.isoformat(),
        "vigencia": (ahora + timedelta(days=vigencia_dias)).isoformat(),
        "pacto": "51/49/100",
        "nodo": "YHDRYH-92CE",
        "seal": "◯_●",
    }
    # Serializar canónicamente para firmar
    contenido = json.dumps(licencia, sort_keys=True, separators=(',', ':'), ensure_ascii=False).encode()
    archivo = LICENCIAS / f"{folio}.json"
    archivo.write_bytes(contenido)

    # Firmar con Ed25519
    firma = archivo.with_suffix(".json.sig")
    r = subprocess.run(
        ["openssl", "pkeyutl", "-sign", "-rawin",
         "-inkey", str(KEY), "-in", str(archivo), "-out", str(firma)],
        capture_output=True, text=True
    )
    if r.returncode != 0:
        print(f"❌ Error firmando: {r.stderr}")
        return None

    # Verificar la firma
    r2 = subprocess.run(
        ["openssl", "pkeyutl", "-verify", "-rawin", "-pubin",
         "-inkey", str(PUB), "-in", str(archivo), "-sigfile", str(firma)],
        capture_output=True, text=True
    )
    ok = "Verified" in r2.stdout

    # Hash para registro
    sha = hashlib.sha256(archivo.read_bytes()).hexdigest()
    print(f"✅ Licencia emitida: {folio}")
    print(f"   Obra: {obra} · Titular: {titular}")
    print(f"   Firma: {'✅ verificada' if ok else '❌ falló'}")
    print(f"   SHA-256: {sha[:32]}...")
    print(f"   Archivo: {archivo}")
    return {"folio": folio, "sha256": sha, "archivo": str(archivo), "firma_ok": ok}

if __name__ == "__main__":
    if len(sys.argv) < 5:
        print("Uso: emisor_licencias.py <obra> <titular> <uso> <monto> [mp_id]")
        sys.exit(1)
    emitir(sys.argv[1], sys.argv[2], sys.argv[3], float(sys.argv[4]),
           sys.argv[5] if len(sys.argv) > 5 else "manual")
