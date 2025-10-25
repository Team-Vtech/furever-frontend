import { WorkingHour } from "@furever/types";
import { addMinutes, format, parse, setHours, setMinutes } from "date-fns";

/**
 * Smart time parser that handles various time formats
 */
function parseTimeToHour24Format(timeStr: string): string {
    const cleanTime = timeStr.trim();

    try {
        // Check if it's already in 24-hour format (HH:mm or H:mm)
        const time24Pattern = /^(\d{1,2}):(\d{2})$/;
        const time24Match = cleanTime.match(time24Pattern);

        if (time24Match && time24Match[1] && time24Match[2]) {
            const hours = parseInt(time24Match[1], 10);
            const minutes = parseInt(time24Match[2], 10);

            // Validate time
            if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
                return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
            }
        }

        // Check if it has AM/PM but also has 24-hour format (invalid format like "15:00 PM")
        if (cleanTime.includes("AM") || cleanTime.includes("PM")) {
            // Extract just the time part before AM/PM
            const timePartMatch = cleanTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
            if (timePartMatch && timePartMatch[1] && timePartMatch[2] && timePartMatch[3]) {
                const hours = parseInt(timePartMatch[1], 10);
                const minutes = parseInt(timePartMatch[2], 10);
                const meridiem = timePartMatch[3].toUpperCase();

                // If hours > 12, it's probably already 24-hour format with incorrect AM/PM
                if (hours > 12) {
                    // Just return the 24-hour format part
                    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
                }

                // Handle normal 12-hour format
                let hour24 = hours;
                if (meridiem === "PM" && hours !== 12) {
                    hour24 += 12;
                } else if (meridiem === "AM" && hours === 12) {
                    hour24 = 0;
                }

                return `${hour24.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
            }
        }

        // Try parsing as 12-hour format with date-fns as fallback
        const parsedTime = parse(cleanTime, "h:mm a", new Date());
        return format(parsedTime, "HH:mm");
    } catch (error) {
        console.error("Error parsing time:", timeStr, error);
        return "09:00"; // Default fallback
    }
}

/**
 * Convert 24-hour time format (e.g., "09:00") to minutes since midnight
 */
function timeToMinutes(time: string): number {
    const [hoursStr, minutesStr] = time.split(":");
    const hours = parseInt(hoursStr || "0", 10);
    const minutes = parseInt(minutesStr || "0", 10);
    return hours * 60 + minutes;
}

/**
 * Convert minutes since midnight to 24-hour time format
 */
function minutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}

/**
 * Generate available time slots for a specific date based on provider working hours and service duration
 */
export function generateTimeSlots(
    selectedDate: Date,
    workingHours: WorkingHour[],
    serviceDurationMinutes: number = 60,
): Array<{ value: string; label: string; startTime: string; endTime: string }> {
    // Get day of week (0 = Sunday, 1 = Monday, etc.)
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const dayOfWeek = days[selectedDate.getDay()];

    // Find working hours for this day
    const workingHour = workingHours.find((wh) => wh.day_of_week.toLowerCase() === dayOfWeek);

    if (!workingHour || workingHour.is_closed || !workingHour.start_time || !workingHour.end_time) {
        return [];
    }

    try {
        // Convert times to 24-hour format
        const startTime24 = parseTimeToHour24Format(workingHour.start_time);
        const endTime24 = parseTimeToHour24Format(workingHour.end_time);

        // Convert to minutes since midnight
        const startMinutes = timeToMinutes(startTime24);
        const endMinutes = timeToMinutes(endTime24);

        const timeSlots: Array<{ value: string; label: string; startTime: string; endTime: string }> = [];

        // Generate time slots
        let currentMinutes = startMinutes;

        while (currentMinutes + serviceDurationMinutes <= endMinutes) {
            const startTimeStr = minutesToTime(currentMinutes);
            const endTimeStr = minutesToTime(currentMinutes + serviceDurationMinutes);

            // Convert to user-friendly format for display
            const startDate = setMinutes(setHours(new Date(), Math.floor(currentMinutes / 60)), currentMinutes % 60);
            const endDate = addMinutes(startDate, serviceDurationMinutes);

            timeSlots.push({
                value: startTimeStr,
                label: `${format(startDate, "h:mm a")} - ${format(endDate, "h:mm a")}`,
                startTime: format(startDate, "h:mm a"),
                endTime: format(endDate, "h:mm a"),
            });

            // Move to next 30-minute slot (you can adjust this interval)
            currentMinutes += 30;
        }

        return timeSlots;
    } catch (error) {
        console.error("Error generating time slots:", error);
        return [];
    }
}

/**
 * Check if a time slot is available (not in the past for today's date)
 */
export function isTimeSlotAvailable(timeSlot: string, selectedDate: Date): boolean {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const selectedDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());

    // If selected date is not today, all slots are available
    if (selectedDay.getTime() !== today.getTime()) {
        return true;
    }

    // For today, check if the time slot is in the future
    try {
        const [hoursStr, minutesStr] = timeSlot.split(":");
        const hours = parseInt(hoursStr || "0", 10);
        const minutes = parseInt(minutesStr || "0", 10);
        const slotTime = new Date(selectedDate);
        slotTime.setHours(hours, minutes, 0, 0);

        return slotTime.getTime() > now.getTime();
    } catch (error) {
        console.error("Error checking time slot availability:", error);
        return false;
    }
}
