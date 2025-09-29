# DataTable Dynamic Filters

This document explains how to use the dynamic filter system in the DataTable component.

## Overview

The DataTable component now supports dynamic filtering through configuration objects. You can define filters for different data types and the component will automatically render the appropriate filter UI and manage the filter state.

## Supported Filter Types

- **text**: Simple text input for string filtering
- **select**: Dropdown selection with predefined options
- **number**: Number input for numeric filtering
- **date**: Date picker for date filtering
- **multi-select**: Multiple selection dropdown (coming soon)
- **date-range**: Date range picker (coming soon)
- **boolean**: Toggle/checkbox for boolean values (coming soon)

## Filter Configuration

Each filter is defined using the `FilterConfig` interface:

```typescript
interface FilterConfig {
    key: string; // The field key to filter on
    type: FilterType; // Type of filter (text, select, etc.)
    label: string; // Display label for the filter
    placeholder?: string; // Placeholder text (optional)
    options?: FilterOption[]; // Options for select filters (required for select type)
    defaultValue?: any; // Default filter value (optional)
    width?: "sm" | "md" | "lg" | "xl"; // Filter width (optional, defaults to 'md')
}
```

## Usage Example

```typescript
import { DataTable } from "../../shared/components/DataTable/DataTable";
import { FilterConfig } from "../../shared/components/DataTable/types";

const usersFilters: FilterConfig[] = [
  {
    key: "name",
    type: "text",
    label: "Name",
    placeholder: "Search by name...",
    width: "md",
  },
  {
    key: "status",
    type: "select",
    label: "Status",
    placeholder: "Filter by status...",
    width: "sm",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
  {
    key: "created_at",
    type: "date",
    label: "Created Date",
    width: "md",
  },
];

function MyListScreen() {
  const handleFiltersChange = (filters: Record<string, any>) => {
    // Handle filter changes - refetch data, update state, etc.
    console.log("Applied filters:", filters);
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      filters={usersFilters}
      onFiltersChange={handleFiltersChange}
      // ... other props
    />
  );
}
```

## Features

### URL Synchronization

- Filter values are automatically synchronized with URL query parameters
- Page reloads maintain filter state
- Changing filters resets pagination to page 1

### Clear Filters

- A "Clear Filters" button appears when any filters are active
- Clicking it removes all filter values and updates the URL

### Responsive Design

- Filters are laid out horizontally and wrap on smaller screens
- Different width options available for optimal spacing

## Props

### DataTable Props (additions)

- `filters?: FilterConfig[]` - Array of filter configurations
- `onFiltersChange?: (filters: FilterValue) => void` - Callback when filters change

### FilterConfig Properties

- `key: string` - **Required**. The field key to filter on
- `type: FilterType` - **Required**. The type of filter component to render
- `label: string` - **Required**. Display label for the filter
- `placeholder?: string` - Optional placeholder text
- `options?: FilterOption[]` - Required for select type filters
- `defaultValue?: any` - Optional default value
- `width?: 'sm' | 'md' | 'lg' | 'xl'` - Optional width sizing

### FilterOption (for select filters)

```typescript
interface FilterOption {
    label: string; // Display text
    value: string | number | boolean; // Filter value
}
```

## Implementation Notes

1. **Server Integration**: The `onFiltersChange` callback receives all active filter values. Use this to refetch data from your API with the applied filters.

2. **Data Filtering**: The component handles UI state management. Actual data filtering should be done server-side for performance with large datasets.

3. **Custom Filters**: To add new filter types, create a new filter component in the `components/filters/` directory and add it to the `DynamicFilter` component switch statement.

4. **Styling**: Filters use the same design system as other components and automatically match the application theme.

## Future Enhancements

- Multi-select filters
- Date range filters
- Boolean/checkbox filters
- Custom filter components
- Filter presets/saved filters
- Advanced filter combinations with AND/OR logic
