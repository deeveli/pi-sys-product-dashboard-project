'use client';

import FilterPanel from './components/filter-panel';
import ProductList from './components/productList';
import { cn } from '@/lib/utils';
import { useProductsFilterAndSort } from '@/hooks/useProductsFilterAndSort';

export default function Home() {
  const {
    loading,
    filteredProducts,
    categories,
    handleCategoryChange,
    handlePriceChange,
    handleRatingChange,
    handleSearchChange,
    currentPage,
    totalPages,
    pageSize,
    totalProducts,
    handlePageChange,
    handlePageSizeChange,
  } = useProductsFilterAndSort();

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
