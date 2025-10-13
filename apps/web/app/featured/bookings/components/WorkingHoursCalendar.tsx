"use client";

import { WorkingHour } from "@furever/types";
import { Calendar } from "@furever/ui/components/calendar";
import { cn } from "@furever/ui/lib/utils";
import { format, isBefore, isEqual, startOfDay } from "date-fns";
import { CalendarDays, Clock } from "lucide-react";
import { useState } from "react";

interface WorkingHoursCalendarProps {
    workingHours: WorkingHour[];
    selectedDate?: Date;
    onDateSelect: (date: Date | undefined) => void;
    minDate?: Date;
    className?: string;
}

export function WorkingHoursCalendar({ workingHours, selectedDate, onDateSelect, minDate, className }: WorkingHoursCalendarProps) {
    const [currentMonth, setCurrentMonth] = useState<Date>(selectedDate || new Date());

    // Helper function to get day of week from date (0 = Sunday, 1 = Monday, etc.)
    const getDayOfWeek = (date: Date): string => {
        const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        return days[date.getDay()] || "sunday";
    };

    // Helper function to check if provider is open on a given date
    const isProviderOpen = (date: Date): boolean => {
        const dayOfWeek = getDayOfWeek(date);
        const workingHour = workingHours.find((wh) => wh.day_of_week.toLowerCase() === dayOfWeek);
        return workingHour ? !workingHour.is_closed : false;
    };

    // Helper function to get working hours for a specific day
    const getWorkingHoursForDay = (date: Date) => {
        const dayOfWeek = getDayOfWeek(date);
        return workingHours.find((wh) => wh.day_of_week.toLowerCase() === dayOfWeek);
    };

    // Check if date is disabled (past or provider closed)
    const isDateDisabled = (date: Date): boolean => {
        const today = startOfDay(new Date());
        const targetDate = startOfDay(date);

        // Disable past dates
        if (isBefore(targetDate, today)) {
            return true;
        }

        // Disable if provider is closed
        return !isProviderOpen(date);
    };

    // Custom day renderer with working hours styling
    const modifiers = {
        open: (date: Date) => isProviderOpen(date) && !isDateDisabled(date),
        closed: (date: Date) => !isProviderOpen(date),
        disabled: (date: Date) => isDateDisabled(date),
        past: (date: Date) => isBefore(startOfDay(date), startOfDay(new Date())),
        selected: (date: Date) => (selectedDate ? isEqual(startOfDay(date), startOfDay(selectedDate)) : false),
    };

    const modifiersClassNames = {
        open: "bg-green-50 text-green-900 hover:bg-green-100 border-green-200",
        closed: "bg-red-50 text-red-400 cursor-not-allowed border-red-200",
        disabled: "text-gray-300 cursor-not-allowed opacity-50",
        past: "text-gray-300 cursor-not-allowed opacity-50",
        selected: "bg-purple-600 text-white hover:bg-purple-700 border-purple-600",
    };

    console.log(workingHours);
    return (
        <div className={cn("rounded-lg border bg-white p-6 shadow-sm", className)}>
            <div className="flex flex-col">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Select Date</h3>
                    <CalendarDays className="h-5 w-5 text-gray-400" />
                </div>

                {/* Legend */}
                <div className="mb-4 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center">
                        <div className="mr-2 h-3 w-3 rounded-full border border-green-200 bg-green-100"></div>
                        <span className="text-gray-600">Available</span>
                    </div>
                    <div className="flex items-center">
                        <div className="mr-2 h-3 w-3 rounded-full border border-red-200 bg-red-100"></div>
                        <span className="text-gray-600">Closed</span>
                    </div>
                    <div className="flex items-center">
                        <div className="mr-2 h-3 w-3 rounded-full bg-purple-600"></div>
                        <span className="text-gray-600">Selected</span>
                    </div>
                </div>

                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={onDateSelect}
                    disabled={isDateDisabled}
                    month={currentMonth}
                    onMonthChange={setCurrentMonth}
                    modifiers={modifiers}
                    modifiersClassNames={modifiersClassNames}
                    className="w-full"
                    showOutsideDays={false}
                />

                {/* Selected Date Info */}
                {selectedDate && (
                    <div className="mt-4 rounded-lg bg-gray-50 p-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="font-medium text-gray-900">{format(selectedDate, "EEEE, MMMM d, yyyy")}</h4>
                                {(() => {
                                    const dayHours = getWorkingHoursForDay(selectedDate);
                                    if (dayHours && !dayHours.is_closed) {
                                        return (
                                            <div className="mt-1 flex items-center text-sm text-gray-600">
                                                <Clock className="mr-1 h-4 w-4" />
                                                <span>
                                                    {dayHours.start_time && dayHours.end_time
                                                        ? `${dayHours.start_time} - ${dayHours.end_time}`
                                                        : "Open"}
                                                </span>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div className="mt-1 text-sm text-red-600">
                                                <Clock className="mr-1 inline h-4 w-4" />
                                                Closed
                                            </div>
                                        );
                                    }
                                })()}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Weekly Schedule Preview */}
            <div className="mt-4 border-t pt-4">
                <h4 className="mb-3 text-sm font-medium text-gray-900">Weekly Schedule</h4>
                <div className="space-y-2">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => {
                        const dayKey = day.toLowerCase() as WorkingHour["day_of_week"];
                        const workingHour = workingHours.find((wh) => wh.day_of_week === dayKey);

                        return (
                            <div key={day} className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">{day}</span>
                                <span
                                    className={cn(
                                        "rounded px-2 py-1 text-xs",
                                        workingHour?.is_closed ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700",
                                    )}
                                >
                                    {workingHour?.is_closed
                                        ? "Closed"
                                        : workingHour?.start_time && workingHour?.end_time
                                          ? `${workingHour.start_time} - ${workingHour.end_time}`
                                          : "Open"}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
