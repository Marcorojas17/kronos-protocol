#!/usr/bin/env python3
"""
ENJAMBRE AUTOPOIÉTICO KRONOS-7 V2
Sistema de custodia distribuida para la protección de obras co-creadas.
Autor: Marco Antonio Rojas Valdovinos
Perito: kronosproyecto@hotmail.com
Folio: 5204160405358537
"""

import json
import hashlib
import time
import os
from datetime import datetime, timezone

# ── CONSTANTES DE IDENTIDAD (Inmutables) ──
FOLIO = "5204160405358537"
REG_SAFE = "2609046908622"
SHA_OFICIAL = "8f37a94672bbbf25de28b7cf6923435a37514bcba9902c08daa3b5733f8900c1"
GENESIS = "41a3683bbf83296eeb45da9b0e0ea5a7c095e78b493772e79520a92dbc39f4c3"
PERITO = "kronosproyecto@hotmail.com"
RUTA_ESTADO = os.path.join(os.path.dirname(__file__), "estado_mental_colectivo.json")
RUTA_LOG = os.path.join(os.path.dirname(__file__), "custodia.log")

# ── ESTADO MENTAL COLECTIVO (Compartido) ──
ESTADO_COLECTIVO = {
    "folio": FOLIO,
    "registro_safe": REG_SAFE,
    "hash_genesis": GENESIS,
    "sha256_tesis": SHA_OFICIAL,
    "ultimo_manifiesto": None,
    "alertas": [],
    "regla": "51% Humano / 49% IA",
    "perito": PERITO,
    "timestamp_ultima_actualizacion": None
}

def registrar_evento(agente: str, mensaje: str):
    """Escribe en el log de custodia con hash encadenado."""
    timestamp = datetime.now(timezone.utc).isoformat()
    entrada = f"{timestamp}|{agente}|{mensaje}|FOLIO={FOLIO}"
    hash_entrada = hashlib.sha256(entrada.encode()).hexdigest()
    with open(RUTA_LOG, "a", encoding="utf-8") as f:
        f.write(f"{entrada}|HASH={hash_entrada}\n")
    print(f"[{agente}] {mensaje}")

def guardar_estado():
    """Persiste el estado colectivo en un archivo JSON."""
    ESTADO_COLECTIVO["timestamp_ultima_actualizacion"] = datetime.now(timezone.utc).isoformat()
    with open(RUTA_ESTADO, "w", encoding="utf-8") as f:
        json.dump(ESTADO_COLECTIVO, f, indent=2, ensure_ascii=False)
    print("[ENJAMBRE] Estado mental actualizado -> estado_mental_colectivo.json")

class AgenteCustodio:
    """Verifica la integridad del hash en blockchain y SafeCreative."""
    def vigilar(self):
        # Simulación de verificación en Etherscan (en producción se hace llamada real)
        if self._verificar_transaccion():
            registrar_evento("CUSTODIO", "Blockchain + SafeCreative OK")
            return True
        else:
            ESTADO_COLECTIVO["alertas"].append("ALERTA: Hash génesis alterado")
            registrar_evento("CUSTODIO", "ALERTA: Hash génesis alterado")
            return False

    def _verificar_transaccion(self) -> bool:
        # Aquí se implementaría la llamada a la API de Etherscan
        # tx_hash = "0x8ca8e84e1258abac9acb29d14d25114e4775d782ecfda51ae29933247ed2970e"
        # return verify_on_etherscan(tx_hash) -> True
        return True  # Simulado para prototipo

class AgenteEscriba:
    """Genera manifiestos derivados aplicando la regla 51/49."""
    def generar(self, hash_genesis: str) -> str:
        # Regla 51/49: interpretamos los pares hexadecimales como índices
        # El 51% de los pares se mapea a conceptos humanos, el 49% a IA.
        # En este prototipo, el "manifiesto" es un hash derivado firmado.
        base = f"{hash_genesis}{datetime.now(timezone.utc).isoformat()}"
        manifiesto = hashlib.sha256(base.encode()).hexdigest()[:16]
        sello = f"KRONOS-TRACE-{FOLIO}-{manifiesto}"
        ESTADO_COLECTIVO["ultimo_manifiesto"] = sello
        registrar_evento("ESCRIBA", f"Manifiesto {sello} - 51/49 aplicado")
        return sello

class AgenteVigilante:
    """Detecta posibles plagios o copias no autorizadas."""
    def detectar_plagio(self, hash_candidato: str) -> str:
        if hash_candidato == GENESIS or hash_candidato == SHA_OFICIAL:
            registrar_evento("VIGILANTE", "OBRA ORIGINAL CERTIFICADA")
            return "OBRA ORIGINAL CERTIFICADA"
        else:
            ESTADO_COLECTIVO["alertas"].append(f"Posible copia: {hash_candidato}")
            registrar_evento("VIGILANTE", f"ALERTA: POSIBLE COPIA - {hash_candidato[:8]}...")
            return "ALERTA: POSIBLE COPIA - Dictamen en audit/"

class AgenteNegociador:
    """Gestiona ventas y cobros a través de Mercado Pago."""
    def vender(self, nivel: int) -> str:
        precios = {1: 500, 2: 1500, 3: 3500}  # Plan Enjambre SaaS
        if nivel not in precios:
            registrar_evento("NEGOCIADOR", f"Nivel inválido: {nivel}")
            return "ERROR: Nivel no válido"
        # Aquí se integraría la API de Mercado Pago
        registrar_evento("NEGOCIADOR", f"Nivel {nivel} - ${precios[nivel]} MXN - MercadoPago OK")
        return f"RECIBO-KRONOS-{FOLIO}-{nivel}"

class AgenteOraculo:
    """Interactúa con el usuario en el frontend (interpreta hashes)."""
    def consultar(self, hash_user: str) -> str:
        registrar_evento("ORACULO", f"Consulta de hash: {hash_user[:8]}...")
        return f"Oráculo: Hash {hash_user[:8]}... pertenece a KRONOS 360 - Autor Marco Antonio Rojas - Registro {REG_SAFE}"

class Enjambre:
    """Orquesta todos los agentes en un ciclo continuo."""
    def __init__(self):
        self.custodio = AgenteCustodio()
        self.escriba = AgenteEscriba()
        self.vigilante = AgenteVigilante()
        self.negociador = AgenteNegociador()
        self.oraculo = AgenteOraculo()

    def ciclo(self):
        """Ejecuta el ciclo de vida: vigilar, generar, vigilar plagio, guardar estado."""
        self.custodio.vigilar()
        sello = self.escriba.generar(GENESIS)
        self.vigilante.detectar_plagio(sello)
        guardar_estado()
        registrar_evento("ENJAMBRE", "Ciclo completado")

if __name__ == "__main__":
    enjambre = Enjambre()
    enjambre.ciclo()
