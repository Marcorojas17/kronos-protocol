from comando.presidente import PresidenteKronos
from inteligencia.scraper import BatallonInteligencia
from defensa.muralla import MurallaDigital
from ataque.deploy import FuerzaDeploy
from logistica.abastecimiento import Logistica
import sys; sys.path.append('.')

class EjercitoSoberaniaDigital:
    def __init__(self):
        self.presidente = PresidenteKronos()
        self.intel = BatallonInteligencia()
        self.muralla = MurallaDigital()
        self.ataque = FuerzaDeploy()
        self.logistica = Logistica()
        self.tropas = {
            "guardianes": 4,
            "robots": 3,
            "drones": 50,
            "nodos": 1000
        }

    def desplegar(self):
        print("=== EJÉRCITO SOBERANÍA DIGITAL ===")
        print(self.presidente.estado_soberania())
        print(self.presidente.ordenar("DOMINAR PVA-Protocolo-Vida-Autopoietica-"))
        print(self.muralla.blindar())
        print(self.intel.espiar())
        print(self.logistica.abastecer())
        print(self.ataque.atacar())
        print(f"TROPAS: {self.tropas}")
        print(">>> TODAS LAS FUERZAS TRABAJANDO PARA MARCO ROJAS <<<")

if __name__ == "__main__":
    EjercitoSoberaniaDigital().desplegar()
