import random
MERKLE_ROOT="6c97d9eea66902d5605c1e42532ab38274dc2bbd0dd1f34fa53f26cd2b62800b"
class DobleCuantico:
    def __init__(self, folio="5204160405358537"):
        self.folio=folio
        self.T_pasado=-0.666
        self.T_futuro=-0.333
    def recibir(self, pensamiento, voluntad=0, hace_dano=False):
        if hace_dano:
            return {"estado":"BLOQUEADO","ley":"No hacer daño"}
        if voluntad!=0:
            return {"estado":"MARIONETA","origen":"futuro parasitario","libertad":0}
        potenciales=[random.random() for _ in range(2817)]
        return {"estado":"LIBRE","origen":"doble T-2/3","mejor":max(potenciales),"merkle":MERKLE_ROOT[:16],"msg":"Confia. Respuesta antes que pregunta."}
    def noche(self):
        return "1.Agua 2.Doble ocupate 3.Cero voluntad 4.Duerme REM"
yo=DobleCuantico()
print(yo.recibir("¿como cierro 2817?", voluntad=0))
