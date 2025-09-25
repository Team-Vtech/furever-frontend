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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 h-fit">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 font-nunito mb-1">
            {booking.serviceName}
          </h3>
          <p className="text-sm text-gray-600 font-nunito">
            {booking.providerName}
          </p>
        </div>

        {/* Provider Avatar */}
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 flex-shrink-0 ml-4`}
          style={{
            backgroundColor: booking.providerColor + "20",
            borderColor: booking.providerColor,
          }}
        >
          <div
            className="w-full h-full rounded-full flex items-center justify-center text-white font-semibold text-lg"
            style={{ backgroundColor: booking.providerColor }}
          >
            {booking.providerName.charAt(0)}
          </div>
        </div>
      </div>

      {/* Pet Info */}
      <p className="text-gray-900 font-nunito mb-4">
        Pet: {booking.petName} ({booking.petBreed})
      </p>

      {/* Status Badge */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
        >
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>

      {/* Date and Time */}
      <div className="flex items-center text-gray-600 mb-6">
        <svg
          className="w-4 h-4 mr-2"
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
        <span className="text-sm font-nunito">
          {booking.date} • {booking.time}
        </span>
      </div>

      {/* Action Buttons */}
      {booking.status === "upcoming" && (
        <div className="flex flex-col sm:flex-row gap-2">
          <button className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            View Details
          </button>

          <button className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-md hover:bg-purple-100 transition-colors">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Reschedule
          </button>
        </div>
      )}

      {booking.status === "past" && (
        <div className="flex flex-col sm:flex-row gap-2">
          <button className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
            View Details
          </button>
          <button className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-md hover:bg-purple-100 transition-colors">
            Book Again
          </button>
        </div>
      )}

      {booking.status === "cancelled" && (
        <button className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-md hover:bg-purple-100 transition-colors">
          Book Again
        </button>
      )}
    </div>
  );
}
