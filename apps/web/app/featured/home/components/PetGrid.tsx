import { PetCard } from "./PetCard";

const pets = [
    {
        id: 1,
        name: "Sheru",
        breed: "Golden Retriever",
        avatar: "/api/placeholder/72/72",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
    },
    {
        id: 2,
        name: "Munni",
        breed: "Siamese Cat",
        avatar: "/api/placeholder/72/72",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
    },
    {
        id: 3,
        name: "Raja",
        breed: "German Shepherd",
        avatar: "/api/placeholder/72/72",
        bgColor: "bg-pink-50",
        borderColor: "border-pink-200",
    },
    {
        id: 4,
        name: "Bella",
        breed: "Poodle",
        avatar: "/api/placeholder/72/72",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
    },
];

export function PetGrid() {
    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {pets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
            ))}
        </div>
    );
}
