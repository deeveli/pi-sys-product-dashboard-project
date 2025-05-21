'use client';

import { Star } from 'lucide-react';
import React from 'react';

import type { Product } from '@/hooks/useProductService';

export interface ViewInputFormProps {
  product: Product | null;
  isLoading: boolean;
}

export const ViewForm: React.FC<ViewInputFormProps> = ({
  product,
  isLoading,
}) => {
  return (
    <>
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <div className="flex h-fit flex-col items-start justify-start">
            <p className="text-sm font-bold text-muted-foreground">Category</p>
            <p className="text-sm text-muted-foreground">{product?.category}</p>
          </div>
          <div className="flex h-fit flex-col items-start justify-start">
            <p className="text-sm font-bold text-muted-foreground">Rating</p>
            <p className="flex items-center  gap-1 text-sm text-muted-foreground">
              {product?.rating}
              <Star size={14} color="#f48525" />
            </p>
          </div>
          <div className="flex h-fit flex-col items-start justify-start">
            <p className="text-sm font-bold text-muted-foreground">Price</p>
            <p className="text-sm text-muted-foreground">GH¢{product?.price}</p>
          </div>
        </div>
      )}
    </>
  );
};
