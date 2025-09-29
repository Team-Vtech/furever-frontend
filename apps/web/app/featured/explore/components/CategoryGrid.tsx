import { Bone, Calendar, Car, Footprints, Heart, Home, PawPrint } from "lucide-react";

const categories = [
    {
        id: 1,
        name: "Grooming",
        icon: PawPrint,
        color: "bg-purple-100 text-purple-600",
    },
    {
        id: 2,
        name: "Vet Visit",
        icon: Calendar,
        color: "bg-blue-100 text-blue-600",
    },
    {
        id: 3,
        name: "Training",
        icon: Bone,
        color: "bg-orange-100 text-orange-600",
    },
    {
        id: 4,
        name: "Boarding",
        icon: Home,
        color: "bg-green-100 text-green-600",
    },
    {
        id: 5,
        name: "Pet Taxi",
        icon: Car,
        color: "bg-yellow-100 text-yellow-600",
    },
    {
        id: 6,
        name: "Pet Sitting",
        icon: Heart,
        color: "bg-pink-100 text-pink-600",
    },
    {
        id: 7,
        name: "Dog Walking",
        icon: Footprints,
        color: "bg-indigo-100 text-indigo-600",
    },
];

export function CategoryGrid() {
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                    <button
                        key={category.id}
                        className="group flex flex-col items-center rounded-2xl border border-gray-200 bg-gray-50 p-4 transition-all duration-200 hover:bg-gray-100 hover:shadow-sm"
                    >
                        <div className={`rounded-full p-3 ${category.color} mb-2 transition-transform duration-200 group-hover:scale-110`}>
                            <IconComponent size={16} />
                        </div>
                        <span className="text-center text-sm font-medium text-gray-700">{category.name}</span>
                    </button>
                );
            })}
        </div>
    );
}
