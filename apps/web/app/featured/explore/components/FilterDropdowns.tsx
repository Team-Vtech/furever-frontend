import { Button } from "@furever/ui/components/button";
import { Calendar, ChevronDown, DollarSign, MapPin, PawPrint } from "lucide-react";

export function FilterDropdowns() {
    return (
        <div className="border border-gray-200/60 bg-gray-50/50 p-4 shadow-sm">
            {/* Mobile: Stack filters vertically */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
                {/* Location Filter */}
                <Button
                    variant="outline"
                    className="h-10 justify-between border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-700"
                >
                    <div className="flex items-center space-x-2">
                        <MapPin size={16} className="text-gray-500" />
                        <span>Location</span>
                    </div>
                    <ChevronDown size={16} className="text-gray-400" />
                </Button>

                {/* Date & Time Filter */}
                <Button
                    variant="outline"
                    className="h-10 justify-between border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-700"
                >
                    <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-gray-500" />
                        <span>Date & Time</span>
                    </div>
                    <ChevronDown size={16} className="text-gray-400" />
                </Button>

                {/* Pet Type Filter */}
                <Button
                    variant="outline"
                    className="h-10 justify-between border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-700"
                >
                    <div className="flex items-center space-x-2">
                        <PawPrint size={16} className="text-gray-500" />
                        <span>Pet Type</span>
                    </div>
                    <ChevronDown size={16} className="text-gray-400" />
                </Button>

                {/* Price Range Filter */}
                <Button
                    variant="outline"
                    className="h-10 justify-between border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-700"
                >
                    <div className="flex items-center space-x-2">
                        <DollarSign size={16} className="text-gray-500" />
                        <span>Price Range</span>
                    </div>
                    <ChevronDown size={16} className="text-gray-400" />
                </Button>
            </div>
        </div>
    );
}
