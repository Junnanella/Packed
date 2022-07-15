export const loadWeatherData = async (city, country) => {
  const temps = [
    { date: "today", temperature: 78 },
    { date: "2022-06-14", temperature: 71.3 },
    { date: "2022-05-14", temperature: 60.6 },
  ];

  return temps;

  // use below to connect with actual api
  // const response = await fetch(
  //   `http://localhost:8001/api/weather?city=${encodeURIComponent(
  //     city
  //   )}&country=${encodeURIComponent(country)}`
  // );

  // if (!response.ok) {
  //   console.error(await response.json());
  //   throw new Error(`Failed to get weather data -- HTTP ${response.status}`);
  // }

  // const responseJson = await response.json();
  // return responseJson.temps;
};

export const loadFlightData = async (
  origin_city,
  destination_city,
  departure_date,
  return_date
) => {
  const flights = [
    { date: "today", cost: 100.0 },
    { date: "2022-06-14", cost: 150.0 },
    { date: "2022-05-14", cost: 250.0 },
  ];

  return flights;
  // const response = await fetch("http://localhost:8002/api/flights");
  // const responseJson = await response.json();
  // return responseJson.flights;
};

export const loadCurrencyData = async () => {
  return 78.6;
  // const response = await fetch("http://localhost:8003/api/currency");
  // const responseJson = await response.json();
  // return responseJson;
  return "currency data";
};
