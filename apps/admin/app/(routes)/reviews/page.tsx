import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { ReviewsListingScreen } from "@/app/featured/reviews/screens/ReviewsListingScreen/ReviewsListingScreen";

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
