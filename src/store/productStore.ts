// src/store/productStore.ts
import { create } from 'zustand';

import type { Product } from '@/hooks/useProductService';

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalProducts: number;

  categoryFilter: string;
  priceFilter: string;
  ratingFilter: string;
  searchFilter: string;

  setProducts: (products: Product[]) => void;
  setFilteredProducts: (products: Product[]) => void;
  setCategories: (categories: string[]) => void;
  setLoading: (loading: boolean) => void;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
  setPageSize: (size: number) => void;
  setTotalProducts: (total: number) => void;
  setCategoryFilter: (category: string) => void;
  setPriceFilter: (price: string) => void;
  setRatingFilter: (rating: string) => void;
  setSearchFilter: (search: string) => void;
  resetFilters: () => void;
  applyFiltersAndPagination: (allProducts: Product[]) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filteredProducts: [],
  categories: [],
  loading: true,
  currentPage: 1,
  totalPages: 1,
  pageSize: 10,
  totalProducts: 0,
  categoryFilter: 'all',
  priceFilter: 'all',
  ratingFilter: 'all',
  searchFilter: '',

  setProducts: (products) => set({ products, totalProducts: products.length }),
  setFilteredProducts: (filteredProducts) => set({ filteredProducts }),
  setCategories: (categories) => set({ categories }),
  setLoading: (loading) => set({ loading }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (pages) => set({ totalPages: pages }),
  setPageSize: (size) => set({ pageSize: size }),
  setTotalProducts: (total) => set({ totalProducts: total }),
  setCategoryFilter: (categoryFilter) => {
    set({ categoryFilter, currentPage: 1 }); // Reset page on filter change
    get().applyFiltersAndPagination(get().products);
  },
  setPriceFilter: (priceFilter) => {
    set({ priceFilter, currentPage: 1 }); // Reset page on filter change
    get().applyFiltersAndPagination(get().products);
  },
  setRatingFilter: (ratingFilter) => {
    set({ ratingFilter, currentPage: 1 }); // Reset page on filter change
    get().applyFiltersAndPagination(get().products);
  },
  setSearchFilter: (searchFilter) => {
    set({ searchFilter, currentPage: 1 }); // Reset page on filter change
    get().applyFiltersAndPagination(get().products);
  },
  resetFilters: () => {
    set({
      categoryFilter: 'all',
      priceFilter: 'all',
      ratingFilter: 'all',
      searchFilter: '',
      currentPage: 1,
    });
    get().applyFiltersAndPagination(get().products);
  },
  applyFiltersAndPagination: (allProducts) => {
    const {
      categoryFilter,
      priceFilter,
      ratingFilter,
      searchFilter,
      pageSize,
      currentPage,
    } = get();

    let tempProducts = [...allProducts];

    // Apply search filter
    if (searchFilter) {
      tempProducts = tempProducts.filter((product) =>
        product?.name.toLowerCase().includes(searchFilter.toLowerCase()),
      );
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      tempProducts = tempProducts.filter(
        (product) =>
          product?.category &&
          product.category.toLowerCase() === categoryFilter.toLowerCase(),
      );
    }

    // Apply price filter
    if (priceFilter !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        const price = product.price;
        if (priceFilter === 'under20') return price < 20;
        if (priceFilter === 'under50') return price >= 20 && price < 50;
        if (priceFilter === 'above50') return price >= 50;
        return true;
      });
    }

    // Apply rating filter
    if (ratingFilter !== 'all') {
      if (ratingFilter == '1') {
        tempProducts = tempProducts.filter(
          (product) => product.rating !== undefined && product.rating < 1.01,
        );
      } else if (ratingFilter == '2') {
        tempProducts = tempProducts.filter(
          (product) =>
            product.rating !== undefined &&
            product.rating < 2.01 &&
            product.rating > 1,
        );
      } else if (ratingFilter == '3') {
        tempProducts = tempProducts.filter(
          (product) =>
            product.rating !== undefined &&
            product.rating < 3.01 &&
            product.rating > 2,
        );
      } else if (ratingFilter == '4') {
        tempProducts = tempProducts.filter(
          (product) =>
            product.rating !== undefined &&
            product.rating < 4.01 &&
            product.rating > 3,
        );
      } else if (ratingFilter == '5') {
        tempProducts = tempProducts.filter(
          (product) =>
            product.rating !== undefined &&
            product.rating < 5.01 &&
            product.rating > 4,
        );
      }
    }

    const newTotalProducts = tempProducts.length;
    const newTotalPages = Math.ceil(newTotalProducts / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = tempProducts.slice(startIndex, endIndex);

    set({
      filteredProducts: paginatedProducts,
      totalProducts: newTotalProducts,
      totalPages: newTotalPages,

      // Ensuring currentPage doesn't exceed newTotalPages after filtering
      currentPage: Math.min(
        currentPage,
        newTotalPages === 0 ? 1 : newTotalPages,
      ),
    });
  },
}));
