"use client";

import { Pagination } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function usePaginationParams(pagination: Pagination) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = new URLSearchParams(useSearchParams().toString());
  const page = searchParams.get("page");
  const size = searchParams.get("size");

  // Ensure pagination object has valid values
  const safePagination = {
    ...pagination,
    current_page: pagination?.current_page || 1,
    last_page: pagination?.last_page || 1,
    per_page: pagination?.per_page || 25,
  };

  const pageNumber = page ? +page : safePagination.current_page;
  const pageSize = size ? +size : safePagination.per_page;

  function updateParams(key: "page" | "size", value: number) {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (key === "page") {
      // Ensure page is within valid range
      const validPage = Math.max(1, Math.min(value, safePagination.last_page));
      newSearchParams.set("page", validPage.toString());
      newSearchParams.set("size", pageSize.toString());
    } else if (key === "size") {
      newSearchParams.set("size", value.toString());
      newSearchParams.set("page", "1"); // Reset to first page when changing size
    }

    router.replace(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  }

  return {
    page: pageNumber,
    size: pageSize,
    setPage: (page: number) => updateParams("page", page),
    setSize: (size: number) => updateParams("size", size),
    queryString: searchParams.toString(),
  };
}