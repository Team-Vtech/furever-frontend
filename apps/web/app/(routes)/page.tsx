"use client";

import { QuickActions } from "../featured/home/components/QuickActions";
import { UpcomingReminders } from "../featured/home/components/UpcomingReminders";
import { WelcomeSection } from "../featured/home/components/WelcomeSection";
import { MainLayout } from "../shared/components/MainLayout";

export default function HomePage() {
    return (
        <MainLayout>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="space-y-8">
                    <section id="welcome-section">
                        <WelcomeSection />
                    </section>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <section id="quick-actions-section" className="lg:col-span-1">
                            <h2 className="mb-6 text-xl font-semibold text-gray-900">Quick Actions</h2>
                            <QuickActions />
                        </section>

                        <section id="reminders-section" className="lg:col-span-2">
                            <h2 className="mb-6 text-xl font-semibold text-gray-900">Upcoming Reminders</h2>
                            <UpcomingReminders />
                        </section>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
