'use client';

import { useEffect } from 'react';

import LoadingLottie from '@/animations/loading-lottie.json';
import { fetchProducts, getCategory } from '@/hooks/useProductService';
import { cn } from '@/lib/utils';
import { useProductStore } from '@/store/productStore';

import FilterPanel from '../../components/filter-panel/filter-panel';
import Lottie from '../../components/lottie-animations/lottie';
import ProductList from '../../components/product-list/productList';

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
        const { products: fetchedProducts } = await fetchProducts();
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
    <div className="flex h-full flex-col space-y-4 py-4">
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
            'flex size-full flex-col items-center justify-center bg-white',
            'rounded-lg p-8',
          )}
        >
          <div className="size-40">
            {' '}
            <Lottie
              className="flex h-full w-auto items-center justify-center"
              lottieFile={LoadingLottie}
            />
          </div>
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
