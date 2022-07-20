export const loadLocationsData = async () => {
  const response = await fetch("http://localhost:8004/api/locations");
  const responseJson = await response.json();
  return responseJson.countries;
};
