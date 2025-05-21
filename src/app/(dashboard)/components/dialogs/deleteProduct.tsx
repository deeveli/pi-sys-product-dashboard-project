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
import {
  deleteProduct,
  getProductById,
  Product,
} from '@/hooks/useProductService';
import { ViewForm } from '../form/view';
import { Button } from '@/components/ui/button';
import { CircleX, Cross, Crosshair, Trash2Icon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

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
        <div className="flex items-center justify-center h-full">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      ) : (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-[340px] rounded-lg md:max-w-[500px]">
            <DialogHeader className="mb-4">
              <DialogTitle className="font-extrabold text-xl">
                Would you like to delete{' '}
                <span className="text-primary">{product?.name}</span>?
              </DialogTitle>
              <DialogDescription className="text-sm text-muted italic">
                {product?.description}
              </DialogDescription>
            </DialogHeader>
            <Separator className="-mt-2" />
            <DialogFooter className="flex flex-col md:flex-row gap-2">
              <Button
                className="flex gap-2 items-center"
                onClick={() => {
                  if (product?.id !== undefined) handleDelete(product.id);
                }}
              >
                <Trash2Icon size={15} color="white" /> Delete
              </Button>
              <Button
                className="flex gap-2 items-center bg-black hover:bg-black/80"
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

