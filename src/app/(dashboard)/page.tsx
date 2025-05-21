'use client';

import FilterPanel from './components/filter-panel';
import ProductList from './components/productList';
import { cn } from '@/lib/utils';
import { useProductsFilterAndSort } from '@/hooks/useProductsFilterAndSort';
import { useProductStore } from '@/store/productStore';
import { useEffect } from 'react';
import { fetchProducts, getCategory, Product } from '@/hooks/useProductService';

export default function Home() {
  const {
    loading,
    filteredProducts,
    categories,
    currentPage,
    totalPages,
    pageSize,
    totalProducts,
    setLoading,
    setProducts,
    setCategories,
    setCurrentPage,
    setPageSize,
    setCategoryFilter,
    setPriceFilter,
    setRatingFilter,
    setSearchFilter,
    applyFiltersAndPagination,
  } = useProductStore();

  // Fetch products and initialize store on mount
  useEffect(() => {
    const fetchAndSetProducts = async () => {
      setLoading(true);
      try {
        const { products: fetchedProducts, totalCount } = await fetchProducts();
        setProducts(fetchedProducts);
        const uniqueCategories = await getCategory();
        setCategories(uniqueCategories);
        applyFiltersAndPagination(fetchedProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetProducts();
  }, [setLoading, setProducts, setCategories, applyFiltersAndPagination]);

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
    setSearchFilter(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    applyFiltersAndPagination(useProductStore.getState().products);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
    applyFiltersAndPagination(useProductStore.getState().products);
  };

  return (
    <div className="flex flex-col h-full py-4 space-y-4">
      <FilterPanel
        categoryList={categories}
        onCategoryChange={handleCategoryChange}
        onPriceChange={handlePriceChange}
        onRatingChange={handleRatingChange}
        onSearchChange={handleSearchChange}
      />
      {loading ? (
        <div
          className={cn(
            'bg-white flex h-full w-full flex-col',
            'rounded-lg p-4 space-y-4',
            'text-muted italic text-sm',
            'text-center py-8',
          )}
        >
          Loading products...
        </div>
      ) : (
        <ProductList
          data={filteredProducts}
          onProductUpdated={() => {}}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalProducts={totalProducts}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}
