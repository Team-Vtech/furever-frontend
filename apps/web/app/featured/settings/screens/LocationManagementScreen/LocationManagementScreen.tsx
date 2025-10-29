"use client";
import { UserSettingsLocation } from "@furever/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@furever/ui/components/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { LocationFormValues } from "../../../../(routes)/api/locations/locations.schema";
import { useCreateLocationMutation, useDeleteLocationMutation, useUpdateLocationMutation } from "../../hooks/use-locations-query";
import { LocationForm } from "./components/LocationForm";
import { LocationsList } from "./components/LocationsList";

interface LocationManagementScreenProps {
    locations: UserSettingsLocation[];
}
export default function LocationManagementScreen({ locations }: LocationManagementScreenProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingLocation, setEditingLocation] = useState<UserSettingsLocation | undefined>();

    // Mutations
    const { createLocation, isCreating } = useCreateLocationMutation();
    const { updateLocation, isUpdating } = useUpdateLocationMutation();
    const { deleteLocation, isDeleting } = useDeleteLocationMutation();

    const handleAdd = () => {
        setEditingLocation(undefined);
        setIsFormOpen(true);
    };

    const handleEdit = (location: UserSettingsLocation) => {
        setEditingLocation(location);
        setIsFormOpen(true);
    };

    const handleDelete = (locationId: number) => {
        deleteLocation(locationId);
    };

    const handleFormSubmit = (data: LocationFormValues) => {
        if (editingLocation) {
            updateLocation(
                { id: editingLocation.id, data },
                {
                    onSuccess: () => {
                        setIsFormOpen(false);
                        setEditingLocation(undefined);
                    },
                    onError: (error) => {
                        toast.error(error.response?.data?.message || "Failed to update location");
                    },
                },
            );
        } else {
            createLocation(data, {
                onSuccess: () => {
                    setIsFormOpen(false);
                },
                onError: (error) => {
                    toast.error(error.response?.data?.message || "Failed to create location");
                },
            });
        }
    };

    const handleFormCancel = () => {
        setIsFormOpen(false);
        setEditingLocation(undefined);
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <LocationsList
                locations={locations ?? []}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAdd={handleAdd}
                isLoading={false}
                isDeleting={isDeleting}
            />

            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingLocation ? "Edit Location" : "Add New Location"}</DialogTitle>
                    </DialogHeader>
                    <LocationForm
                        location={editingLocation}
                        onSubmit={handleFormSubmit}
                        onCancel={handleFormCancel}
                        isLoading={isCreating || isUpdating}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
