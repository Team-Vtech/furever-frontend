import { Input } from "@furever/ui/components/input";
import { Bell, Search } from "lucide-react";
import Image from "next/image";

interface ExploreHeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export function ExploreHeader({ searchQuery, setSearchQuery }: ExploreHeaderProps) {
    return (
        <header id="explore-header" className="sticky top-0 z-40 border-b border-gray-100 bg-white shadow-sm">
            <div className="px-4 py-3 lg:py-4">
                {/* Header content */}
                <div className="mb-4 flex items-center justify-between">
                    {/* Logo - hidden on mobile, shown on larger screens */}
                    <div className="relative hidden h-8 items-center space-x-2 lg:flex">
                        <Image src="/logo.png" alt="Furever" fill />
                        <span className="text-xl font-bold text-purple-600">Furever</span>
                    </div>

                    {/* Title - centered on mobile, left on larger screens */}
                    <h1 className="text-center text-lg font-semibold text-gray-900 lg:ml-8 lg:flex-1 lg:text-left lg:text-xl">Explore Services</h1>

                    {/* Right side actions */}
                    <div className="flex items-center space-x-3">
                        <button className="rounded-full p-2 text-purple-600 transition-colors hover:bg-purple-50">
                            <Bell size={22} />
                        </button>

                        {/* User Avatar */}
                        <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-purple-600 bg-gradient-to-br from-purple-100 to-purple-200 lg:h-10 lg:w-10">
                            <Image src="/provider-login-image-38aca3.png" alt="User avatar" className="h-full w-full object-cover" fill />
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                        type="text"
                        placeholder="Search services or providers..."
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        className="border-gray-200/60 bg-gray-50/50 py-3 pl-10 focus:border-purple-300 focus:ring-purple-200"
                    />
                </div>
            </div>
        </header>
    );
}
