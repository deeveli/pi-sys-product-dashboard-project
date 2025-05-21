'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateInputForm } from '../form/create';
import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react';
import { getProductById, Product } from '@/hooks/useProductService';
import { ViewForm } from '../form/view';

export interface ViewProductProps {
  productId: number | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ViewProduct: React.FC<ViewProductProps> = ({ productId, isOpen, onOpenChange }) => {
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
        <div className="flex items-center justify-center h-full">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      ) : (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-[340px] rounded-lg md:max-w-[500px]">
            <DialogHeader className="mb-4">
              <DialogTitle className="font-extrabold text-xl">
                {product?.name}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted italic">
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
}

