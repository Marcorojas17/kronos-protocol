#!/usr/bin/env python3
# human_sign_ed25519.py · Firma Humana Real (51%)
import subprocess, sys, os, hashlib

HUMAN_KEY = os.path.expanduser("~/.human_key")

def firmar(manifest_path):
    print(f"Firmando con Ed25519: {manifest_path}")
    if not os.path.exists(HUMAN_KEY):
        sys.exit("No existe ~/.human_key.")

    # Firmar el archivo tal cual está (sin modificarlo)
    result = subprocess.run(
        ["ssh-keygen", "-Y", "sign", "-f", HUMAN_KEY, "-n", "file", manifest_path],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        sys.exit(f"Fallo al firmar: {result.stderr}")

    sig_path = f"{manifest_path}.sig"
    if not os.path.exists(sig_path):
        sys.exit("No se genero .sig")

    with open(sig_path, "rb") as f:
        sig_hash = hashlib.sha3_512(f.read()).hexdigest()

    print(f"✓ Firma generada: {sig_path}")
    print(f"✓ Sig SHA3-512: {sig_hash[:32]}...")
    print(f"◯_● El manifiesto queda en estado PROVISIONAL.")
    print(f"   La validez se confirma con verify_human_ed25519.py")

if __name__ == "__main__":
    firmar(sys.argv[1])
