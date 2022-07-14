import json
from fastapi import FastAPI, Depends
import requests
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import datetime
import os

app = FastAPI()

origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST", None)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


WEATHER_API_KEY = os.environ["WEATHER_API_KEY"]
base_url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
rest_of_path = f"?unitGroup=us&elements=name%2Ctempmax%2Ctempmin%2Ctemp&include=days%2Ccurrent&key={WEATHER_API_KEY}&contentType=json"


class TempOut(BaseModel):
    date: dict


class TempsOut(BaseModel):
    temps: list[TempOut]


class WeatherQueries:
    def get_date_list(self, today:datetime):
        dates = []
        month_back = today.month - 1
        day = today.day if today.day < 29 else 28
        year_back = today.year
        while month_back != today.month:
            if month_back < 1:
                month_back = 12
                year_back -= 1
            two_digit_month = str(month_back) if month_back >= 10 else f"0{month_back}"
            dates.append(f"{year_back}-{two_digit_month}-{day}")
            month_back -= 1
        return dates

    def get_weather(self, full_path):
        response = requests.get(full_path)
        data = json.loads(response.content)
        return data


@app.get("/api/weather/{country}/{city}", response_model=TempsOut)
def temp_list(city:str, country:str, query=Depends(WeatherQueries)):
    dates = ["today"]
    dates += query.get_date_list(datetime.date.today())
    temps = []
    for date in dates:
        date_section = "today" if date == "today" else f"{date}/{date}"
        search_parameters = f"{city}%20{country}/{date_section}"
        full_path = base_url + search_parameters + rest_of_path
        data = query.get_weather(full_path)
        # temps.append({ date:[
        #     {"temp_max": data["days"][0]["tempmax"]},
        #     {"temp_min": data["days"][0]["tempmin"]},
        #     {"temp": data["days"][0]["temp"]},
        # ]})
        temps.append(
            {"date": { date: data["days"][0]["temp"]}}
        )
    return {"temps": temps}
