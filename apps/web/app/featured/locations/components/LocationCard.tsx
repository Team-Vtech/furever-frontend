'use client'
import { UserSettingsLocation } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Card } from "@furever/ui/components/card";
import { Badge } from "@furever/ui/components/badge";
import { DeleteRecordDialog } from "@/app/shared/components/DeleteRecordDialog/DeleteRecordDialog";
import { Edit, MapPin, Star } from "lucide-react";

export type LocationCardProps = {
  location: UserSettingsLocation;
  onEdit: (location: UserSettingsLocation) => void;
  onDelete: (locationId: number) => void;
  isDeleting?: boolean;
};

export function LocationCard({ location, onEdit, onDelete, isDeleting = false }: LocationCardProps) {

  const formatAddress = () => {
    return `${location.street}, ${location.area}, ${location.city}`;
  };

  const handleViewOnMap = () => {
    const mapUrl = `https://www.google.com/maps/@${location.gps_coordinates.latitude},${location.gps_coordinates.longitude},15z`;
    window.open(mapUrl, '_blank');
  };

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{location.title}</h3>
            {location.is_default && (
              <Badge variant="default" className="text-xs">
                <Star className="mr-1 h-3 w-3" />
                Default
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-2">
            {formatAddress()}
          </p>
          <div className="flex items-center text-xs text-gray-500 mb-3">
            <MapPin className="h-3 w-3 mr-1" />
            {location.gps_coordinates.latitude.toFixed(4)}, {location.gps_coordinates.longitude.toFixed(4)}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewOnMap}
            className="text-xs"
          >
            <MapPin className="h-3 w-3 mr-1" />
            View on Map
          </Button>
        </div>
        <div className="flex items-center gap-x-2">
          <Button
            variant="outline"
            onClick={() => onEdit(location)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          {!location.is_default && (
            <DeleteRecordDialog
              recordName={location.title}
              recordId={location.id}
              onDelete={onDelete}
              isDeleting={isDeleting}
              triggerText=""
            />
          )}
        </div>
      </div>
    </Card>
  );
}