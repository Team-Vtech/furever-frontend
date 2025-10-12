import { Provider } from "@furever/types";
import { useQuery } from "@tanstack/react-query";
import { BookingsClient } from "../../../../bookings/clients/bookings.client";
import { ServicesClient } from "../../../../services/clients/services.client";
import { UsersClient } from "../../../../users/clients/users.client";

export function useProviderViewScreenState(providerId: number, provider?: Provider) {
    // Fetch provider bookings
    const {
        data: bookingsData,
        isLoading: isLoadingBookings,
        error: bookingsError,
    } = useQuery({
        queryKey: ["provider-bookings", providerId.toString(), `provider_id=${providerId}`],
        queryFn: BookingsClient.getBookings,
        enabled: !!providerId,
    });

    // Fetch provider services
    const {
        data: servicesData,
        isLoading: isLoadingServices,
        error: servicesError,
    } = useQuery({
        queryKey: ["provider-services", providerId.toString(), `provider_id=${providerId}`],
        queryFn: ServicesClient.getServices,
        enabled: !!providerId,
    });

    // Fetch provider users (customers who booked services)
    const {
        data: usersData,
        isLoading: isLoadingUsers,
        error: usersError,
    } = useQuery({
        queryKey: ["provider-users", providerId.toString(), `provider_id=${providerId}`],
        queryFn: UsersClient.getUsers,
        enabled: !!providerId,
    });

    // For documents, we'll use the certificates from the provider data
    // In a real implementation, you might have a separate endpoint
    const documents = provider?.certificates || [];
    const isLoadingDocuments = false;

    return {
        bookings: bookingsData?.data?.data || [],
        services: servicesData?.data?.data || [],
        users: usersData?.data?.data || [],
        documents,
        isLoadingBookings,
        isLoadingServices,
        isLoadingUsers,
        isLoadingDocuments,
        bookingsError,
        servicesError,
        usersError,
    };
}
