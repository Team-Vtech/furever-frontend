import { BookingSuccessScreen } from "@/app/featured/bookings/screens/BookingSuccessScreen/BookingSuccessScreen";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Booking Confirmed | Furever",
    description: "Your pet care service booking has been confirmed. Thank you for choosing Furever!",
};

export default function BookingSuccessPage() {
    return <BookingSuccessScreen />;
}
