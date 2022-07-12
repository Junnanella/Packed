import json
from fastapi import FastAPI
import requests
from pydantic import BaseModel
import datetime
import os
app = FastAPI()

WEATHER_API_KEY = os.environ["WEATHER_API_KEY"]
base_url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
rest_of_path = f"?unitGroup=us&elements=tempmax%2Ctempmin%2Ctemp&key={WEATHER_API_KEY}&contentType=json"
# months = {
#     {1:"Jan"},
#     {2:"Feb"},
#     {3:"Mar"},
#     {4:"Apr"},
#     {5:"May"},
#     {6:"Jun"},
#     {7:"July"},
#     {8:"Aug"},
#     {9:"Sep"},
#     {10:"Oct"},
#     {11:"Nov"},
#     {12:"Dec"},
# }

class TempOut(BaseModel):
    temp: int


class TempsOut(BaseModel):
    temps: list[TempOut]


def get_date_list(today):
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
    print(dates)
    return dates


def get_weather(query):
    response = requests.get(query)
    data = json.loads(response.content)
    return data


# @app.get("/temperature/current")
# def current_weather(city:str, country:str):
#     search_parameters = f"{city}%20{country}/today"
#     query = base_url + search_parameters + rest_of_path
#     data = get_weather(query)
#     max_temp = data["days"][0]["tempmax"]
#     min_temp = data["days"][0]["tempmin"]
#     temp = (max_temp + min_temp) / 2
#     return temp

    
@app.get("/temperature/year")
def temp_list(city:str, country:str):
    dates = ["today"]
    dates += get_date_list(datetime.date.today())
    temps = []
    for date in dates:
        date_section = "today" if date == "today" else f"{date}/{date}"
        search_parameters = f"{city}%20{country}/{date_section}"
        query = base_url + search_parameters + rest_of_path
        print(query)
        data = get_weather(query)
        temps.append([{"temp_max": data["days"][0]["tempmax"]}, {"temp_min": data["days"][0]["tempmin"]}])
        # temps.append(data["days"][0]["temp"])
    return temps
