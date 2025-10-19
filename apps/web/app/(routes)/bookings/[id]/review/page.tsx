import { ReviewBookingScreen } from "@/app/featured/reviews/screens/ReviewBookingScreen";
import { MainLayout } from "@/app/shared/components/MainLayout";

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
