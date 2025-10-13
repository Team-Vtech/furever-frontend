"use client";

import { Input } from "@furever/ui/components/input";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface DebouncedSearchBoxProps {
    /**
     * The current search value from the parent component
     */
    value?: string;
    /**
     * Callback function called when the debounced search value changes
     */
    onSearch: (value: string) => void;
    /**
     * Placeholder text for the input
     */
    placeholder?: string;
    /**
     * Debounce delay in milliseconds
     * @default 500
     */
    debounceMs?: number;
    /**
     * Additional CSS classes for the container
     */
    className?: string;
    /**
     * Whether to show a clear button when there's a value
     * @default true
     */
    showClearButton?: boolean;

    icon?: React.ReactNode;
}

export function DebouncedSearchBox({
    value = "",
    onSearch,
    placeholder = "Search...",
    debounceMs = 500,
    className = "",
    showClearButton = true,
    icon,
}: DebouncedSearchBoxProps) {
    const [inputValue, setInputValue] = useState(value);

    // Update internal state when external value changes
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    // Debounce the search callback
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (inputValue !== value) {
                onSearch(inputValue);
            }
        }, debounceMs);

        return () => clearTimeout(timeoutId);
    }, [inputValue, debounceMs, onSearch, value]);

    const handleClear = () => {
        setInputValue("");
        onSearch("");
    };

    const hasValue = inputValue.length > 0;

    return (
        <div className={`relative ${className}`}>
            {icon || <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />}
            <Input
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={`h-10 border-gray-200 bg-white pl-10 ${showClearButton && hasValue ? "pr-10" : ""}`}
            />
            {showClearButton && hasValue && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                    aria-label="Clear search"
                >
                    <X className="h-3 w-3" />
                </button>
            )}
        </div>
    );
}
