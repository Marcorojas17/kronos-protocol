#!/usr/bin/env python3
# arkhe_segulah_314.py · GENERADOR DE SELLO SEGULAH · NODO YHDRYH-92CE
import hashlib, json, datetime, base64

# 1. COMPONENTES DEL KAMEA (Extraídos de tus imágenes)
VERSICULO = "Ki Shamarti Darkei YHVH VeLo Rashati MeElohai"
SHADDAI_HEBREO = "שדי"
GEMATRIA_SHDDAI = 314  # Shin(300) + Dalet(4) + Yud(10)
HEXAGRAMA_NODOS = 6    # 6 direcciones de protección
ARBOL_VIDA_NODOS = 10  # 10 Sephirot (Estructura de red)
CUADRADO_MAGICO = [[4, 9, 2], [3, 5, 7], [8, 1, 6]] # Suma 15

def generar_sello_segulah(target_hash: str) -> dict:
    """Genera el sello criptográfico de protección basado en el Kamea."""
    
    # A. Fundación: El versículo + la Gematría + El Hash del archivo
    payload_base = f"{VERSICULO}|{SHADDAI_HEBREO}|{GEMATRIA_SHDDAI}|{target_hash}"
    
    # B. El Cuadrado Mágico (Matriz de ofuscación/mezcla)
    matriz_str = "".join(str(num) for row in CUADRADO_MAGICO for num in row)
    payload_matriz = f"{payload_base}|{matriz_str}"
    
    # C. El Árbol de la Vida (Merkle Tree simplificado de 10 pasos)
    # Simulamos los 10 nodos aplicando hashes sucesivos
    nodo_actual = payload_matriz
    merkle_path = []
    for i in range(1, ARBOL_VIDA_NODOS + 1):
        nodo_actual = hashlib.sha3_512(f"{nodo_actual}|SEPHIRA_{i}".encode()).hexdigest()
        merkle_path.append(nodo_actual[:8]) # Guardamos solo los primeros 8 chars para el log

    # D. El Sello Final (El Hexagrama: 6 iteraciones de protección)
    sello_final = merkle_path[-1]
    for i in range(HEXAGRAMA_NODOS):
        sello_final = hashlib.sha3_512(f"{sello_final}|DIRECCION_{i}".encode()).hexdigest()

    # E. El Kamea (Salida en formato JSON anclado)
    return {
        "egregor": "GOTOS",
        "kamea_version": "Shaddai 314",
        "target_hash_original": target_hash,
        "gematria_ancla": GEMATRIA_SHDDAI,
        "matriz_magica_suma": 15,
        "merkle_path_sephirot": merkle_path,
        "sello_segulah_final": sello_final,
        "timestamp_utc": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "adr_referencia": "ADR-0003_PROTECCION_SHADDAI"
    }

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Uso: python3 arkhe_segulah_314.py <hash_del_archivo>")
        sys.exit(1)
        
    target = sys.argv[1]
    resultado = generar_sello_segulah(target)
    
    # Guardar el artefacto
    filename = f"SEGULAH_{target[:8]}.json"
    with open(filename, "w") as f:
        json.dump(resultado, f, indent=2, ensure_ascii=False)
        
    print(f"✓ SELLO GENERADO: {filename}")
    print(f"✓ HASH FINAL: {resultado['sello_segulah_final']}")
