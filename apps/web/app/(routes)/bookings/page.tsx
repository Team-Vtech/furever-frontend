import { Metadata } from "next";
import { Suspense } from "react";
import { BookingsList } from "../../featured/bookings/components/BookingsList";
import { BookingsTabs } from "../../featured/bookings/components/BookingsTabs";
import { MainLayout } from "../../shared/components/MainLayout";

export const metadata: Metadata = {
    title: "My Bookings | Furever",
    description: "View and manage your pet care service bookings. Track upcoming appointments and review past services.",
};

export default function BookingsPage() {
    return (
        <Suspense>
            <MainLayout>
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
            </MainLayout>
        </Suspense>
    );
}
