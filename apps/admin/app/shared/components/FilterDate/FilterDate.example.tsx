// Example usage of FilterDate component with FiltersFactory

import { FiltersFactory } from "../FiltersFactory/FiltersFactory";

// Example configuration for using the date filter
const filterConfig = [
    {
        type: "date" as const,
        filterKey: "startDate",
        props: {
            label: "Start Date",
            placeholder: "Select start date",
            dateFormat: "yyyy-MM-dd", // Optional: defaults to "yyyy-MM-dd"
            className: "w-full", // Optional: for custom styling
            disabled: false, // Optional: defaults to false
        }
    },
    {
        type: "date" as const,
        filterKey: "endDate", 
        props: {
            label: "End Date",
            placeholder: "Select end date",
            dateFormat: "MM/dd/yyyy", // Custom date format
        }
    },
    {
        type: "text" as const,
        filterKey: "search",
        props: {
            placeholder: "Search...",
        }
    },
    {
        type: "select" as const,
        filterKey: "status",
        props: {
            label: "Status",
            options: [
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
            ],
            placeholder: "Select status",
        }
    }
];

// Initial data for the filters
const initialData = {
    startDate: "",
    endDate: "",
    search: "",
    status: "",
};

// Example component using the FiltersFactory with date filters
export function ExampleFiltersComponent() {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FiltersFactory 
                    config={filterConfig} 
                    initialData={initialData} 
                />
            </div>
        </div>
    );
}

// Example of how to access the filter values
// The filter values will be available through the useFilters hook
// and can be used to filter data, make API calls, etc.
