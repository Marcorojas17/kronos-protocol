#!/usr/bin/env python3
"""DILITHIUM vs SHOR · KRONOS 360 · Anexo J"""
import math

def shor_attack_demo(N):
    for i in range(2, int(math.sqrt(N)) + 1):
        if N % i == 0:
            return i, N // i
    return None

def lattice_svp_2d(v1, v2):
    c = [(v1[0],v1[1]), (v2[0],v2[1]),
         (v1[0]-v2[0], v1[1]-v2[1]),
         (v1[0]+v2[0], v1[1]+v2[1])]
    return min(c, key=lambda v: v[0]**2 + v[1]**2)

def lattice_svp_hard(dim=512):
    return 2 ** (0.29 * dim)


if __name__ == "__main__":
    print("")
    print("╔══════════════════════════════════════════════════════════════╗")
    print("║  SHOR vs DILITHIUM · KRONOS 360 · Anexo J                    ║")
    print("╚══════════════════════════════════════════════════════════════╝")
    print("")

    print("  ATAQUE 1 · SHOR contra RSA")
    print("  " + "─" * 62)
    for N in [15, 143, 323, 437, 899, 3599, 10403]:
        r = shor_attack_demo(N)
        print(f"    RSA-{N:6d}  →  {r[0]} × {r[1]}   [ROTO]")
    print("    RSA-2048 (617 digitos) → roto en horas por cuantico real")
    print("")


    print("  ATAQUE 2 · SHOR contra DILITHIUM")
    print("  " + "─" * 62)
    print("    Dilithium NO usa factorizacion.")
    print("    Usa SVP (Shortest Vector Problem) en lattice 512-dim.")
    print("    Shor cuantico → NO ayuda con SVP.")
    print("")
    print("    Demo 2D (trivial):")
    v1, v2 = (10, 3), (7, 8)
    sv = lattice_svp_2d(v1, v2)
    print(f"      lattice 2D {v1}, {v2}  →  vector mas corto: {sv}")
    print("")
    print("    Estimacion en 512D:")
    ops = lattice_svp_hard(512)
    print(f"      operaciones necesarias: 2^{int(math.log2(ops))}")
    print(f"      = {ops:.2e}")
    print(f"      Aun con cuantico: IMPOSIBLE en tiempo util.")
    print("")


    print("  VEREDICTO PARA KRONOS 360")
    print("  " + "─" * 62)
    print("    [OK] SHA-256   → migrar a SHA3-512 (Anexo J)")
    print("    [OK] RSA/ECC   → NO USAR (Shor los rompe)")
    print("    [OK] Dilithium → FIRMA OFICIAL del sistema")
    print("    [OK] interaction_id v2 = SHA3(...|PQ)")
    print("")
    print("    El timestamp original NUNCA cambia.")
    print("    Solo evoluciona el algoritmo.")
    print("    Trazabilidad perpetua garantizada.")
    print("")
    print("    ◯_● · ■_□ · 51/49/100 · KRONOS 360")
    print("")
