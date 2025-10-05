"use client";

import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Provider } from "@furever/types";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@furever/ui/components/card";
import { Building2, CalendarDays, Edit, Mail, MapPin, Phone, Users } from "lucide-react";
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

                {/* Provider sections */}
                <div className="space-y-6">
                    <ProviderBookingsSection bookings={provider.bookings || []} />

                    <ProviderServicesSection services={provider.services || []} />

                    <ProviderUsersSection users={provider.users || []} />

                    {/* <ProviderDocumentsSection documents={documents} /> */}
                </div>
            </div>
        </PageLayout>
    );
}
