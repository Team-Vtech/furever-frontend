"use client";

import { Booking } from "@furever/types";
import { Card, CardContent, CardHeader, CardTitle } from "@furever/ui/components/card";
import { format } from "date-fns";
import { Heart } from "lucide-react";

interface PetInformationCardProps {
    pet: Booking["pet"];
}

export function PetInformationCard({ pet }: PetInformationCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-pink-600" />
                    Pet Information
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="text-sm font-medium text-gray-600">Pet Name</label>
                        <p className="text-sm text-gray-900">{pet.name}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600">Breed</label>
                        <p className="text-sm text-gray-900">{pet.pet_breed?.name || "Mixed"}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600">Gender</label>
                        <p className="text-sm capitalize text-gray-900">{pet.gender}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600">Weight</label>
                        <p className="text-sm text-gray-900">{pet.weight} kg</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                        <p className="text-sm text-gray-900">
                            {pet.date_of_birth ? format(new Date(pet.date_of_birth), "MMM d, yyyy") : "Not specified"}
                        </p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600">Vaccination Status</label>
                        <p className="text-sm capitalize text-gray-900">{pet.vaccination_status}</p>
                    </div>
                </div>

                {pet.notes && (
                    <div>
                        <label className="text-sm font-medium text-gray-600">Pet Notes</label>
                        <p className="mt-1 rounded-lg bg-gray-50 p-3 text-sm text-gray-900">{pet.notes}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
