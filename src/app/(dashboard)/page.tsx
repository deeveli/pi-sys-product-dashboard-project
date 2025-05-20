'use client';

import { useEffect, useState } from 'react';
import FilterPanel from './components/filter-panel';
import ProductList from './components/productList';
import { fetchProducts, Product } from '@/hooks/productService';

export default function Home() {
  const [data, setData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all products on initial load
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const products = await fetchProducts();
      setData(products);
      setLoading(false);
    };
    loadProducts();
  }, []);

  // Filter products based on the selected filters
  useEffect(() => {
    let currentFilteredProducts = data;

    // Category filter
    if (categoryFilter !== 'all') {
      currentFilteredProducts = currentFilteredProducts.filter(
        (product) => product.category === categoryFilter,
      );
    }

    // Price filter
    if (priceFilter !== 'all') {
      if (priceFilter === 'under20') {
        currentFilteredProducts = currentFilteredProducts.filter(
          (product) => product.price < 20,
        );
      } else if (priceFilter === 'under50') {
        currentFilteredProducts = currentFilteredProducts.filter(
          (product) => product.price < 50,
        );
      } else if (priceFilter === 'above50') {
        currentFilteredProducts = currentFilteredProducts.filter(
          (product) => product.price >= 50,
        );
      }
    }

    // Rating filter (assuming product.rating is an object with a 'rate' property)
    if (ratingFilter !== 'all') {
      const minRating = parseFloat(ratingFilter);
      currentFilteredProducts = currentFilteredProducts.filter(
        (product) => product.rating && product.rating >= minRating,
      );
    }

    // Search filter
    if (searchQuery) {
      currentFilteredProducts = currentFilteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredData(currentFilteredProducts);
  }, [data, categoryFilter, priceFilter, ratingFilter, searchQuery]); // Dependencies for filtering

  // Handle filter changes from FilterPanel
  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
  };

  const handlePriceChange = (value: string) => {
    setPriceFilter(value);
  };

  const handleRatingChange = (value: string) => {
    setRatingFilter(value);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div className="py-4 space-y-4">
      <FilterPanel
        onCategoryChange={handleCategoryChange}
        onPriceChange={handlePriceChange}
        onRatingChange={handleRatingChange}
        onSearchChange={handleSearchChange}
      />
      {loading ? (
        <div className="text-center py-8">Loading products...</div>
      ) : (
        <ProductList data={filteredData} /> // Pass filteredData to ProductList
      )}
    </div>
  );
}
