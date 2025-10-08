"use client";
import { Pagination as PaginationMeta, Provider } from "@furever/types";
import { Pagination } from "@furever/ui/components/pagination";
import { Search } from "lucide-react";
import { usePaginationWithSearchParams } from "../../../../shared/hooks/use-pagination-with-search-params";
import { ProviderCard } from "../ProviderCard/ProviderCard";

export type ProvidersListProps = {
    providers: Provider[];
    pagination?: PaginationMeta;
    isLoading?: boolean;
};

export function ProvidersList({ providers, pagination, isLoading }: ProvidersListProps) {
    const { currentPage, setPage } = usePaginationWithSearchParams({
        defaultPage: 1,
        defaultPerPage: 10,
    });
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                        <div className="h-[578px] rounded-lg bg-gray-200"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (providers.length === 0) {
        return (
            <div className="py-16 text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                    <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="mb-2 text-xl font-medium text-gray-900">No providers found</h3>
                <p className="mx-auto mb-6 max-w-md text-gray-500">
                    We couldn't find any providers matching your search criteria. Try adjusting your filters or search terms.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8 mb-10">
            {/* Providers Grid */}
            <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {providers.map((provider) => (
                    <ProviderCard key={provider.id} provider={provider} />
                ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.last_page > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={pagination.last_page}
                    onPageChange={setPage}
                    disabled={isLoading}
                    className="w-full"
                />
            )}
        </div>
    );
}
