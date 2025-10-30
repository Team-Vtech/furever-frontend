"use client";

import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { CardContent, CardHeader } from "@furever/ui/components/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@furever/ui/components/dropdown-menu";
import { Input } from "@furever/ui/components/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@furever/ui/components/table";
import { cn } from "@furever/ui/lib/utils";
import { CheckCircle, Clock, Filter, MoreHorizontal, Search, X } from "lucide-react";
import { useState } from "react";

interface Appointment {
    id: string;
    date: string;
    time: string;
    clientName: string;
    clientEmail: string;
    petName: string;
    petType: string;
    service: string;
    status: "confirmed" | "pending" | "cancelled";
    price: number;
}

interface AppointmentsTableProps {
    className?: string;
}

const mockAppointments: Appointment[] = [
    {
        id: "1",
        date: "2024-12-17",
        time: "10:00 AM",
        clientName: "Emily Smith",
        clientEmail: "emily.smith@email.com",
        petName: "Buddy",
        petType: "Dog",
        service: "Full Grooming",
        status: "confirmed",
        price: 75,
    },
    {
        id: "2",
        date: "2024-12-17",
        time: "11:30 AM",
        clientName: "John Doe",
        clientEmail: "john.doe@email.com",
        petName: "Mittens",
        petType: "Cat",
        service: "Vaccination",
        status: "pending",
        price: 50,
    },
    {
        id: "3",
        date: "2024-12-17",
        time: "02:00 PM",
        clientName: "Sarah Johnson",
        clientEmail: "sarah.johnson@email.com",
        petName: "Rocky",
        petType: "Hamster",
        service: "Health Check-up",
        status: "confirmed",
        price: 35,
    },
    {
        id: "4",
        date: "2024-12-18",
        time: "09:00 AM",
        clientName: "Michael Brown",
        clientEmail: "michael.brown@email.com",
        petName: "Luna",
        petType: "Cat",
        service: "Nail Trim",
        status: "confirmed",
        price: 25,
    },
    {
        id: "5",
        date: "2024-12-18",
        time: "10:30 AM",
        clientName: "Lisa Wilson",
        clientEmail: "lisa.wilson@email.com",
        petName: "Max",
        petType: "Dog",
        service: "Dental Cleaning",
        status: "pending",
        price: 90,
    },
    {
        id: "6",
        date: "2024-12-18",
        time: "03:00 PM",
        clientName: "David Lee",
        clientEmail: "david.lee@email.com",
        petName: "Whiskers",
        petType: "Cat",
        service: "Vaccination",
        status: "cancelled",
        price: 50,
    },
];

export function AppointmentsTable({ className }: AppointmentsTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const filteredAppointments = mockAppointments.filter((appointment) => {
        const matchesSearch =
            appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.service.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "confirmed":
                return <CheckCircle className="h-4 w-4" />;
            case "pending":
                return <Clock className="h-4 w-4" />;
            case "cancelled":
                return <X className="h-4 w-4" />;
            default:
                return null;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "confirmed":
                return "bg-green-100 text-green-800 border-green-200";
            case "pending":
                return "bg-orange-100 text-orange-800 border-orange-200";
            case "cancelled":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    return (
        <div className={cn("", className)}>
            <CardHeader>
                <div className="mt-4 flex items-center gap-4">
                    <div className="relative max-w-sm flex-1">
                        <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                        <Input
                            placeholder="Search appointments..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <Filter className="mr-2 h-4 w-4" />
                                Status: {statusFilter === "all" ? "All" : statusFilter}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setStatusFilter("all")}>All</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setStatusFilter("confirmed")}>Confirmed</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>Cancelled</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>

            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Pet</TableHead>
                                <TableHead>Service</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAppointments.map((appointment) => (
                                <TableRow key={appointment.id}>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{new Date(appointment.date).toLocaleDateString()}</div>
                                            <div className="text-muted-foreground text-sm">{appointment.time}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{appointment.clientName}</div>
                                            <div className="text-muted-foreground text-sm">{appointment.clientEmail}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{appointment.petName}</div>
                                            <div className="text-muted-foreground text-sm">{appointment.petType}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{appointment.service}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={cn("flex w-fit items-center gap-1", getStatusColor(appointment.status))}>
                                            {getStatusIcon(appointment.status)}
                                            {appointment.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">₹{appointment.price}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>Confirm</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">Cancel</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </div>
    );
}
