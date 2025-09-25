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
    setAddons((prev) =>
      prev.map((addon) =>
        addon.id === id ? { ...addon, checked: !addon.checked } : addon
      )
    );
  };

  return (
    <div className="bg-white border-t border-gray-100">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Add-ons</h2>

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
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                  />
                  <label
                    htmlFor={addon.id}
                    className="text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    {addon.name}
                  </label>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  +${addon.price}
                </span>
              </div>

              {/* Separator line (except for last item) */}
              {index < addons.length - 1 && (
                <div className="border-b border-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
