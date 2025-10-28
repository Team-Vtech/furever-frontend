"use client";

import { AddToCalendar } from "@/app/shared/components/AddToCalendar/AddToCalendar";
import { bookingToCalendarEvent } from "@/app/shared/utils/calendar.utils";
import { Booking } from "@furever/types";

interface BookingCalendarButtonProps {
    booking: Booking;
    className?: string;
    customTitle?: string;
}

/**
 * A ready-to-use component that adds calendar functionality to any booking
 */
export function BookingCalendarButton({ booking, className = "", customTitle }: BookingCalendarButtonProps) {
    const calendarEvent = bookingToCalendarEvent(booking);

    if (customTitle) {
        calendarEvent.title = customTitle;
    }

    return <AddToCalendar event={calendarEvent} className={className} />;
}
