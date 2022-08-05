export const loadWeatherData = async (
  city,
  country,
  departure_date,
  return_date
) => {
  // 🚨🚨🚨 REMOVE "fake" from url before deploying!!
  const response = await fetch(
    `${
      process.env.REACT_APP_FASTAPI_WEATHER
    }/api/weather?city=${encodeURIComponent(city)}&country=${encodeURIComponent(
      country
    )}&departure_date=${departure_date}&return_date=${return_date}`
  );

  if (!response.ok) {
    console.error(await response.json());
    throw new Error(`Failed to get weather data -- HTTP ${response.status}`);
  }

  const responseJson = await response.json();
  return responseJson.temps;
};

// Flights feature not yet implemented into application
// uncomment below when ready to implement

// export const loadFlightData = async (
//   origin_city,
//   destination_city,
//   departure_date,
//   return_date
// ) => {
//   const flights = [
//     { date: "today", cost: 100.0 },
//     { date: "2022-06-14", cost: 150.0 },
//     { date: "2022-05-14", cost: 250.0 },
//   ];

//   return flights;

// use and update the below to connect with actual api
// const response = await fetch(`${process.env.REACT_APP_FASTAPI_FLIGHTS}/api/flights`);
// const responseJson = await response.json();
// return responseJson.flights;
// };

export const loadCurrencyData = async (origin_country, destination_country) => {
  // 🚨🚨🚨 REMOVE "fake" from url before deploying!!
  const response = await fetch(
    `${
      process.env.REACT_APP_FASTAPI_CURRENCY
    }/api/fake/convert?origin_country=${encodeURIComponent(
      origin_country
    )}&destination_country=${encodeURIComponent(destination_country)}`,
    { mode: "cors" }
  );

  if (!response.ok) {
    console.error(await response.json());
    throw new Error(`Failed to get currency data -- HTTP ${response.status}`);
  }

  const responseJson = await response.json();
  return responseJson;
};
