'use client';

import React, { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { FilterPanelProps } from '@/data/app/interface';
import { cn } from '@/lib/utils';

import { AddProduct } from '../dialogs/createProduct';
import FilterDropdown from './filter-dropdown';

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
  const [isFilterVisibleOnMobile, setIsFilterVisibleOnMobile] = useState(false);

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
  const handleCategoryFilterChange = (value: string) => {
    setCategory(value);
    onCategoryChange(value);
  };

  const handlePriceFilterChange = (value: string) => {
    setPrice(value);
    onPriceChange(value);
  };

  const handleRatingFilterChange = (value: string) => {
    setRating(value);
    onRatingChange(value);
  };

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchText(event.target.value);
    onSearchChange(event.target.value);
  };

  const handleFilterIsVisibleOnMobile = () => {
    setIsFilterVisibleOnMobile((prev) => !prev);
  };

  const renderFilterDropdowns = () => (
    <>
      {Object.entries(dynamicFilterOptions).map(([sectionTitle, options]) => (
        <div key={sectionTitle}>
          <FilterDropdown
            sectionTitle={sectionTitle}
            options={options as { label: string; value: string }[]}
            selectedValue={
              sectionTitle === 'Category'
                ? category
                : sectionTitle === 'Price'
                  ? price
                  : rating
            }
            onValueChange={(value) => {
              if (sectionTitle === 'Category')
                handleCategoryFilterChange(value);
              else if (sectionTitle === 'Price') handlePriceFilterChange(value);
              else if (sectionTitle === 'Rating')
                handleRatingFilterChange(value);
            }}
          />
        </div>
      ))}
    </>
  );

  return (
    <div className={cn('')}>
      <div
        className={cn(
          'flex h-fit w-full flex-col items-center justify-start bg-background',
          'space-y-4 rounded-lg p-4',
        )}
      >
        <div
          className={cn(
            'flex w-full flex-col items-start justify-start gap-4 md:flex-row  md:items-center md:justify-between',
          )}
        >
          {/* Product Header Title */}
          <div
            className={cn(
              'flex h-full w-full min-w-40 items-center justify-between text-2xl font-black md:w-fit md:justify-start ',
              'text-nowrap',
            )}
          >
            <h1>Products</h1>

            {isFilterVisibleOnMobile ? (
              <Button
                variant={'default'}
                className="flex size-7 bg-primary/80 p-2 focus-visible:bg-primary md:hidden"
                onClick={handleFilterIsVisibleOnMobile}
              >
                <FaFilter
                  size={15}
                  className="text-white focus-visible:text-white"
                />
              </Button>
            ) : (
              <Button
                variant={'outline'}
                className="flex size-7 border-primary/80 p-2 focus-visible:bg-primary md:hidden"
                onClick={handleFilterIsVisibleOnMobile}
              >
                <FaFilter
                  size={15}
                  className="text-primary/80 focus-visible:text-white"
                />
              </Button>
            )}
          </div>
          <div
            className={cn(
              'flex w-full flex-col items-center justify-end gap-x-4 gap-y-2 md:flex-row md:gap-y-0',
            )}
          >
            {/* SearchBox */}
            <Input
              type="text"
              placeholder="Filter products..."
              value={searchText}
              onChange={handleSearchTextChange}
              className="placeholder:text-text-muted h-full max-w-sm rounded-full lg:max-w-sm"
            />

            {/* AddProduct */}
            <AddProduct />
          </div>
        </div>
        <div className={cn('hidden h-[1px] w-full bg-primary/40 md:block')} />
        {isFilterVisibleOnMobile && (
          <div className={cn('h-[1px] w-full bg-primary/40')} />
        )}
        {/* Desktop Filter Options & Actions */}
        <div className="hidden w-full md:flex">
          <div
            className={cn('flex w-full flex-row items-center justify-between')}
          >
            <div
              className={cn(
                'grid w-full grid-cols-2 items-center justify-start gap-2 md:grid-cols-6 md:gap-4',
              )}
            >
              {renderFilterDropdowns()}
            </div>
            {/* <FilterActions
              onResetFilters={handleResetAllFilters}
              onToggleFavorites={handleToggleFavorites}
            /> */}
          </div>
        </div>

        {/* Mobile Filter Options & Actions */}
        {isFilterVisibleOnMobile && (
          <div className="flex w-full">
            <div
              className={cn(
                'flex w-full flex-row items-center justify-between',
              )}
            >
              <div
                className={cn(
                  'grid w-full grid-cols-2 items-center justify-start gap-2 md:grid-cols-6 md:gap-4',
                )}
              >
                {renderFilterDropdowns()}
              </div>
              {/* <FilterActions
              onResetFilters={handleResetAllFilters}
              onToggleFavorites={handleToggleFavorites}
            /> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
