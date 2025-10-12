"use client";
import { DeleteRecordDialog } from "@/app/shared/components/DeleteRecordDialog/DeleteRecordDialog";
import { Pet } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Card } from "@furever/ui/components/card";
import { Edit } from "lucide-react";
import Image from "next/image";

export type PetCardProps = {
    pet: Pet;
    onEdit: (pet: Pet) => void;
    onDelete: (petId: number) => void;
    isDeleting?: boolean;
};

export function PetCard({ pet, onEdit, onDelete, isDeleting = false }: PetCardProps) {
    const profileImageUrl = pet.media_object?.file_path
        ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${pet.media_object.file_path}`
        : "/images/default-pet.jpg";

    const calculateAge = (birthDate: string) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    };

    return (
        <Card className="p-4 transition-shadow hover:shadow-lg">
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full">
                        <Image src={profileImageUrl} alt={pet.name} fill className="object-cover" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{pet.name}</h3>
                        <p className="text-sm text-gray-600">
                            {pet.pet_type?.name} • {pet.gender}
                        </p>
                        <p className="text-sm text-gray-500">
                            {calculateAge(pet.date_of_birth)} years old • {pet.weight}kg
                        </p>
                        <p className="text-sm text-gray-500">Vaccination: {pet.vaccination_status}</p>
                    </div>
                </div>
                <div className="flex items-center gap-x-2">
                    <Button variant="outline" onClick={() => onEdit(pet)}>
                        <Edit className="h-6 w-6" />
                    </Button>
                    <DeleteRecordDialog recordName={pet.name} recordId={pet.id} onDelete={onDelete} isDeleting={isDeleting} triggerText="" />
                </div>
            </div>
            {pet.notes && (
                <div className="mt-3 border-t border-gray-100 pt-3">
                    <p className="text-sm text-gray-600">{pet.notes}</p>
                </div>
            )}
        </Card>
    );
}
