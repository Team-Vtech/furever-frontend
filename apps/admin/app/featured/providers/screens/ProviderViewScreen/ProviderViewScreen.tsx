"use client";

import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Provider } from "@furever/types";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@furever/ui/components/card";
import { Building2, CalendarDays, Clock, Edit, Mail, MapPin, Phone, Users } from "lucide-react";
import Link from "next/link";
import { ProviderBookingsSection } from "../../components/ProviderBookingsSection/ProviderBookingsSection";
import { ProviderServicesSection } from "../../components/ProviderServicesSection/ProviderServicesSection";
import { ProviderUsersSection } from "../../components/ProviderUsersSection/ProviderUsersSection";

interface ProviderViewScreenProps {
    provider: Provider;
}

export function ProviderViewScreen({ provider }: ProviderViewScreenProps) {
    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case "approved":
                return "default";
            case "pending":
                return "secondary";
            case "rejected":
                return "destructive";
            case "inactive":
                return "outline";
            default:
                return "outline";
        }
    };
    console.log(provider, "provider");
    return (
        <PageLayout
            title={provider.business_name}
            description="Comprehensive provider information and management"
            breadcrumbs={[{ label: "Providers", href: "/providers" }, { label: provider.business_name }]}
            actions={
                <Link href={`/providers/${provider.id}/edit`}>
                    <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Provider
                    </Button>
                </Link>
            }
        >
            <div className="space-y-6">
                {/* Provider Overview Card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <Building2 className="h-5 w-5" />
                                    Provider Information
                                </CardTitle>
                                <CardDescription>Basic information and contact details</CardDescription>
                            </div>
                            <Badge variant={getStatusBadgeVariant(provider.status)}>{provider.status}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div className="space-y-2">
                                <div className="text-muted-foreground flex items-center text-sm">
                                    <Users className="mr-2 h-4 w-4" />
                                    Contact Person
                                </div>
                                <p className="font-medium">{provider.contact_person_name}</p>
                            </div>

                            <div className="space-y-2">
                                <div className="text-muted-foreground flex items-center text-sm">
                                    <Mail className="mr-2 h-4 w-4" />
                                    Email
                                </div>
                                <p className="font-medium">{provider.email}</p>
                            </div>

                            <div className="space-y-2">
                                <div className="text-muted-foreground flex items-center text-sm">
                                    <Phone className="mr-2 h-4 w-4" />
                                    Phone
                                </div>
                                <p className="font-medium">{provider.phone_number}</p>
                            </div>

                            {provider.location && (
                                <div className="space-y-2 md:col-span-2 lg:col-span-3">
                                    <div className="text-muted-foreground flex items-center text-sm">
                                        <MapPin className="mr-2 h-4 w-4" />
                                        Location
                                    </div>
                                    <p className="font-medium">
                                        {provider.location.address}, {provider.location.city}, {provider.location.state}, {provider.location.country}
                                        {provider.location.postal_code && ` ${provider.location.postal_code}`}
                                    </p>
                                </div>
                            )}

                            <div className="space-y-2">
                                <div className="text-muted-foreground flex items-center text-sm">
                                    <CalendarDays className="mr-2 h-4 w-4" />
                                    Registered
                                </div>
                                <p className="font-medium">{new Date(provider.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Working Hours Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Working Hours
                        </CardTitle>
                        <CardDescription>Provider availability and operating schedule</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {provider.working_hours && provider.working_hours.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {provider.working_hours.map((workingHour, index) => (
                                    <div key={index} className="rounded-lg border border-gray-200 p-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium capitalize text-gray-900">{workingHour.day_of_week}</h4>
                                            {workingHour.is_closed && (
                                                <Badge variant="outline" className="border-red-200 text-red-600">
                                                    Closed
                                                </Badge>
                                            )}
                                        </div>

                                        {!workingHour.is_closed && workingHour.start_time && workingHour.end_time && (
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-600">
                                                    {workingHour.start_time} - {workingHour.end_time}
                                                </p>
                                            </div>
                                        )}

                                        {workingHour.notes && (
                                            <div className="mt-2">
                                                <p className="text-xs italic text-gray-500">{workingHour.notes}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-8 text-center">
                                <Clock className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                <p className="text-gray-500">No working hours defined</p>
                                <p className="text-sm text-gray-400">Working hours can be added when editing the provider</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Provider sections */}
                <div className="space-y-6">
                    <ProviderBookingsSection bookings={provider.bookings || []} />

                    <ProviderServicesSection services={provider.services || []} />

                    <ProviderUsersSection users={provider.users || []} />
                </div>
            </div>
        </PageLayout>
    );
}
