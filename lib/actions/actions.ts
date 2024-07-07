const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type FetchParams = {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
};

export const fetchData = async (endpoint: string, params: FetchParams = {}) => {
  try {
    const url = `${BASE_URL}/${endpoint}`;
    const response = await fetch(url, {
      ...params,
      headers: {
        'Content-Type': 'application/json',
        ...params.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Sesuaikan dengan kebutuhan
  }
};

// Fungsi yang menggunakan fetchData

export const getCollections = async () => {
  return await fetchData('collections');
};

export const getCollectionDetails = async (collectionId: string) => {
  return await fetchData(`collections/${collectionId}`);
};

export const getProducts = async () => {
  return await fetchData('products');
};

export const getProductDetails = async (productId: string) => {
  return await fetchData(`products/${productId}`);
};

export const getSearchedProducts = async (query: string) => {
  return await fetchData(`search/${query}`);
};

export const getOrders = async (customerId: string) => {
  return await fetchData(`orders/customers/${customerId}`);
};

export const getRelatedProducts = async (productId: string) => {
  return await fetchData(`products/${productId}/related`);
};
