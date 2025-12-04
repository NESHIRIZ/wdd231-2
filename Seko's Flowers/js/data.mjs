// Module for fetching and handling data with error handling
export async function fetchProducts() {
  try {
    const response = await fetch('./data/products.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function loadProducts() {
  try {
    const products = await fetchProducts();
    return products;
  } catch (error) {
    console.error('Failed to load products:', error);
    return [];
  }
}
