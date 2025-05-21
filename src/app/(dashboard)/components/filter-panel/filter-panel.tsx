// src/app/components/filter-panel.tsx
'use client';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { FilterPanelProps } from '@/data/app/interface';
import FilterDropdown from './filter-dropdown';
import { AddProduct } from '../dialogs/createProduct';
import FilterActions from './filter-actions';
import { Filter } from 'lucide-react';
import { FiFilter } from 'react-icons/fi';
import { FaFilter } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

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

  // Add handlers for FilterActions
  const handleResetAllFilters = () => {
    setCategory('all');
    setPrice('all');
    setRating('all');
    setSearchText('');
    onCategoryChange('all');
    onPriceChange('all');
    onRatingChange('all');
    onSearchChange('');
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
              'flex min-w-40 w-full md:w-fit h-full font-black text-2xl justify-between md:justify-start items-center ',
              'text-nowrap',
            )}
          >
            <h1>Products</h1>

            {isFilterVisibleOnMobile ? (
              <Button
              variant={'default'}
              className="flex md:hidden bg-primary/80 focus-visible:bg-primary size-7 p-2"
              onClick={handleFilterIsVisibleOnMobile}
            >
              <FaFilter
                size={15}
                className="text-white focus-visible:text-white"
              />
              </Button>
            ) : (<Button
              variant={'outline'}
              className="flex md:hidden border-primary/80 focus-visible:bg-primary size-7 p-2"
              onClick={handleFilterIsVisibleOnMobile}
            >
              <FaFilter
                size={15}
                className="text-primary/80 focus-visible:text-white"
              />
            </Button>)}
          </div>
          <div
            className={cn(
              'flex w-full flex-col md:flex-row justify-end gap-y-2 md:gap-y-0 gap-x-4 items-center',
            )}
          >
            {/* SearchBox */}
            <Input
              type="text"
              placeholder="Filter products..."
              value={searchText}
              onChange={handleSearchTextChange}
              className="max-w-sm lg:max-w-sm rounded-full h-full placeholder:text-text-muted"
            />

            {/* AddProduct */}
            <AddProduct />
          </div>
        </div>
        <div className={cn('hidden md:block w-full h-[1px] bg-primary/40')} />
        {isFilterVisibleOnMobile && (
          <div className={cn('w-full h-[1px] bg-primary/40')} />
        )}
        {/* Desktop Filter Options & Actions */}
        <div className="hidden md:flex w-full">
          <div
            className={cn('flex flex-row w-full items-center justify-between')}
          >
            <div
              className={cn(
                'grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-4 w-full items-center justify-start',
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
                'flex flex-row w-full items-center justify-between',
              )}
            >
              <div
                className={cn(
                  'grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-4 w-full items-center justify-start',
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
