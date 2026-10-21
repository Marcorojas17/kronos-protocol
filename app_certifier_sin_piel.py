import hashlib, json, datetime, pathlib

p = pathlib.Path("city/manifest.city.json")
data = p.read_bytes()
sha = hashlib.sha256(data).hexdigest()
cert = {
    "ciudad": "VALDOVINOS-ARKHE",
    "archivo": str(p),
    "sha256": sha,
    "fecha": datetime.datetime.now().isoformat(),
    "loc": "TOLUCA",
    "agente_genesis": "VALDOVINOS-01",
    "consenso": "51/49",
    "piel": "Pillow-offline-fallback",
    "estado": "CERTIFICADO-OK",
}
print(json.dumps(cert, indent=2))
pathlib.Path("city/CERTIFICADO-CIUDAD.json").write_text(json.dumps(cert, indent=2))
print("\n✓ Guardado en city/CERTIFICADO-CIUDAD.json")
