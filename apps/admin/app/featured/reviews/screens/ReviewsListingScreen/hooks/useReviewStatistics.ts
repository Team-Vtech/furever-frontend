import { useQuery } from "@tanstack/react-query";
import { ReviewsClient } from "../../../clients/reviewsClient";

export function useReviewStatistics() {
    const {
        data: reviewStats,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["review-stats"],

        queryFn: ReviewsClient.getReviewStats,
        select: (data) => data.data.data,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return {
        reviewStats,
        isLoading,
        isError,
    };
}
