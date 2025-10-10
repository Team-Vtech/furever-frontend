import { JsonResponse, ServiceType } from "@furever/types";
import { HomePageScreen } from "../featured/home/screens/HomeScreen/HomeScreen";
import { MainLayout } from "../shared/components/MainLayout";
import { server } from "../shared/utils/http.server.utils";

export default async function HomePage() {
    const serviceTypes = await getServicesTypes();
    return (
        <MainLayout>
            <HomePageScreen serviceTypes={serviceTypes} />
        </MainLayout>
    );
}

export async function getServicesTypes() {
    try {
        const response = await (await server()).get<JsonResponse<ServiceType[]>>("/service-types");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching service types:", error);
        throw error;
    }
}
