"use client";
import { Pet } from "@furever/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@furever/ui/components/dialog";
import { useEffect, useState } from "react";
import { PetForm } from "../../components/PetForm";
import { PetsList } from "../../components/PetsList";
import { useCreatePetMutation, useDeletePetMutation, useUpdatePetMutation } from "../../hooks/usePets";
import { PetFormValues } from "../../schemas/pet.schema";

interface PetManagementScreenProps {
    pets: Pet[];
}

export default function PetManagementScreen({ pets }: PetManagementScreenProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPet, setEditingPet] = useState<Pet | undefined>();

    const { createPet, isCreating } = useCreatePetMutation();
    const { updatePet, isUpdating } = useUpdatePetMutation();
    const { deletePet, isDeleting } = useDeletePetMutation();

    const handleAdd = () => {
        setEditingPet(undefined);
        setIsFormOpen(true);
    };

    const handleEdit = (pet: Pet) => {
        setEditingPet(pet);
        setIsFormOpen(true);
    };

    const handleDelete = (petId: number) => {
        deletePet(petId);
    };

    const handleFormSubmit = (data: PetFormValues) => {
        if (editingPet) {
            updatePet({ id: editingPet.id, data });
        } else {
            createPet(data);
        }
        setIsFormOpen(false);
        setEditingPet(undefined);
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

            <PetsList pets={pets ?? []} onEdit={handleEdit} onDelete={handleDelete} onAdd={handleAdd} isLoading={false} isDeleting={isDeleting} />

            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingPet ? "Edit Pet" : "Add New Pet"}</DialogTitle>
                    </DialogHeader>
                    <PetForm pet={editingPet} onSubmit={handleFormSubmit} onCancel={handleFormCancel} isLoading={isCreating || isUpdating} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
