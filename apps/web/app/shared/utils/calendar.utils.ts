import { Booking } from "@furever/types";
import { format } from "date-fns";
import { CalendarEvent } from "../components/AddToCalendar/AddToCalendar";

/**
 * Converts a booking object to a calendar event
 */
export function bookingToCalendarEvent(booking: Booking): CalendarEvent {
    const date = format(new Date(booking.booking_date), "yyyy-MM-dd");
    const time = format(new Date(booking.booking_time), "HH:mm");
    const startDate = new Date(`${date}T${time}`);
    const endDate = new Date(startDate.getTime() + booking.service.duration_minutes * 60 * 1000);
    const description = [
        `Service: ${booking.service.name}`,
        `Provider: ${booking.provider.business_name}`,
        `Pet: ${booking.pet.name}`,
        `Duration: ${booking.service.duration_minutes} minutes`,
        `Total: $${parseFloat(booking.total_price || "0").toFixed(2)}`,
        booking.notes ? `Notes: ${booking.notes}` : "",
        "",
        "Booked via Furever - Pet Care Services",
    ]
        .filter(Boolean)
        .join("\n");

    const providerLocation = booking.provider.location;
    const location =
        `${providerLocation.address} ${providerLocation.city} ${providerLocation.state} ${providerLocation.postal_code}` ||
        booking.provider.business_name;

    return {
        title: `Pet Care Appointment - ${booking.service.name}`,
        description,
        startDate,
        endDate,
        location,
        attendees: [booking.user.email],
    };
}

/**
 * Creates a calendar event for a booking with custom title
 */
export function createBookingCalendarEvent(booking: Booking, customTitle?: string): CalendarEvent {
    const event = bookingToCalendarEvent(booking);

    if (customTitle) {
        event.title = customTitle;
    }

    return event;
}
