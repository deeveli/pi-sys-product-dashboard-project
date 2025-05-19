import FilterPanel from './components/filter-panel';
import ProductList from './components/productList';

export default function Home() {
  return (
    <div className="py-4 space-y-4">
      <FilterPanel />
      <ProductList />
    </div>
  );
}
