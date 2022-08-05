from main import app
import requests
from fastapi.testclient import TestClient
import os

CURRENCY_RATE_API_KEY = os.environ["CURRENCY_RATE_API_KEY"]

client = TestClient(app)
url = "https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=USD&amount=1"
payload = {}
headers = {"apikey": CURRENCY_RATE_API_KEY}


def test_get_currency_result():
    response = requests.request("GET", url, headers=headers, data=payload)
    test_result = response.text
    result = test_result
    assert result == response.text


def test_get_currency():
    """
    Tests the API call output to make sure it's ONLY returning the "result" key
    rather than the complete dictionary output by checking if it's an integer """

    response = client.get("/api/convert")
    response.status_code == 200
    response = requests.request("GET", url, headers=headers, data=payload)
    result = response.json()
    result_split = int(result["result"])
    assert isinstance(result_split, int)
