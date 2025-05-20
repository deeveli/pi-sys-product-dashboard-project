// components/data-table/columns.tsx
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Product } from '@/hooks/productService'; // Assuming this path is correct
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  Copy,
  Eye,
  Heart,
  MoreHorizontal,
  Pencil,
  Star,
  StarHalfIcon,
  StarIcon,
  Trash2,
} from 'lucide-react';
import React from 'react';

// Define a type for the meta object in the table
declare module '@tanstack/react-table' {
  interface TableMeta<TData> {
    onEditClick: (product: Product) => void;
  }
}

export const columns: ColumnDef<Product>[] = [
  // Select Column
  {
    id: 'select',
    header: ({ table }) => (
      <div className={cn('flex my-auto size-4')}>
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className={cn('flex my-auto size-4')}>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // Product Name Column
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className={cn('flex flex-row gap-x-4 items-center')}
      >
        Product Name <ArrowUpDown size={15} color="grey" />
      </div>
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },

  // Category Column
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className={cn('flex flex-row gap-x-4 items-center')}
      >
        Category <ArrowUpDown size={15} color="grey" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="lowercase px-2 py-[0.3rem] items-center rounded-full border border-primary w-fit flex">
        {row.getValue('category')}
      </div>
    ),
  },

  // Ratings Column
  {
    accessorKey: 'rating',
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className={cn('flex flex-row gap-x-4 items-center')}
      >
        Rating <ArrowUpDown size={15} color="grey" />
      </div>
    ),
    cell: ({ row }) => {
      const rating = row.getValue('rating');

      // Determine how many full, half, and outline stars
      const fullStars = Math.floor(rating as number);
      const halfStars = (rating as number) % 1 >= 0.5 ? 1 : 0;
      const outlineStars = 5 - fullStars - halfStars;

      const renderStars = () => {
        let stars = [];

        // Add full stars
        for (let i = 0; i < fullStars; i++) {
          stars.push(<StarIcon key={`full-${i}`} size={15} color="#f48525" />);
        }

        // Add half stars
        for (let i = 0; i < halfStars; i++) {
          stars.push(
            <StarHalfIcon
              key={`half-${i}`}
              size={15}
              color="#f48525"
              style={{ clipPath: 'inset(0 50% 0 0)', opacity: 1 }}
            />,
          );
        }

        // Add outline stars
        for (let i = 0; i < outlineStars; i++) {
          stars.push(
            <Star
              key={`outline-${i}`}
              size={15}
              color="#f48525"
              style={{ opacity: 0.4 }}
            />,
          );
        }

        return stars;
      };

      return (
        <div className="flex items-center gap-x-1 rounded-full p-2 bg-primary/10 w-fit">
          {renderStars()}
        </div>
      );
    },
  },

  // Price Column
  {
    accessorKey: 'price',
    header: () => (
      <div className="flex flex-row gap-x-4 items-center text-right">
        Price <ArrowUpDown size={15} color="grey" />
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('price'));
      const formatted = new Intl.NumberFormat('en-GH', {
        style: 'currency',
        currency: 'GHS',
      }).format(amount);

      return <div className="text-left">{formatted}</div>;
    },
  },

  // Actions Column
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row, table }) => {
      const product = row.original;
      const onEditClick = table.options.meta?.onEditClick; // Access the meta function

      return (
        <>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <Heart size={18} color="#f48525" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-none shadow-lg">
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(JSON.stringify(product))
                }
                className="flex w-full cursor-pointer gap-2 hover:bg-primary/20"
              >
                <Copy size={15} color="#f48525" /> Copy
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-primary/20" />
              <DropdownMenuItem className="flex w-full cursor-pointer gap-2">
                <Eye size={15} color="#f48525" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex w-full cursor-pointer gap-2"
                onClick={() => onEditClick?.(product)} // Pass the whole product object
              >
                <Pencil size={15} color="#f48525" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="flex w-full cursor-pointer gap-2">
                <Trash2 size={15} color="#f48525" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
