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

// Fetch products with pagination
export const fetchProducts = async (
  page: number = 1,
  pageSize: number = 100,
): Promise<{ products: Product[]; totalCount: number }> => {
  try {
    const res = await axios.get(API_PRODUCT_URL, {
      params: {
        _page: page,
        _limit: pageSize,
      },
      headers: {
        'X-Total-Count': 'true',
      },
    });

    if (res.status !== 200) {
      throw new Error(`Failed to fetch products. Status code: ${res.status}`);
    }

    const products = res.data;
    const totalCountHeader = res.headers['x-total-count'];
    const totalCount = totalCountHeader ? parseInt(totalCountHeader, 10) : 0;

    return { products, totalCount };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
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
  return res.data;
};
