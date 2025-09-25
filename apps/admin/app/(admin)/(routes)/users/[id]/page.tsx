import { UsersClient } from "../../../featured/users/clients/users.client";
import { UserEditScreen } from "../../../featured/users/screens/UserEditScreen/UserEditScreen";

interface EditUserPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  const { id } = await params;
  if (!id) {
    return <div>User not found</div>;
  }
  const user = await getUser(id);
  return <UserEditScreen user={user.data} />;
}

async function getUser(id: string) {
  return await UsersClient.getUser(id);
}
