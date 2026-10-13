# MT01JAAF SHA a4ff808e - KRONOS-TRACE-PVA-5204160405358537-MT01JAAF SC 2607146379465
# ROBOT AUDITOR - Vigila duplicados 24/7
import pathlib, time
class RobotAuditor:
    def patrullar(self):
        while True:
            for f in pathlib.Path('web').rglob('*.html'):
                html = f.read_text()
                if html.count('id="botones-pago"') > 1:
                    print(f"[AUDITOR] 🚨 Duplicado en {f} - AUTOFIX")
                    # autofix presidencial
                    fixed = html.replace('id="botones-pago"','class="botones-pago"',1)
                    f.write_text(fixed)
            time.sleep(30)

if __name__ == "__main__":
    print("[AUDITOR] Patrullando PVA-Protocolo-Vida-Autopoietica-...")
    RobotAuditor().patrullar()
