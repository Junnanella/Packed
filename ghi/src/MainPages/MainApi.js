export const loadLocationsData = async () => {
  //   const response = await fetch("http://localhost:8004/api/locations");
  //   const responseJson = await response.json();
  //   console.log(responseJson);
  //   return responseJson.countries;

  const locations = [
    {
      id: 1,
      currency_code: "EUR",
      country: "Germany",
    },
    {
      id: 2,
      currency_code: "USD",
      country: "United States of America",
    },
  ];

  return locations;
};
