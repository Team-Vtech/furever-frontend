interface Reminder {
  id: number;
  title: string;
  date: string;
  description: string;
  type: "upcoming" | "critical";
  icon: string;
}

interface ReminderCardProps {
  reminder: Reminder;
}

function getReminderIcon(iconName: string) {
  switch (iconName) {
    case "calendar-check":
      return (
        <svg
          className="w-6 h-6"
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4"
          />
        </svg>
      );
    case "syringe":
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.5 12.572l-7.5 7.428-7.5-7.428A5 5 0 114.5 6.572l1.5 1.428L8.5 6.572A5 5 0 0119.5 12.572z"
          />
        </svg>
      );
    default:
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      );
  }
}

export function ReminderCard({ reminder }: ReminderCardProps) {
  const isCritical = reminder.type === "critical";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        {/* Icon */}
        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
          <div className="text-purple-600">
            {getReminderIcon(reminder.icon)}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900 font-nunito">
                {reminder.title}
              </h3>
              <p className="text-sm text-gray-500 font-nunito">
                {reminder.date}
              </p>
              <p className="text-sm text-gray-700 font-nunito">
                {reminder.description}
              </p>
            </div>

            {/* Tag */}
            <div className="flex-shrink-0">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  isCritical
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {isCritical ? "Critical" : "Upcoming"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
