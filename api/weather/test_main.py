from main import app, WeatherQueries
import datetime
import json
from fastapi.testclient import TestClient

client = TestClient(app)

class FakeWeatherQueries:
    def get_weather(self, full_path):
        data = {
            "days": [{"temp": 5},]
        }
        return data
    
    def get_date_list(self, today):
        return ["2022-06-12", "2022-05-12",]


def test_get_date_list():
    # ARRANGE
    test_date = datetime.date(2022, 7, 12)
    correct_dates = [
        "2022-06-12",
        "2022-05-12",
        "2022-04-12",
        "2022-03-12",
        "2022-02-12",
        "2022-01-12",
        "2021-12-12",
        "2021-11-12",
        "2021-10-12",
        "2021-09-12",
        "2021-08-12",
    ]

    # ACT
    dates = WeatherQueries.get_date_list(self=[],today=test_date)

    # ASSERT
    assert dates == correct_dates


def test_temp_list():
    # ARRANGE
    app.dependency_overrides[WeatherQueries] = FakeWeatherQueries
    correct_info = {
        "temps": [
            {"date": {"today": 5}},
            {"date": {"2022-06-12": 5}},
            {"date": {"2022-05-12": 5}},
        ]
    }

    # ACT
    response = client.get("/api/weather?city=Berlin&country=Germany")


    # ASSERT
    response.status_code == 200
    content = json.loads(response.content)
    assert content == correct_info

    # CLEAN UP
    app.dependency_overrides = {}
