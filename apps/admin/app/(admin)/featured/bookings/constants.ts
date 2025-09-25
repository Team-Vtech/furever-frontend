export const ENDPOINTS = {
  getBookings: {
    url: "/api/bookings",
    method: "get",
  },
  createBooking: {
    url: "/api/bookings",
    method: "post",
  },
  updateBooking: {
    url: (id: string) => `/api/bookings/${id}`,
    method: "put",
  },
  deleteBooking: {
    url: (id: string) => `/api/bookings/${id}`,
    method: "delete",
  },
} as const;

export const BOOKING_STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
] as const;

export const GENDER_OPTIONS = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
] as const;

export const VACCINATION_STATUS_OPTIONS = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
  { value: "Partial", label: "Partial" },
] as const;
