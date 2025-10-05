import { User } from "@furever/types";
import { Badge } from "@furever/ui/components/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@furever/ui/components/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@furever/ui/components/table";
import { Mail, Phone, Users } from "lucide-react";
import Link from "next/link";

interface ProviderUsersSectionProps {
    users: User[];
}

export function ProviderUsersSection({ users }: ProviderUsersSectionProps) {
    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case "active":
                return "default";
            case "inactive":
                return "secondary";
            case "banned":
                return "destructive";
            default:
                return "outline";
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Users ({users.length})
                </CardTitle>
                <CardDescription>Customers who have booked services</CardDescription>
            </CardHeader>
            <CardContent>
                {users.length === 0 ? (
                    <div className="text-muted-foreground py-8 text-center">No users found for this provider.</div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Member Since</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <Link href={`/users/${user.id}`} className="font-medium hover:underline">
                                            {user.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-3 w-3" />
                                            <span className="truncate">{user.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-3 w-3" />
                                            {user.phone}
                                        </div>
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate">
                                        {user.location ? `${user.location.city}, ${user.location.area}` : user.address || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusBadgeVariant(user.status)}>{user.status}</Badge>
                                    </TableCell>
                                    <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}
