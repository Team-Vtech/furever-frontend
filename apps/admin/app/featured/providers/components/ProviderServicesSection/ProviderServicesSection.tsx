import { Service } from "@furever/types";
import { Badge } from "@furever/ui/components/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@furever/ui/components/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@furever/ui/components/table";
import { Clock, DollarSign, Wrench } from "lucide-react";
import Link from "next/link";

interface ProviderServicesSectionProps {
    services: Service[];
}

export function ProviderServicesSection({ services }: ProviderServicesSectionProps) {
    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case "active":
                return "default";
            case "disabled":
                return "secondary";
            case "deleted":
                return "destructive";
            default:
                return "outline";
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-5 w-5" />
                    Services ({services.length})
                </CardTitle>
                <CardDescription>Services offered by this provider</CardDescription>
            </CardHeader>
            <CardContent>
                {services.length === 0 ? (
                    <div className="text-muted-foreground py-8 text-center">No services found for this provider.</div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Service Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Pet Types</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {services.map((service) => (
                                <TableRow key={service.id}>
                                    <TableCell>
                                        <Link href={`/services/${service.id}/edit   `} className="font-medium hover:underline">
                                            {service.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate">{service.description}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <DollarSign className="h-3 w-3" />
                                            {service.price}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {service.duration_minutes} min
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {service.pet_types.slice(0, 2).map((petType) => (
                                                <Badge key={petType.id} variant="outline" className="text-xs">
                                                    {petType.name}
                                                </Badge>
                                            ))}
                                            {service.pet_types.length > 2 && (
                                                <Badge variant="outline" className="text-xs">
                                                    +{service.pet_types.length - 2}
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusBadgeVariant(service.status)}>{service.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}
