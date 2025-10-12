import { Pet } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Plus } from "lucide-react";
import { PetCard } from "./PetCard";

export type PetsListProps = {
    pets: Pet[];
    onEdit: (pet: Pet) => void;
    onDelete: (petId: number) => void;
    onAdd: () => void;
    isLoading?: boolean;
    isDeleting?: boolean;
};

export function PetsList({ pets, onEdit, onDelete, onAdd, isLoading, isDeleting }: PetsListProps) {
    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                        <div className="h-24 rounded-lg bg-gray-200"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (pets.length === 0) {
        return (
            <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                    <Plus className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">No pets yet</h3>
                <p className="mb-4 text-gray-500">Add your first pet to get started with booking services.</p>
                <Button onClick={onAdd}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Pet
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Your Pets ({pets.length})</h2>
                <Button onClick={onAdd}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Pet
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pets.map((pet) => (
                    <PetCard key={pet.id} pet={pet} onEdit={onEdit} onDelete={onDelete} isDeleting={isDeleting} />
                ))}
            </div>
        </div>
    );
}
