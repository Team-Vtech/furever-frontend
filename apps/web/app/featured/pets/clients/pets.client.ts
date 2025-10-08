import { client } from "@/app/shared/utils/http.client.utils";
import { JsonResponse, Pet } from "@furever/types";
import { PetFormValues } from "../schemas/pet.schema";

const http = client();

export const PetsClient = {
    async getPets() {
        return http.get<JsonResponse<Pet[]>>("/api/user/pets");
    },

    async getPet(id: string | number) {
        return http.get<JsonResponse<Pet>>(`/api/user/pets/${id}`);
    },

    async createPet(data: PetFormValues) {
        return http.post<JsonResponse<Pet>>("/api/user/pets", data);
    },

    async updatePet(id: string | number, data: PetFormValues) {
        return http.put<JsonResponse<Pet>>(`/api/user/pets/${id}`, data);
    },

    async deletePet(id: string | number) {
        return http.delete<JsonResponse<void>>(`/api/user/pets/${id}`);
    },
};