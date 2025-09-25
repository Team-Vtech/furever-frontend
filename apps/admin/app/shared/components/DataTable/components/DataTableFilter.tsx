"use client";

import { Table } from "@tanstack/react-table";

import { Button } from "@furever/ui/components/button";
import { Filter } from "lucide-react";

interface DataTableFilterProps<TData> {
  table: Table<TData>;
}

export function DataTableFilter<TData>({ table }: DataTableFilterProps<TData>) {
  // This is a placeholder component for future filter functionality
  // You can expand this to include specific filter options based on your needs

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = table;

  return (
    <Button variant="outline" size="sm" disabled>
      <Filter className="mr-2 h-4 w-4" />
      Filter
    </Button>
  );
}
