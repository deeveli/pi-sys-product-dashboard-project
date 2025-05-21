'use client';

import FilterPanel from './components/filter-panel';
import ProductList from './components/productList';
import { cn } from '@/lib/utils';
import { useProductsFilterAndSort } from '@/hooks/useProductsFilterAndSort'; // Import the new hook

export default function Home() {
  const {
    loading,
    filteredProducts,
    categories,
    handleCategoryChange,
    handlePriceChange,
    handleRatingChange,
    handleSearchChange,
  } = useProductsFilterAndSort();

  return (
    <div className="py-4 space-y-4">
      <FilterPanel
        categoryList={categories}
        onCategoryChange={handleCategoryChange}
        onPriceChange={handlePriceChange}
        onRatingChange={handleRatingChange}
        onSearchChange={handleSearchChange}
        // onSortChange={handleSortChange}
      />
      {loading ? (
        <div
          className={cn(
            'bg-white flex h-fit w-full flex-col',
            'rounded-lg p-4 space-y-4',
            'text-muted italic text-sm',
            'text-center py-8',
          )}
        >
          Loading products...
        </div>
      ) : (
        <ProductList data={filteredProducts} onProductUpdated={() => {}} />
      )}
    </div>
  );
}
