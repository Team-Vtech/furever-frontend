import { BookingCard } from "./BookingCard";

// Mock data based on the Figma design
const mockBookings = [
    {
        id: "1",
        serviceName: "Full Grooming Deluxe",
        providerName: "Pawsome Pet Spa",
        petName: "Sheru",
        petBreed: "Golden Retriever",
        date: "Wednesday, May 15, 2024",
        time: "10:00 AM",
        status: "upcoming" as const,
        providerAvatar: "",
        providerColor: "#4AC9BC",
    },
    {
        id: "2",
        serviceName: "Routine Vet Checkup",
        providerName: "VetCare Clinic",
        petName: "Munni",
        petBreed: "Siamese Cat",
        date: "Friday, May 17, 2024",
        time: "02:30 PM",
        status: "upcoming" as const,
        providerAvatar: "",
        providerColor: "#F2EC36",
    },
    {
        id: "3",
        serviceName: "Puppy Training Session",
        providerName: "SmartPaws Trainers",
        petName: "Raja",
        petBreed: "Beagle",
        date: "Saturday, May 18, 2024",
        time: "11:00 AM",
        status: "upcoming" as const,
        providerAvatar: "",
        providerColor: "#9727EC",
    },
];

export function BookingsList() {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {mockBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
            ))}

            {/* Empty State */}
            {mockBookings.length === 0 && (
                <div className="py-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                        <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-gray-900">No bookings found</h3>
                    <p className="mb-4 text-gray-600">You don&apos;t have any bookings yet.</p>
                    <button className="rounded-md bg-purple-600 px-6 py-2 text-white transition-colors hover:bg-purple-700">Book a Service</button>
                </div>
            )}
        </div>
    );
}
