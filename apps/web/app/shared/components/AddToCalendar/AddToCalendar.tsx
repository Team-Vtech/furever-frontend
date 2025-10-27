"use client";

import { Button } from "@furever/ui/components/button";
import { Calendar, Download, ExternalLink } from "lucide-react";
import { useState } from "react";

export interface CalendarEvent {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    location?: string;
    attendees?: string[];
}

interface AddToCalendarProps {
    event: CalendarEvent;
    className?: string;
}

export function AddToCalendar({ event, className = "" }: AddToCalendarProps) {
    const [isOpen, setIsOpen] = useState(false);
    // Generate Google Calendar URL
    const generateGoogleCalendarUrl = (event: CalendarEvent): string => {
        const startDate = event.startDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
        const endDate = event.endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

        const params = new URLSearchParams({
            action: "TEMPLATE",
            text: event.title,
            dates: `${startDate}/${endDate}`,
            details: event.description,
            location: event.location || "",
            trp: "false",
        });

        return `https://calendar.google.com/calendar/render?${params.toString()}`;
    };

    // Generate ICS file content
    const generateICSContent = (event: CalendarEvent): string => {
        const formatDate = (date: Date): string => {
            return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
        };

        const escapeText = (text: string): string => {
            return text.replace(/[,;\\]/g, "\\$&").replace(/\n/g, "\\n");
        };

        const attendees = event.attendees?.map((email) => `ATTENDEE:mailto:${email}`).join("\n") || "";

        return [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Furever//Pet Care Booking//EN",
            "BEGIN:VEVENT",
            `UID:${Date.now()}@furever.com`,
            `DTSTAMP:${formatDate(new Date())}`,
            `DTSTART:${formatDate(event.startDate)}`,
            `DTEND:${formatDate(event.endDate)}`,
            `SUMMARY:${escapeText(event.title)}`,
            `DESCRIPTION:${escapeText(event.description)}`,
            `LOCATION:${escapeText(event.location || "")}`,
            attendees,
            "STATUS:CONFIRMED",
            "END:VEVENT",
            "END:VCALENDAR",
        ]
            .filter((line) => line)
            .join("\n");
    };

    // Download ICS file
    const downloadICSFile = () => {
        const icsContent = generateICSContent(event);
        const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `${event.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.ics`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // Open Google Calendar
    const openGoogleCalendar = () => {
        const url = generateGoogleCalendarUrl(event);
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <div className={`relative ${className}`}>
            <Button onClick={() => setIsOpen(!isOpen)} variant="outline" className="flex w-full items-center gap-2">
                <Calendar className="h-4 w-4" />
                Add to Calendar
            </Button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

                    {/* Dropdown Menu */}
                    <div className="absolute left-0 top-full z-20 mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg">
                        <div className="p-2">
                            <div className="mb-2 text-sm font-medium text-gray-900">Add to Calendar</div>

                            <div className="space-y-1">
                                {/* Google Calendar */}
                                <button
                                    onClick={openGoogleCalendar}
                                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                                >
                                    <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-500">
                                        <Calendar className="h-3 w-3 text-white" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="font-medium">Google Calendar</div>
                                        <div className="text-xs text-gray-500">Open in Google Calendar</div>
                                    </div>
                                    <ExternalLink className="h-3 w-3 text-gray-400" />
                                </button>

                                {/* Download ICS */}
                                <button
                                    onClick={downloadICSFile}
                                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                                >
                                    <div className="flex h-6 w-6 items-center justify-center rounded bg-gray-500">
                                        <Download className="h-3 w-3 text-white" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="font-medium">Download ICS</div>
                                        <div className="text-xs text-gray-500">For Outlook, Apple Calendar, etc.</div>
                                    </div>
                                </button>
                            </div>

                            {/* Event Preview */}
                            <div className="mt-3 border-t border-gray-200 pt-3">
                                <div className="mb-1 text-xs text-gray-500">Event Preview:</div>
                                <div className="text-xs text-gray-700">
                                    <div className="font-medium">{event.title}</div>
                                    <div>
                                        {event.startDate.toLocaleDateString()} at {event.startDate.toLocaleTimeString()}
                                    </div>
                                    {event.location && <div>📍 {event.location}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
