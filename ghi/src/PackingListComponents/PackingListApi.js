
export const loadItemsList = async (condition, fetchConfig) => {

  const response = await fetch(
    `${process.env.REACT_APP_DJANGO_PACKING_LISTS}/api/items/conditions/${condition}/`,
    fetchConfig,
  );

  if (!response.ok) {
    console.error(await response.json());
    throw new Error(`Failed to get items -- HTTP ${response.status}`);
  }

  const responseJson = await response.json();
  return responseJson;
};



