// fetch countries object that contains array of objects
// {countries: Array(242)}
// countries: (242) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…},
// 0: {id: 1, currency_code: 'AFN', country: 'Afghanistan'
// that is used to load country names on Trip Form dropdowns
export const loadLocationsData = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_FASTAPI_LOCATIONS}/api/locations/`
  );
  const responseJson = await response.json();
  return responseJson.countries;
};

// fetch packing_lists object, containing an array of packing list objects
// that is used in rendering packing list instances on PackingLists page
export const loadPackingLists = async (authTokens) => {
  const fetchConfig = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(authTokens?.access),
    },
  };
  const response = await fetch(
    `${process.env.REACT_APP_DJANGO_PACKING_LISTS}/api/packing_lists/`,
    fetchConfig
  );
  const responseJson = await response.json();
  console.log(responseJson);
  return responseJson.packing_lists;
};
