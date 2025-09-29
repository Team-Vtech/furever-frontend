import { Card } from "@furever/ui/components/card";

interface InsightsCardProps {
    serviceStats: {
        service_id: number;
        name: string;
        count: number;
    }[];
}

export function InsightsCard({ serviceStats }: InsightsCardProps) {
    return (
        <Card className="border border-gray-200 bg-white p-12 shadow-sm">
            <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900">Insights</h3>

                <div className="space-y-6">
                    <div>
                        <h4 className="mb-4 text-lg font-medium text-gray-900">Most Reviewed Services</h4>
                        <div className="space-y-3">
                            {serviceStats.map((service, index) => (
                                <div key={index} className="text-sm text-gray-900">
                                    {service.name} ({service.count} reviews)
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
