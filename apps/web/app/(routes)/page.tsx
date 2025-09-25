"use client";

import { PetGrid } from "../featured/home/components/PetGrid";
import { QuickActions } from "../featured/home/components/QuickActions";
import { UpcomingReminders } from "../featured/home/components/UpcomingReminders";
import { WelcomeSection } from "../featured/home/components/WelcomeSection";
import { BottomNavigation } from "../featured/bookings/components/BottomNavigation";

export default function HomePage() {
  return (
    <div id="page-layout" className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Section */}
      <header
        id="page-header"
        className="flex-shrink-0 bg-white shadow-sm border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Furever</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Bell notification icon */}
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-5 5v-5zM9 7V5a2 2 0 012-2h0a2 2 0 012 2v2m-6 4a2 2 0 002 2h8a2 2 0 002-2V9a2 2 0 00-2-2H7a2 2 0 00-2 2v2z"
                  />
                </svg>
              </button>
              {/* User avatar */}
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-purple-700">P</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="page-content" className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Welcome Section */}
            <section id="welcome-section">
              <WelcomeSection />
            </section>

            {/* Your Furry Friends */}
            <section id="pets-section">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Your Furry Friends
              </h2>
              <PetGrid />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Quick Actions */}
              <section id="quick-actions-section" className="lg:col-span-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Quick Actions
                </h2>
                <QuickActions />
              </section>

              {/* Upcoming Reminders */}
              <section id="reminders-section" className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Upcoming Reminders
                </h2>
                <UpcomingReminders />
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav id="bottom-navigation" className="flex-shrink-0">
        <BottomNavigation />
      </nav>
    </div>
  );
}
