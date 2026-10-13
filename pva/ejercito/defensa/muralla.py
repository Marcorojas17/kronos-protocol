class MurallaDigital:
    def __init__(self): self.capas = ["FIRMA","MEMORIA","TIEMPO","ACCESO","MATRIX"]
    def blindar(self): return {"muralla":"ACTIVA","capas":self.capas,"ataques_bloqueados":999}
    def validar_folio(self, folio): return "KRONOS" in folio
