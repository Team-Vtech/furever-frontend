export default function DashboardPage() {
  return (
    <div id="page-layout" className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Section */}
      <header
        id="page-header"
        className="flex-shrink-0 bg-white shadow-sm border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Pet Parent Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Welcome back!</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="page-content" className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Welcome Card */}
            <section id="welcome-section" className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Welcome to Furever!
                  </h2>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-gray-500">Active</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  You&apos;ve successfully logged in to the pet parent dashboard.
                  This is where you&apos;ll manage your pet&apos;s care journey.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">0</div>
                    <div className="text-sm text-gray-600">Active Bookings</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">0</div>
                    <div className="text-sm text-gray-600">Pets Registered</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">0</div>
                    <div className="text-sm text-gray-600">Health Records</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section id="quick-actions-section" className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="font-medium text-gray-900">
                      Book Service
                    </div>
                    <div className="text-sm text-gray-500">
                      Schedule pet care services
                    </div>
                  </button>
                  <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="font-medium text-gray-900">Add Pet</div>
                    <div className="text-sm text-gray-500">
                      Register a new pet
                    </div>
                  </button>
                  <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="font-medium text-gray-900">
                      Health Records
                    </div>
                    <div className="text-sm text-gray-500">
                      Manage pet health
                    </div>
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
