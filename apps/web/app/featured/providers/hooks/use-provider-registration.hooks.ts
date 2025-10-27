import { ProviderRegistrationFormValues } from "@/app/(routes)/api/providers/register/register.schema";
import { JsonResponse, Provider } from "@furever/types";
import { useMutation } from "@tanstack/react-query";

export function useProviderRegistrationMutation() {
    return useMutation({
        mutationFn: async (data: ProviderRegistrationFormValues): Promise<JsonResponse<Provider>> => {
            const response = await fetch("/api/providers/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to register provider");
            }

            return response.json();
        },
    });
}
