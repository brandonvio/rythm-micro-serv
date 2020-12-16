FROM python:3.7-slim

WORKDIR /usr/oanda-stream
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY ./src/ ./src
COPY ./app.py .
COPY .env .
ENTRYPOINT ["python", "app.py"]