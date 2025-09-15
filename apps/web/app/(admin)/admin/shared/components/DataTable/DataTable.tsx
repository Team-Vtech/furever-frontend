"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@furever/ui/components/table";
import { useState } from "react";

import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@furever/ui/components/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { DataTableToolbar } from "./components/DataTableToolbar";
import { Pagination } from "@/app/shared/types/general";
import { Loader } from "@/app/shared/components/Loader/Loader";

interface DataTableProps<TData, TValue = unknown> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  showToolbar?: boolean;
  searchPlaceholder?: string;
  showSearch?: boolean;
  showColumnVisibility?: boolean;
  pagination?: Pagination; // Make optional
}

export function DataTable<TData, TValue>({
  data,
  columns,
  pagination,
  isLoading = false,
  showToolbar = true,
  searchPlaceholder = "Search...",
  showSearch = true,
  showColumnVisibility = true,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState({});
  const searchParams = useSearchParams();
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: [],
      columnVisibility,
      pagination: {
        pageIndex: searchParams.get("page")
          ? Number(searchParams.get("page"))
          : 1,
        pageSize: Number(searchParams.get("per_page")) || 10,
      },
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
    manualPagination: true,
    pageCount: pagination?.last_page,
  });

  function onPageChange(page: number) {
    const searchParams = new URLSearchParams();
    searchParams.set("page", page.toString());
    router.push(`?${searchParams.toString()}`);
  }

  const onPageSizeChange = (pageSize: number) => {
    const searchParams = new URLSearchParams();
    searchParams.set("per_page", pageSize.toString());
    searchParams.set("page", "1"); // Reset to first page when page size changes
    router.push(`?${searchParams.toString()}`);
  };

  if (isLoading) {
    return (
      <div>
        {showToolbar && (
          <DataTableToolbar
            table={table}
            searchPlaceholder={searchPlaceholder}
            showSearch={showSearch}
            showColumnVisibility={showColumnVisibility}
          />
        )}
        <div className="overflow-hidden rounded-lg border">
          <div className="flex items-center justify-center p-8">
            <Loader />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      {showToolbar && (
        <DataTableToolbar
          table={table}
          searchPlaceholder={searchPlaceholder}
          showSearch={showSearch}
          showColumnVisibility={showColumnVisibility}
        />
      )}
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="**:data-[slot=table-cell]:first:w-8">
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="data-[slot=table-cell]:first:w-8"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {pagination ? (
        <div className="mt-10 flex items-center justify-between px-4">
          <div className="flex w-full items-center justify-between gap-8">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  onPageSizeChange(Number(value));
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table
                      .getState()
                      .pagination.pageSize.toString()}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-full items-center gap-8 lg:w-fit">
              <div className="flex w-fit items-center justify-center text-sm font-medium">
                Page {pagination.current_page} of {pagination.last_page}
              </div>
              <div className="ml-auto flex items-center gap-2 lg:ml-0">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => onPageChange(1)}
                  disabled={pagination.current_page <= 1}
                >
                  <span className="sr-only">Go to first page</span>
                  <ChevronsLeft />
                </Button>
                <Button
                  variant="outline"
                  className="size-8"
                  size="icon"
                  onClick={() => onPageChange(pagination.prev_page)}
                  disabled={
                    pagination.current_page <= 1 || pagination.prev_page === 1
                  }
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeft />
                </Button>
                <Button
                  variant="outline"
                  className="size-8"
                  size="icon"
                  onClick={() => onPageChange(pagination.next_page)}
                  disabled={pagination.current_page === pagination.last_page}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRight />
                </Button>
                <Button
                  variant="outline"
                  className="hidden size-8 lg:flex"
                  size="icon"
                  onClick={() => onPageChange(pagination.last_page)}
                  disabled={pagination.current_page === pagination.last_page}
                >
                  <span className="sr-only">Go to last page</span>
                  <ChevronsRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
