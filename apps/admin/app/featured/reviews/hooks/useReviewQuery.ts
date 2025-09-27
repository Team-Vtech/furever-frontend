import { useQuery } from "@tanstack/react-query";
import { ReviewsClient } from "../clients/reviewsClient";

export function useReviewQuery(id: number) {
  return useQuery({
    queryKey: ["booking-review", id],
    queryFn: () => ReviewsClient.getReview(id),
    enabled: !!id,
  });
}
