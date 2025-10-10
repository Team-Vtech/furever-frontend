"use client";

import { Button } from "@furever/ui/components/button";
import { Card, CardContent } from "@furever/ui/components/card";
import { Loader2, User as UserIcon } from "lucide-react";
import { ProfileForm } from "../../components/ProfileForm/ProfileForm";
import { useProfileQuery } from "../../hooks/use-profile.hooks";

export function ProfileUpdateScreen() {
    const { data: profileData, isLoading, error, refetch } = useProfileQuery();

    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="flex items-center space-x-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Loading profile...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <Card>
                <CardContent className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
                    <UserIcon className="h-12 w-12 text-gray-400" />
                    <div className="text-center">
                        <h3 className="mb-1 text-lg font-medium text-gray-900">Failed to load profile</h3>
                        <p className="mb-4 text-gray-500">There was an error loading your profile information.</p>
                        <Button onClick={() => refetch()} variant="outline">
                            Try Again
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const user = profileData?.data;

    return (
        <ProfileForm
            user={user}
            onSuccess={() => {
                // Optional: Add any additional success actions
                console.log("Profile updated successfully");
            }}
        />
    );
}
