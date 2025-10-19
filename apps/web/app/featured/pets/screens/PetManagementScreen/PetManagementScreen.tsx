"use client";
import { Pet } from "@furever/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@furever/ui/components/dialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PetForm } from "../../components/PetForm";
import { PetsList } from "../../components/PetsList";
import { useCreatePetMutation, useDeletePetMutation, usePetsQuery, useUpdatePetMutation } from "../../hooks/usePets";
import { PetFormValues } from "../../schemas/pet.schema";

export default function PetManagementScreen() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPet, setEditingPet] = useState<Pet | undefined>();

    const { data: pets, isLoading: petsLoading } = usePetsQuery();

    // Mutations
    const createPetMutation = useCreatePetMutation();
    const updatePetMutation = useUpdatePetMutation();
    const deletePetMutation = useDeletePetMutation();

    const handleAdd = () => {
        setEditingPet(undefined);
        setIsFormOpen(true);
    };

    const handleEdit = (pet: Pet) => {
        setEditingPet(pet);
        setIsFormOpen(true);
    };

    const handleDelete = (petId: number) => {
        deletePetMutation.mutate(petId);
    };

    const handleFormSubmit = (data: PetFormValues) => {
        if (editingPet) {
            updatePetMutation.mutate(
                { id: editingPet.id, data },
                {
                    onSuccess: () => {
                        setIsFormOpen(false);
                        setEditingPet(undefined);
                    },
                    onError: (error: any) => {
                        toast.error(error.response?.data?.message || "Failed to update pet");
                    },
                },
            );
        } else {
            createPetMutation.mutate(data, {
                onSuccess: () => {
                    setIsFormOpen(false);
                },
                onError: (error: any) => {
                    toast.error(error.response?.data?.message || "Failed to create pet");
                },
            });
        }
    };

    const handleFormCancel = () => {
        setIsFormOpen(false);
        setEditingPet(undefined);
    };


    // if the url has a #create-pet, open the form
    useEffect(() => {
        if (window.location.hash === "#create-pet") {
            setIsFormOpen(true);
        }
    }, [window.location.hash]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">My Pets</h1>
                <p className="mt-2 text-gray-600">Manage your pets to book services and track their care.</p>
            </div>

            <PetsList
                pets={pets ?? []}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAdd={handleAdd}
                isLoading={petsLoading}
                isDeleting={deletePetMutation.isPending}
            />

            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingPet ? "Edit Pet" : "Add New Pet"}</DialogTitle>
                    </DialogHeader>
                    <PetForm
                        pet={editingPet}
                        onSubmit={handleFormSubmit}
                        onCancel={handleFormCancel}
                        isLoading={createPetMutation.isPending || updatePetMutation.isPending}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
