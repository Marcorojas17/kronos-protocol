import hashlib, json
from pathlib import Path
root=Path("web")
files=sorted([p for p in root.rglob("*.*") if p.is_file() and p.stat().st_size<2000000])
hashes=[hashlib.sha256(f.read_bytes()).hexdigest() for f in files]
orig=len(hashes)
while len(hashes)>1:
  nxt=[]
  for i in range(0,len(hashes),2):
    a=hashes[i]
    b=hashes[i+1] if i+1<len(hashes) else a
    nxt.append(hashlib.sha256((a+b).encode()).hexdigest())
  hashes=nxt
merkle_root=hashes[0] if hashes else "vacio"
print(f"MERKLE ROOT: {merkle_root}")
print(f"Archivos: {orig}")
Path("genesis-K28-merkle.json").write_text(json.dumps({
  "merkle_root": merkle_root,
  "archivos": orig,
  "folio": "5204160405358537",
  "timestamp": "2026-10-21T11:22:00Z",
  "kronos": "27054",
  "manifest": "e8d9eac8"
}, indent=2))
