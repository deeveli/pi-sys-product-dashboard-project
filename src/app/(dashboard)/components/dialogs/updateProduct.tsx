import { Button } from '@/components/ui/button';
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
      <DialogContent className="sm:max-w-[425px] md:max-w-[500px]">
        <DialogHeader className="mb-4">
          <DialogTitle className="font-extrabold text-xl">
            Edit Product
          </DialogTitle>
          <DialogDescription className="text-sm text-muted italic">
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
