export const loadLocationsData = async () => {
  const response = await fetch(`${process.env.REACT_APP_FASTAPI_LOCATIONS}/api/locations/`);
  const responseJson = await response.json();
  return responseJson.countries;
};
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
  return responseJson.packing_lists;
};
