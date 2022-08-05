import json
import requests
from acls import FLIGHTS_API_KEY



# Query the search API by origin code, destination, depature date, and one way
def get_flight(orginIataCode, destinationIataCode, departureDate, oneWay, :
    try:
        url = "https://test.api.amadeus.com/v1/analytics/itinerary-price-metrics"
        headers = {
            "Authorization": "Bearer %s" % FLIGHTS_API_KEY,
        }

        url_params = {
            "category": category.replace(" ", "+"),
            "location": location.replace(" ", "+"),
            "limit": 50,
        }

        response = requests.request(
            "GET", url, headers=headers, params=url_params
        )

        content = json.loads(response.content)

        if "error" in content:
            return {"invalid": content["error"]["code"]}
        return content
    # handles the case when Amadeus is Down
    # per Api documentation, it will return a 500 internal server error
    # 
    except Exception:
        Amadeus_down_dict = {"amadeus_down": "something is wrong"}
        return Amadeus_down_dict


def get_details_of_one_eatery(amadeus_id):
    url = "" + amadeus_id

    headers = {
        "Authorization": "Bearer %s" % FLIGHTS_API_KEY,
    }

    response = requests.request("GET", url, headers=headers)
    content = json.loads(response.content)

    return content