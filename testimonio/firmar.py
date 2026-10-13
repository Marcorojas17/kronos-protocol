#!/usr/bin/env python3
import sys, json, hashlib
from datetime import datetime, timezone
from pathlib import Path
from dilithium_py.ml_dsa import ML_DSA_87

ARKHE = Path.home() / "arkhe-zero"
SELLOS = ARKHE / "testimonio" / "sellos"
CLAVES = ARKHE / "testimonio" / "claves"
CLAVES.mkdir(parents=True, exist_ok=True)
AUTOR_DEFAULT = "Arkhe"

def paths(autor):
    safe = autor.replace(" ", "_").lower()
    return (CLAVES / (safe + ".priv"),
            CLAVES / (safe + ".pub"),
            CLAVES / (safe + ".meta.json"))

def generar_claves(autor):
    priv, pub, meta = paths(autor)
    if priv.exists():
        print("  claves ya existen para " + autor)
        return
    print("  generando ML-DSA-87 para " + autor)
    pk, sk = ML_DSA_87.keygen()
    priv.write_bytes(sk)
    pub.write_bytes(pk)
    meta.write_text(json.dumps({
        "autor": autor, "algoritmo": "ML-DSA-87", "estandar": "FIPS 204",
        "generado_utc": datetime.now(timezone.utc).isoformat(),
        "pk_bytes": len(pk), "sk_bytes": len(sk),
    }, indent=2))
    print("  priv: " + str(priv) + " (" + str(len(sk)) + " bytes)")
    print("  pub:  " + str(pub) + " (" + str(len(pk)) + " bytes)")

def firmar(ruta, autor, sello_id=None):
    priv, pub, meta = paths(autor)
    if not priv.exists():
        print("  no hay clave para " + autor)
        return None
    contenido = Path(ruta).read_bytes()
    digest = hashlib.sha3_256(contenido).digest()
    sk = priv.read_bytes()
    firma = ML_DSA_87.sign(sk, digest)

    # Si nos pasan sello_id, lo usamos. Si no, lo derivamos del digest.
    sid = sello_id if sello_id else hashlib.sha3_256(digest).hexdigest()[:16]

    artefacto = {
        "sello_id": sid,
        "autor": autor,
        "algoritmo": "ML-DSA-87",
        "estandar": "FIPS 204",
        "digest_sha3": digest.hex(),
        "firma_hex": firma.hex(),
        "firma_bytes": len(firma),
        "archivo_origen": Path(ruta).name,
        "timestamp_utc": datetime.now(timezone.utc).isoformat(),
    }
    out = SELLOS / (sid + ".firma.json")
    out.write_text(json.dumps(artefacto, indent=2, ensure_ascii=False))
    print("  firmado: " + sid)
    print("  firma:   " + str(len(firma)) + " bytes")
    print("  archivo: " + str(out))
    return out

def verificar(ruta, autor):
    priv, pub, meta = paths(autor)
    if not pub.exists():
        print("  no hay clave publica para " + autor)
        return False
    contenido = Path(ruta).read_bytes()
    digest = hashlib.sha3_256(contenido).digest()
    # Buscar cualquier .firma.json que corresponda a este digest
    for f in SELLOS.glob("*.firma.json"):
        artefacto = json.loads(f.read_text())
        if artefacto.get("digest_sha3") == digest.hex():
            firma = bytes.fromhex(artefacto["firma_hex"])
            pk = pub.read_bytes()
            ok = ML_DSA_87.verify(pk, digest, firma)
            print("  " + ("VALIDA" if ok else "INVALIDA"))
            print("  sello_id: " + artefacto["sello_id"])
            print("  autor:    " + autor)
            return ok
    print("  no hay firma para este contenido")
    return False

def main():
    if len(sys.argv) < 2:
        print("uso:")
        print("  firmar.py init [autor]")
        print("  firmar.py sign <archivo> [autor] [sello_id]")
        print("  firmar.py verify <archivo> [autor]")
        sys.exit(2)
    cmd = sys.argv[1]
    if cmd == "init":
        autor = sys.argv[2] if len(sys.argv) > 2 else AUTOR_DEFAULT
        generar_claves(autor)
    elif cmd == "sign":
        autor = sys.argv[3] if len(sys.argv) > 3 else AUTOR_DEFAULT
        sello_id = sys.argv[4] if len(sys.argv) > 4 else None
        firmar(sys.argv[2], autor, sello_id)
    elif cmd == "verify":
        autor = sys.argv[3] if len(sys.argv) > 3 else AUTOR_DEFAULT
        ok = verificar(sys.argv[2], autor)
        sys.exit(0 if ok else 1)
    else:
        print("comando desconocido: " + cmd)
        sys.exit(2)

if __name__ == "__main__":
    main()
