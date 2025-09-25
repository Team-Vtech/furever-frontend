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
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 max-w-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-6 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-white text-purple-700 font-semibold shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
