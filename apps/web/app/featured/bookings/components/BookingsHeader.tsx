export function BookingsHeader() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Left Side - Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Furever</h1>
            </div>
            <div className="hidden sm:block h-6 w-px bg-gray-300"></div>
            <h2 className="text-lg font-semibold text-gray-900 font-nunito">
              My Bookings
            </h2>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <button className="p-2 text-gray-400 hover:text-gray-500 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5v-5zM9 7V5a2 2 0 012-2h0a2 2 0 012 2v2m-6 4a2 2 0 002 2h8a2 2 0 002-2V9a2 2 0 00-2-2H7a2 2 0 00-2 2v2z"
                />
              </svg>
            </button>

            {/* User Avatar */}
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-purple-700">P</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
