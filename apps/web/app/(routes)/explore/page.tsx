"use client";
import { FilterDropdowns } from "../../featured/explore/components/FilterDropdowns";
import { CategoryGrid } from "../../featured/explore/components/CategoryGrid";
import { PopularServices } from "../../featured/explore/components/PopularServices";
import { BottomNavigation } from "../../featured/bookings/components/BottomNavigation";

export default function ExplorePage() {
  return (
    <div id="page-layout" className="min-h-screen bg-white flex flex-col">
      {/* Header Section */}

      {/* Main Content Area */}
      <main id="page-content" className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="px-4 lg:px-6 xl:px-8">
              {/* Filter Dropdowns */}
              <section id="filters-section">
                <FilterDropdowns />
              </section>

              {/* Browse by Category */}
              <section id="categories-section" className="mt-8 lg:mt-12">
                <h2 className="text-xl font-bold text-gray-900 mb-6 lg:text-2xl">
                  Browse by Category
                </h2>
                <CategoryGrid />
              </section>

              {/* Popular Services */}
              <section
                id="popular-services-section"
                className="mt-8 lg:mt-12 pb-20 lg:pb-8"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6 lg:text-2xl">
                  Popular Services
                </h2>
                <PopularServices />
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
