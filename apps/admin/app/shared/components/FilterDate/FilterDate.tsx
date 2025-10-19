"use client";
import { Calendar } from "@furever/ui/components/calendar";
import { Label } from "@furever/ui/components/label";
import { Popover, PopoverContent, PopoverTrigger } from "@furever/ui/components/popover";
import { cn } from "@furever/ui/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

export interface FilterDateProps {
    value?: string;
    setValue: (value: string) => void;
    label: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    dateFormat?: string;
}

export function FilterDate({
    value,
    setValue,
    label,
    placeholder = "Pick a date",
    className = "",
    disabled = false,
    dateFormat = "yyyy-MM-dd",
}: FilterDateProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Convert string value to Date object for the calendar
    const selectedDate = value ? new Date(value) : undefined;

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            setValue(format(date, dateFormat));
        } else {
            setValue("");
        }
        setIsOpen(false);
    };

    return (
        <div className="w-full">
            {label && <Label className="text-sm font-medium text-gray-700">{label}</Label>}
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        disabled={disabled}
                        className={cn(
                            "flex w-full items-center justify-between rounded-md border px-3 py-2 text-left shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
                            "border-gray-300",
                            className,
                        )}
                    >
                        <span className={cn("truncate", !value && "text-gray-500")}>
                            {value ? format(selectedDate!, "PPP") : <span className="text-gray-500">{placeholder}</span>}
                        </span>
                        <CalendarIcon className="h-4 w-4 opacity-50" />
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={selectedDate} onSelect={handleDateSelect} initialFocus />
                </PopoverContent>
            </Popover>
        </div>
    );
}
