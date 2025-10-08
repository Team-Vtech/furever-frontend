"use client";
import { MediaImage } from "@/app/shared/components/MediaImage";
import { useFilter } from "@/app/shared/hooks/useFilter";
import { ServiceType } from "@furever/types";

export type ServiceTypesGridProps = {
    types: ServiceType[];
};

export function ServiceTypesGrid({ types }: ServiceTypesGridProps) {
    const { addFilter, getFilter } = useFilter();
    return (
        <div className="flex items-center justify-between gap-x-4">
            {types.map((type) => {
                return (
                    <div
                        onClick={() => addFilter("service_type", String(type.id))}
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
