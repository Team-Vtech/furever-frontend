"use client";

import { BookingsHeader } from "../../featured/bookings/components/BookingsHeader";
import { BookingsTabs } from "../../featured/bookings/components/BookingsTabs";
import { BookingsList } from "../../featured/bookings/components/BookingsList";
import { BottomNavigation } from "../../featured/bookings/components/BottomNavigation";

export default function BookingsPage() {
  return (
    <div id="page-layout" className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Section */}
      <header id="page-header" className="flex-shrink-0">
        <BookingsHeader />
      </header>

      {/* Main Content Area */}
      <main id="page-content" className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-6xl mx-auto">
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
      <nav id="bottom-navigation" className="flex-shrink-0 block lg:hidden">
        <BottomNavigation />
      </nav>
    </div>
  );
}
