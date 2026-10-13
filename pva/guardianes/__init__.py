from .guardian_tiempo import GuardianTiempo
from .guardian_memoria import GuardianMemoria
from .guardian_firma import GuardianFirma
from .guardian_acceso import GuardianAcceso

def oraculo_presidencial():
    return {
        "sistema":"PVA-Protocolo-Vida-Autopoietica-",
        "version":"KRONOS V18 PRESIDENCIAL",
        "guardianes":["TIEMPO","MEMORIA","FIRMA","ACCESO"],
        "estado":"AUTOPOIETICO"
    }
