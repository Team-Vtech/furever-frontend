"use client";

import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Transaction } from "@furever/types/index";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@furever/ui/components/card";
import { Separator } from "@furever/ui/components/separator";
import { format } from "date-fns";
import { AlertCircle, Building, Calendar, CheckCircle, Clock, DollarSign, Download, FileText, Mail, Phone, User, XCircle } from "lucide-react";

// Transaction type based on the new data structure

interface TransactionDetailScreenProps {
    transaction: Transaction;
}

export function TransactionDetailScreen({ transaction }: TransactionDetailScreenProps) {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            case "failed":
                return <XCircle className="h-4 w-4 text-red-600" />;
            case "pending":
                return <AlertCircle className="h-4 w-4 text-yellow-600" />;
            case "refunded":
                return <CheckCircle className="h-4 w-4 text-blue-600" />;
            default:
                return <AlertCircle className="h-4 w-4 text-gray-600" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-800";
            case "failed":
                return "bg-red-100 text-red-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "refunded":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <PageLayout
            title={`Transaction #${transaction.id}`}
            breadcrumbs={[
                { label: "Transactions", href: "/transactions" },
                { label: `Transaction #${transaction.id}`, href: "#" },
            ]}
        >
            <div className="space-y-6">
                {/* Transaction Overview */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <DollarSign className="h-5 w-5" />
                                Transaction Overview
                            </CardTitle>
                            <Badge className={getStatusColor(transaction.status)}>
                                {getStatusIcon(transaction.status)}
                                <span className="ml-1">{transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}</span>
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Transaction ID</label>
                                <p className="font-mono text-sm">#{transaction.id}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Paddle ID</label>
                                <p className="font-mono text-sm">{transaction.paddle_id}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Invoice Number</label>
                                <p className="font-medium">{transaction.invoice_number}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Total Amount</label>
                                <p className="text-lg font-semibold">
                                    {transaction.currency} {Number(transaction.total).toFixed(2)}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Tax Amount</label>
                                <p className="text-muted-foreground text-sm">
                                    {transaction.currency} {Number(transaction.tax).toFixed(2)}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Billed At</label>
                                <p className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    {new Date(transaction.billed_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Created At</label>
                                <p className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(transaction.created_at).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Invoice Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Invoice Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Invoice Number</label>
                                <p className="font-medium">{transaction.invoice_number}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Invoice PDF</label>
                                <div className="flex items-center gap-2">
                                    {transaction.invoicePdf ? (
                                        <Button asChild variant="outline" size="sm">
                                            <a href={transaction.invoicePdf} target="_blank" rel="noopener noreferrer">
                                                <Download className="mr-2 h-4 w-4" />
                                                Download Invoice
                                            </a>
                                        </Button>
                                    ) : (
                                        <span className="text-gray-400">No invoice available</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Customer Information */}
                {transaction.booking?.user && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Customer Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Name</label>
                                    <p className="font-medium">{transaction.booking.user.name}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Email</label>
                                    <p className="flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        {transaction.booking.user.email}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Phone</label>
                                    <p className="flex items-center gap-2">
                                        <Phone className="h-4 w-4" />
                                        {transaction.booking.user.phone}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Status</label>
                                    <Badge variant="outline">{transaction.booking.user.status}</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Booking Information */}
                {transaction.booking && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Booking Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Booking ID</label>
                                    <p className="font-medium">#{transaction.booking.id}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Booking Date</label>
                                    <p className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        {format(new Date(transaction.booking.booking_date), "EEEE, MMMM d, yyyy")} at{" "}
                                        {format(new Date(transaction.booking.booking_time), "hh:mm a")}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Service</label>
                                    <p className="font-medium">{transaction.booking.service.name}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Total Price</label>
                                    <p className="font-semibold">
                                        {transaction.currency} {Number(transaction.booking.total_price).toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            {/* Pet Information */}
                            {transaction.booking.pet && (
                                <div>
                                    <h4 className="mb-2 font-medium">Pet Information</h4>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Pet Name</label>
                                            <p>{transaction.booking.pet.name}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Pet Type</label>
                                            <p>{transaction.booking.pet.pet_type?.name || "N/A"}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Pet Breed</label>
                                            <p>{transaction.booking.pet.pet_breed?.name || "N/A"}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Gender</label>
                                            <p>{transaction.booking.pet.gender}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <Separator />

                            {/* Provider Information */}
                            {transaction.booking.provider && (
                                <div>
                                    <h4 className="mb-2 font-medium">Service Provider</h4>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Business Name</label>
                                            <p className="flex items-center gap-2">
                                                <Building className="h-4 w-4" />
                                                {transaction.booking.provider.business_name}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Contact Person</label>
                                            <p>{transaction.booking.provider.contact_person_name}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Email</label>
                                            <p className="flex items-center gap-2">
                                                <Mail className="h-4 w-4" />
                                                {transaction.booking.provider.email}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Phone</label>
                                            <p className="flex items-center gap-2">
                                                <Phone className="h-4 w-4" />
                                                {transaction.booking.provider.phone_number}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {transaction.booking.notes && (
                                <>
                                    <Separator />
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Booking Notes</label>
                                        <p className="mt-1 rounded-md bg-gray-50 p-3">{transaction.booking.notes}</p>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Transaction Timeline */}
                <Card>
                    <CardHeader>
                        <CardTitle>Transaction Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                                <div>
                                    <p className="font-medium">Transaction Created</p>
                                    <p className="text-sm text-gray-500">{new Date(transaction.created_at).toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-green-600"></div>
                                <div>
                                    <p className="font-medium">Transaction Billed</p>
                                    <p className="text-sm text-gray-500">{new Date(transaction.billed_at).toLocaleString()}</p>
                                </div>
                            </div>

                            {transaction.status === "completed" && (
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-green-600"></div>
                                    <div>
                                        <p className="font-medium">Transaction Completed</p>
                                        <p className="text-sm text-gray-500">Payment successfully processed</p>
                                    </div>
                                </div>
                            )}

                            {transaction.status === "refunded" && (
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-red-600"></div>
                                    <div>
                                        <p className="font-medium">Transaction Refunded</p>
                                        <p className="text-sm text-gray-500">Payment has been refunded</p>
                                    </div>
                                </div>
                            )}

                            {transaction.status === "failed" && (
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-red-600"></div>
                                    <div>
                                        <p className="font-medium">Transaction Failed</p>
                                        <p className="text-sm text-gray-500">Payment processing failed</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </PageLayout>
    );
}
