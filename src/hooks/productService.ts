import axios from 'axios';

const API_URL = 'https://mock-data-josw.onrender.com/products';

export interface Product {
  id?: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  rating?: number;
}

// Fetch all products from the API
export const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get(API_URL);
  if (res.status !== 200) {
    throw new Error('Failed to fetch products');
  }
  console.log('products:', res.data.slice(0, 1));
  return res.data;
};

// Create a new product
export const createProduct = async (product: Product) => {
  const res = await axios.post<Product>(API_URL, product);
  return res.data;
};
