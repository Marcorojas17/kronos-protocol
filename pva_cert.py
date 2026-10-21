import hashlib, json, datetime, pathlib
manifest="e8d9eac8"
nodo="ecatepec-01-1122"
hora=datetime.datetime.now().isoformat()

mem=pathlib.Path("memoria_ecatepec-01-1122.json").read_bytes()
lite=pathlib.Path("syncro_mesh_lite.py").read_bytes()

h_mem=hashlib.sha256(mem).hexdigest()
h_lite=hashlib.sha256(lite).hexdigest()
h_total=hashlib.sha256((h_mem+h_lite+manifest).encode()).hexdigest()

cert={
 "protocolo":"PVA - Prueba de Vida Activa",
 "manifest":manifest,
 "nodo":nodo,
 "github_commit":"461b386",
 "repo":"Marcorojas17/kronos-protocol",
 "hash_memoria":h_mem,
 "hash_lite":h_lite,
 "hash_pva":h_total,
 "timestamp":hora,
 "decision":"MOLE 120 - 8001 VIVO",
 "estado":"ARKHE ZERO 100% SELLADO"
}
pathlib.Path("PVA_CERT.json").write_text(json.dumps(cert, indent=2))
print(json.dumps(cert, indent=2))
