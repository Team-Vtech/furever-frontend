export default function DashboardPage() {
    return (
        <div id="page-layout" className="flex min-h-screen flex-col bg-gray-50">
            {/* Header Section */}
            <header id="page-header" className="flex-shrink-0 border-b border-gray-200 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-6">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-900">Pet Parent Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">Welcome back!</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main id="page-content" className="flex-1 overflow-auto">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Welcome Card */}
                        <section id="welcome-section" className="lg:col-span-2">
                            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-gray-900">Welcome to Furever!</h2>
                                    <div className="flex items-center space-x-2">
                                        <div className="h-3 w-3 rounded-full bg-green-400"></div>
                                        <span className="text-sm text-gray-500">Active</span>
                                    </div>
                                </div>
                                <p className="mb-6 text-gray-600">
                                    You&apos;ve successfully logged in to the pet parent dashboard. This is where you&apos;ll manage your pet&apos;s
                                    care journey.
                                </p>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div className="rounded-lg bg-blue-50 p-4 text-center">
                                        <div className="text-2xl font-bold text-blue-600">0</div>
                                        <div className="text-sm text-gray-600">Active Bookings</div>
                                    </div>
                                    <div className="rounded-lg bg-purple-50 p-4 text-center">
                                        <div className="text-2xl font-bold text-purple-600">0</div>
                                        <div className="text-sm text-gray-600">Pets Registered</div>
                                    </div>
                                    <div className="rounded-lg bg-green-50 p-4 text-center">
                                        <div className="text-2xl font-bold text-green-600">0</div>
                                        <div className="text-sm text-gray-600">Health Records</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Quick Actions */}
                        <section id="quick-actions-section" className="space-y-6">
                            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h3>
                                <div className="space-y-3">
                                    <button className="w-full rounded-lg bg-gray-50 p-3 text-left transition-colors hover:bg-gray-100">
                                        <div className="font-medium text-gray-900">Book Service</div>
                                        <div className="text-sm text-gray-500">Schedule pet care services</div>
                                    </button>
                                    <button className="w-full rounded-lg bg-gray-50 p-3 text-left transition-colors hover:bg-gray-100">
                                        <div className="font-medium text-gray-900">Add Pet</div>
                                        <div className="text-sm text-gray-500">Register a new pet</div>
                                    </button>
                                    <button className="w-full rounded-lg bg-gray-50 p-3 text-left transition-colors hover:bg-gray-100">
                                        <div className="font-medium text-gray-900">Health Records</div>
                                        <div className="text-sm text-gray-500">Manage pet health</div>
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
