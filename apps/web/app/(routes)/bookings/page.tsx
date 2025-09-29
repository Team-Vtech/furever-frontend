"use client";

import { BookingsHeader } from "../../featured/bookings/components/BookingsHeader";
import { BookingsList } from "../../featured/bookings/components/BookingsList";
import { BookingsTabs } from "../../featured/bookings/components/BookingsTabs";
import { BottomNavigation } from "../../featured/bookings/components/BottomNavigation";

export default function BookingsPage() {
    return (
        <div id="page-layout" className="flex min-h-screen flex-col bg-gray-50">
            {/* Header Section */}
            <header id="page-header" className="flex-shrink-0">
                <BookingsHeader />
            </header>

            {/* Main Content Area */}
            <main id="page-content" className="flex-1 overflow-auto">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        {/* Tabs Section */}
                        <section id="bookings-tabs-section" className="mb-6">
                            <BookingsTabs />
                        </section>

                        {/* Bookings List Section */}
                        <section id="bookings-list-section">
                            <BookingsList />
                        </section>
                    </div>
                </div>
            </main>

            {/* Bottom Navigation */}
            <nav id="bottom-navigation" className="block flex-shrink-0 lg:hidden">
                <BottomNavigation />
            </nav>
        </div>
    );
}
