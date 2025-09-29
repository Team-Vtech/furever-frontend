"use client";

import { useState } from "react";

interface Addon {
    id: string;
    name: string;
    price: number;
    checked: boolean;
}

export function ServiceAddons() {
    const [addons, setAddons] = useState<Addon[]>([
        {
            id: "deshedding",
            name: "De-shedding Treatment",
            price: 20.0,
            checked: true,
        },
        {
            id: "paw-moisturizer",
            name: "Paw Moisturizer",
            price: 10.0,
            checked: true,
        },
        {
            id: "breath-freshener",
            name: "Breath Freshener",
            price: 5.0,
            checked: false,
        },
    ]);

    const toggleAddon = (id: string) => {
        setAddons((prev) => prev.map((addon) => (addon.id === id ? { ...addon, checked: !addon.checked } : addon)));
    };

    return (
        <div className="border-t border-gray-100 bg-white">
            <div className="p-6">
                <h2 className="mb-6 text-xl font-bold text-gray-900">Add-ons</h2>

                <div className="space-y-4">
                    {addons.map((addon, index) => (
                        <div key={addon.id}>
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        id={addon.id}
                                        checked={addon.checked}
                                        onChange={() => toggleAddon(addon.id)}
                                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-500"
                                    />
                                    <label htmlFor={addon.id} className="cursor-pointer text-sm font-medium text-gray-900">
                                        {addon.name}
                                    </label>
                                </div>
                                <span className="text-sm font-semibold text-gray-900">+${addon.price}</span>
                            </div>

                            {/* Separator line (except for last item) */}
                            {index < addons.length - 1 && <div className="border-b border-gray-200"></div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
