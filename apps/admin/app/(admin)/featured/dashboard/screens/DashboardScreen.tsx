import { Calendar, DollarSign, Star } from "lucide-react";
import { BookingChartsCard } from "../components/BookingChartsCard";
import { ProfileCompletion } from "../components/ProfileCompletion";
import { QuickActions } from "../components/QuickActions";
import { WeekAtGlance } from "../components/WeekAtGlance";
import { YourServices } from "../components/YourServices";
import { StatsCard } from "../components/StatsCard";
import { UpcomingAppointmentsWithData } from "../components/UpcomingAppointmentsWithData";
import { UpcomingAppointments } from "../components/UpcomingAppointments";
import { BookingStatistics } from "@furever/types";

type DashboardScreenProps = {
  statistics: BookingStatistics;
};

export function DashboardScreen({ statistics }: DashboardScreenProps) {
  const bookingsCounts = Object.entries(statistics.bookings_by_status)
    .map(([status, count]) => `${count} ${status}`)
    .join(", ");
  return (
    <div className="space-y-8">
      {/* Profile Completion Banner */}
      <ProfileCompletion />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Today's Bookings"
          value={statistics.total_bookings}
          subtitle={bookingsCounts}
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

      {/* Booking Statistics Section */}
      <BookingChartsCard statistics={statistics} />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Appointments with Real Data */}
        <div className="lg:col-span-2">
          <UpcomingAppointments
            upcomingBookings={statistics.up_coming_bookings}
          />
        </div>

        {/* Right Column - Week and Quick Actions */}
        <div className="space-y-6">
          <WeekAtGlance />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
