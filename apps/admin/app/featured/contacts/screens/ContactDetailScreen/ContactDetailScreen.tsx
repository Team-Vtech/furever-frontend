"use client";

import { Contact } from "@furever/types/index";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@furever/ui/components/card";
import { useQueryClient } from "@tanstack/react-query";
import { Calendar, Mail, MessageSquare, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ContactsClient } from "../../clients/contacts.client";

interface ContactDetailScreenProps {
    contact: Contact;
}

export function ContactDetailScreen({ contact }: ContactDetailScreenProps) {
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();

    const handleMarkAsRead = async () => {
        setIsLoading(true);
        try {
            await ContactsClient.markAsRead(contact.id.toString());
            toast.success("Contact marked as read");
            queryClient.invalidateQueries({ queryKey: ["list-contacts"] });
        } catch (error) {
            toast.error("Failed to mark as read");
        } finally {
            setIsLoading(false);
        }
    };

    const handleMarkAsUnread = async () => {
        setIsLoading(true);
        try {
            await ContactsClient.markAsUnread(contact.id.toString());
            toast.success("Contact marked as unread");
            queryClient.invalidateQueries({ queryKey: ["list-contacts"] });
        } catch (error) {
            toast.error("Failed to mark as unread");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Contact Header */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                {contact.name}
                                {contact.status === "unread" && <div className="h-2 w-2 rounded-full bg-blue-500" />}
                            </CardTitle>
                            <CardDescription>Contact submitted on {new Date(contact.created_at).toLocaleDateString()}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant={contact.status === "read" ? "success" : "warning"}>{contact.status === "read" ? "Read" : "Unread"}</Badge>
                            {contact.status === "unread" ? (
                                <Button onClick={handleMarkAsRead} disabled={isLoading}>
                                    Mark as Read
                                </Button>
                            ) : (
                                <Button variant="outline" onClick={handleMarkAsUnread} disabled={isLoading}>
                                    Mark as Unread
                                </Button>
                            )}
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Contact Information */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="h-5 w-5" />
                            Contact Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-500">Email</label>
                            <div className="mt-1 flex items-center gap-2">
                                <a href={`mailto:${contact.email}`} className="text-blue-600 underline hover:text-blue-800">
                                    {contact.email}
                                </a>
                                <Button size="sm" variant="outline" asChild>
                                    <a href={`mailto:${contact.email}`}>
                                        <Mail className="h-4 w-4" />
                                    </a>
                                </Button>
                            </div>
                        </div>

                        {contact.phone && (
                            <div>
                                <label className="text-sm font-medium text-gray-500">Phone</label>
                                <div className="mt-1 flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    <a href={`tel:${contact.phone}`} className="text-blue-600 underline hover:text-blue-800">
                                        {contact.phone}
                                    </a>
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="text-sm font-medium text-gray-500">Subject</label>
                            <p className="mt-1 font-medium">{contact.subject}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Timeline
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-500">Created</label>
                            <p className="mt-1">{new Date(contact.created_at).toLocaleString()}</p>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-500">Last Updated</label>
                            <p className="mt-1">{new Date(contact.updated_at).toLocaleString()}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Message */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Message
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-lg bg-gray-50 p-4">
                        <p className="whitespace-pre-wrap">{contact.message}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
