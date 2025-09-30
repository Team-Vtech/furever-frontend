"use client";

import { PetBreedFormValues, PetTypeFormValues } from "@/app/(routes)/api/pet-types/schema";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
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
            code: "",
        };
        append(newPetBreed);
    };

    const removePetBreed = (index: number) => {
        remove(index);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h3 className="text-lg font-semibold">Pet Breeds</h3>
                <p className="text-muted-foreground text-sm">Manage the breeds available for this pet type.</p>
            </div>

            {/* Pet Breeds List */}
            <div className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex flex-row items-center gap-x-2 space-y-4 rounded-lg border p-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            {/* Pet Breed Name */}
                            <div className="col-span-4 md:col-span-1">
                                <Label htmlFor={`pet_breeds.${index}.name`}>Name</Label>
                                <TextInput
                                    name={`pet_breeds.${index}.name`}
                                    control={control}
                                    placeholder="Enter pet breed name"
                                    className="w-full"
                                />
                                {errors.pet_breeds?.[index]?.name && (
                                    <p className="mt-1 text-sm text-red-500">{errors.pet_breeds[index]?.name?.message}</p>
                                )}
                            </div>
                            {/* Price */}
                            <div className="col-span-4 md:col-span-1">
                                <Label htmlFor={`pet_breeds.${index}.code`}>Code</Label>
                                <TextInput
                                    control={control}
                                    name={`pet_breeds.${index}.code`}
                                    placeholder="Enter pet breed code"
                                    className="w-full"
                                />
                                {errors.pet_breeds?.[index]?.code && (
                                    <p className="mt-1 text-sm text-red-500">{errors.pet_breeds[index]?.code?.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Remove Button */}
                        <div className="flex justify-end">
                            <Button type="button" variant="destructive" size="sm" onClick={() => removePetBreed(index)} className="h-8 w-8 p-0">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Pet Breed Button */}
            <div className="flex justify-center">
                <Button type="button" variant="outline" onClick={addNewPetBreed} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Pet Breed
                </Button>
            </div>
        </div>
    );
}
