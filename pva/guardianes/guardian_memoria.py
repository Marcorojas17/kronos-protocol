# GUARDIAN 2: MEMORIA - Evita duplicados y loops
import pathlib
class GuardianMemoria:
    def auditar(self):
        duplicados = []
        for f in pathlib.Path('web').rglob('*.html'):
            c = f.read_text()
            if c.count('id="botones-pago"') > 1:
                duplicados.append(str(f))
        return {"guardian":"MEMORIA","duplicados":duplicados,"status":"LIMPIO" if not duplicados else "CONTAMINADO"}
