import { Bell, Search } from "lucide-react";
import { Input } from "@furever/ui/components/input";
import Image from "next/image";

interface ExploreHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function ExploreHeader({
  searchQuery,
  setSearchQuery,
}: ExploreHeaderProps) {
  return (
    <header
      id="explore-header"
      className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm"
    >
      <div className="px-4 py-3 lg:py-4">
        {/* Header content */}
        <div className="flex items-center justify-between mb-4">
          {/* Logo - hidden on mobile, shown on larger screens */}
          <div className="hidden lg:flex items-center space-x-2 h-8 relative">
            <Image src="/logo.png" alt="Furever" fill />
            <span className="text-xl font-bold text-purple-600">Furever</span>
          </div>

          {/* Title - centered on mobile, left on larger screens */}
          <h1 className="text-lg font-semibold text-gray-900 lg:text-xl lg:flex-1 lg:text-left text-center lg:ml-8">
            Explore Services
          </h1>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-full transition-colors">
              <Bell size={22} />
            </button>

            {/* User Avatar */}
            <div className="w-9 h-9 lg:w-10 lg:h-10 relative rounded-full bg-gradient-to-br from-purple-100 to-purple-200 border-2 border-purple-600 flex items-center justify-center overflow-hidden">
              <Image
                src="/provider-login-image-38aca3.png"
                alt="User avatar"
                className="w-full h-full object-cover"
                fill
              />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search services or providers..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            className="pl-10 py-3 bg-gray-50/50 border-gray-200/60 focus:border-purple-300 focus:ring-purple-200"
          />
        </div>
      </div>
    </header>
  );
}
