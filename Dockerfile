# Usar Python oficial
FROM python:3.11-slim

# Establecer directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# Copiar e instalar dependencias de Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install mcp google-genai

# Copiar el resto del código
COPY . .

# Exponer el puerto para SSE
EXPOSE 8000

# Comando de inicio
CMD ["python", "global_server.py"]
