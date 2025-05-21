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
import { Product } from '@/hooks/useProductService';
import { cn } from '@/lib/utils';
import { flexRender } from '@tanstack/react-table';
import { useEffect, useState, useMemo } from 'react';
import { UpdateProduct } from './dialogs/updateProduct';
import { ViewProduct } from './dialogs/viewProduct';
import { DeleteProduct } from './dialogs/deleteProduct';

import { useProductTable } from '@/hooks/useProductTable';
import { useModalControls } from '@/hooks/useModalControls';
import { useFavoriteProducts } from '@/hooks/useFavoriteProduct';
import { getProductColumns } from './data-table/columns';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  const pageSizes = [10, 20, 50, 100];

  return (
    <>
      <div
        className={cn(
          'bg-white flex h-full w-full items-start justify-start flex-col overflow-y-scroll',
          'rounded-lg p-4 space-y-4',
        )}
      >
        <Table className="w-full overflow-hidden">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="hover:bg-primary/0 cursor-pointer"
                key={headerGroup.id}
              >
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
          <TableBody className={cn()}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="hover:bg-primary/20 cursor-pointer"
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div
        className={cn('bg-white flex h-fit w-full flex-col', 'rounded-lg px-4')}
      >
        {/* Pagination controls */}
        <div className="flex items-center md:flex-row flex-col-reverse md: justify-between gap-x-2 gap-y-4 py-4">
          <div className="flex w-full justify-center md:justify-start text-sm text-muted">
            Showing {data.length} of {totalProducts} products.
            <span className="text-muted/50 mx-2">{'  |  '}</span>
            <span className="font-bold text-primary mr-1">
              Page {currentPage}
            </span>{' '}
            of {totalPages}
          </div>
          <div className="flex w-full flex-row items-center justify-between md:justify-end gap-x-4 gap-y-4">
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
