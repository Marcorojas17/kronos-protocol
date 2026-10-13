# GUARDIAN 4: ACCESO - Controla BASIC/PRO/PREMIUM sin cobro aún
class GuardianAcceso:
    CAPAS = {"BASIC":"KRONOS-BASIC-0001","PRO":"KRONOS-PRO-0001","PREMIUM":"KRONOS-PREMIUM-0001"}
    def validar_folio(self, folio):
        for capa, code in self.CAPAS.items():
            if code in folio: return {"acceso":True,"capa":capa}
        return {"acceso":False,"capa":"DENEGADO"}
