import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent } from "@furever/ui/components/card";
import { CheckCircle2, MapPin, Star } from "lucide-react";

const providers = [
    {
        name: "Sarah Johnson",
        location: "Downtown, Seattle",
        rating: 4.9,
        reviews: 127,
        services: ["Dog Walking", "Pet Sitting"],
        verified: true,
        image: "/woman-and-loyal-companion.png",
        price: "$25",
    },
    {
        name: "Michael Chen",
        location: "Capitol Hill, Seattle",
        rating: 5.0,
        reviews: 89,
        services: ["Pet Boarding", "Grooming"],
        verified: true,
        image: "/man-and-cat.png",
        price: "$30",
    },
    {
        name: "Emily Rodriguez",
        location: "Ballard, Seattle",
        rating: 4.8,
        reviews: 156,
        services: ["Training", "Dog Walking"],
        verified: true,
        image: "/woman-with-pets.png",
        price: "$28",
    },
];

export function FeaturedProviders() {
    return (
        <section className="bg-secondary/30 py-20 md:py-28">
            <div className="container mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">{"Meet trusted pet care providers"}</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl text-pretty text-lg">
                        {"Experienced, background-checked providers who will treat your pets like family"}
                    </p>
                </div>

                <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {providers.map((provider) => (
                        <Card key={provider.name} className="overflow-hidden transition-shadow hover:shadow-lg">
                            <div className="bg-muted h-64 bg-cover bg-center" style={{ backgroundImage: `url('${provider.image}')` }} />
                            <CardContent className="p-6">
                                <div className="mb-3 flex items-start justify-between">
                                    <div>
                                        <div className="mb-1 flex items-center gap-2">
                                            <h3 className="text-xl font-semibold">{provider.name}</h3>
                                            {provider.verified && <CheckCircle2 className="text-accent h-5 w-5" />}
                                        </div>
                                        <div className="text-muted-foreground flex items-center text-sm">
                                            <MapPin className="mr-1 h-4 w-4" />
                                            {provider.location}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 text-sm font-medium">
                                            <Star className="fill-primary text-primary h-4 w-4" />
                                            {provider.rating}
                                        </div>
                                        <div className="text-muted-foreground text-xs">{provider.reviews} reviews</div>
                                    </div>
                                </div>

                                <div className="mb-4 flex flex-wrap gap-2">
                                    {provider.services.map((service) => (
                                        <Badge key={service} variant="secondary">
                                            {service}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-primary text-2xl font-bold">{provider.price}</span>
                                        <span className="text-muted-foreground text-sm">/day</span>
                                    </div>
                                    <Button>View Profile</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Button size="lg" variant="outline">
                        View All Providers
                    </Button>
                </div>
            </div>
        </section>
    );
}
