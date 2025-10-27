import { JsonResponse, ServiceType } from "@furever/types";
import { Metadata } from "next";
import { HomePageScreen } from "../featured/home/screens/HomeScreen/HomeScreen";
import { MainLayout } from "../shared/components/MainLayout";
import { server } from "../shared/utils/http.server.utils";

export const metadata: Metadata = {
    title: "Furever - Pet Care Services",
    description:
        "Connect with trusted pet care professionals and provide the best care for your furry friends. Find vets, groomers, walkers, and more.",
};

export default async function HomePage() {
    const serviceTypes = await getServicesTypes();
    return (
        <MainLayout>
            <HomePageScreen serviceTypes={serviceTypes} />
        </MainLayout>
    );
}

async function getServicesTypes() {
    try {
        const response = await (await server()).get<JsonResponse<ServiceType[]>>("/service-types");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching service types:", error);
        throw error;
    }
}
