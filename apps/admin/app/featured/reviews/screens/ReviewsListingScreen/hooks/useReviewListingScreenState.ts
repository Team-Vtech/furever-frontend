import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ReviewsClient } from "../../../clients/reviewsClient";

export function useReviewListingScreenState() {
    const queryString = useSearchParams().toString();
    const { data, isLoading, error } = useQuery({
        queryKey: ["booking-reviews", queryString],
        queryFn: ReviewsClient.getReviews,
        select: (data) => {
            return {
                reviews: data.data.data.data,
                pagination: data.data.data.pagination,
            };
        },
    });

    return { data, isLoading, error };
}
