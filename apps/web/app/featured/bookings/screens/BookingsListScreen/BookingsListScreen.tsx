"use client";

import { BookingsHeader } from "../../components/BookingsHeader";
import { BookingsList } from "../../components/BookingsList";
import { BookingsTabs } from "../../components/BookingsTabs";

export function BookingsListScreen() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <BookingsHeader />

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl space-y-8">
                    {/* Tabs Section */}
                    <section id="bookings-tabs-section">
                        <BookingsTabs />
                    </section>

                    {/* Bookings List Section */}
                    <section id="bookings-list-section">
                        <BookingsList />
                    </section>
                </div>
            </div>
        </div>
    );
}
