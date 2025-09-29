interface QuickAction {
    id: number;
    title: string;
    icon: string;
    onClick: () => void;
}

interface QuickActionCardProps {
    action: QuickAction;
}

function getIcon(iconName: string) {
    switch (iconName) {
        case "bone":
            return (
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5.5 12c0-.8-.7-1.5-1.5-1.5S2.5 11.2 2.5 12s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5zm15 0c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5.7 1.5 1.5 1.5 1.5-.7 1.5-1.5zM7.5 12c0-1.4-1.1-2.5-2.5-2.5S2.5 10.6 2.5 12s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm14 0c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zM18 12H6c0-3.3 2.7-6 6-6s6 2.7 6 6z" />
                </svg>
            );
        case "dog":
            return (
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.5 10c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm15 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zM12 3.5c-4.1 0-7.5 3.4-7.5 7.5 0 .8.1 1.6.3 2.3.9-1.1 2.2-1.8 3.7-1.8 2.8 0 5 2.2 5 5v4.5h3V16c0-2.8 2.2-5 5-5 1.5 0 2.8.7 3.7 1.8.2-.7.3-1.5.3-2.3 0-4.1-3.4-7.5-7.5-7.5z" />
                </svg>
            );
        case "paw":
            return (
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.5 8.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-1.5 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm3 7c-2.8 0-5.1-2.3-5.1-5.1 0-.6.1-1.2.3-1.7 1.2.5 2.5.8 3.8.8s2.6-.3 3.8-.8c.2.5.3 1.1.3 1.7 0 2.8-2.3 5.1-5.1 5.1z" />
                </svg>
            );
        case "calendar":
            return (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
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

export function QuickActionCard({ action }: QuickActionCardProps) {
    return (
        <button
            onClick={action.onClick}
            className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md"
        >
            <div className="flex flex-col items-center space-y-4">
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 transition-colors group-hover:bg-purple-200">
                    <div className="text-purple-600">{getIcon(action.icon)}</div>
                </div>

                {/* Title */}
                <span className="font-nunito text-center text-sm font-medium text-gray-900">{action.title}</span>
            </div>
        </button>
    );
}
