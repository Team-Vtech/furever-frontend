import { ReviewBookingScreen } from "@/app/featured/reviews/screens/ReviewBookingScreen";
import { MainLayout } from "@/app/shared/components/MainLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Review Service | Furever",
    description: "Share your experience and rate your pet care service. Help other pet parents make informed decisions.",
};

interface ReviewBookingPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ReviewBookingPage({ params }: ReviewBookingPageProps) {
    const { id } = await params;
    return (
        <MainLayout>
            <ReviewBookingScreen bookingId={id} />
        </MainLayout>
    );
}
