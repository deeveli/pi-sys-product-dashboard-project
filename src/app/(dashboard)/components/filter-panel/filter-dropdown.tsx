'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import React from 'react';

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
          className="w-full justify-between text-sm font-semibold bg-primary/10 px-4"
        >
          {displayLabel}
          <ChevronDown size={15} className={cn('text-muted')} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          'shadow-lg border-none w-full h-[20vh] overflow-scroll cursor-pointer',
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
