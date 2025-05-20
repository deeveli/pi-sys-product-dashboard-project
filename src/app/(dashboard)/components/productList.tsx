'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Product } from '@/hooks/productService';
import { cn } from '@/lib/utils';
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { UpdateProduct } from './dialogs/updateProduct';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  Trash,
  Trash2,
} from 'lucide-react';
import React from 'react';

export interface DataProps {
  data: Product[];
  onProductUpdated: () => void;
}

const ProductList: React.FC<DataProps> = ({ data, onProductUpdated }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [loading, setLoading] = useState(true);

  // State for controlling the Edit Product modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  // Callback function to open the Edit Product modal
  const handleEditClick = (productId: number) => {
    setEditingProductId(productId);
    setIsEditOpen(true);
  };

  const columns: ColumnDef<Product>[] = [
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
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
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
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('name')}</div>
      ),
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
        <div className="lowercase px-2 py-[0.3rem] items-center rounded-full  border border-primary w-fit flex">
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
        const fullStars = Math.floor(rating as number); // number of full stars (1, 2, 3, 4, or 5)
        const halfStars = (rating as number) % 1 >= 0.5 ? 1 : 0; // 1 if half star is needed
        const outlineStars = 5 - fullStars - halfStars; // remaining stars will be outline

        const renderStars = () => {
          let stars = [];

          // Add full stars
          for (let i = 0; i < fullStars; i++) {
            stars.push(
              <StarIcon key={`full-${i}`} size={15} color="#f48525" />,
            );
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
        <div className=" flex flex-row gap-x-4 items-center text-right">
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
      cell: ({ row }) => {
        const product = row.original;

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
              <DropdownMenuContent
                align="end"
                className="border-none shadow-lg"
              >
                <DropdownMenuItem
                  onClick={() =>
                    navigator.clipboard.writeText(JSON.stringify(product))
                  }
                  className="flex w-full cursor-pointer gap-2 hover:bg-primary/20"
                >
                  <Copy size={15} color="#f48525" /> Copy
                </DropdownMenuItem>
                <DropdownMenuSeparator className=" bg-primary/20" />
                <DropdownMenuItem className="flex w-full cursor-pointer gap-2">
                  <Eye size={15} color="#f48525" />
                  View
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex w-full cursor-pointer gap-2"
                  onClick={() => {
                    if (product?.id !== undefined) handleEditClick(product.id);
                  }}
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

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
  });

  return (
    <section id="features" className={cn('h-')}>
      <div
        className={cn(
          'bg-white flex h-fit w-full flex-col',
          'rounded-lg p-4 space-y-4',
          'text-text-body',
        )}
      >
        {loading ? (
          <div>Loading products...</div>
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow className="hover:bg-primary/0" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={cn(`font-bold text-sm`)}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className="hover:bg-primary/20"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className={cn('hover:bg-primary/0')}>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Render the UpdateProduct modal */}
      {isEditOpen && (
        <UpdateProduct
          productId={editingProductId}
          isOpen={isEditOpen}
          onOpenChange={setIsEditOpen}
          onProductUpdated={onProductUpdated}
        />
      )}
    </section>
  );
};

export default ProductList;
