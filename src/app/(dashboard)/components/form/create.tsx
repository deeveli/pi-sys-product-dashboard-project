'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription, // Not used in this example, but kept for context
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { createProduct } from '@/hooks/useProductService';
import { Separator } from '@/components/ui/separator';

// Zod schema for all form fields
const FormSchema = z.object({
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

export function CreateInputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    // Default values for schema
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
      rating: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const success = await createProduct(data);
    if (success) {
      toast({
        title: 'Product created successfully!',
        description: 'Your product has been added to the inventory.',
      });
    } else {
      toast({
        title: 'Error creating product',
        description: 'There was an error creating your product.',
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

      description: 'The rating the product has to (e.g., 3.2)',
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
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
                  {' '}
                  <FormControl>
                    <Input
                      className={cn('rounded-full placeholder:italic text-xs')}
                      type={question.type}
                      placeholder={question.description}
                      {...field}
                      // Special handling for number type to ensure correct value passing
                      value={
                        field.value === 0 && question.type === 'number'
                          ? ''
                          : field.value
                      }
                      onChange={(e) => {
                        if (question.type === 'number') {
                          // Convert to number for price, handle empty string for initial input
                          field.onChange(
                            e.target.value === '' ? 0 : Number(e.target.value),
                          );
                        } else {
                          field.onChange(e.target.value);
                        }
                      }}
                    />
                  </FormControl>
                  {/* {question.description && (
                    <FormDescription className="text-xs text-muted mt-1">
                      {question.description}
                    </FormDescription>
                  )} */}
                <FormMessage className='text-xs'/> {/* validation errors */}
                </div>
              </FormItem>
            )}
          />
        ))}
                <Separator className=''/>
        <Button className='w-full flex' variant={'default'} size={"lg"} type="submit">Create Product</Button>
      </form>
    </Form>
  );
}
