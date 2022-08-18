# External APIs

- [Currency Exchange API](https://apilayer.com/marketplace/exchangerates_data-api#documentation-tab)
- [Weather API](https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/)

# Internal APIs

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
  "rate": float,
}
```

Creating a new origin_country/destination_country will query a currency exchange rate API
and will return the current days exchange rate from USD(example origin_country) to the created
destinations country's currency. The amount to convert will be defaulted to 1 but the user can edit the amount.

- **Method**: `GET`
- **Path**: /api/flights

Expected Input:

```json
{
  "departing_from": string,
  "going_to": string,
  "departing_date": string,
  "return_date": string,
  "number_of_passengers": int,

}
```

Expected Output:

```json
{
  "id": int,
  "departing_flight": string,
  "returning_flight": string,
  "airline": string,
  "price": int,
}
```

Expected:

Creating a new flight destination with a date will query a flight API which will search
all available flights to said destination. It will then return a list of all those flights and
include their prices/airline/flight number with a link to book the flight.


- **Method**: `GET`
- **Path**: /api/weather

Input:

```json
{
  "destination_city": string,
  "destination_country": string,
  "departure_date": string,
  "return_date": string
}
```

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

Creating a new destination location will query a weather API to get historical weather data for the user's
trip dates. The API will go back a maximum of 12 months and pull weather data from the same month from
the prior year to give the user an idea of what the weather could look like.

- **Method**: `GET`
- **Path**: /api/locations/

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

The list of returned countries will be used to populate the country dropdown form in the GHI. When a
user selects a country, the currency_code is sent to the currency api and the country is sent to
the weather api.
