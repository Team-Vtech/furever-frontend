import { UserSettingsLocation } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Plus } from "lucide-react";
import { LocationCard } from "./LocationCard";

export type LocationsListProps = {
  locations: UserSettingsLocation[];
  onEdit: (location: UserSettingsLocation) => void;
  onDelete: (locationId: number) => void;
  onAdd: () => void;
  isLoading?: boolean;
  isDeleting?: boolean;
};

export function LocationsList({ locations, onEdit, onDelete, onAdd, isLoading, isDeleting }: LocationsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-32"></div>
          </div>
        ))}
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Plus className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No locations yet</h3>
        <p className="text-gray-500 mb-4">
          Add your first location to book services and deliveries.
        </p>
        <Button onClick={onAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Your First Location
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Your Locations ({locations.length})</h2>
        <Button onClick={onAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Location
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {locations.map((location) => (
          <LocationCard
            key={location.id}
            location={location}
            onEdit={onEdit}
            onDelete={onDelete}
            isDeleting={isDeleting}
          />
        ))}
      </div>
    </div>
  );
}