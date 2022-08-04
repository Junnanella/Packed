from fastapi import FastAPI, HTTPException
import requests
import os
from fastapi.middleware.cors import CORSMiddleware

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
    payload = {}
    headers = {"apikey": CURRENCY_RATE_API_KEY}

    response = requests.request("GET", url, headers=headers, data=payload)

    if not response.ok and "API rate limit" in response.text:
        raise ApiRateLimitExceeded()

    result = response.text
    result_split = str(result).splitlines()[-2]
    rate = result_split[12:-1]
    return rate


@app.get("/api/convert")
def currency_exchange_rate(origin_country, destination_country):
    try:
        url = f"https://api.apilayer.com/exchangerates_data/convert?to={origin_country}&from={destination_country}&amount=1"
        currency_rate = get_currency_rate(url)
        return currency_rate
    except ApiRateLimitExceeded:
        raise HTTPException(status_code=400, detail="Currency API rate limit exceeded")


@app.get("/api/fake/convert")
def fake_currency_exchange_rate(origin_country, destination_country):
    return "0.987"


# API call output

# {
#     "success": true,
#     "query": {
#         "from": "USD",
#         "to": "EUR",
#         "amount": 1
#     },
#     "info": {
#         "timestamp": 1657670399,
#         "rate": 0.997805
#     },
#     "date": "2022-07-11",
#     "result": 0.997805
# }
