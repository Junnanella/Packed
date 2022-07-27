export const loadWeatherData = async (city, country) => {
  // 🚨🚨🚨 REMOVE "fake" from url before deploying!!
  // const response = await fetch(
  //   `http://localhost:8001/api/weather/fake?city=${encodeURIComponent(
  //     city
  //   )}&country=${encodeURIComponent(country)}`
  // );

  // if (!response.ok) {
  //   console.error(await response.json());
  //   throw new Error(`Failed to get weather data -- HTTP ${response.status}`);
  // }

  // const responseJson = await response.json();
  // return responseJson.temps;
  return {
    temps: [
      {
        date: "July",
        temperature: 75.9,
      },
      {
        date: "August",
        temperature: 75.9,
      },
    ],
  };
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
  // use and update the below to connect with actual api
  // const response = await fetch("http://localhost:8002/api/flights");
  // const responseJson = await response.json();
  // return responseJson.flights;
};

export const loadCurrencyData = async (origin_country, destination_country) => {
  // 🚨🚨🚨 REMOVE "fake" from url before deploying!!
  const response = await fetch(
    `http://localhost:8003/api/fake/convert?origin_country=${encodeURIComponent(
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
