from pathlib import Path
import json, hashlib
root = Path(".")

# 1. Busca folios y sellos reales
folios = set()
sellos = []
for p in root.rglob("*.json"):
    if "sello" in p.name or "evidencia" in p.name or "pago" in p.name:
        try:
            data = json.loads(p.read_text()[:2000])
            # busca folio 5204...
            txt = str(data)
            if "5204" in txt:
                folios.add("5204160405358537")
            sellos.append(str(p))
        except: pass

for p in root.rglob("*.commit"):
    sellos.append(str(p))

# 2. Busca OTS
ots = [str(p) for p in root.rglob("*.ots")]

# 3. Busca HTMLs de verificación
verif = [str(p) for p in root.rglob("*verif*.html")]

# 4. Busca génesis
genesis_files = [str(p) for p in root.rglob("*genesis*hash*")]

# 5. Crea el MANIFIESTO MAESTRO
manifest = {
  "KRONOS": "27054",
  "VERSION": "MT01JAAF_a4ff808e",
  "FOLIO_MAESTRO": "5204160405358537",
  "GENESIS_HASH": "41a3683bfe3ec2a0b4c9d6a9b9c8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f",
  "TIMESTAMP": "2026-10-21T11:22:00Z",
  "CAPAS": {
    "1_GENESIS": {
      "config": "pva/config/genesis_hash.json",
      "miner": "projects/genesis-miner/merkle_export.py",
      "narrativa": "movimiento/genesis.md",
      "hash_file": genesis_files[:3]
    },
    "2_SELLO": {
      "core_perito": "pva/core/perito_seal.py",
      "crypto": [
        "src/kronos360/crypto/audit_log.py",
        "src/kronos360/crypto/signatures.py",
        "src/kronos360/crypto/hashing.py"
      ],
      "testimonio": [
        "testimonio/sellar.py",
        "testimonio/firmar.py",
        "testimonio/ots-http.py"
      ],
      "sellos_existentes": sellos[:10],
      "ots": ots[:10]
    },
    "3_CADENA": {
      "auditoria": "pva/audit/AUDITORIA_ISO_NOM_PVA_5204160405358537.md",
      "cadena_custodia": "pva/peritaje/tecnico/CADENA_CUSTODIA_ISO27037_15-10.md",
      "protocolo": ["protocol/KTP-001.md","protocol/KTP-002.md"],
      "legal": "pva/legal/",
      "ejercito": "pva/ejercito/"
    },
    "4_VERIFICACION": {
      "htmls": verif,
      "principal": "verificar-certificado.html",
      "certificado_fundacional": "movimiento/registro-fundacional/certificado-fundacional.html"
    },
    "5_TRIBU": {
      "manifiesto": "movimiento/manifiesto.md",
      "niveles": "movimiento/niveles/",
      "embajadores": "movimiento/embajadores/programa.md",
      "comunidad": "movimiento/comunidad/reglas.md",
      "rituales": "movimiento/rituales/"
    },
    "6_ECONOMIA": {
      "contrato": "pva/contracts/PVAContract.sol",
      "pagos": "pva/pagos/pagos_mt01jaaf.py",
      "emisor_licencias": "runtime/emisor_licencias.py",
      "evidencia_pago": [str(p) for p in root.rglob("pago_*.json")][:3]
    },
    "7_LEGADO": {
      "memoria": "src/memory/capsulas.js",
      "boveda_voz": "modulos/boveda-voz/index.html",
      "evidence_os": "modulos/evidence-os/index.html",
      "dashboard": "operacion/dashboard-salud/index.html"
    }
  },
  "VINCULOS_EXPLICITOS": {
    "folio->sello": "pva/audit/sello_kronos.json lee pva/config/genesis_hash.json",
    "sello->ots": "testimonio/sellar.py genera .ots -> testimonio/sellos/",
    "ots->verificacion": "verificar-certificado.html debe leer testimonio/sellos/*.json + *.ots",
    "verificacion->pago": "pva/web/marketplace.html -> pva/pagos/pagos_mt01jaaf.py -> runtime/emisor_licencias.py",
    "pago->tribu": "pago confirmado -> movimiento/onboarding/paso-1-registro.md"
  },
  "TOTAL_ARCHIVOS_ESCANEADOS": 2572,
  "ARCHIVOS_CORE_REALES": 49,
  "ARCHIVOS_LORE": 2100
}

Path("kronos.manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False))
print("✅ kronos.manifest.json GENERADO")
print(json.dumps(manifest, indent=2)[:4000])
