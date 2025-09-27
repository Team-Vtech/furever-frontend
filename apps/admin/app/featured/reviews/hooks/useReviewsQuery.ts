import { useQuery } from "@tanstack/react-query";
import { ReviewsClient, ListBookingReviewsParams } from "../clients/reviewsClient";

export function useReviewsQuery(params?: ListBookingReviewsParams) {
  return useQuery({
    queryKey: ["booking-reviews", params],
    queryFn: () => ReviewsClient.getReviews({ queryKey: ["booking-reviews", params as any] }),
  });
}
