"use client";
import { MediaImage } from "@/app/shared/components/MediaImage";
import { useFilter } from "@/app/shared/hooks/useFilter";
import { ServiceType } from "@furever/types";
import { Skeleton } from "@furever/ui/components/skeleton";

export type ServiceTypesGridProps = {
    types: ServiceType[];
    isLoading: boolean;
};

export function ServiceTypesGrid({ types, isLoading }: ServiceTypesGridProps) {
    const { addFilter, getFilter, removeFilter } = useFilter();
    if (isLoading) {
        return (
            <div className="flex items-center justify-between gap-x-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className={`group flex h-full flex-1 animate-pulse flex-col items-center gap-y-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md`}
                    >
                        <Skeleton className="size-24" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                ))}
            </div>
        );
    }
    return (
        <div className="flex items-center justify-between gap-x-4">
            {types.map((type) => {
                return (
                    <div
                        onClick={() => {
                            if (getFilter("service_type") === String(type.id)) {
                                // Remove filter
                                removeFilter("service_type");
                            } else {
                                // Add filter
                                addFilter("service_type", String(type.id));
                            }
                        }}
                        key={type.id}
                        className={
                            `group flex h-full flex-1 flex-col items-center rounded-lg border p-4 transition-shadow hover:shadow-md ` +
                            (getFilter("service_type") === String(type.id) ? "border-purple-600 bg-purple-50" : "border-gray-200 bg-white")
                        }
                    >
                        <MediaImage
                            wrapperClassName={`relative mb-2 size-8 rounded-full p-3 transition-transform duration-200 group-hover:scale-110`}
                            mediaObject={type.media_object}
                            className="h-8 w-8 rounded-full"
                        />
                        <span className="text-center text-sm font-medium text-gray-700">{type.name}</span>
                    </div>
                );
            })}
        </div>
    );
}
