FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

COPY requirements.txt requirements.txt
COPY main.py main.py
COPY countries.txt countries.txt
COPY db.py db.py

RUN pip install -r requirements.txt
CMD uvicorn main:app --reload --host 0.0.0.0 --port $PORT
