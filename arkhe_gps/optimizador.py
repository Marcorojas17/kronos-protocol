from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp

def crear_modelo_datos():
    """Configura los puntos y la matriz de distancias (simulada para el MVP)"""
    # Índice 0 es la bodega, 1 al 4 son los clientes
    datos = {}
    
    # Supongamos que estas son las distancias en KM entre los puntos:
    #       Bodega, Cliente 1, Cliente 2, Cliente 3, Cliente 4
    datos['matriz_distancias'] = [
        [0, 10, 15, 20, 25], # Bodega
        [10, 0, 35, 25, 30], # Cliente 1
        [15, 35, 0, 30, 20], # Cliente 2
        [20, 25, 30, 0, 15], # Cliente 3
        [25, 30, 20, 15, 0], # Cliente 4
    ]
    datos['num_vehiculos'] = 1 # Un solo repartidor
    datos['nodo_inicio'] = 0   # Empieza en la bodega
    return datos

def imprimir_solucion(manager, routing, solucion):
    """Imprime la ruta óptima"""
    print('\n--- RUTA ÓPTIMA DE PAQUETERÍA ---')
    index = routing.Start(0)
    plan_output = 'Ruta del vehículo:\n'
    distancia_ruta = 0
    while not routing.IsEnd(index):
        nodo = manager.IndexToNode(index)
        plan_output += f' -> Parada {nodo} '
        previous_index = index
        index = solucion.Value(routing.NextVar(index))
        distancia_ruta += routing.GetArcCostForVehicle(previous_index, index, 0)
    plan_output += f' -> Regreso a Bodega {manager.IndexToNode(index)}\n'
    plan_output += f'Distancia total optimizada: {distancia_ruta} km\n'
    print(plan_output)

def main():
    # 1. Instanciar los datos
    datos = crear_modelo_datos()
    
    # 2. Crear el administrador de índices y el modelo de ruteo
    manager = pywrapcp.RoutingIndexManager(len(datos['matriz_distancias']), datos['num_vehiculos'], datos['nodo_inicio'])
    routing = pywrapcp.RoutingModel(manager)

    # 3. Crear y registrar el callback para la distancia
    def distancia_callback(from_index, to_index):
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return datos['matriz_distancias'][from_node][to_node]

    transit_callback_index = routing.RegisterTransitCallback(distancia_callback)
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

    # 4. Configurar la heurística de búsqueda (El algoritmo)
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    # Estrategia: Primera solución factible, luego mejora por vecino más cercano
    search_parameters.first_solution_strategy = (routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC)
    # Estrategia: Metaheurística para mejorar la solución
    search_parameters.local_search_metaheuristic = (routing_enums_pb2.LocalSearchMetaheuristic.GUIDED_LOCAL_SEARCH)
    search_parameters.time_limit.seconds = 5 # Buscar la mejor ruta por máximo 5 segundos

    # 5. Resolver el problema
    print("Calculando la ruta más eficiente...")
    solucion = routing.SolveWithParameters(search_parameters)

    # 6. Imprimir resultados
    if solucion:
        imprimir_solucion(manager, routing, solucion)
    else:
        print("No se encontró una solución.")

if __name__ == '__main__':
    main()
