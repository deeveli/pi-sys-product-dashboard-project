import { useState, useEffect, useMemo } from 'react';
import { Product, fetchProducts, getCategory } from './useProductService';

interface UseProductsFilterAndSortResult {
  loading: boolean;
  filteredProducts: Product[];
  categories: string[];
  categoryFilter: string;
  priceFilter: string;
  ratingFilter: string;
  searchQuery: string;
  sortOrder: string;
  handleCategoryChange: (value: string) => void;
  handlePriceChange: (value: string) => void;
  handleRatingChange: (value: string) => void;
  handleSearchChange: (value: string) => void;
  handleSortChange: (value: string) => void;
}

export const useProductsFilterAndSort = (): UseProductsFilterAndSortResult => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // State for filters and sorting
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('none');

  // Fetch all products and categories on initial load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const products = await fetchProducts();
        setAllProducts(products);

        const catRes = await getCategory();
        setCategories(catRes);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Memoized filtering and sorting logic
  const filteredProducts = useMemo(() => {
    let currentFiltered = [...allProducts];

    // Apply Category Filter
    if (categoryFilter !== 'all') {
      currentFiltered = currentFiltered.filter(
        (product) => product.category === categoryFilter,
      );
    }

    // Apply Price Filter
    if (priceFilter !== 'all') {
      if (priceFilter === 'under20') {
        currentFiltered = currentFiltered.filter(
          (product) => product.price < 20,
        );
      } else if (priceFilter === 'under50') {
        currentFiltered = currentFiltered.filter(
          (product) => product.price > 19 && product.price < 50,
        );
      } else if (priceFilter === 'above50') {
        currentFiltered = currentFiltered.filter(
          (product) => product.price >= 50,
        );
      }
    }

    // Apply Rating Filter
    if (ratingFilter !== 'all') {
      const minRating = parseFloat(ratingFilter);
      // currentFiltered = currentFiltered.filter(
      //   (product) => product.rating && product.rating > minRating,
      // );
      if (ratingFilter == '1') {
        currentFiltered = currentFiltered.filter(
          (product) => product.rating !== undefined && product.rating < 1.01,
        );
      } else if (ratingFilter == '2') {
        currentFiltered = currentFiltered.filter(
          (product) => product.rating !== undefined && product.rating < 2.01 && product.rating > 1,
        );
      } else if (ratingFilter == '3') {
        currentFiltered = currentFiltered.filter(
          (product) => product.rating !== undefined && product.rating < 3.01 && product.rating > 2,
        );
      } else if (ratingFilter == '4') {
        currentFiltered = currentFiltered.filter(
          (product) => product.rating !== undefined && product.rating < 4.01 && product.rating > 3,
        );
      } else if (ratingFilter == '5') {
        currentFiltered = currentFiltered.filter(
          (product) => product.rating !== undefined && product.rating < 5.01 && product.rating > 4,
        );
      }
    }

    // Apply Search Filter
    if (searchQuery) {
      currentFiltered = currentFiltered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply Sorting
    if (sortOrder !== 'none') {
      currentFiltered.sort((a, b) => {
        if (sortOrder === 'priceAsc') {
          return a.price - b.price; // Low to High
        } else if (sortOrder === 'priceDesc') {
          return b.price - a.price; // High to Low
        }
        return 0;
      });
    }

    return currentFiltered;
  }, [
    allProducts,
    categoryFilter,
    priceFilter,
    ratingFilter,
    searchQuery,
    sortOrder,
  ]);

  // Handlers for filter and sort changes
  const handleCategoryChange = (value: string) => setCategoryFilter(value);
  const handlePriceChange = (value: string) => setPriceFilter(value);
  const handleRatingChange = (value: string) => setRatingFilter(value);
  const handleSearchChange = (value: string) => setSearchQuery(value);
  const handleSortChange = (value: string) => setSortOrder(value);

  return {
    loading,
    filteredProducts,
    categories,
    categoryFilter,
    priceFilter,
    ratingFilter,
    searchQuery,
    sortOrder,
    handleCategoryChange,
    handlePriceChange,
    handleRatingChange,
    handleSearchChange,
    handleSortChange,
  };
};
