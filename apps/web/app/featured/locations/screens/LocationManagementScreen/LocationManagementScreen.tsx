"use client";
import { UserSettingsLocation } from "@furever/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@furever/ui/components/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { LocationFormValues } from "../../../../(routes)/api/locations/locations.schema";
import { LocationForm } from "../../../locations/components/LocationForm";
import { LocationsList } from "../../../locations/components/LocationsList";
import {
    useCreateLocationMutation,
    useDeleteLocationMutation,
    useLocationsQuery,
    useUpdateLocationMutation,
} from "../../../settings/hooks/use-locations-query";

export default function LocationManagementScreen() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingLocation, setEditingLocation] = useState<UserSettingsLocation | undefined>();

    const { data, isLoading: locationsLoading } = useLocationsQuery();

    // Mutations
    const createLocationMutation = useCreateLocationMutation();
    const updateLocationMutation = useUpdateLocationMutation();
    const deleteLocationMutation = useDeleteLocationMutation();

    const handleAdd = () => {
        setEditingLocation(undefined);
        setIsFormOpen(true);
    };

    const handleEdit = (location: UserSettingsLocation) => {
        setEditingLocation(location);
        setIsFormOpen(true);
    };

    const handleDelete = (locationId: number) => {
        deleteLocationMutation.mutate(locationId);
    };

    const handleFormSubmit = (data: LocationFormValues) => {
        if (editingLocation) {
            updateLocationMutation.mutate(
                { id: editingLocation.id, data },
                {
                    onSuccess: () => {
                        setIsFormOpen(false);
                        setEditingLocation(undefined);
                    },
                    onError: (error: any) => {
                        toast.error(error.response?.data?.message || "Failed to update location");
                    },
                },
            );
        } else {
            createLocationMutation.mutate(data, {
                onSuccess: () => {
                    setIsFormOpen(false);
                },
                onError: (error: any) => {
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
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">My Locations</h1>
                <p className="mt-2 text-gray-600">Manage your addresses for pet care services and deliveries.</p>
            </div>

            <LocationsList
                locations={data ?? []}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAdd={handleAdd}
                isLoading={locationsLoading}
                isDeleting={deleteLocationMutation.isPending}
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
                        isLoading={createLocationMutation.isPending || updateLocationMutation.isPending}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
