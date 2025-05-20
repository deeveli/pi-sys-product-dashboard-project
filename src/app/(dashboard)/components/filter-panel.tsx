'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { FilterPanelProps } from '@/data/app/interface';
import { filterOptions } from '@/data/app/filterOptions';
import { ChevronDown } from 'lucide-react';
import { createProduct, Product } from '@/hooks/productService';
import { AddProduct } from './createProductDialog';

const FilterPanel: React.FC<FilterPanelProps> = ({
  onCategoryChange,
  onPriceChange,
  onRatingChange,
  onSearchChange,
}) => {
  const [category, setCategory] = useState('all');
  const [price, setPrice] = useState('all');
  const [rating, setRating] = useState('all');
  const [searchText, setSearchText] = useState('');

  // Handle changes in category, price, rating filters and pass to parent
  const handleCategoryChange = (value: string) => {
    setCategory(value);
    onCategoryChange(value);
  };

  const handlePriceChange = (value: string) => {
    setPrice(value);
    onPriceChange(value);
  };

  const handleRatingChange = (value: string) => {
    setRating(value);
    onRatingChange(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    onSearchChange(event.target.value);
  };

  const handleCreateProduct = async (product: Product) => {
    await createProduct(product);
  };

  return (
    <div className={cn('')}>
      <div
        className={cn(
          'bg-background flex h-fit w-full flex-col items-center justify-start',
          'rounded-lg p-4 space-y-4',
        )}
      >
        <div
          className={cn(
            'flex flex-col md:flex-row w-full items-start md:items-center gap-4  justify-start md:justify-between',
          )}
        >
          {/* Product Header Title */}
          <div
            className={cn(
              'flex min-w-40 h-full font-black text-2xl justify-start items-center',
              'text-nowrap',
            )}
          >
            Products
          </div>
          <div
            className={cn(
              'flex w-full flex-col md:flex-row justify-end space-y-2 md:space-y-0 space-x-4 items-center',
            )}
          >
            {/* SearchBox */}
            <Input
              type="text"
              placeholder="Filter products..."
              value={searchText}
              onChange={handleSearchChange} // Correctly wired to handleSearchChange
              className="max-w-md rounded-full h-full placeholder:text-text-muted"
            />

            {/* AddProduct */}
            <AddProduct />
          </div>
        </div>
        <div className={cn('w-full h-[1px] bg-primary/40')} />
        <div
          className={cn('flex flex-row w-full items-center justify-between')}
        >
          {/* Dropdown Filtering Options */}
          <div
            className={cn('flex flex-row w-full items-center justify-between')}
          >
            {/* Dropdown Filtering Options */}
            <div
              className={cn(
                'grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-4 w-full items-center justify-start',
              )}
            >
              {Object.entries(filterOptions).map(([sectionTitle, options]) => (
                <div key={sectionTitle}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between text-sm font-semibold bg-primary/10 px-4 "
                      >
                        {/* Conditionally display the selected filter value or the section title */}
                        {sectionTitle === 'Category' && category !== 'all'
                          ? options.find((opt) => opt.value === category)
                              ?.label || sectionTitle
                          : sectionTitle === 'Price' && price !== 'all'
                            ? options.find((opt) => opt.value === price)
                                ?.label || sectionTitle
                            : sectionTitle === 'Rating' && rating !== 'all'
                              ? options.find((opt) => opt.value === rating)
                                  ?.label || sectionTitle
                              : sectionTitle}
                        <ChevronDown size={15} className={cn('text-muted')} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className={cn('shadow-lg border-none w-full')}
                    >
                      {options.map((option) => (
                        <DropdownMenuItem
                          key={option.value}
                          onSelect={() => {
                            if (sectionTitle === 'Category')
                              handleCategoryChange(option.value);
                            else if (sectionTitle === 'Price')
                              handlePriceChange(option.value);
                            else if (sectionTitle === 'Rating')
                              handleRatingChange(option.value);
                          }}
                        >
                          <DropdownMenuLabel>{option.label}</DropdownMenuLabel>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
