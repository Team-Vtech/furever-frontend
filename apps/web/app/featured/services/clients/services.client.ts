import { JsonResponse } from "@/app/shared/types/general";
import { client } from "../../../shared/utils/http.client.utils";
import { Service } from "../../../../../admin/app/(admin)/featured/bookings/types/index";

const http = client();

export const ServicesClient = {
  getPopular: async () => http.get("/api/user/services/popular"),
  getList: async (params: {
    service_type_id?: string;
    pet_type_id?: string;
    provider_id?: string;
    search?: string;
    sort_by?: "name" | "price" | "duration_minutes" | "created_at";
    sort_order?: "ASC" | "DESC";
    per_page?: number;
    page?: number;
  }) => http.get("/api/user/services", { params }),
  getDetails: async (serviceId: string) =>
    http.get<JsonResponse<Service>>(`/api/user/services/${serviceId}`),
};
