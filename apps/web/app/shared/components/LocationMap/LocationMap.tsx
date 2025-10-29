"use client";

import { Button } from "@furever/ui/components/button";
import { MapPin, Navigation } from "lucide-react";
import { useEffect, useState } from "react";

interface LocationMapProps {
    latitude?: number;
    longitude?: number;
    onLocationChange: (latitude: number, longitude: number) => void;
    address?: string;
}

export function LocationMap({ latitude, longitude, onLocationChange }: LocationMapProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [manualLatitude, setManualLatitude] = useState<string>(latitude?.toString() || "");
    const [manualLongitude, setManualLongitude] = useState<string>(longitude?.toString() || "");

    const getCurrentLocation = () => {
        setIsLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            setError("Geolocation is not supported by this browser.");
            setIsLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude: lat, longitude: lng } = position.coords;
                onLocationChange(lat, lng);
                setManualLatitude(lat.toString());
                setManualLongitude(lng.toString());
                setIsLoading(false);
            },
            (error) => {
                let errorMessage = "Unable to retrieve your location.";
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Location access denied by user.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "Location request timed out.";
                        break;
                }
                setError(errorMessage);
                setIsLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000, // 5 minutes
            },
        );
    };

    const handleManualLocationUpdate = () => {
        const lat = parseFloat(manualLatitude);
        const lng = parseFloat(manualLongitude);

        if (isNaN(lat) || isNaN(lng)) {
            setError("Please enter valid latitude and longitude values.");
            return;
        }

        if (lat < -90 || lat > 90) {
            setError("Latitude must be between -90 and 90.");
            return;
        }

        if (lng < -180 || lng > 180) {
            setError("Longitude must be between -180 and 180.");
            return;
        }

        setError(null);
        onLocationChange(lat, lng);
    };

    const openInGoogleMaps = () => {
        if (latitude && longitude) {
            const mapUrl = `https://www.google.com/maps/@${latitude},${longitude},15z`;
            window.open(mapUrl, "_blank");
        }
    };

    useEffect(() => {
        if (latitude && longitude) {
            setManualLatitude(latitude.toString());
            setManualLongitude(longitude.toString());
        }
    }, [latitude, longitude]);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Location on Map</label>
                <div className="flex gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={getCurrentLocation} disabled={isLoading} className="text-xs">
                        <Navigation className="mr-1 h-3 w-3" />
                        {isLoading ? "Getting..." : "Use Current Location"}
                    </Button>
                    {latitude && longitude && (
                        <Button type="button" variant="outline" size="sm" onClick={openInGoogleMaps} className="text-xs">
                            <MapPin className="mr-1 h-3 w-3" />
                            View on Google Maps
                        </Button>
                    )}
                </div>
            </div>

            {/* Google Maps Embed */}
            {latitude && longitude ? (
                <div className="relative h-64 w-full overflow-hidden rounded-lg border">
                    <iframe
                        src={`https://www.google.com/maps/embed/v1/place?key=&q=${latitude},${longitude}&zoom=15`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Location Map"
                    />
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute left-2 top-2 rounded bg-white px-2 py-1 text-xs shadow-sm">
                            <MapPin className="mr-1 inline h-3 w-3" />
                            Click to pin location
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex h-64 w-full items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
                    <div className="text-center">
                        <MapPin className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                        <p className="text-sm text-gray-500">No location selected</p>
                        <p className="mt-1 text-xs text-gray-400">Use current location or enter coordinates manually</p>
                    </div>
                </div>
            )}

            {/* Manual Coordinate Input */}
            <div className="space-y-3">
                <div className="text-sm font-medium text-gray-700">Or enter coordinates manually:</div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">Latitude</label>
                        <input
                            type="number"
                            step="any"
                            value={manualLatitude}
                            onChange={(e) => setManualLatitude(e.target.value)}
                            placeholder="e.g., 40.7128"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">Longitude</label>
                        <input
                            type="number"
                            step="any"
                            value={manualLongitude}
                            onChange={(e) => setManualLongitude(e.target.value)}
                            placeholder="e.g., -74.0060"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={handleManualLocationUpdate} className="w-full">
                    Update Location
                </Button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="rounded-md border border-red-200 bg-red-50 p-3">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            {/* Current Coordinates Display */}
            {latitude && longitude && (
                <div className="rounded-md border border-green-200 bg-green-50 p-3">
                    <div className="flex items-center text-sm text-green-700">
                        <MapPin className="mr-1 h-3 w-3" />
                        Current location: {latitude.toFixed(6)}, {longitude.toFixed(6)}
                    </div>
                </div>
            )}
        </div>
    );
}
