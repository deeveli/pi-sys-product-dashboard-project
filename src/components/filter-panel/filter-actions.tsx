'use client';

import { Trash2 } from 'lucide-react';
import React from 'react';
import { FiHeart } from 'react-icons/fi';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FilterActionsProps {
  onResetFilters: () => void;
  onToggleFavorites: () => void;
}

const FilterActions: React.FC<FilterActionsProps> = ({
  onResetFilters,
  onToggleFavorites,
}) => {
  return (
    <div className={cn('flex flex-row items-center justify-end gap-1')}>
      <Button variant={'ghost'} className="size-9 p-1" onClick={onResetFilters}>
        <Trash2 size={15} color="#f48525" />
      </Button>
      <Button
        variant={'ghost'}
        className="size-9 p-1"
        onClick={onToggleFavorites}
      >
        <FiHeart size={15} color="#f48525" />
      </Button>
    </div>
  );
};

export default FilterActions;
