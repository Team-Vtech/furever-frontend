"use client";

import { Skeleton } from "@furever/ui/components/skeleton";
import { useBookingsList, useBookingsTab } from "../hooks/useBookingsList";
import { BookingCard } from "./BookingCard";

export function BookingsList() {
    const { activeTab } = useBookingsTab();
    const { data, isLoading, isError } = useBookingsList();

    // Loading state
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-3 w-1/2" />
                                <Skeleton className="h-3 w-2/3" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                    <svg className="h-8 w-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">Error loading bookings</h3>
                <p className="mb-4 text-gray-600">There was an error loading your bookings. Please try again.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="rounded-md bg-purple-600 px-6 py-2 text-white transition-colors hover:bg-purple-700"
                >
                    Try Again
                </button>
            </div>
        );
    }
    console.log(data);

    return (
        <div className="space-y-6">
            {/* Bookings Count */}
            {data?.bookings && data.bookings.length > 0 && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        {data.bookings.length} {activeTab} booking{data.bookings.length !== 1 ? "s" : ""}
                    </p>
                </div>
            )}

            {/* Bookings Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {data?.bookings?.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                ))}
            </div>

            {/* Empty State */}
            {data?.bookings && data.bookings.length === 0 && (
                <div className="py-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                        <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-gray-900">No bookings found</h3>
                    <p className="mb-4 text-gray-600">You don&apos;t have any bookings yet.</p>
                    <button className="rounded-md bg-purple-600 px-6 py-2 text-white transition-colors hover:bg-purple-700">Book a Service</button>
                </div>
            )}
        </div>
    );
}
