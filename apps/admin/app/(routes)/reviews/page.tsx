import { ReviewsListingScreen } from "@/app/featured/reviews/screens/ReviewsListingScreen/ReviewsListingScreen";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reviews",
    description: "View and manage customer reviews and ratings",
};

export default function ReviewsListPage() {
    return (
        <PageLayout
            title="Reviews"
            breadcrumbs={[
                {
                    label: "Reviews",
                    href: "/reviews",
                },
                {
                    label: "List",
                },
            ]}
        >
            <ReviewsListingScreen />
        </PageLayout>
    );
}
