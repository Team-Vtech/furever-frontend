"use client";

import { Calendar, DollarSign, Star } from "lucide-react";
import { StatsCard } from "../components/StatsCard";
import { ProfileCompletion } from "../components/ProfileCompletion";
import { UpcomingAppointments } from "../components/UpcomingAppointments";
import { WeekAtGlance } from "../components/WeekAtGlance";
import { QuickActions } from "../components/QuickActions";
import { YourServices } from "../components/YourServices";

// Mock data for appointments
const mockAppointments = [
  {
    id: "1",
    time: "10:00 AM",
    clientName: "Emily Smith",
    petName: "Buddy",
    petType: "Dog",
    service: "Grooming",
    status: "confirmed" as const,
  },
  {
    id: "2",
    time: "11:30 AM",
    clientName: "John Doe",
    petName: "Mittens",
    petType: "Cat",
    service: "Vaccination",
    status: "pending" as const,
  },
  {
    id: "3",
    time: "02:00 PM",
    clientName: "Sarah Johnson",
    petName: "Rocky",
    petType: "Hamster",
    service: "Check-up",
    status: "confirmed" as const,
  },
  {
    id: "4",
    time: "03:30 PM",
    clientName: "David Lee",
    petName: "Whiskers",
    petType: "Cat",
    service: "Nail Trim",
    status: "confirmed" as const,
  },
  {
    id: "5",
    time: "04:45 PM",
    clientName: "Olivia Davis",
    petName: "Coco",
    petType: "Dog",
    service: "Dental Cleaning",
    status: "pending" as const,
  },
];

export function DashboardScreen() {
  return (
    <div className="space-y-8">
      {/* Profile Completion Banner */}
      <ProfileCompletion />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Today's Bookings"
          value={12}
          subtitle="4 confirmed, 8 pending"
          icon={<Calendar className="h-6 w-6 text-muted-foreground" />}
        />
        <StatsCard
          title="Revenue"
          value="$1,250"
          subtitle="+8.5% from last week"
          icon={<DollarSign className="h-6 w-6 text-muted-foreground" />}
        />
        <StatsCard
          title="New Reviews"
          value={5}
          subtitle="Average rating: 4.8 stars"
          icon={<Star className="h-6 w-6 text-muted-foreground" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Appointments */}
        <div className="lg:col-span-2">
          <UpcomingAppointments appointments={mockAppointments} />
        </div>

        {/* Right Column - Week and Quick Actions */}
        <div className="space-y-6">
          <WeekAtGlance />
          <QuickActions />
        </div>
      </div>

      {/* Services Section */}
      <YourServices />
    </div>
  );
}
