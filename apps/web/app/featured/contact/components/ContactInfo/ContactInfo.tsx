import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@furever/ui/components/card";
import { Mail, MapPin, Phone } from "lucide-react";

export function ContactInfo() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Get in Touch</CardTitle>
                    <CardDescription>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-start space-x-3">
                        <Mail className="mt-1 h-5 w-5 text-purple-600" />
                        <div>
                            <h3 className="font-medium text-gray-900">Email</h3>
                            <p className="text-sm text-gray-600">support@furever.com</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3">
                        <Phone className="mt-1 h-5 w-5 text-purple-600" />
                        <div>
                            <h3 className="font-medium text-gray-900">Phone</h3>
                            <p className="text-sm text-gray-600">1-800-FUREVER</p>
                            <p className="text-sm text-gray-600">(1-800-387-3837)</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3">
                        <MapPin className="mt-1 h-5 w-5 text-purple-600" />
                        <div>
                            <h3 className="font-medium text-gray-900">Address</h3>
                            <p className="text-sm text-gray-600">
                                123 Pet Care Avenue
                                <br />
                                Pet City, PC 12345
                                <br />
                                United States
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Business Hours</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Monday - Friday</span>
                            <span className="font-medium">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Saturday</span>
                            <span className="font-medium">10:00 AM - 4:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Sunday</span>
                            <span className="font-medium">Closed</span>
                        </div>
                    </div>
                    <p className="mt-4 text-xs text-gray-500">Emergency support available 24/7 for urgent pet care needs.</p>
                </CardContent>
            </Card>
        </>
    );
}
