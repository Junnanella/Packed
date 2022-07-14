from main import app
from fastapi import FastAPI
import requests
import json
from fastapi.testclient import TestClient

client = TestClient(app)
url = "https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=USD&amount=1"
payload = {}
headers= {
    "apikey": "BzBwcOYZtoPuGSspEZkc5B6poXqOaS48"
  }

def test_get_currency_result():
    response = requests.request("GET", url, headers=headers, data = payload)
    test_result = response.text
    result = test_result
    assert result == response.text


def test_get_currency():
    currency = {
        "result": float 
        }

    response = client.get("/api/convert")
    response.status_code == 200
    response = requests.request("GET", url, headers=headers, data = payload)
    result = response.text
    result_split = str(result).splitlines()[-2]
    assert currency == float(result_split)




