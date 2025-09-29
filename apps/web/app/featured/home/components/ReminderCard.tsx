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
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                </svg>
            );
        case "syringe":
            return (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            );
    }
}

export function ReminderCard({ reminder }: ReminderCardProps) {
    const isCritical = reminder.type === "critical";

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-50">
                    <div className="text-purple-600">{getReminderIcon(reminder.icon)}</div>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <h3 className="font-nunito text-lg font-semibold text-gray-900">{reminder.title}</h3>
                            <p className="font-nunito text-sm text-gray-500">{reminder.date}</p>
                            <p className="font-nunito text-sm text-gray-700">{reminder.description}</p>
                        </div>

                        {/* Tag */}
                        <div className="flex-shrink-0">
                            <span
                                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                                    isCritical ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
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
