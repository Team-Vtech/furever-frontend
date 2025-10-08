# Pagination Component

A flexible and accessible pagination component for navigating through large datasets.

## Features

- ✅ Configurable page size selector
- ✅ First/last page navigation buttons
- ✅ Ellipsis for large page ranges
- ✅ Keyboard navigation support
- ✅ Loading states
- ✅ Responsive design
- ✅ Search params integration (with Next.js hook)

## Basic Usage

```tsx
import { Pagination } from "@furever/ui/components/pagination";

function MyComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const totalItems = 250;
  const totalPages = Math.ceil(totalItems / perPage);

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      onPerPageChange={setPerPage}
      perPage={perPage}
    />
  );
}
```

## With Next.js Search Params

```tsx
import { Pagination } from "@furever/ui/components/pagination";
import { usePaginationWithSearchParams } from "../../shared/hooks/use-pagination-with-search-params";

function MyComponent() {
  const { currentPage, perPage, setPage, setPerPage } = usePaginationWithSearchParams({
    defaultPage: 1,
    defaultPerPage: 10
  });

  // Your API call would use currentPage and perPage
  const { data } = useQuery(['items', currentPage, perPage], () =>
    fetchItems({ page: currentPage, per_page: perPage })
  );

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={data?.pagination?.last_page || 1}
      onPageChange={setPage}
      onPerPageChange={setPerPage}
      perPage={perPage}
    />
  );
}
```

## API Reference

### Pagination Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | `number` | Required | Current active page |
| `totalPages` | `number` | Required | Total number of pages |
| `onPageChange` | `(page: number) => void` | Required | Callback when page changes |
| `onPerPageChange` | `(perPage: number) => void` | Optional | Callback when per page changes |
| `perPage` | `number` | `10` | Items per page |
| `perPageOptions` | `number[]` | `[10, 20, 50, 100]` | Available per page options |
| `showPerPageSelect` | `boolean` | `true` | Show per page selector |
| `showFirstLast` | `boolean` | `true` | Show first/last page buttons |
| `maxVisiblePages` | `number` | `5` | Maximum visible page numbers |
| `disabled` | `boolean` | `false` | Disable all interactions |
| `className` | `string` | Optional | Additional CSS classes |

### usePaginationWithSearchParams Hook

A Next.js-specific hook that syncs pagination state with URL search parameters.

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `defaultPage` | `number` | `1` | Default page when no URL param |
| `defaultPerPage` | `number` | `10` | Default per page when no URL param |

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `currentPage` | `number` | Current page from URL or default |
| `perPage` | `number` | Per page from URL or default |
| `setPage` | `(page: number) => void` | Update page in URL |
| `setPerPage` | `(perPage: number) => void` | Update per page in URL (resets to page 1) |
| `setPageAndPerPage` | `(page: number, perPage: number) => void` | Update both values |
| `resetToFirstPage` | `() => void` | Reset to page 1 |

## URL Parameters

The hook manages these URL search parameters:

- `page` - Current page number
- `per_page` - Items per page

Example URL: `/providers?page=2&per_page=20`