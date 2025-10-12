import { $http } from "@/app/shared/utils/http.utils";
import { JsonResponse, Pet } from "@furever/types";

export const PetsClient = {
    async getPets() {
        const response = await $http.get<JsonResponse<Pet[]>>("/api/user/pets");
        return response.data;
    },
};
