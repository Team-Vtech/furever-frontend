"use client";

import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@furever/ui/components/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@furever/ui/components/dropdown-menu";
import { Input } from "@furever/ui/components/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@furever/ui/components/table";
import { cn } from "@furever/ui/lib/utils";
import { Edit2, Filter, MoreHorizontal, Pause, Play, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";

interface Service {
    id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    duration: number; // in minutes
    status: "active" | "paused" | "inactive";
    bookingsCount: number;
    revenue: number;
}

interface ServicesTableProps {
    className?: string;
}

const mockServices: Service[] = [
    {
        id: "1",
        name: "Full Grooming",
        category: "Dog Care",
        description: "Complete grooming service including bath, haircut, nail trim, and ear cleaning",
        price: 75,
        duration: 120,
        status: "active",
        bookingsCount: 45,
        revenue: 3375,
    },
    {
        id: "2",
        name: "Vaccination",
        category: "Medical",
        description: "Standard vaccination for dogs and cats",
        price: 50,
        duration: 30,
        status: "active",
        bookingsCount: 32,
        revenue: 1600,
    },
    {
        id: "3",
        name: "Pet Sitting (Daily)",
        category: "Boarding",
        description: "Daily pet sitting service at owner's home",
        price: 40,
        duration: 480,
        status: "paused",
        bookingsCount: 18,
        revenue: 720,
    },
    {
        id: "4",
        name: "Nail Trimming",
        category: "Grooming",
        description: "Professional nail trimming service",
        price: 25,
        duration: 20,
        status: "active",
        bookingsCount: 67,
        revenue: 1675,
    },
    {
        id: "5",
        name: "Dental Cleaning",
        category: "Medical",
        description: "Professional dental cleaning and oral health check",
        price: 90,
        duration: 90,
        status: "active",
        bookingsCount: 23,
        revenue: 2070,
    },
    {
        id: "6",
        name: "Basic Health Check",
        category: "Medical",
        description: "Routine health examination",
        price: 35,
        duration: 45,
        status: "inactive",
        bookingsCount: 12,
        revenue: 420,
    },
];

export function ServicesTable({ className }: ServicesTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");

    const filteredServices = mockServices.filter((service) => {
        const matchesSearch =
            service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" || service.status === statusFilter;
        const matchesCategory = categoryFilter === "all" || service.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-800 border-green-200";
            case "paused":
                return "bg-orange-100 text-orange-800 border-orange-200";
            case "inactive":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const categories = Array.from(new Set(mockServices.map((service) => service.category)));

    return (
        <Card className={cn("", className)}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold">Services Management</CardTitle>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Service
                    </Button>
                </div>

                {/* Filters */}
                <div className="mt-4 flex items-center gap-4">
                    <div className="relative max-w-sm flex-1">
                        <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                        <Input
                            placeholder="Search services..."
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
                            <DropdownMenuItem onClick={() => setStatusFilter("active")}>Active</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setStatusFilter("paused")}>Paused</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>Inactive</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <Filter className="mr-2 h-4 w-4" />
                                Category: {categoryFilter === "all" ? "All" : categoryFilter}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setCategoryFilter("all")}>All</DropdownMenuItem>
                            {categories.map((category) => (
                                <DropdownMenuItem key={category} onClick={() => setCategoryFilter(category)}>
                                    {category}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>

            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Service</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Bookings</TableHead>
                                <TableHead>Revenue</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredServices.map((service) => (
                                <TableRow key={service.id}>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{service.name}</div>
                                            <div className="text-muted-foreground max-w-xs truncate text-sm">{service.description}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="bg-gray-50">
                                            {service.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">${service.price}</TableCell>
                                    <TableCell>
                                        {service.duration >= 60
                                            ? `${Math.floor(service.duration / 60)}h ${service.duration % 60}m`
                                            : `${service.duration}m`}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={cn("capitalize", getStatusColor(service.status))}>
                                            {service.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{service.bookingsCount}</TableCell>
                                    <TableCell className="font-medium">${service.revenue.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem className="flex items-center gap-2">
                                                    <Edit2 className="h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                {service.status === "active" ? (
                                                    <DropdownMenuItem className="flex items-center gap-2">
                                                        <Pause className="h-4 w-4" />
                                                        Pause
                                                    </DropdownMenuItem>
                                                ) : (
                                                    <DropdownMenuItem className="flex items-center gap-2">
                                                        <Play className="h-4 w-4" />
                                                        Activate
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                                                    <Trash2 className="h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Summary Stats */}
                <div className="mt-6 grid grid-cols-4 gap-4">
                    <div className="bg-muted rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold">{filteredServices.length}</div>
                        <div className="text-muted-foreground text-sm">Total Services</div>
                    </div>
                    <div className="bg-muted rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold">{filteredServices.filter((s) => s.status === "active").length}</div>
                        <div className="text-muted-foreground text-sm">Active</div>
                    </div>
                    <div className="bg-muted rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold">{filteredServices.reduce((sum, s) => sum + s.bookingsCount, 0)}</div>
                        <div className="text-muted-foreground text-sm">Total Bookings</div>
                    </div>
                    <div className="bg-muted rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold">${filteredServices.reduce((sum, s) => sum + s.revenue, 0).toLocaleString()}</div>
                        <div className="text-muted-foreground text-sm">Total Revenue</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
