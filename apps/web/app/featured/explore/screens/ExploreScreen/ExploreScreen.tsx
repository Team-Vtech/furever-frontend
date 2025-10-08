"use client";
import { ExploreFilters } from "../../components/FilterDropdowns";
import { HeroBanner } from "../../components/HeroBanner/HeroBanner";
import { ProvidersList } from "../../components/ProvidersList/ProvidersList";
import { ServiceTypesGrid } from "../../components/ServiceTypesGrid";
import { useExploreFilter } from "../../hooks/use-filters-query";
import { useProvidersQuery } from "../../hooks/useProviders";

export function ExploreScreen() {
    const { filters } = useExploreFilter();

    const { isLoading: providersLoading, data } = useProvidersQuery();

    return (
        <div>
            {/* Hero Banner */}
            <HeroBanner />

            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-6xl">
                    <div className="px-4 lg:px-6 xl:px-8">
                        {/* Explore Filters */}
                        <section id="filters-section" className="py-8">
                            <ExploreFilters filters={filters} />
                        </section>

                        {/* Browse by Category */}
                        <section id="categories-section" className="mt-8 lg:mt-12">
                            <h2 className="mb-6 text-xl font-bold text-gray-900 lg:text-2xl">Browse by Category</h2>
                            <ServiceTypesGrid types={filters?.service_types ?? []} />
                        </section>

                        {/* Providers Section */}
                        <section id="providers-section" className="mt-12 lg:mt-16">
                            <div className="mb-8">
                                <h2 className="mb-2 text-xl font-bold text-gray-900 lg:text-2xl">Find Providers</h2>
                                <p className="text-gray-600">Discover trusted pet care providers in your area</p>
                            </div>

                            <ProvidersList providers={data?.providers ?? []} isLoading={providersLoading} pagination={data?.pagination} />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
