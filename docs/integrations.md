# Integrations

The application gets the following data from external APIs:

* [Visual Crossing - Weather](https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/)
   - Shows historical weather data for the future travel dates input by the user, enabling them to better plan for their trip
   - For each month of travel time, an additional temperature datapoint is fetched to ensure the most accuracy
* [Currency Exchange Rate API](https://apilayer.com/marketplace/exchangerates_data-api#documentation-tab): 
    - Provides international travelers with current exchange rate between the origin country and destination
    - Each time authenticated users access their created packing list, the forex rate will be fetched live
 