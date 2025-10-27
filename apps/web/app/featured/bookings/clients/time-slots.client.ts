import { client } from "@/app/shared/utils/http.client.utils";
import { JsonResponse } from "@furever/types";

export interface TimeSlot {
    start_time: string;
    end_time: string;
    is_available: boolean;
}

export interface AvailableTimeSlotsResponse {
    data: TimeSlot[];
}

export const TimeSlotsClient = {
    async getAvailableTimeSlots(params: { provider_id: number; service_id: number; date: string }) {
        const searchParams = new URLSearchParams({
            provider_id: params.provider_id.toString(),
            service_id: params.service_id.toString(),
            date: params.date,
        });

        const response = await client().get<
            JsonResponse<{
                available_slots: TimeSlot[];
                all_slots: TimeSlot[];
                date: string;
                day_of_week: string;
            }>
        >(`/api/time-slots/available?${searchParams.toString()}`);
        return response.data;
    },
};
