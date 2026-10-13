FROM python:3.11-slim
WORKDIR /app

# 100/10: evita .pyc y buffer
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

COPY . .

# Crea carpetas necesarias si no existen
RUN mkdir -p audit cola_reintento web

# 100/10: Render inyecta PORT dinámico
EXPOSE 8080

# Healthcheck para Render
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8080/').read()" || exit 1

# 100/10: gunicorn con app:app - producción, no python app.py
CMD ["sh", "-c", "gunicorn app:app --bind 0.0.0.0:${PORT:-8080} --workers 2 --timeout 120 --access-logfile - --error-logfile -"]
