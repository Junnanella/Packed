
export const loadItemsList = async (condition, fetchConfig) => {

  const response = await fetch(
    `http://localhost:8005/api/items/conditions/${condition}/`,
    fetchConfig,
  );

  if (!response.ok) {
    console.error(await response.json());
    throw new Error(`Failed to get items -- HTTP ${response.status}`);
  }

  const responseJson = await response.json();
  return responseJson;
};
