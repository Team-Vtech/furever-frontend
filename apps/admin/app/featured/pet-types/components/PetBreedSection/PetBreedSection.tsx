"use client";

import { PetBreedFormValues, PetTypeFormValues } from "@/app/(routes)/api/pet-types/schema";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Button } from "@furever/ui/components/button";
import { Plus, Trash2 } from "lucide-react";
import { Control, useFieldArray, useFormContext } from "react-hook-form";

interface PetBreedSectionProps {
    control: Control<PetTypeFormValues>;
}

export function PetBreedSection({ control }: PetBreedSectionProps) {
    const { formState } = useFormContext<PetTypeFormValues>();
    const { errors } = formState;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "pet_breeds",
    });

    const addNewPetBreed = () => {
        const newPetBreed: PetBreedFormValues = {
            name: "",
        };
        append(newPetBreed);
    };

    const removePetBreed = (index: number) => {
        remove(index);
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div>
                <h3 className="text-lg font-semibold">Pet Breeds</h3>
                <p className="text-muted-foreground text-sm">Manage the breeds available for this pet type.</p>
            </div>

            {/* Pet Breeds List */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-end gap-2 rounded-md border p-3">
                        {/* Pet Breed Name */}
                        <div className="min-w-0 flex-1">
                            <TextInput
                                label="Name"
                                required
                                name={`pet_breeds.${index}.name`}
                                control={control}
                                placeholder="Enter breed name"
                                className="w-full"
                            />
                        </div>

                        {/* Remove Button */}
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removePetBreed(index)}
                            className="h-8 w-8 flex-shrink-0 p-0"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>

            {/* Add Pet Breed Button */}
            <div className="flex justify-start">
                <Button type="button" variant="outline" onClick={addNewPetBreed} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Pet Breed
                </Button>
            </div>
        </div>
    );
}
