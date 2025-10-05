import { Booking } from "@furever/types";
import { Badge } from "@furever/ui/components/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@furever/ui/components/card";
import { Skeleton } from "@furever/ui/components/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@furever/ui/components/table";
import { CalendarDays, Clock, DollarSign } from "lucide-react";
import Link from "next/link";

interface ProviderBookingsSectionProps {
    bookings: Booking[];
}

export function ProviderBookingsSection({ bookings }: ProviderBookingsSectionProps) {
    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'default';
            case 'pending':
                return 'secondary';
            case 'completed':
                return 'outline';
            case 'cancelled':
                return 'destructive';
            default:
                return 'outline';
        }
    };



    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5" />
                    Bookings ({bookings.length})
                </CardTitle>
                <CardDescription>Recent bookings for this provider</CardDescription>
            </CardHeader>
            <CardContent>
                {bookings.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        No bookings found for this provider.
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Service</TableHead>
                                <TableHead>Pet</TableHead>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Total Price</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell>
                                        <Link href={`/users/${booking.user.id}`} className="font-medium hover:underline">
                                            {booking.user.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/services/${booking.service.id}`} className="hover:underline">
                                            {booking.service.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{booking.pet.name}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 text-sm">
                                            <CalendarDays className="h-3 w-3" />
                                            {new Date(booking.booking_date).toLocaleDateString()}
                                            <Clock className="h-3 w-3 ml-2" />
                                            {booking.booking_time}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <DollarSign className="h-3 w-3" />
                                            {booking.total_price}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusBadgeVariant(booking.status)}>
                                            {booking.status}
                                        </Badge>
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