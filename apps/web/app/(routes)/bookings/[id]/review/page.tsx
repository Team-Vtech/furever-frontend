import { ReviewBookingScreen } from "@/app/featured/reviews/screens/ReviewBookingScreen";
import { MainLayout } from "@/app/shared/components/MainLayout";
import { Suspense } from "react";

interface ReviewBookingPageProps {
    params: {
        id: string;
    };
}

export default function ReviewBookingPage({ params }: ReviewBookingPageProps) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MainLayout>
                <ReviewBookingScreen bookingId={params.id} />
            </MainLayout>
        </Suspense>
    );
}
