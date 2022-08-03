export const loadLocationsData = async () => {
  const response = await fetch("http://localhost:8004/api/locations");
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
    `http://localhost:8005/api/packing_lists/`,
    fetchConfig
  );
  const responseJson = await response.json();
  return responseJson.packing_lists;
};
