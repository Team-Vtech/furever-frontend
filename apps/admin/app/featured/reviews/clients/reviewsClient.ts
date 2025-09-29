import { client } from "@/app/shared/utils/http.client.utils";
import type {
  JsonResponse,
  PaginatedJsonResponse,
  ReviewBooking,
} from "@furever/types";

export interface ListReviewBookingsParams {
  booking_id?: number;
  user_id?: number;
  rating?: number;
  comment?: string;
}

export const ReviewsClient = {
  async getReviews({ queryKey }: { queryKey: string[] }) {
    return await client().get<
      PaginatedJsonResponse<{
        data: ReviewBooking[];
      }>
    >("/api/booking-reviews", {
      params: new URLSearchParams(queryKey[1]),
    });
  },
  async getReview(id: number) {
    return await client().get<ReviewBooking>(`/api/booking-reviews/${id}`);
  },

  async createReview(
    data: Partial<
      Omit<ReviewBooking, "id" | "user_id" | "created_at" | "updated_at">
    >
  ) {
    await client().post<ReviewBooking>("/api/booking-reviews", data);
  },
  async updateReview(
    id: number,
    data: Partial<
      Omit<ReviewBooking, "id" | "user_id" | "created_at" | "updated_at">
    >
  ) {
    await client().patch<ReviewBooking>(`/api/booking-reviews/${id}`, data);
  },

  async deleteReview(id: number) {
    await client().delete<void>(`/api/booking-reviews/${id}`);
  },
  async getReviewStats() {
    return await client().get<
      JsonResponse<{
        overall_average_rating: number;
        total_reviewers: number;
        ratings_breakdown: {
          5: number;
          4: number;
          3: number;
          2: number;
          1: number;
        };
        most_reviewed_service: {
          service_id: number;
          name: string;
          count: number;
        }[];
      }>
    >("/api//booking-reviews/statistics");
  },
};
