'use client';
import React, { useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import type { Product } from '@/hooks/useProductService';
import { getProductById } from '@/hooks/useProductService';

import { ViewForm } from '../form/view';

export interface ViewProductProps {
  productId: number | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ViewProduct: React.FC<ViewProductProps> = ({
  productId,
  isOpen,
  onOpenChange,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const fetchAndSetProduct = async () => {
      if (productId) {
        const product = await getProductById(productId);
        setProduct(product);
        setIsLoading(false);
      }
    };
    fetchAndSetProduct();
  }, [productId]);

  return (
    <>
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      ) : (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-[340px] rounded-lg md:max-w-[500px]">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl font-extrabold">
                {product?.name}
              </DialogTitle>
              <DialogDescription className="text-sm italic text-muted">
                {product?.description}
              </DialogDescription>
            </DialogHeader>
            <Separator className="-mt-2" />
            <ViewForm
              product={product ? product : null}
              isLoading={isLoading}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
