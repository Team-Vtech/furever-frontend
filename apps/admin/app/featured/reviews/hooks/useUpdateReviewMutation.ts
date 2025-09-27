import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReviewsClient } from "../clients/reviewsClient";

export function useUpdateReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => ReviewsClient.updateReview(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking-reviews"] });
    },
  });
}
