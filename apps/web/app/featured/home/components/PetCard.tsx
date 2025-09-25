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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex flex-col items-center space-y-3">
        {/* Pet Avatar */}
        <div
          className={`w-20 h-20 rounded-full ${pet.bgColor} ${pet.borderColor} border-2 flex items-center justify-center overflow-hidden`}
        >
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </div>
        </div>

        {/* Pet Info */}
        <div className="text-center space-y-1">
          <h3 className="font-semibold text-gray-900 font-nunito text-lg">
            {pet.name}
          </h3>
          <p className="text-sm text-gray-500 font-nunito">{pet.breed}</p>
        </div>
      </div>
    </div>
  );
}
