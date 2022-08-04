from fastapi.testclient import TestClient
from main import app
import json
from db import CurrencyQueries

client = TestClient(app)


class FakeCurrencyQueriesFailure:
    def get_list_from_db(self):
        return {"message": "nothing returned"}


class FakeCurrencyQueriesSuccess:
    def get_list_from_db(self):
        return [
            {"id": 1, "currency_code": "AFN", "country": "Afghanistan"},
            {"id": 2, "currency_code": "ALL", "country": "Albania"},
            {"id": 3, "currency_code": "DZD", "country": "Algeria"},
            {"id": 4, "currency_code": "USD", "country": "American Samoa"},
            {"id": 5, "currency_code": "EUR", "country": "Andorra"},
            {"id": 6, "currency_code": "AOA", "country": "Angola"},
        ]


def test_get_countries_and_currencies_404():
    # ARRANGE
    app.dependency_overrides[CurrencyQueries] = FakeCurrencyQueriesFailure

    # ACT
    response = client.get("/api/locations")

    # ASSERT
    assert response.status_code == 404
    content = json.loads(response.content)
    assert content == {
        "message": "Results returned incompatible format. Check database"
    }

    # CLEAN UP
    app.dependency_overrides = {}


def test_get_countries_and_currencies_200():
    # ARRANGE
    app.dependency_overrides[CurrencyQueries] = FakeCurrencyQueriesSuccess

    # ACT
    response = client.get("/api/locations")

    # ASSERT
    assert response.status_code == 200

    # CLEAN UP
    app.dependency_overrides = {}
