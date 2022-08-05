from fastapi import FastAPI, HTTPException
import requests
import os
from fastapi.middleware.cors import CORSMiddleware
import json

CURRENCY_RATE_API_KEY = os.environ["CURRENCY_RATE_API_KEY"]

app = FastAPI()

origins = ["http://localhost:3000", os.environ.get("CORS_HOST", None)]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

url = "https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=USD&amount=1"

payload = {}
headers = {"apikey": CURRENCY_RATE_API_KEY}


class ApiRateLimitExceeded(Exception):
    pass


def get_currency_rate(url):
    """
    Takes the API url and makes sure only the "result" key, which holds
    the currency exchange rate, is pulled from the API call using the built in splitines() method """

    payload = {}
    headers = {"apikey": CURRENCY_RATE_API_KEY}

    response = requests.request("GET", url, headers=headers, data=payload)

    if not response.ok and "API rate limit" in response.text:
        raise ApiRateLimitExceeded()
    data = json.loads(response.content)
    total_rate = data["result"]
    rate = float("{0:.2f}".format(total_rate))
    return rate


@app.get("/api/convert")
def currency_exchange_rate(origin_country, destination_country):
    try:
        url = f"https://api.apilayer.com/exchangerates_data/convert?to={origin_country}&from={destination_country}&amount=1"
        currency_rate = get_currency_rate(url)
        return currency_rate
    except ApiRateLimitExceeded:
        raise HTTPException(status_code=400, detail="Currency API rate limit exceeded")
