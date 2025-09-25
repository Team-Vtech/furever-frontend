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
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {mockBookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}

      {/* Empty State */}
      {mockBookings.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No bookings found
          </h3>
          <p className="text-gray-600 mb-4">You don't have any bookings yet.</p>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors">
            Book a Service
          </button>
        </div>
      )}
    </div>
  );
}
