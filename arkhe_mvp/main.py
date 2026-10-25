import pandas as pd
from fastapi import FastAPI, File, UploadFile, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
import math
import io
from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp
import random

app = FastAPI(title="ARKHÉ GPS - Optimizador de Rutas")
templates = Jinja2Templates(directory=".")

# Fórmula matemática para calcular distancia entre dos coordenadas
def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Radio de la Tierra en km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon/2)**2
    c = 2 * math.asin(math.sqrt(a))
    return int(R * c * 1000) # Retorna metros enteros

# Endpoint para mostrar la página web (Frontend)
@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# Endpoint para procesar el Excel
@app.post("/optimizar")
async def optimizar_ruta(file: UploadFile = File(...)):
    # 1. Leer el Excel
    contents = await file.read()
    df = pd.read_excel(io.BytesIO(contents))

    if 'Direccion' not in df.columns:
        return {"error": "El Excel debe tener una columna llamada 'Direccion'"}

    # 2. Simulación de Geocodificación (Asignamos coordenadas cerca de Toluca)
    # En producción, aquí se conectaría a OpenRouteService o Google Maps API.
    bodega = {"lat": 19.2826, "lng": -99.6556, "nombre": "Bodega Central"}
    puntos = [bodega]

    for index, row in df.iterrows():
        # Simulamos coordenadas aleatorias cerca del centro de Toluca
        lat = 19.28 + random.uniform(-0.05, 0.05)
        lng = -99.65 + random.uniform(-0.05, 0.05)
        puntos.append({"lat": lat, "lng": lng, "nombre": row['Direccion']})

    # 3. Crear Matriz de Distancias
    matriz = []
    for i in range(len(puntos)):
        fila = []
        for j in range(len(puntos)):
            if i == j:
                fila.append(0)
            else:
                dist = haversine(puntos[i]['lat'], puntos[i]['lng'], puntos[j]['lat'], puntos[j]['lng'])
                fila.append(dist)
        matriz.append(fila)

    # 4. Configurar OR-Tools
    manager = pywrapcp.RoutingIndexManager(len(matriz), 1, 0)
    routing = pywrapcp.RoutingModel(manager)

    def distancia_callback(from_index, to_index):
        return matriz[manager.IndexToNode(from_index)][manager.IndexToNode(to_index)]

    transit_callback_index = routing.RegisterTransitCallback(distancia_callback)
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC
    search_parameters.local_search_metaheuristic = routing_enums_pb2.LocalSearchMetaheuristic.GUIDED_LOCAL_SEARCH
    search_parameters.time_limit.seconds = 2

    # 5. Resolver
    solucion = routing.SolveWithParameters(search_parameters)

    if not solucion:
        return {"error": "No se pudo encontrar una ruta."}

    # 6. Extraer la ruta ordenada
    index = routing.Start(0)
    ruta_optimizada = []
    while not routing.IsEnd(index):
        nodo = manager.IndexToNode(index)
        ruta_optimizada.append(puntos[nodo])
        index = solucion.Value(routing.NextVar(index))
    
    # Añadir el regreso a la bodega
    ruta_optimizada.append(puntos[0])

    return {"status": "ok", "ruta": ruta_optimizada}
