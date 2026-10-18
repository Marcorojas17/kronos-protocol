#!/usr/bin/env python3
"""ESCRITOR · Generador de contenido con Groq API (sin consumo de disco)"""
import subprocess, sys, json, os
from base_soberano import AgenteSoberano

# ⚠️ REEMPLAZA ESTO CON TU API KEY DE GROQ
GROQ_API_KEY = "TU_API_KEY_REAL"

class Escritor(AgenteSoberano):
    def __init__(self):
        super().__init__("ESCRITOR", "Escritor · Generador de contenido")

    def generar_articulo(self, tema):
        self.log(f"Generando artículo sobre: {tema}", "INFO")
        
        prompt = f"Escribe un artículo técnico de 600 palabras sobre: {tema}. Audiencia: directivos y funcionarios en México. Tono profesional, sin jerga innecesaria. Estructura: introducción, 3 puntos clave, conclusión con call-to-action."
        
        # Usar curl para no depender de librerías extra
        cmd = [
            "curl", "-s", "-X", "POST", "https://api.groq.com/openai/v1/chat/completions",
            "-H", f"Authorization: Bearer {GROQ_API_KEY}",
            "-H", "Content-Type: application/json",
            "-d", json.dumps({
                "model": "llama3-70b-8192", # Modelo potente de Groq
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.7
            })
        ]
        
        try:
            r = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
            if r.returncode == 0:
                data = json.loads(r.stdout)
                if "choices" in data:
                    articulo = data["choices"][0]["message"]["content"]
                    self.log("Artículo generado con éxito", "OK")
                    return articulo
                else:
                    self.log(f"Error de Groq: {data}", "ERROR")
            else:
                self.log(f"Error de red: {r.stderr}", "ERROR")
        except Exception as e:
            self.log(f"Error ejecutando Groq: {e}", "ERROR")
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python3 escritor.py <tema>")
        sys.exit(1)
    e = Escritor()
    articulo = e.generar_articulo(" ".join(sys.argv[1:]))
    if articulo:
        print("\n" + "="*50 + "\n")
        print(articulo)
        print("\n" + "="*50)
