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

export interface UpdateInputFormProps {
  productId: number | null;
  onSubmissionSuccess?: () => void;
  onOpenChange: (open: boolean) => void;
}

export const UpdateInputForm: React.FC<UpdateInputFormProps> = ({
  productId,
  onSubmissionSuccess,
  onOpenChange,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: undefined,
      name: '',
      description: '',
      price: 0,
      category: '',
      rating: 0,
    },
  });

  // Effect to fetch product data when productId changes
  useEffect(() => {
    const fetchAndSetProduct = async () => {
      if (productId) {
        const product = await getProductById(productId);
        if (product) {
          // Reset the form with the fetched product data
          form.reset({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            rating: product.rating,
          });
        } else {
          form.reset();
          toast({
            title: 'Product not found',
            description: `No product found with ID: ${productId}`,
            variant: 'destructive',
          });
        }
      } else {
        form.reset();
      }
      setIsLoading(false);
    };

    fetchAndSetProduct();
  }, [productId, form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('Submitting form data:', data);

    try {
      if (data.id) {
        const updatedProduct = await updateProduct(data.id, data as Product);
        if (updatedProduct) {
          console.log('Success:', data);
          toast({
            title: 'Product updated successfully!',
            description: `Product "${updatedProduct.name}" has been updated.`,
          });
          if (onSubmissionSuccess) {
            onSubmissionSuccess();
          }
          onOpenChange(false);
        } else {
          console.log('Error:', data);
          toast({
            title: 'Error updating product',
            description: 'There was an error updating your product.',
            variant: 'destructive',
          });
        }
      } else {
        console.log('No ID:', data);
        toast({
          title: 'Error: No Product ID',
          description: 'Cannot update product without a valid ID.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: 'Submission failed',
        description: `An unexpected error occurred: ${(error as Error).message}`,
        variant: 'destructive',
      });
    }
  }

  // Define the structure for your form questions
  const createFormQuestions = [
    {
      name: 'name' as const,
      label: 'Product Name',
      placeholder: 'Enter product name...',
      type: 'text',
      description: 'The name of your product',
    },
    {
      name: 'description' as const,
      label: 'Description',
      placeholder: 'Enter product description...',
      type: 'text',
      description: 'A brief description of the product',
    },
    {
      name: 'price' as const,
      label: 'Price',
      placeholder: 'Enter product price...',
      type: 'number',
      description: 'The price of the product (e.g., 29.99)',
    },
    {
      name: 'category' as const,
      label: 'Category',
      placeholder: 'Enter product category...',
      type: 'text',
      description: 'The category the product belongs to (e.g., electronics)',
    },
    {
      name: 'rating' as const,
      label: 'Rating',
      placeholder: 'Enter product rating...',
      type: 'number',
      description: 'The rating the product has (e.g., 3.2)',
    },
  ];

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            {createFormQuestions.map((question) => (
              <FormField
                key={question.name}
                control={form.control}
                name={question.name}
                render={({ field }) => (
                  <FormItem className={cn('flex flex-col gap-y-2')}>
                    <FormLabel className={cn('font-bold')}>
                      {question.label}
                    </FormLabel>
                    <div>
                      <FormControl>
                        <Input
                          className={cn(
                            'rounded-full placeholder:italic text-xs',
                          )}
                          type={question.type}
                          placeholder={question.description}
                          {...field}
                          value={
                            field.value === 0 && question.type === 'number'
                              ? ''
                              : field.value
                          }
                          onChange={(e) => {
                            if (question.type === 'number') {
                              field.onChange(
                                e.target.value === ''
                                  ? 0
                                  : Number(e.target.value),
                              );
                            } else {
                              field.onChange(e.target.value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />{' '}
                      {/* validation errors */}
                    </div>
                  </FormItem>
                )}
              />
            ))}
            <Separator className="" />
            <Button
              className="w-full flex"
              variant={'default'}
              size={'lg'}
              type="submit"
            >
              {productId ? 'Update Product' : 'Create Product'}{' '}
              {/* Dynamic button text */}
            </Button>
          </form>
        </Form>
      )}
    </>
  );
};
