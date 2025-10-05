/**
 * PhoneInput Component Usage Example (Admin App)
 * 
 * This example demonstrates how to use the controlled PhoneInput component
 * in the admin app following the simple pattern with useController.
 */

"use client";

import { PhoneInput } from "@/app/shared/components/PhoneInput/PhoneInput";
import { Button } from "@furever/ui/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Schema for form validation
const phoneFormSchema = z.object({
    phoneNumber: z.string().min(1, "Phone number is required"),
});

type PhoneFormData = z.infer<typeof phoneFormSchema>;

export function PhoneInputExample() {
    const { control, handleSubmit, formState: { errors } } = useForm<PhoneFormData>({
        resolver: zodResolver(phoneFormSchema),
        defaultValues: {
            phoneNumber: "",
        },
    });

    const onSubmit = (data: PhoneFormData) => {
        console.log("Phone number:", data.phoneNumber);
        // Handle form submission
    };

    return (
        <div className="max-w-md p-6 border rounded-lg">
            <h3 className="text-lg font-medium mb-4">Phone Input Example (Admin)</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                    </label>
                    <PhoneInput
                        name="phoneNumber"
                        control={control}
                        placeholder="Enter phone number"
                        className="w-full"
                    />
                    {errors.phoneNumber && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.phoneNumber.message}
                        </p>
                    )}
                </div>
                
                <Button type="submit" className="w-full">
                    Submit
                </Button>
            </form>
        </div>
    );
}