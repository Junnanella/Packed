# APIs

- Currency Exchange API: https://apilayer.com/marketplace/exchangerates_data-api#documentation-tab
- Flight API: Still looking for a free one
- Weather API: https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/
- Locations API: localhost:8004/api/locations

* **Method**: `GET`
* **Path**: /api/convert

Input:

```json
{
  "origin_country": string,
  "destination_country": string,
}
```

Output:

```json
{
  "id": int,
  "result": float,
}
```

Creating a new origin country/ destination country will query a currency exchange rate API
and will return the current days exchange rate from USD(example origin country) to the created destinations country's currency. The amount to convert will be hardcoded as 1 so currency rate will only be returned for 1 USD (example origin country)

- **Method**: `GET`
- **Path**: /api/flights

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

- **Method**: `GET`
- **Path**: /api/weather

Input:

```json
{
  "city": string,
  "country": string,
  "departure_date": string,
  "return_date": string
}
```

🐰 🐰 🐰 example input:
{
"city": "Sydney",
"country": "Australia",
"departure_date": "2022-12-28",
"return_date": "2023-01-30"
}

Output:

```json
{
  "temps": [
    {
      "id": 0,
      "date": "December",
      "temperature": 75.9
    },
    {
      "id": 1,
      "date": "January",
      "temperature": 75.9
    }
  ]
}
```

Creating a new location will query a weather API to get historical weather data for their trip dates.

- **Method**: `GET`
- **Path**: /api/locations

Output:

```json
{
  "countries": [
    {
      "id": 1,
      "currency_code": "EUR",
      "country": "Germany"
    },
    {
      "id": 2,
      "currency_code": "USD",
      "country": "United States of America"
    }
  ]
}
```

The list of returned countries will be used to populate the country dropdown form in the GHI. When a user selects a country, the currency_code is sent to the currency api and the country is sent to the weather api
