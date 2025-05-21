import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

import { UpdateInputForm } from '../form/update';

export interface UpdateProductProps {
  productId: number | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onProductUpdated?: () => void;
}

export const UpdateProduct: React.FC<UpdateProductProps> = ({
  productId,
  isOpen,
  onOpenChange,
  onProductUpdated,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[340px] rounded-lg md:max-w-[500px]">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-extrabold">
            Edit Product
          </DialogTitle>
          <DialogDescription className="text-sm italic text-muted">
            Update this product's information in the inventory.
          </DialogDescription>
        </DialogHeader>
        <Separator className="-mt-2" />
        <UpdateInputForm
          productId={productId}
          onSubmissionSuccess={onProductUpdated}
          onOpenChange={onOpenChange}
        />
      </DialogContent>
    </Dialog>
  );
};
