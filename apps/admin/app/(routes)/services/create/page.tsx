import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { PaginatedJsonResponse } from "@/app/shared/types/general";
import { server } from "@/app/shared/utils/http.server.utils";
import { Addon, PetType, Provider, ServiceType } from "@furever/types/index";
import { Suspense } from "react";
import { CreateServiceScreen } from "../../../featured/services/screens/CreateServiceScreen/CreateServiceScreen";
import { notFound } from "next/navigation";

export default async function CreateServicePage() {
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
    <PageLayout
      title="Create Service"
      breadcrumbs={[
        { label: "Services", href: "/services" },
        { label: "Create" },
      ]}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <CreateServiceScreen
          serviceTypes={serviceTypesRes.data.data.data}
          petTypes={petTypesRes.data.data.data}
          providers={providersRes.data.data.data}
          addons={addonsRes.data.data.data}
        />
      </Suspense>
    </PageLayout>
  );
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
