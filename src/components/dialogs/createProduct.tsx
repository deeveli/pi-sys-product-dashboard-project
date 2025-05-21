import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

import { CreateInputForm } from '../form/create';

export function AddProduct() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="default"
          size="lg"
          disabled={false}
          className="w-full md:w-fit"
        >
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[340px] rounded-lg md:max-w-[500px]">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-extrabold">
            Add New Product
          </DialogTitle>
          <DialogDescription className="text-sm italic text-muted">
            Add a new product to the inventory.
          </DialogDescription>
        </DialogHeader>
        <Separator className="-mt-2" />
        <CreateInputForm />
      </DialogContent>
    </Dialog>
  );
}
