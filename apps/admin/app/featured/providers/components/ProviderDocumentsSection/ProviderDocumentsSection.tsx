import { ProviderCertificate } from "@furever/types";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@furever/ui/components/card";
import { Skeleton } from "@furever/ui/components/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@furever/ui/components/table";
import { CalendarDays, Download, FileText, ExternalLink } from "lucide-react";
import Link from "next/link";

interface ProviderDocumentsSectionProps {
    providerId: number;
    documents: ProviderCertificate[];
    isLoading: boolean;
}

export function ProviderDocumentsSection({ providerId, documents, isLoading }: ProviderDocumentsSectionProps) {
    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'active':
            case 'verified':
                return 'default';
            case 'pending':
                return 'secondary';
            case 'expired':
            case 'rejected':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const isExpired = (expiresAt: string) => {
        return new Date(expiresAt) < new Date();
    };

    const isExpiringSoon = (expiresAt: string) => {
        const expiryDate = new Date(expiresAt);
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
        return expiryDate <= thirtyDaysFromNow && expiryDate > new Date();
    };

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Documents
                    </CardTitle>
                    <CardDescription>Certificates and documents for this provider</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-16 w-full" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Documents ({documents.length})
                </CardTitle>
                <CardDescription>Certificates and documents for this provider</CardDescription>
            </CardHeader>
            <CardContent>
                {documents.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        No documents found for this provider.
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Certificate</TableHead>
                                <TableHead>Number</TableHead>
                                <TableHead>Issued By</TableHead>
                                <TableHead>Issued Date</TableHead>
                                <TableHead>Expires</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {documents.map((doc) => {
                                const expired = isExpired(doc.expires_at);
                                const expiringSoon = isExpiringSoon(doc.expires_at);
                                
                                return (
                                    <TableRow key={doc.id}>
                                        <TableCell className="font-medium">
                                            {doc.certificate_number}
                                        </TableCell>
                                        <TableCell>{doc.certificate_number}</TableCell>
                                        <TableCell>{doc.issued_by}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <CalendarDays className="h-3 w-3" />
                                                {new Date(doc.issued_at).toLocaleDateString()}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={`flex items-center gap-1 ${
                                                expired ? 'text-destructive' : expiringSoon ? 'text-orange-600' : ''
                                            }`}>
                                                <CalendarDays className="h-3 w-3" />
                                                {new Date(doc.expires_at).toLocaleDateString()}
                                                {expired && <span className="text-xs">(Expired)</span>}
                                                {expiringSoon && !expired && <span className="text-xs">(Soon)</span>}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusBadgeVariant(
                                                expired ? 'expired' : doc.status
                                            )}>
                                                {expired ? 'expired' : doc.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {doc.media_object && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link 
                                                            href={doc.media_object.url} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                        >
                                                            <Download className="h-3 w-3 mr-1" />
                                                            View
                                                        </Link>
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link href={`/certificates/${doc.id}`}>
                                                        <ExternalLink className="h-3 w-3" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}