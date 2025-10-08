import { Pet } from "@furever/types";
import { PetCard } from "./PetCard";
import { Button } from "@furever/ui/components/button";
import { Plus } from "lucide-react";

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
            <div className="bg-gray-200 rounded-lg h-24"></div>
          </div>
        ))}
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Plus className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No pets yet</h3>
        <p className="text-gray-500 mb-4">
          Add your first pet to get started with booking services.
        </p>
        <Button onClick={onAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Your First Pet
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Your Pets ({pets.length})</h2>
        <Button onClick={onAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Pet
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pets.map((pet) => (
          <PetCard
            key={pet.id}
            pet={pet}
            onEdit={onEdit}
            onDelete={onDelete}
            isDeleting={isDeleting}
          />
        ))}
      </div>
    </div>
  );
}