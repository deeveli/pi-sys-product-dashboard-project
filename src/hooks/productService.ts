import axios from 'axios';

const API_URL = 'https://mock-data-josw.onrender.com/products';

export interface Product {
  id?: number;
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

// Get a product by ID
export const getProductById = async (id: number) => {
  const response = await axios.get<Product>(`${API_URL}/${id}`);
  return response.data;
};

// Update a product by ID
export const updateProduct = async (id: number, updatedProduct: Product) => {
  const response = await axios.put<Product>(`${API_URL}/${id}`, updatedProduct);
  return response.data;
};
