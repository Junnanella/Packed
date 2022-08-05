import json
from fastapi import FastAPI, Depends
import requests
import random
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import datetime
import os

app = FastAPI()

origins = ["http://localhost:3000", os.environ.get("CORS_HOST", None)]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)


WEATHER_API_KEY = os.environ["WEATHER_API_KEY"]
base_url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
rest_of_path = f"?unitGroup=us&elements=name%2Ctempmax%2Ctempmin%2Ctemp&include=days%2Ccurrent&key={WEATHER_API_KEY}&contentType=json"


class TempOut(BaseModel):
    id: int
    date: str
    temperature: float


class TempsOut(BaseModel):
    temps: list[TempOut]


class WeatherQueries:
    def get_date_list(self, departure_date, return_date):
        departure_month = int(departure_date[5:7])
        return_month = int(return_date[5:7])
        dates = []
        months = []
        if departure_month > return_month:
            return_month = return_month + 12
        for i in range(departure_month, return_month + 1):
            if i > 12:
                i = str(i - 12)
                months.append(f"0{i}")
            elif i < 10:
                months.append(f"0{i}")
            else:
                months.append(str(i))
        for month in months:
            dates.append(f"2021-{month}-01")
        return dates

    def get_weather(self, full_path):
        response = requests.get(full_path)
        data = json.loads(response.content)
        return data


# 🚨
# 🐰 🐰 🐰 takes in dates in a "YYYY-MM-DD" format
@app.get("/api/weather", response_model=TempsOut)
def temp_list(
    city: str,
    country: str,
    departure_date: str,
    return_date: str,
    query=Depends(WeatherQueries),
):
    """
    Arguments: strings representing city, country, departure_date, and
    return_date sent by the frontend

    Returns: a dictionary with the key of 'temps' that has a list of
    dictionaries containing temperature data from each month of the
    travel time
    """

    dates = query.get_date_list(departure_date, return_date)
    temps = []

    # 🐰 🐰 🐰 get month names, turn "2023-01-19" to "January"
    months = []
    for date in dates:
        month = date[5:7]
        datetime_obj = datetime.datetime.strptime(month, "%m")
        month_name = datetime_obj.strftime("%B")
        months.append(month_name)
    for i in range(len(dates)):
        date = dates[i]
        date_section = f"{date}/{date}"
        search_parameters = f"{city}%20{country}/{date_section}"
        full_path = base_url + search_parameters + rest_of_path
        data = query.get_weather(full_path)
        temps.append(
            {"id": i, "date": months[i], "temperature": data["days"][0]["temp"]}
        )
    return {"temps": temps}


@app.get("/api/weather/fake", response_model=TempsOut)
def fake_temp_list(country: str, city: str, departure_date: str, return_date: str):
    """
    Arguments: strings representing city, country, departure_date, and
    return_date sent by the frontend

    Returns a dictionary with the key of 'temps' with fake weather data
    for testing purposes

    Use this function if develpoing features related to weather data as
    the weather api gets 1000 calls per day maximum
    """
    random_temperatures = random.sample(range(15, 85), 12)
    dates = ["July", "August", "September"]
    temps = []
    for index in range(len(dates)):
        temps.append(
            {
                "id": index,
                "date": dates[index],
                "temperature": random_temperatures[index],
            }
        )
    return {"temps": temps}
