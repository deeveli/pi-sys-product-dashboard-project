'use client';

import { ChevronDown } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  sectionTitle: string;
  options: FilterOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  sectionTitle,
  options,
  selectedValue,
  onValueChange,
}) => {
  // Find the label for the currently selected value
  const displayLabel =
    selectedValue !== 'all'
      ? options.find((opt) => opt.value === selectedValue)?.label ||
        sectionTitle
      : sectionTitle;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between bg-primary/10 px-4 text-sm font-semibold"
        >
          {displayLabel}
          <ChevronDown size={15} className={cn('text-muted')} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          'h-[20vh] w-full cursor-pointer overflow-scroll border-none shadow-lg',
        )}
      >
        {options.map((option) => (
          <DropdownMenuItem
            className={cn('')}
            key={option.value}
            onSelect={() => onValueChange(option.value)}
          >
            <DropdownMenuLabel>{option.label}</DropdownMenuLabel>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
