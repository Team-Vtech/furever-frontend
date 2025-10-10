"use client";

import { PhoneInput } from "@/app/shared/components/PhoneInput/PhoneInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { User } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@furever/ui/components/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { getProfileDefaultValues, ProfileFormValues, profileSchema } from "../../../../(routes)/api/settings/profile/profile.schema";
import { useUpdateProfileMutation } from "../../hooks/use-profile.hooks";
import { ProfileImageUpload } from "../ProfileImageUpload/ProfileImageUpload";

interface ProfileFormProps {
    user?: User;
    onSuccess?: () => void;
}

export function ProfileForm({ user, onSuccess }: ProfileFormProps) {
    const updateProfileMutation = useUpdateProfileMutation();

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: getProfileDefaultValues(user),
    });

    React.useEffect(() => {
        if (user) {
            form.reset(getProfileDefaultValues(user));
        }
    }, [user, form]);

    const onSubmit = async (data: ProfileFormValues) => {
        try {
            await updateProfileMutation.mutateAsync(data);
            onSuccess?.();
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Profile Image Section */}
                <ProfileImageUpload
                    user={user}
                    onImageUpdate={(imageId) => {
                        form.setValue("profile_image_id", imageId);
                    }}
                />

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Form Fields */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <TextInput control={form.control} name="name" label="Full Name" placeholder="Enter your full name" />

                        <TextInput control={form.control} name="email" label="Email Address" type="email" placeholder="Enter your email" />

                        <PhoneInput control={form.control} name="phone" label="Phone Number" placeholder="Enter your phone number" />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4">
                        <Button type="button" variant="outline" onClick={() => form.reset(getProfileDefaultValues(user))}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={updateProfileMutation.isPending} className="min-w-[120px]">
                            {updateProfileMutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                "Update Profile"
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
