interface Pet {
    id: number;
    name: string;
    breed: string;
    avatar: string;
    bgColor: string;
    borderColor: string;
}

interface PetCardProps {
    pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {
    return (
        <div className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex flex-col items-center space-y-3">
                {/* Pet Avatar */}
                <div className={`h-20 w-20 rounded-full ${pet.bgColor} ${pet.borderColor} flex items-center justify-center overflow-hidden border-2`}>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                        <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                        </svg>
                    </div>
                </div>

                {/* Pet Info */}
                <div className="space-y-1 text-center">
                    <h3 className="font-nunito text-lg font-semibold text-gray-900">{pet.name}</h3>
                    <p className="font-nunito text-sm text-gray-500">{pet.breed}</p>
                </div>
            </div>
        </div>
    );
}
