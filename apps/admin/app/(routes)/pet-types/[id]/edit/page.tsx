import { server } from "@/app/shared/utils/http.server.utils";
import { JsonResponse, PetType } from "@furever/types";
import { Suspense } from "react";
import EditPetTypeScreen from "../../../../featured/pet-types/screens/EditPetTypeScreen/EditPetTypeScreen";

export default async function EditPetTypePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const petType = await getPetType(id);
    if (!petType) {
        return <div>Pet type not found</div>;
    }
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditPetTypeScreen petType={petType.data.data} />
        </Suspense>
    );
}

async function getPetType(id: string) {
    try {
        return await (await server()).get<JsonResponse<PetType>>(`/admin/pet-types/${id}`);
    } catch {
        return null;
    }
}
