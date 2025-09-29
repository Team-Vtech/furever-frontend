import { server } from "@/app/shared/utils/http.server.utils";
import { UserEditScreen } from "../../../featured/users/screens/UserEditScreen/UserEditScreen";

import { JsonResponse, PaginatedJsonResponse, Provider, Role, User } from "@furever/types";
import { notFound } from "next/navigation";

interface EditUserPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditUserPage({ params }: EditUserPageProps) {
    const { id } = await params;
    if (!id) {
        return notFound();
    }
    const user = await getUser(id);
    if (!user?.data?.data) {
        return notFound();
    }

    const providers = await getProviders();
    const roles = await getRoles();
    return <UserEditScreen user={user.data.data} roles={roles} providers={providers} />;
}

async function getUser(id: string) {
    return await (await server()).get<JsonResponse<User>>(`/admin/users/${id}`);
}

async function getRoles() {
    try {
        const response = await (
            await server()
        ).get<
            PaginatedJsonResponse<{
                data: Role[];
            }>
        >("/admin/roles");
        return response.data.data.data;
    } catch {
        return [];
    }
}

async function getProviders() {
    try {
        const response = await (
            await server()
        ).get<
            PaginatedJsonResponse<{
                data: Provider[];
            }>
        >("/admin/providers");
        return response.data.data.data;
    } catch {
        return [];
    }
}
