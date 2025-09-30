interface BookingCardProps {
    booking: {
        id: string;
        serviceName: string;
        providerName: string;
        petName: string;
        petBreed: string;
        date: string;
        time: string;
        status: "upcoming" | "past" | "cancelled";
        providerAvatar: string;
        providerColor: string;
    };
}

export function BookingCard({ booking }: BookingCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "upcoming":
                return "bg-blue-100 text-blue-800";
            case "past":
                return "bg-gray-100 text-gray-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="h-fit rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                    <h3 className="font-nunito mb-1 text-lg font-semibold text-gray-900">{booking.serviceName}</h3>
                    <p className="font-nunito text-sm text-gray-600">{booking.providerName}</p>
                </div>

                {/* Provider Avatar */}
                <div
                    className={`ml-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2`}
                    style={{
                        backgroundColor: booking.providerColor + "20",
                        borderColor: booking.providerColor,
                    }}
                >
                    <div
                        className="flex h-full w-full items-center justify-center rounded-full text-lg font-semibold text-white"
                        style={{ backgroundColor: booking.providerColor }}
                    >
                        {booking.providerName.charAt(0)}
                    </div>
                </div>
            </div>

            {/* Pet Info */}
            <p className="font-nunito mb-4 text-gray-900">
                Pet: {booking.petName} ({booking.petBreed})
            </p>

            {/* Status Badge */}
            <div className="mb-4 flex items-center justify-between">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
            </div>

            {/* Date and Time */}
            <div className="mb-6 flex items-center text-gray-600">
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
                <span className="font-nunito text-sm">
                    {booking.date} • {booking.time}
                </span>
            </div>

            {/* Action Buttons */}
            {booking.status === "upcoming" && (
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

                    <button className="flex flex-1 items-center justify-center rounded-md border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-100">
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Reschedule
                    </button>
                </div>
            )}

            {booking.status === "past" && (
                <div className="flex flex-col gap-2 sm:flex-row">
                    <button className="flex flex-1 items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200">
                        View Details
                    </button>
                    <button className="flex flex-1 items-center justify-center rounded-md border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-100">
                        Book Again
                    </button>
                </div>
            )}

            {booking.status === "cancelled" && (
                <button className="flex w-full items-center justify-center rounded-md border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-100">
                    Book Again
                </button>
            )}
        </div>
    );
}
