import { $http } from "@/app/shared/utils/http.utils";
import { JsonResponse, PetType } from "@furever/types";

export const petTypesClient = {
    async getPetTypes(): Promise<PetType[]> {
        const response = await $http.get<JsonResponse<PetType[]>>("/api/pet-types");
        return response.data.data;
    },
};
