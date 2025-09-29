import { AlertCircle, Building2, CheckCircle2, FileText } from "lucide-react";

export function FacilitiesRequirements() {
    const facilities = [
        {
            icon: Building2,
            text: "State-of-the-art grooming facility",
        },
        {
            icon: CheckCircle2,
            text: "Separate play areas for different temperaments",
        },
        {
            icon: CheckCircle2,
            text: "Climate-controlled environment",
        },
    ];

    const requirements = [
        {
            icon: FileText,
            text: "Up-to-date vaccination records",
        },
        {
            icon: AlertCircle,
            text: "Microchip details for identification",
        },
    ];

    return (
        <div className="border-t border-gray-100 bg-gray-50">
            <div className="p-6">
                <h2 className="mb-6 text-xl font-bold text-gray-900">Facilities & Requirements</h2>

                {/* Facilities Section */}
                <div className="mb-8">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Facilities</h3>
                    <div className="space-y-4">
                        {facilities.map((facility, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                <facility.icon className="h-4 w-4 flex-shrink-0 text-purple-600" />
                                <span className="text-sm text-gray-700">{facility.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Requirements Section */}
                <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Requirements</h3>
                    <div className="space-y-4">
                        {requirements.map((requirement, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                <requirement.icon className="h-4 w-4 flex-shrink-0 text-purple-600" />
                                <span className="text-sm text-gray-700">{requirement.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
