FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./src ./src
COPY ./web ./web
COPY ./appconfig.yaml ./appconfig.yaml

WORKDIR /app/src
CMD ["python", "main.py"]