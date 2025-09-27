"use client";

import { UpcomingAppointments } from "./UpcomingAppointments";
import { useBookingStatisticsQuery } from "../../bookings/hooks/useBookingQueries";
import { Booking } from "../../bookings";

type UpcomingAppointmentsWithDataProps = {
  bookings: Booking[];
};

export function UpcomingAppointmentsWithData({
  bookings,
}: UpcomingAppointmentsWithDataProps) {}
