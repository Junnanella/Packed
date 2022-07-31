from main import app, WeatherQueries
import datetime
import json
from fastapi.testclient import TestClient

client = TestClient(app)

class FakeWeatherQueries:
    def get_weather(self, full_path):
        print(full_path)
        data = {
            "days": [{"temp": 5},]
        }
        return data
    
    def get_date_list(self, departure_date, return_date):
        return ["2021-01-01", "2021-02-01",]


def test_get_date_list():
    # ARRANGE
    correct_dates = [
        "2021-01-01",
        "2021-02-01",
        "2021-03-01",
    ]

    # ACT
    dates = WeatherQueries.get_date_list(self=[],departure_date="2022-01-05", return_date="2022-03-12")

    # ASSERT
    assert dates == correct_dates


def test_temp_list():
    # ARRANGE
    app.dependency_overrides[WeatherQueries] = FakeWeatherQueries
    correct_info = {
        "temps": [
            {"id": 0, "date": "January", "temperature":  5},
            {"id": 1, "date": "February", "temperature": 5},
        ]
    }

    # ACT
    response = client.get("/api/weather?country=berlin&city=germany&departure_date=2023-01-05&return_date=2023-02-12")


    # ASSERT
    response.status_code == 200
    content = json.loads(response.content)
    assert content == correct_info

    # CLEAN UP
    app.dependency_overrides = {}
