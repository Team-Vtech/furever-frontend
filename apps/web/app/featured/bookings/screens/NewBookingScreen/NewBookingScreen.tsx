"use client";

import { Provider, Service } from "@furever/types";
import { MainLayout } from "../../../../shared/components/MainLayout";
import { BookingFormContainer } from "../../containers/BookingFormContainer";

type NewBookingScreenProps = {
    provider?: Provider | null;
    service?: Service | null;
};

export function NewBookingScreen({ provider, service }: NewBookingScreenProps) {
    return (
        <MainLayout>
            <BookingFormContainer provider={provider} service={service} />
        </MainLayout>
    );
}
