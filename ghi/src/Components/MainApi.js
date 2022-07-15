export const loadWeatherData = async (city, country) => {
  const response = await fetch(
    `http://localhost:8001/api/weather?city=${encodeURIComponent(
      city
    )}&country=${encodeURIComponent(country)}`
  );

  if (!response.ok) {
    console.error(await response.json());
    throw new Error(`Failed to get weather data -- HTTP ${response.status}`);
  }

  const responseJson = await response.json();
  return responseJson.temps;
};

export const loadFlightData = async () => {
  // const response = await fetch("http://localhost:8002/api/flights");
  // const responseJson = await response.json();
  // return responseJson;
  return "flight data";
};

export const loadCurrencyData = async () => {
  // const response = await fetch("http://localhost:8003/api/currency");
  // const responseJson = await response.json();
  // return responseJson;
  return "currency data";
};
