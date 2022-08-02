export const loadItemsList = async (condition) => {
  const response = await fetch(
    `http://localhost:8005/api/items/conditions/${condition}/`
  );

  if (!response.ok) {
    console.error(await response.json());
    throw new Error(`Failed to get items -- HTTP ${response.status}`);
  }

  const responseJson = await response.json();
  return responseJson;
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
