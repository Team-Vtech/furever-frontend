import { Booking } from "@furever/types";
import { format } from "date-fns";

interface BookingCardProps {
    booking: Booking;
}

// Helper function to generate a color from provider name
function generateProviderColor(name: string): string {
    const colors = ["#4AC9BC", "#F2EC36", "#9727EC", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length] || "#4AC9BC";
}

export function BookingCard({ booking }: BookingCardProps) {
    const providerColor = generateProviderColor(booking.provider.business_name);

    const getStatusColor = (status: Booking["status"]) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "confirmed":
                return "bg-blue-100 text-blue-800";
            case "in_progress":
                return "bg-purple-100 text-purple-800";
            case "completed":
                return "bg-green-100 text-green-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const formatDate = (dateStr: string) => {
        return format(new Date(dateStr), "EEEE, MMMM d, yyyy");
    };

    const formatTime = (timeStr: string) => {
        const [hours = "0", minutes = "0"] = timeStr.split(":");
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return format(date, "h:mm a");
    };

    const isPending = booking.status === "pending";
    const isConfirmed = booking.status === "confirmed";
    const isCompleted = booking.status === "completed";
    const isCancelled = booking.status === "cancelled";
    const isInProgress = booking.status === "in_progress";

    return (
        <div className="h-fit rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                    <h3 className="font-nunito mb-1 text-lg font-semibold text-gray-900">{booking.service.name}</h3>
                    <p className="font-nunito text-sm text-gray-600">{booking.provider.business_name}</p>
                </div>

                {/* Provider Avatar */}
                <div
                    className={`ml-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2`}
                    style={{
                        backgroundColor: providerColor + "20",
                        borderColor: providerColor,
                    }}
                >
                    <div
                        className="flex h-full w-full items-center justify-center rounded-full text-lg font-semibold text-white"
                        style={{ backgroundColor: providerColor }}
                    >
                        {booking.provider.business_name.charAt(0)}
                    </div>
                </div>
            </div>

            {/* Pet Info */}
            <div className="mb-4 rounded-lg bg-gray-50 p-3">
                <p className="font-nunito text-sm text-gray-600">
                    Pet: {booking.pet.name} ({booking.pet.pet_breed?.name || "Mixed"})
                </p>
            </div>

            {/* Status Badge */}
            <div className="mb-4 flex items-center justify-between">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1).replace("_", " ")}
                </span>
            </div>

            {/* Date and Time */}
            <div className="mb-4 flex items-center text-gray-600">
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
                <span className="font-nunito text-sm">
                    {formatDate(booking.booking_date)} • {formatTime(booking.booking_time)}
                </span>
            </div>

            {/* Price Info */}
            <div className="mb-6 flex items-center justify-between rounded-lg bg-purple-50 p-3">
                <span className="text-sm font-medium text-gray-600">Total Price:</span>
                <span className="text-lg font-semibold text-purple-600">${booking.total_price}</span>
            </div>

            {/* Action Buttons */}
            {(isConfirmed || isPending || isInProgress) && (
                <div className="flex flex-col gap-2 sm:flex-row">
                    <button className="flex flex-1 items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700">
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                        View Details
                    </button>

                    {(isConfirmed || isPending) && (
                        <button className="flex flex-1 items-center justify-center rounded-md border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-100">
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Reschedule
                        </button>
                    )}
                </div>
            )}

            {isCompleted && (
                <div className="flex flex-col gap-2 sm:flex-row">
                    <button className="flex flex-1 items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200">
                        View Details
                    </button>
                    <button className="flex flex-1 items-center justify-center rounded-md border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-100">
                        Book Again
                    </button>
                </div>
            )}

            {isCancelled && (
                <button className="flex w-full items-center justify-center rounded-md border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-100">
                    Book Again
                </button>
            )}
        </div>
    );
}
