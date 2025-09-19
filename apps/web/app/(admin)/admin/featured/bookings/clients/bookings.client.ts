import {
  JsonResponse,
  PaginatedJsonResponse,
} from "@/app/shared/types/general";
import { client } from "@/app/shared/utils/http.client.utils";
import { ENDPOINTS } from "../constants";
import { Booking, Pet, PetType, Provider, Service, User } from "../types/index";
import { BookingFormValues } from "../../../(routes)/api/bookings/bookings.schema";

interface GetBookingsParams {
  page?: number;
  per_page?: number;
  search?: string;
  status?: string;
  provider_id?: number;
  service_id?: number;
  user_id?: number;
  booking_date?: string;
}

export const BookingsClient = {
  async getBookings(params: GetBookingsParams = {}) {
    const {
      page = 1,
      per_page = 10,
      search,
      status,
      provider_id,
      service_id,
      user_id,
      booking_date,
    } = params;

    const searchParams = new URLSearchParams({
      page: page.toString(),
      limit: per_page.toString(),
    });

    if (search) {
      searchParams.append("search", search);
    }
    if (status) {
      searchParams.append("status", status);
    }
    if (provider_id) {
      searchParams.append("provider_id", provider_id.toString());
    }
    if (service_id) {
      searchParams.append("service_id", service_id.toString());
    }
    if (user_id) {
      searchParams.append("user_id", user_id.toString());
    }
    if (booking_date) {
      searchParams.append("booking_date", booking_date);
    }

    const response = await client().get<
      PaginatedJsonResponse<{
        data: Booking[];
      }>
    >(`${ENDPOINTS.getBookings.url}?${searchParams.toString()}`);
    return response.data;
  },

  async getBooking(id: string) {
    const response = await client().get<JsonResponse<Booking>>(
      `${ENDPOINTS.getBookings.url}/${id}`
    );
    return response.data;
  },

  async createBooking(data: BookingFormValues) {
    const response = await client().post<JsonResponse<Booking>>(
      ENDPOINTS.createBooking.url,
      data
    );
    return response.data;
  },

  async updateBooking(id: string, data: BookingFormValues) {
    const response = await client().put<JsonResponse<Booking>>(
      `${ENDPOINTS.getBookings.url}/${id}`,
      data
    );
    return response.data;
  },

  async deleteBooking(id: number) {
    const response = await client().delete<JsonResponse<void>>(
      `${ENDPOINTS.getBookings.url}/${id}`
    );
    return response.data;
  },

  // Helper endpoints for form data
  async getProviders() {
    const response = await client().get<
      PaginatedJsonResponse<{
        data: Provider[];
      }>
    >("/admin/api/providers");
    return response.data;
  },

  async getServices() {
    const response = await client().get<
      PaginatedJsonResponse<{
        data: Service[];
      }>
    >("/admin/api/services");
    return response.data;
  },

  async getUsers(search?: string) {
    const searchParams = new URLSearchParams();
    if (search) {
      searchParams.append("search", search);
    }

    const response = await client().get<
      PaginatedJsonResponse<{
        data: User[];
      }>
    >(`/admin/api/users?${searchParams.toString()}`);
    return response.data;
  },

  async getUserPets(userId: number) {
    const response = await client().get<
      PaginatedJsonResponse<{
        data: Pet[];
      }>
    >(`/admin/api/users/${userId}/pets`);
    return response.data;
  },

  async getPetTypes() {
    const response = await client().get<
      PaginatedJsonResponse<{
        data: PetType[];
      }>
    >("/admin/api/pet-types");
    return response.data;
  },
};
