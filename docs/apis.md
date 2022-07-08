# APIs

- Currency Exchange API: https://polygon.io/docs/stocks/getting-started
- Flight API: Still looking for a free one 
- Weather API: https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/ 

* **Method**: `GET`
* **Path**: /api/currency_exchange_rate

Input:

```json
{
  "date": string,  
  "country": string,
}
```

Output:

```json
{
  "id": int,
  "current_exchange_rate": int,
}
```

Creating a new country/date will query a currency exchange rate API
and will return the current days exchange rate from USD to the created country's currency


* **Method**: `GET`
* **Path**: /api/flights

Input:

```json
{
  "departing_from": string,
  "going_to": string, 
  "departing_date": string,
  "return_date": string,
  "number_of_passengers": int,

}
```

Output:

```json
{
  "id": int,
  "departing_flight": string,
  "returning_flight": string,
  "airline": string,
  "price": int,
}
```

Creating a new location uses the incoming city and state
data to query an image API to get a URL for an image for
the location. Then, it saves the name, city, state, and
image URL to the database. It returns all of the data
with the new database id.

Creating a new flight date/flight location will query a flight API which will search all available flights to said destination. It will then return a list of all those flights and include their prices. 

* **Method**: `GET`
* **Path**: /api/weather

Input:

```json
{
  "city": string,
  "state": string,
  "country": string,
}
```

Output:

```json
{
  "id": int,
  "weather_data": string,
}
```

Creating a new location will query a weather API to get historical weather data going back a maximum of 12 months. It will return a monthly breakdown of the average temperature so that the user can determine the best time to travel. 