import { client } from "@/app/shared/utils/http.client.utils";
import { DashboardStatistics, JsonResponse } from "@furever/types";

export const DashboardClient = {
    async getDashboardStatistics() {
        const response = await client().get<JsonResponse<DashboardStatistics>>("/admin/dashboard");
        return response.data;
    },
};
