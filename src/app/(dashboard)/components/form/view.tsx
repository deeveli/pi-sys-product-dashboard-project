'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useState } from 'react'; // Import useEffect

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { getProductById, updateProduct, Product } from '@/hooks/useProductService'; // Import getProductById and updateProduct
import { Separator } from '@/components/ui/separator';
import { Star } from 'lucide-react';

// Zod schema for all form fields
const FormSchema = z.object({
  id: z.number().optional(), // Add ID for updating
  name: z.string().min(2, {
    message: 'Product name must be at least 2 characters.',
  }),
  description: z.string().optional(),
  price: z.coerce.number().min(0.01, {
    message: 'Price must be a positive number.',
  }),
  category: z.string().min(2, {
    message: 'Category must be at least 2 characters.',
  }),
  rating: z.coerce.number().min(0.1, {
    message: 'Rating must be between 0 and 5.',
  }),
});

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
        <div className="flex items-center justify-center h-full">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-start justify-start h-fit">
            <p className="text-sm font-bold text-muted-foreground">Category</p>
            <p className="text-sm text-muted-foreground">{product?.category}</p>
          </div>
          <div className="flex flex-col items-start justify-start h-fit">
            <p className="text-sm font-bold text-muted-foreground">Rating</p>
            <p className="flex gap-1  items-center text-sm text-muted-foreground">
              {product?.rating}
              <Star size={14} color="#f48525" />
            </p>
          </div>
          <div className="flex flex-col items-start justify-start h-fit">
            <p className="text-sm font-bold text-muted-foreground">Price</p>
            <p className="text-sm text-muted-foreground">GH¢{product?.price}</p>
          </div>
        </div>
      )}
    </>
  );
};
