import { server } from "@/app/shared/utils/http.server.utils";
import { UsersClient } from "../../../featured/users/clients/users.client";
import { UserEditScreen } from "../../../featured/users/screens/UserEditScreen/UserEditScreen";
import { JsonResponse } from "@/app/shared/types/general";
import { User } from "@/app/featured/users/types";
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
  return <UserEditScreen user={user.data.data} />;
}

async function getUser(id: string) {
  return await (await server()).get<JsonResponse<User>>(`/admin/users/${id}`);
}
