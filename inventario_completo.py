import os

def generar_inventario(directorio="."):
    print("# 📁 INVENTARIO COMPLETO DE ARCHIVOS - ARKHÉ ZERO\n")
    print("| Archivo | Tamaño | Ruta |")
    print("| :--- | :--- | :--- |")
    
    total_archivos = 0
    for root, dirs, files in os.walk(directorio):
        # Ignorar carpetas pesadas o irrelevantes
        if any(x in root for x in ['.git', 'node_modules', 'venv', '__pycache__']):
            continue
            
        for file in sorted(files):
            ruta_completa = os.path.join(root, file)
            ruta_relativa = os.path.relpath(ruta_completa, directorio)
            
            try:
                tamaño = os.path.getsize(ruta_completa)
                tamaño_str = f"{tamaño/1024:.1f} KB" if tamaño > 1024 else f"{tamaño} B"
                print(f"| `{file}` | {tamaño_str} | `{ruta_relativa}` |")
                total_archivos += 1
            except:
                pass
                
    print(f"\n**Total de archivos indexados:** {total_archivos}")

if __name__ == "__main__":
    generar_inventario()
