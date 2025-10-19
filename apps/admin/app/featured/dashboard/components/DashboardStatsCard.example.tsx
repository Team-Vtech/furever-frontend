// Example usage of DashboardStatsCard component

import { DashboardStatsCard } from "./DashboardStatsCard";
import { DashboardStatistics } from "@furever/types";

// Example dashboard statistics data structure
const exampleStatistics: DashboardStatistics = {
    total_bookings: 150,
    total_revenue: "12500.00",
    bookings_by_status: [
        {
            service_id: 1,
            service_name: "Grooming",
            count: 45
        },
        {
            service_id: 2,
            service_name: "Veterinary Checkup",
            count: 30
        },
        {
            service_id: 3,
            service_name: "Pet Training",
            count: 25
        },
        {
            service_id: 4,
            service_name: "Pet Sitting",
            count: 20
        },
        {
            service_id: 5,
            service_name: "Pet Walking",
            count: 30
        }
    ],
    bookings_per_provider: [
        {
            provider_id: 1,
            provider_name: "Pet Care Center",
            count: 50
        },
        {
            provider_id: 2,
            provider_name: "Happy Paws Clinic",
            count: 40
        },
        {
            provider_id: 3,
            provider_name: "Furry Friends Services",
            count: 35
        },
        {
            provider_id: 4,
            provider_name: "Animal Wellness Center",
            count: 25
        }
    ],
    bookings_per_service: {
        "Grooming": 45,
        "Veterinary Checkup": 30,
        "Pet Training": 25,
        "Pet Sitting": 20,
        "Pet Walking": 30
    },
    up_coming_bookings: [
        // This would contain actual Booking objects
        // For brevity, showing empty array
    ]
};

// Example component using the DashboardStatsCard
export function ExampleDashboardStatsUsage() {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard Statistics</h1>
            
            {/* Using the DashboardStatsCard with example data */}
            <DashboardStatsCard 
                statistics={exampleStatistics}
                className="mb-8"
            />
            
            {/* You can also use it with real API data */}
            {/* The DashboardScreen component shows how to integrate with the API */}
        </div>
    );
}

// Example of how to integrate with the API in a page component
export function ExampleDashboardPage() {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            
            {/* The DashboardScreen component handles API integration automatically */}
            {/* It will show loading states, error states, and the statistics */}
            {/* <DashboardScreen /> */}
            
            {/* Or you can use the hook directly for custom implementations */}
            {/* 
            const { data, isLoading, error } = useDashboardStatistics();
            
            if (isLoading) return <div>Loading...</div>;
            if (error) return <div>Error loading data</div>;
            if (!data) return <div>No data available</div>;
            
            return <DashboardStatsCard statistics={data.data} />;
            */}
        </div>
    );
}

// Example of custom styling
export function CustomStyledDashboardStats() {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Custom Styled Dashboard
            </h2>
            <DashboardStatsCard 
                statistics={exampleStatistics}
                className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg"
            />
        </div>
    );
}
