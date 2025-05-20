import { Product } from "@/hooks/productService";

export interface FilterPanelProps {
  onCategoryChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onRatingChange: (value: string) => void;
  onSearchChange: (value: string) => void;
}


export interface DataProps {
  data: Product[];
}
