#!/usr/bin/env python3
"""TLAMATINI · Sabio · Cronista · Reportes"""
import os, sys
from datetime import datetime
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from base import Agente

class Tlamatini(Agente):
    def __init__(self):
        super().__init__("TLAMATINI", "Sabio · Cronista")

    def reporte(self):
        fecha = datetime.now().strftime("%Y%m%d_%H%M%S")
        reporte_dir = os.path.join(self.home, "reportes")
        os.makedirs(reporte_dir, exist_ok=True)
        ruta = os.path.join(reporte_dir, f"reporte_{fecha}.md")
        contenido = f"""# Reporte ARKHÉ ZERO · {datetime.now().isoformat()}

## Estado del Sistema
- Nodo: YHDRYH-92CE
- Sello: SCDR-001
- Firma: {self.sello()}

## Backups recientes
"""
        backups_dir = os.path.expanduser("~/arkhe-backups")
        if os.path.isdir(backups_dir):
            for tipo in ["quick", "daily", "weekly", "monthly"]:
                d = os.path.join(backups_dir, tipo)
                if os.path.isdir(d):
                    count = len([f for f in os.listdir(d) if f.endswith(".tar.gz")])
                    contenido += f"- {tipo}: {count} archivos\n"
        contenido += f"\n## Firma\n\n_{self.sello()}_\n"
        with open(ruta, "w") as f:
            f.write(contenido)
        self.log(f"Reporte generado: {ruta}", "OK")
        return 0

if __name__ == "__main__":
    sys.exit(Tlamatini().reporte())
