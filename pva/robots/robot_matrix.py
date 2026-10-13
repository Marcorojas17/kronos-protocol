# ROBOT MATRIX - Mantiene el code-rain vivo
class RobotMatrix:
    lluvia = ["PVA","KRONOS","ΔΞΨΩ","01","█▓▒░","PRESIDENCIAL"]
    def generar_frame(self):
        import random
        return " ".join(random.choices(self.lluvia, k=20))
    def proteger_fondo(self):
        return {"matrix":"ACTIVA","impacto":"MAXIMO","proteccion":"CROMATICA"}
