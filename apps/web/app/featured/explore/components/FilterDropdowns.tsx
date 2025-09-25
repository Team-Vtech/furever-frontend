import {
  ChevronDown,
  MapPin,
  Calendar,
  PawPrint,
  DollarSign,
} from "lucide-react";
import { Button } from "@furever/ui/components/button";

export function FilterDropdowns() {
  return (
    <div className="p-4 bg-gray-50/50 border border-gray-200/60 shadow-sm">
      {/* Mobile: Stack filters vertically */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {/* Location Filter */}
        <Button
          variant="outline"
          className="h-10 justify-between bg-white border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700"
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
          className="h-10 justify-between bg-white border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700"
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
          className="h-10 justify-between bg-white border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700"
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
          className="h-10 justify-between bg-white border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700"
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
