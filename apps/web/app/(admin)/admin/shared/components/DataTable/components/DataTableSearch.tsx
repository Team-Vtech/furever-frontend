"use client";

import { useEffect, useState } from "react";

import { Button } from "@furever/ui/components/button";
import { Input } from "@furever/ui/components/input";
import { Search, X } from "lucide-react";

interface DataTableSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function DataTableSearch({
  value,
  onChange,
  placeholder = "Search...",
}: DataTableSearchProps) {
  const [searchValue, setSearchValue] = useState(value);

  // Sync internal state with prop value
  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  // Debounce the onChange call
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchValue !== value) {
        onChange(searchValue);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchValue, onChange, value]);

  const handleSearchChange = (newValue: string) => {
    setSearchValue(newValue);
  };

  const clearSearch = () => {
    setSearchValue("");
    onChange("");
  };

  return (
    <div className="flex max-w-sm items-center space-x-2">
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 transform" />
        <Input
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pr-8 pl-8"
        />
        {searchValue && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-1/2 right-0 h-full -translate-y-1/2 transform px-2 hover:bg-transparent"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
