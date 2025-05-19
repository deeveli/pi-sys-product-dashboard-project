import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

import Icons from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';



const filterOptions = {
  Category: [
    { label: 'All', value: 'all' },
    { label: 'Category 1', value: 'category1' },
    { label: 'Category 2', value: 'category2' },
    { label: 'Category 3', value: 'category3' },
  ],
  Price: [
    { label: 'All', value: 'all' },
    { label: 'Price 1', value: 'price1' },
    { label: 'Price 2', value: 'price2' },
    { label: 'Price 3', value: 'price3' },
  ],
  Rating: [
    { label: 'All', value: 'all' },
    { label: 'Rating 1', value: 'rating1' },
    { label: 'Rating 2', value: 'rating2' },
  ],
  Product: [
    { label: 'All', value: 'all' },
    { label: 'Rating 1', value: 'rating1' },
    { label: 'Rating 2', value: 'rating2' },
  ],
};

const FilterPanel = async () => {
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
              'flex min-w-40 h-full font-bold justify-start items-center',
              'text-text-muted text-nowrap',
            )}
          >
            Product Header Title
          </div>
          <div
            className={cn(
              'flex w-full flex-col md:flex-row justify-end space-y-2 md:space-y-0 space-x-4',
            )}
          >
            {' '}
            {/* SearchBox */}
            <div
              className={cn(
                'flex rounded-full w-full md:w-96 h-full bg-primary/10 justify-start items-center py-2 px-4',
                'text-text-muted',
              )}
            >
              search box
            </div>
            {/* AddProduct */}
            <div
              className={cn(
                'flex rounded-full w-fit h-full bg-primary/10 justify-start items-center py-2 px-4',
                'text-text-muted',
              )}
            >
              Add new product
            </div>
          </div>
        </div>
        <div className={cn('w-full h-[1px] bg-primary/40')} />
        <div
          className={cn('flex flex-row w-full items-center justify-between')}
        >
          <div
            className={cn(
              'grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 w-full items-center justify-start',
            )}
          >
            {Object.entries(filterOptions).map(([sectionTitle, options]) => (
              <div
                key={sectionTitle}
                className={cn(
                  'flex flex-col rounded-full w-full bg-primary/10 p-2',
                  'text-text-muted',
                )}
              >
                <h4 className="text-sm font-semibold">{sectionTitle}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;


 {
   /* <Link
              href="https://github.com/deeveli/nextjs-starter-tailwind"
              className={cn(buttonVariants({ variant: 'outline' }), 'gap-x-2')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={cn('font-medium')}>{stars}</span>
              <Icons.star className={cn('h-4 w-4')} />
              <span>on</span>
              <Icons.gitHub className={cn('h-4 w-4')} />
            </Link> */
 }
