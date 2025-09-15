'use client';

import { Table } from '@tanstack/react-table';

import { ColumnVisibilityToggle } from './ColumnVisibilityToggle';
import { DataTableSearch } from './DataTableSearch';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    searchPlaceholder?: string;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    showSearch?: boolean;
    showColumnVisibility?: boolean;
    children?: React.ReactNode;
}

export function DataTableToolbar<TData>({
    table,
    searchPlaceholder = 'Search...',
    searchValue = '',
    onSearchChange,
    showSearch = true,
    showColumnVisibility = true,
    children,
}: DataTableToolbarProps<TData>) {
    return (
        <div className="flex items-center justify-between pb-4">
            <div className="flex flex-1 items-center space-x-2">
                {showSearch && onSearchChange && <DataTableSearch value={searchValue} onChange={onSearchChange} placeholder={searchPlaceholder} />}
                {/* Future filter components can be added here */}
                {children}
            </div>
            <div className="flex items-center space-x-2">{showColumnVisibility && <ColumnVisibilityToggle table={table} />}</div>
        </div>
    );
}
