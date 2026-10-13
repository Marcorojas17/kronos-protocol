#!/usr/bin/env python3
"""
PAGOS MT01JAAF SHA a4ff808e 100/10 - Ligado a SC 2607146379465 + TX Amoy 0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e
Sello: KRONOS-TRACE-PVA-5204160405358537-KRONOS-MT01JAAF
"""
from pathlib import Path
import json
from datetime import datetime

FOLIO_M = "5204160405358537"
FOLIO_P = "KRONOS-MT01JAAF"
SHA = "a4ff808e"
SELLO = "KRONOS-TRACE-PVA-5204160405358537-KRONOS-MT01JAAF"
SC = "2607146379465"
TX = "0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e"

class PagosMT01JAAF:
    def registrar_pago(self, concepto="Peritaje PVA", monto=0, metodo="SC+Amoy"):
        pago = {
          "folio_maestro": FOLIO_M,
          "folio_pericial": FOLIO_P,
          "sha": SHA,
          "sello": SELLO,
          "sc": SC,
          "tx": TX,
          "concepto": concepto,
          "monto": monto,
          "metodo": metodo,
          "timestamp": datetime.utcnow().isoformat()+"Z",
          "certificado": f"https://jas17.github.io/PVA-Protocolo-Vida-Autopoietica-/web/certificado.html?folio={SELLO}",
          "explorer": f"https://amoy.polygonscan.com/tx/{TX}",
          "status": "100/10 pagado y sellado"
        }
        Path("pagos").mkdir(exist_ok=True)
        Path(f"pagos/pago_{FOLIO_M}_{SHA}_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}.json").write_text(json.dumps(pago, indent=2), encoding="utf-8")
        print(f"[PAGOS MT01JAAF {SHA}] {concepto} registrado SC {SC} TX {TX}")
        return pago

if __name__ == "__main__":
    PagosMT01JAAF().registrar_pago("Peritaje KRONOS V18 MT01JAAF", 0, "blockchain")
