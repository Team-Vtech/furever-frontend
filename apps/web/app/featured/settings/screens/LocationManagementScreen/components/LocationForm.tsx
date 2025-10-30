"use client";
import { getLocationDefaultValues, LocationFormValues, locationSchema } from "@/app/(routes)/api/locations/locations.schema";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { UserSettingsLocation } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Input } from "@furever/ui/components/input";
import { Label } from "@furever/ui/components/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin } from "lucide-react";
import { useForm } from "react-hook-form";

export type LocationFormProps = {
    location?: UserSettingsLocation;
    onSubmit: (data: LocationFormValues) => void;
    onCancel: () => void;
    isLoading?: boolean;
};

export function LocationForm({ location, onSubmit, onCancel, isLoading }: LocationFormProps) {
    const defaultValues = getLocationDefaultValues(location);

    const { handleSubmit, control, setValue, watch } = useForm<LocationFormValues>({
        resolver: zodResolver(locationSchema),
        defaultValues,
    });

    const watchedIsDefault = watch("is_default");

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setValue("latitude", position.coords.latitude.toString());
                    setValue("longitude", position.coords.longitude.toString());
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("Unable to get your current location. Please enter coordinates manually.");
                },
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextInput control={control} name="title" label="Location Title *" placeholder="e.g., Home, Office, Apartment" />

            <TextInput control={control} name="street" label="Street Address *" placeholder="Enter your street address" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextInput control={control} name="area" label="Area/Neighborhood *" placeholder="e.g., Koramangala, Indiranagar" />
                <TextInput control={control} name="city" label="City *" placeholder="Enter city name" />
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-gray-700">GPS Coordinates</Label>
                    <Button type="button" variant="outline" size="sm" onClick={getCurrentLocation} className="text-xs">
                        <MapPin className="mr-1 h-3 w-3" />
                        Use Current Location
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <TextInput control={control} name="latitude" label="Latitude *" type="number" placeholder="e.g., 40.7128" />

                    <TextInput control={control} name="longitude" label="Longitude *" type="number" placeholder="e.g., -74.0060" />
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <Input
                    id="is_default"
                    type="checkbox"
                    checked={watchedIsDefault}
                    onChange={(e) => setValue("is_default", e.target.checked)}
                    className="h-4 w-4"
                />
                <Label htmlFor="is_default" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Set as default location
                </Label>
            </div>

            {watchedIsDefault && (
                <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
                    <p className="text-sm text-blue-800">
                        ⭐ This location will be set as your default address and will be selected automatically for new services.
                    </p>
                </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? (location ? "Updating..." : "Creating...") : location ? "Update Location" : "Create Location"}
                </Button>
            </div>
        </form>
    );
}
