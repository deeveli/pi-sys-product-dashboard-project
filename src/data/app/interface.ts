import { Product } from '@/hooks/useProductService';

export interface FilterPanelProps {
  onCategoryChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onRatingChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  categoryList: string[];
}

export interface DataProps {
  data: Product[];
}
