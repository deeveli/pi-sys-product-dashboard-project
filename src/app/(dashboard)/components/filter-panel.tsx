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
import { useEffect, useState } from 'react';
import { FilterPanelProps } from '@/data/app/interface';
import { ChevronDown, Trash2 } from 'lucide-react';
import { createProduct, Product } from '@/hooks/useProductService';
import { AddProduct } from './dialogs/createProduct';
import { FiHeart } from 'react-icons/fi';

const FilterPanel: React.FC<FilterPanelProps> = ({
  onCategoryChange,
  onPriceChange,
  onRatingChange,
  onSearchChange,
  categoryList,
}) => {
  const [category, setCategory] = useState('all');
  const [price, setPrice] = useState('all');
  const [rating, setRating] = useState('all');
  const [searchText, setSearchText] = useState('');

  // --- Dynamic filter options state ---
  const [dynamicFilterOptions, setDynamicFilterOptions] = useState<any>({});

  useEffect(() => {
    const newFilterOptions: any = {
      Category: [{ label: 'All', value: 'all' }],
      Price: [
        { label: 'All', value: 'all' },
        { label: 'Under GH¢20', value: 'under20' },
        { label: 'Under GH¢50', value: 'under50' },
        { label: 'GH¢50 & Above', value: 'above50' },
      ],
      Rating: [
        { label: 'All', value: 'all' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
      ],
    };

    if (categoryList && categoryList.length > 0) {
      categoryList.forEach((cat) => {
        newFilterOptions.Category.push({ label: cat, value: cat });
      });
    }

    setDynamicFilterOptions(newFilterOptions);
  }, [categoryList]);

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
          <div
            className={cn('flex flex-row w-full items-center justify-between')}
          >
            {/* Dropdown Filtering Options */}
            <div
              className={cn(
                'grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-4 w-full items-center justify-start',
              )}
            >
              {Object.entries(dynamicFilterOptions).map(
                ([sectionTitle, options]) => (
                  <div key={sectionTitle}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between text-sm font-semibold bg-primary/10 px-4 "
                        >
                          {/* Conditionally display the selected filter value or the section title */}
                          {sectionTitle === 'Category' && category !== 'all'
                            ? (
                                options as { label: string; value: string }[]
                              ).find((opt) => opt.value === category)?.label ||
                              sectionTitle
                            : sectionTitle === 'Price' && price !== 'all'
                              ? (
                                  options as { label: string; value: string }[]
                                ).find((opt) => opt.value === price)?.label ||
                                sectionTitle
                              : sectionTitle === 'Rating' && rating !== 'all'
                                ? (
                                    options as {
                                      label: string;
                                      value: string;
                                    }[]
                                  ).find((opt) => opt.value === rating)
                                    ?.label || sectionTitle
                                : sectionTitle}
                          <ChevronDown size={15} className={cn('text-muted')} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className={cn(
                          'shadow-lg border-none w-full h-[20vh] overflow-scroll cursor-pointer',
                        )}
                      >
                        {(options as { label: string; value: string }[]).map(
                          (option) => (
                            <DropdownMenuItem
                              className={cn('')}
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
                              <DropdownMenuLabel>
                                {option.label}
                              </DropdownMenuLabel>
                            </DropdownMenuItem>
                          ),
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ),
              )}
            </div>
            <div className={cn('flex flex-row items-center justify-end gap-1')}>
              <Button variant={'ghost'} className="size-9 p-1">
                <Trash2 size={15} color="#f48525" />
              </Button>
              <Button variant={'ghost'} className="size-9 p-1">
                <FiHeart size={15} color="#f48525" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
