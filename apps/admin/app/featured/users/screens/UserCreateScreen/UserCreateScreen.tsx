"use client";

import { CreateUserForm } from "../../containers/CreateUserForm";
import { UserFormValues } from "../../../../(routes)/api/users/users.schema";
import { useCreateUser } from "../../hooks/use-users";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function UserCreateScreen() {
  const router = useRouter();
  const createUserMutation = useCreateUser();

  const handleSubmit = async (data: UserFormValues) => {
    try {
      await createUserMutation.mutateAsync(data);
      toast.success("User created successfully");
      router.push("/users");
    } catch (error) {
      toast.error("Failed to create user");
      console.error("Error creating user:", error);
    }
  };

  const handleCancel = () => {
    router.push("/users");
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <CreateUserForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={createUserMutation.isPending}
      />
    </div>
  );
}
