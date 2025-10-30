"use client";

import { ProvidersClient } from "@/app/featured/explore/clients/providers.client";
import { Provider } from "@furever/types";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent } from "@furever/ui/components/card";
import { Skeleton } from "@furever/ui/components/skeleton";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, MapPin, Star } from "lucide-react";
import Link from "next/link";

export function FeaturedProviders() {
    // Fetch providers with pagination: 3 per page, page 1 only
    const { data: providersData, isLoading } = useQuery({
        queryKey: ["featured-providers", "page=1&limit=3"],
        queryFn: () =>
            ProvidersClient.getProviders({
                queryKey: ["featured-providers", "page=1&limit=3"],
            }),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const providers = providersData?.data?.data?.data || [];

    if (isLoading) {
        return (
            <section className="py-section bg-secondary/30">
                <div className="container mx-auto">
                    <div className="mb-6 text-center">
                        <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">{"Meet trusted pet care providers"}</h2>
                        <p className="text-muted-foreground mx-auto max-w-2xl text-pretty text-lg">
                            {"Experienced, background-checked providers who will treat your pets like family"}
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[...Array(3)].map((_, i) => (
                            <Card key={i} className="overflow-hidden">
                                <Skeleton className="h-64 w-full" />
                                <CardContent className="p-6">
                                    <div className="mb-3 flex items-start justify-between">
                                        <div className="flex-1">
                                            <Skeleton className="mb-2 h-6 w-32" />
                                            <Skeleton className="h-4 w-24" />
                                        </div>
                                        <div className="text-right">
                                            <Skeleton className="mb-1 h-4 w-12" />
                                            <Skeleton className="h-3 w-16" />
                                        </div>
                                    </div>
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        <Skeleton className="h-6 w-20" />
                                        <Skeleton className="h-6 w-16" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Skeleton className="h-8 w-16" />
                                        <Skeleton className="h-10 w-24" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center">
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/explore">View All Providers</Link>
                        </Button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-section bg-secondary/30">
            <div className="container mx-auto">
                <div className="mb-6 text-center">
                    <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">{"Meet trusted pet care providers"}</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl text-pretty text-lg">
                        {"Experienced, background-checked providers who will treat your pets like family"}
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {providers.length === 0 ? (
                        <div className="col-span-full py-12 text-center">
                            <p className="text-muted-foreground">No providers available at the moment.</p>
                        </div>
                    ) : (
                        providers.map((provider: Provider) => (
                            <Card key={provider.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                                <div
                                    className="bg-muted h-64 bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url('${provider.media_object?.file_url || "/placeholder-provider.jpg"}')`,
                                    }}
                                />
                                <CardContent className="p-6">
                                    <div className="mb-3 flex items-start justify-between">
                                        <div>
                                            <div className="mb-1 flex items-center gap-2">
                                                <h3 className="text-xl font-semibold">{provider.business_name}</h3>
                                                {provider.status === "approved" && <CheckCircle2 className="text-accent h-5 w-5" />}
                                            </div>
                                            <div className="text-muted-foreground flex items-center text-sm">
                                                <MapPin className="mr-1 h-4 w-4" />
                                                {provider.location?.city}, {provider.location?.state}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-1 text-sm font-medium">
                                                <Star className="fill-primary text-primary h-4 w-4" />
                                                {provider.reviews_average?.toFixed(1) || "N/A"}
                                            </div>
                                            <div className="text-muted-foreground text-xs">{provider.reviews_count || 0} reviews</div>
                                        </div>
                                    </div>

                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {provider.services?.slice(0, 3).map((service) => (
                                            <Badge key={service.id} variant="secondary">
                                                {service.name}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-primary text-2xl font-bold">₹{provider.services?.[0]?.price || "Contact"}</span>
                                            <span className="text-muted-foreground text-sm">/service</span>
                                        </div>
                                        <Button asChild>
                                            <Link href={`/providers/${provider.id}`}>View Profile</Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                <div className="mt-4 text-center">
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/explore">View All Providers</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
