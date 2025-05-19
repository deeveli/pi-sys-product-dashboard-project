import axios from "axios";

const API_URL = 'https://mock-data-josw.onrender.com/products';

export interface Product {
  id?: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  rating?: number;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get(API_URL);
  if (res.status !== 200) {
    throw new Error('Failed to fetch products');
  }
  console.log('products:', res.data.slice(0, 1));
  return res.data;
};
