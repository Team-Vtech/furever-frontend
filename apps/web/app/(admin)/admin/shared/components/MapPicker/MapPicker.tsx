"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { LatLng } from "leaflet";
import "./leaflet-config"; // Import leaflet configuration

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const Circle = dynamic(
  () => import("react-leaflet").then((mod) => mod.Circle),
  { ssr: false }
);

const MapEventsHandler = dynamic(
  () => import("./MapEventsHandler").then((mod) => mod.MapEventsHandler),
  { ssr: false }
);

interface MapPickerProps {
  latitude?: string | number;
  longitude?: string | number;
  onCoordinatesChange?: (lat: number, lng: number) => void;
  height?: string;
  zoom?: number;
  areaRadius?: number; // Radius in meters to highlight the area
}

export const MapPicker = ({
  latitude,
  longitude,
  onCoordinatesChange,
  height = "400px",
  zoom = 13,
  areaRadius = 1000, // Default 1km radius
}: MapPickerProps) => {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const mapRef = useRef<any>(null);

  // Default to Amman, Jordan if no coordinates provided
  const defaultCenter: [number, number] = [31.9454, 35.9284];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      const lat =
        typeof latitude === "string" ? parseFloat(latitude) : latitude;
      const lng =
        typeof longitude === "string" ? parseFloat(longitude) : longitude;

      if (!isNaN(lat) && !isNaN(lng)) {
        setPosition([lat, lng]);
      }
    }
  }, [latitude, longitude]);

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);
    onCoordinatesChange?.(lat, lng);
  };

  if (!mounted) {
    return (
      <div
        className="bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center"
        style={{ height }}
      >
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  const center = position || defaultCenter;

  return (
    <div className="w-full border border-gray-300 rounded-md overflow-hidden">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height, width: "100%" }}
        ref={mapRef}
      >
        <MapEventsHandler onMapClick={handleMapClick} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {position && (
          <>
            <Marker position={position}>
              <Popup>
                <div className="text-center">
                  <p className="font-semibold">Selected Location</p>
                  <p className="text-sm text-gray-600">
                    Lat: {position[0].toFixed(6)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Lng: {position[1].toFixed(6)}
                  </p>
                </div>
              </Popup>
            </Marker>

            {/* Circle to highlight the area */}
            <Circle
              center={position}
              radius={areaRadius}
              pathOptions={{
                fillColor: "#3b82f6",
                fillOpacity: 0.2,
                color: "#3b82f6",
                weight: 2,
                opacity: 0.8,
              }}
            />
          </>
        )}
      </MapContainer>

      {position && (
        <div className="p-3 bg-gray-50 border-t">
          <p className="text-sm text-gray-600">
            Selected coordinates: {position[0].toFixed(6)},{" "}
            {position[1].toFixed(6)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Area radius: {areaRadius}m (highlighted in blue)
          </p>
        </div>
      )}
    </div>
  );
};
