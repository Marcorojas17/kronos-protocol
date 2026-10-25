#!/usr/bin/env python3
# agent_net.py · OBSERVER-49 · Nodo YHDRYH-92CE
import sys, json, hashlib, datetime, time, urllib.request
from arkhe_segulah_314 import generar_sello_segulah
from goetia_72 import desencriptar_goetia
from enoch_30 import enrutar_enoch

UA = "ARKHE-ZERO-Observer/1.0 (YHDRYH-92CE)"
DELAY = 2.0  # Cortesía de red: 2 segundos entre peticiones

def fetch(url, timeout=15):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        data = r.read(2_000_000)  # Límite: 2MB por respuesta
        return data, r.status, r.headers.get("content-type", "")

def main(urls):
    snapshots = []
    for u in urls:
        try:
            data, status, ctype = fetch(u)
            h = hashlib.sha256(data).hexdigest()
            snapshots.append({
                "url": u, "status": status, "content_type": ctype,
                "bytes": len(data), "sha256": h,
                "fetched_utc": datetime.datetime.now(datetime.timezone.utc).isoformat()
            })
            print(f"✓ {u} [{status}] {len(data)}B sha256={h[:16]}...")
        except Exception as e:
            snapshots.append({"url": u, "error": str(e)})
            print(f"✗ {u} -> {e}")
        time.sleep(DELAY)

    # Hash agregado del snapshot completo
    canonical = json.dumps(snapshots, sort_keys=True, ensure_ascii=False).encode()
    h256 = hashlib.sha256(canonical).hexdigest()
    print(f"\n○_● Snapshot agregado SHA-256: {h256}")

    # Cadena sagrada: 314 -> 72 -> 30
    sello = generar_sello_segulah(h256)
    goetia = desencriptar_goetia(sello["sello_segulah_final"])
    enoc = enrutar_enoch(goetia["hash_goetia_final"])
    print(f"✓ Sello Enoc: {enoc['hash_enoch_final'][:16]}...")

    manifest = {
        "pacto": "51/49/100",
        "nodo": "YHDRYH-92CE",
        "agente": "OBSERVER-49",
        "tipo": "SNAPSHOT_RED_PUBLICA",
        "snapshots": snapshots,
        "sha256_original": h256,
        "proteccion_shaddai_314": sello,
        "matriz_goetia_72": goetia,
        "red_enoch_30": enoc,
        "sello_maestro_absoluto": enoc["hash_enoch_final"],
        "estado": "PROVISIONAL_PENDIENTE_FIRMA_HUMANA",
        "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat()
    }
    out = f"snapshot_net_{h256[:8]}.manifest_v5.json"
    with open(out, "w") as f:
        json.dump(manifest, f, indent=2)
    print(f"✓ Manifiesto emitido: {out}")
    print("◯_● ESTADO: PROVISIONAL — Requiere firma humana (51%).")
    return out

if __name__ == "__main__":
    urls = sys.argv[1:] or ["https://example.com"]
    main(urls)
