FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

COPY requirements.txt requirements.txt
COPY manage.py manage.py

COPY common common
COPY packed packed
COPY packed_api packed_api

RUN pip install -r requirements.txt
CMD python manage.py migrate && gunicorn packed.wsgi --bind 0.0.0.0:$PORT --log-file -
