'use client';
import { CircleX, Trash2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import type { Product } from '@/hooks/useProductService';
import { deleteProduct, getProductById } from '@/hooks/useProductService';

export interface DeleteProductProps {
  productId: number | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteProduct: React.FC<DeleteProductProps> = ({
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

  const handleDelete = async (productId: number) => {
    if (productId) {
      console.log('Deleting product with ID:', productId);
      const deletedProduct = await deleteProduct(productId);
      if (deletedProduct) {
        console.log('Product deleted:', deletedProduct);
        toast({
          title: 'Product deleted',
          description: `The product ${product?.name} has been deleted.`,
        });
        onOpenChange(false);
      } else {
        console.log('Error:', deletedProduct);
        toast({
          title: 'Error updating product',
          description: 'There was an error updating your product.',
          variant: 'destructive',
        });
      }
    } else {
      console.log('No ID:', productId);
      toast({
        title: 'Error: No Product ID',
        description: 'Cannot update product without a valid ID.',
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

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
                Would you like to delete{' '}
                <span className="text-primary">{product?.name}</span>?
              </DialogTitle>
              <DialogDescription className="text-sm italic text-muted">
                {product?.description}
              </DialogDescription>
            </DialogHeader>
            <Separator className="-mt-2" />
            <DialogFooter className="flex flex-col gap-2 md:flex-row">
              <Button
                className="flex items-center gap-2"
                onClick={() => {
                  if (product?.id !== undefined) handleDelete(product.id);
                }}
              >
                <Trash2Icon size={15} color="white" /> Delete
              </Button>
              <Button
                className="flex items-center gap-2 bg-black hover:bg-black/80"
                onClick={handleCancel}
              >
                <CircleX size={15} color="white" /> Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
