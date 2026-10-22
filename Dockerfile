FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

COPY core_system/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install mcp google-genai

COPY core_system/ .

EXPOSE 8000

CMD ["python", "global_server.py"]
