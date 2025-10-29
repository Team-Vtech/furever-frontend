import { ServiceType } from "@furever/types";
import { Card, CardContent } from "@furever/ui/components/card";
import Image from "next/image";

export type ServicesSectionProps = {
    serviceTypes: ServiceType[];
};

export function ServicesSection({ serviceTypes }: ServicesSectionProps) {
    return (
        <section className="py-section">
            <div className="container mx-auto">
                <div className="mb-6 text-center">
                    <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">{"Services for every pet and owner"}</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl text-pretty text-lg">
                        {"From daily walks to overnight stays, find the perfect care for your furry friends"}
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {serviceTypes.map((type) => (
                        <Card key={type.id} className="hover:border-primary group cursor-pointer border-2 p-0 transition-colors">
                            <CardContent className="flex flex-col items-start justify-between gap-y-4 p-6">
                                <div className="bg-primary/10 group-hover:bg-primary/20 mb-4 flex h-16 w-16 items-center justify-center rounded-xl transition-colors">
                                    <div className="relative h-10 w-10">
                                        <Image src={type.media_object?.file_url} alt={type.name} fill />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="mb-2 text-xl font-semibold">{type.name}</h3>
                                    <p className="text-muted-foreground text-pretty text-sm">{type.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
