import axios from 'axios';

const API_URL = 'https://mock-data-josw.onrender.com';
const API_PRODUCT_URL = 'https://mock-data-josw.onrender.com/products';

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
  const res = await axios.get(API_PRODUCT_URL);
  if (res.status !== 200) {
    throw new Error('Failed to fetch products');
  }
  return res.data;
};

// Create a new product
export const createProduct = async (product: Product) => {
  const res = await axios.post<Product>(API_PRODUCT_URL, product);
  return res.data;
};

// Get a product by ID
export const getProductById = async (id: number) => {
  const res = await axios.get<Product>(`${API_PRODUCT_URL}/${id}`);
  return res.data;
};

// Update a product by ID
export const updateProduct = async (id: number, updatedProduct: Product) => {
  const res = await axios.put<Product>(
    `${API_PRODUCT_URL}/${id}`,
    updatedProduct,
  );
  return res.data;
};

// Delete a product by ID
export const deleteProduct = async (id: number) => {
  const res = await axios.delete(`${API_PRODUCT_URL}/${id}`);
  return res.data;
};

// Delete a product by ID
export const getCategory = async () => {
  const res = await axios.get(`${API_URL}/categories`);
  console.log('categories:', res.data);
  return res.data;
};
