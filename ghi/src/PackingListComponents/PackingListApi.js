// loading functions for fetching from the backend

export const loadItemsList = async (condition) => {
  const response = await fetch(
    `http://localhost:8005/api/items/conditions/${condition}/`
  );
  // console.log("Test", response)

  if (!response.ok) {
    console.error(await response.json());
    throw new Error(`Failed to get items -- HTTP ${response.status}`);
  }

  const responseJson = await response.json();
  return responseJson;
};
