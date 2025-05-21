'use client';

import { flexRender } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useMemo } from 'react';

import { DeleteProduct } from '@/components/dialogs/deleteProduct';
import { UpdateProduct } from '@/components/dialogs/updateProduct';
import { ViewProduct } from '@/components/dialogs/viewProduct';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useFavoriteProducts } from '@/hooks/useFavoriteProduct';
import { useModalControls } from '@/hooks/useModalControls';
import type { Product } from '@/hooks/useProductService';
import { useProductTable } from '@/hooks/useProductTable';
import { cn } from '@/lib/utils';

import { getProductColumns } from '../data-table/columns';

export interface DataProps {
  data: Product[];
  onProductUpdated: () => void;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalProducts: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const ProductList: React.FC<DataProps> = ({
  data,
  onProductUpdated,
  currentPage,
  totalPages,
  totalProducts,
  onPageChange,
  pageSize,
  onPageSizeChange,
}) => {
  // Modal controls
  const {
    isEditOpen,
    setIsEditOpen,
    editingProductId,
    handleEditClick,
    isViewOpen,
    setIsViewOpen,
    viewingProductId,
    handleViewClick,
    isDeleteOpen,
    setIsDeleteOpen,
    deleteProductId,
    handleDeleteClick,
  } = useModalControls();

  const { favoriteProductIds, handleFavoriteClick } = useFavoriteProducts();

  // Memoize column definitions to prevent re-creation on every render
  const columns = useMemo(
    () =>
      getProductColumns({
        handleFavoriteClick,
        favoriteProductIds,
        handleViewClick,
        handleEditClick,
        handleDeleteClick,
      }),
    [
      handleFavoriteClick,
      favoriteProductIds,
      handleViewClick,
      handleEditClick,
      handleDeleteClick,
    ],
  );

  // Product table
  const { table } = useProductTable({ data, columns });

  const pageSizes = [10, 20, 50, 100];

  return (
    <>
      <div
        className={cn(
          'flex h-full w-full flex-col items-start justify-start overflow-y-scroll bg-white',
          'space-y-4 rounded-lg p-4',
        )}
      >
        <Table className="w-full overflow-hidden">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="cursor-pointer hover:bg-primary/0"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(`text-sm font-bold`)}
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
          <TableBody className={cn()}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="cursor-pointer hover:bg-primary/20"
                  onClick={() =>
                    row.original.id
                      ? handleViewClick(row.original.id)
                      : undefined
                  }
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
                  className="h-full text-center"
                >
                  <div
                    className={cn(
                      'flex size-full flex-col items-center justify-center bg-white',
                      'rounded-lg p-8',
                    )}
                  >
                    <div className="size-40">
                      Loading...
                      {/* <LottieAnimation className="flex h-full w-auto items-center justify-center " /> */}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div
        className={cn('flex h-fit w-full flex-col bg-white', 'rounded-lg px-4')}
      >
        {/* Pagination controls */}
        <div className="md: flex flex-col-reverse items-center justify-between gap-x-2 gap-y-4 py-4 md:flex-row">
          <div className="flex w-full justify-center text-sm text-muted md:justify-start">
            Showing {data.length} of {totalProducts} products.
            <span className="mx-2 text-muted/50">{'  |  '}</span>
            <span className="mr-1 font-bold text-primary">
              Page {currentPage}
            </span>{' '}
            of {totalPages}
          </div>
          <div className="flex w-full flex-row items-center justify-between gap-4 md:justify-end">
            <div className="flex flex-row items-center gap-x-2 gap-y-1">
              <label
                htmlFor="pageSizeSelect"
                className="text-sm text-muted-foreground"
              >
                Items per page:
              </label>
              {/* Shadcn UI Select for page size */}
              <Select
                value={String(pageSize)} // Shadcn Select expects string value
                onValueChange={(value) => onPageSizeChange(Number(value))}
              >
                <SelectTrigger className="w-20 rounded-full">
                  <SelectValue placeholder="Page Size" />
                </SelectTrigger>
                <SelectContent>
                  {pageSizes.map((size) => (
                    <SelectItem key={size} value={String(size)}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <div className="hidden md:block">Previous</div>

                <ChevronLeft
                  size={15}
                  color="white"
                  className="block md:hidden"
                />
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <div className="hidden md:block">Next</div>
                <ChevronRight
                  size={15}
                  color="white"
                  className="block md:hidden"
                />
              </Button>
            </div>{' '}
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

        {/* Render the ViewProduct modal */}
        {isViewOpen && (
          <ViewProduct
            productId={viewingProductId}
            isOpen={isViewOpen}
            onOpenChange={setIsViewOpen}
          />
        )}

        {/* Render the DeleteProduct modal */}
        {isDeleteOpen && (
          <DeleteProduct
            productId={deleteProductId}
            isOpen={isDeleteOpen}
            onOpenChange={setIsDeleteOpen}
          />
        )}
      </div>
    </>
  );
};

export default ProductList;
