from fastapi import FastAPI, Depends, Response, status
from fastapi.middleware.cors import CORSMiddleware
from typing import Union
from pydantic import BaseModel
import os
from db import CurrencyQueries

app = FastAPI()

origins = ["http://localhost:3000", os.environ.get("CORS_HOST", None)]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)


class CountryOut(BaseModel):
    id: int
    currency_code: str
    country: str


class CountriesOut(BaseModel):
    countries: list[CountryOut]


class ErrorMessage(BaseModel):
    message: str

<<<<<<< HEAD
# 🚨
@app.get("/api/locations",
=======

@app.get(
    "/api/locations",
>>>>>>> 942cb8be5a00baac349d4295db68187cf5d7da35
    response_model=Union[CountriesOut, ErrorMessage],
    responses={
        200: {"model": CountriesOut},
        404: {"model": ErrorMessage},
    },
)
def get_countries_and_currencies(
    response: Response,
    query=Depends(CurrencyQueries),
):
    countries = query.get_list_from_db()
    if len(countries) < 5:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "Results returned incompatible format. Check database"}
    return {"countries": countries}
