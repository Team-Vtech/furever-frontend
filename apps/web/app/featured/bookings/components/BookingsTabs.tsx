"use client";

import { useState } from "react";

const tabs = [
    { id: "upcoming", label: "Upcoming" },
    { id: "past", label: "Past" },
    { id: "cancelled", label: "Cancelled" },
];

export function BookingsTabs() {
    const [activeTab, setActiveTab] = useState("upcoming");

    return (
        <div className="mb-8">
            <div className="flex max-w-md space-x-1 rounded-lg bg-gray-100 p-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 rounded-md px-6 py-3 text-sm font-medium transition-all duration-200 ${
                            activeTab === tab.id
                                ? "bg-white font-semibold text-purple-700 shadow-sm"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
