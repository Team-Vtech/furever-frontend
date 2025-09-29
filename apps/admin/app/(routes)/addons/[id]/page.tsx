import { Suspense } from "react";
import { EditAddonScreen } from "../../../featured/addons/screens/EditAddonScreen/EditAddonScreen";
import { server } from "@/app/shared/utils/http.server.utils";
import { Addon, JsonResponse } from "@furever/types";
import { notFound } from "next/navigation";

interface EditAddonPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditAddonPage({ params }: EditAddonPageProps) {
  const { id } = await params;
  if (!id) {
    return notFound();
  }

  const addon = await getAddonById(id);

  if (!addon?.data) {
    return notFound();
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditAddonScreen addon={addon.data.data} />
    </Suspense>
  );
}

async function getAddonById(id: string) {
  try {
    return await (
      await server()
    ).get<JsonResponse<Addon>>(`/admin/addons/${id}`);
  } catch (error) {
    return null;
  }
}
