import { Suspense } from "react";
import { EditServiceScreen } from "../../../../featured/services/screens/EditServiceScreen/EditServiceScreen";

import {
  Addon,
  JsonResponse,
  PaginatedJsonResponse,
  PetType,
  Provider,
  Service,
  ServiceType,
} from "@furever/types";
import { server } from "@/app/shared/utils/http.server.utils";
import { notFound } from "next/navigation";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const service = await getServiceById(id);
  if (!service) {
    return notFound();
  }

  const [serviceTypesRes, petTypesRes, providersRes, addonsRes] =
    await Promise.all([
      getServiceType(),
      getPetTypes(),
      getProviders(),
      getAddons(),
    ]);

  if (!serviceTypesRes || !petTypesRes || !providersRes || !addonsRes) {
    return notFound();
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditServiceScreen
        service={service.data.data}
        serviceTypes={serviceTypesRes.data.data.data}
        petTypes={petTypesRes.data.data.data}
        providers={providersRes.data.data.data}
        addons={addonsRes.data.data.data}
      />
    </Suspense>
  );
}

async function getServiceById(id: number) {
  try {
    return await (
      await server()
    ).get<JsonResponse<Service>>(`/admin/services/${id}`);
  } catch (error) {
    return null;
  }
}

async function getServiceType() {
  try {
    return await (
      await server()
    ).get<
      PaginatedJsonResponse<{
        data: ServiceType[];
      }>
    >("/admin/service-types");
  } catch (error) {
    return null;
  }
}

async function getPetTypes() {
  try {
    return await (
      await server()
    ).get<
      PaginatedJsonResponse<{
        data: PetType[];
      }>
    >("/admin/pet-types");
  } catch (error) {
    return null;
  }
}

async function getProviders() {
  try {
    return await (
      await server()
    ).get<
      PaginatedJsonResponse<{
        data: Provider[];
      }>
    >("/admin/providers");
  } catch (error) {
    return null;
  }
}

async function getAddons() {
  try {
    return await (
      await server()
    ).get<
      PaginatedJsonResponse<{
        data: Addon[];
      }>
    >("/admin/addons");
  } catch (error) {
    return null;
  }
}
