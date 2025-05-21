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
  currentPage: number;
  pageSize: number;
  totalProducts: number;
  totalPages: number;
  handleCategoryChange: (value: string) => void;
  handlePriceChange: (value: string) => void;
  handleRatingChange: (value: string) => void;
  handleSearchChange: (value: string) => void;
  handleSortChange: (value: string) => void;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (size: number) => void;
}

export const useProductsFilterAndSort = (): UseProductsFilterAndSortResult => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);

  // State for filters and sorting
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('none');

  // Fetch all products and categories on initial load, and when filters/pagination change
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const { products, totalCount } = await fetchProducts(
          currentPage,
          pageSize,
        );
        setAllProducts(products); //
        setTotalProducts(totalCount);

        if (categories.length === 0) {
          const catRes = await getCategory();
          setCategories(catRes);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [
    currentPage,
    pageSize,
    categoryFilter,
    priceFilter,
    ratingFilter,
    searchQuery,
    sortOrder,
  ]); // Re-fetch data when filters/pagination change

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(totalProducts / pageSize);
  }, [totalProducts, pageSize]);

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
          (product) => product.price >= 20 && product.price < 50,
        );
      } else if (priceFilter === 'above50') {
        currentFiltered = currentFiltered.filter(
          (product) => product.price >= 50,
        );
      }
    }

    // Apply Rating Filter
    if (ratingFilter !== 'all') {
      if (ratingFilter == '1') {
        currentFiltered = currentFiltered.filter(
          (product) => product.rating !== undefined && product.rating < 1.01,
        );
      } else if (ratingFilter == '2') {
        currentFiltered = currentFiltered.filter(
          (product) =>
            product.rating !== undefined &&
            product.rating < 2.01 &&
            product.rating > 1,
        );
      } else if (ratingFilter == '3') {
        currentFiltered = currentFiltered.filter(
          (product) =>
            product.rating !== undefined &&
            product.rating < 3.01 &&
            product.rating > 2,
        );
      } else if (ratingFilter == '4') {
        currentFiltered = currentFiltered.filter(
          (product) =>
            product.rating !== undefined &&
            product.rating < 4.01 &&
            product.rating > 3,
        );
      } else if (ratingFilter == '5') {
        currentFiltered = currentFiltered.filter(
          (product) =>
            product.rating !== undefined &&
            product.rating < 5.01 &&
            product.rating > 4,
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
  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };
  const handlePriceChange = (value: string) => {
    setPriceFilter(value);
    setCurrentPage(1);
  };
  const handleRatingChange = (value: string) => {
    setRatingFilter(value);
    setCurrentPage(1);
  };
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };
  const handleSortChange = (value: string) => {
    setSortOrder(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return {
    loading,
    filteredProducts,
    categories,
    categoryFilter,
    priceFilter,
    ratingFilter,
    searchQuery,
    sortOrder,
    currentPage,
    pageSize,
    totalProducts,
    totalPages,
    handleCategoryChange,
    handlePriceChange,
    handleRatingChange,
    handleSearchChange,
    handleSortChange,
    handlePageChange,
    handlePageSizeChange,
  };
};
