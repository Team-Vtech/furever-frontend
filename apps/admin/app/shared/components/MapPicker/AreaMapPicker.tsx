"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@furever/ui/components/button";
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

const Polygon = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polygon),
  { ssr: false }
);

const MapEventsHandler = dynamic(
  () => import("./MapEventsHandler").then((mod) => mod.MapEventsHandler),
  { ssr: false }
);

interface AreaMapPickerProps {
  latitude?: string | number;
  longitude?: string | number;
  onCoordinatesChange?: (lat: number, lng: number) => void;
  height?: string;
  zoom?: number;
  areaRadius?: number;
  onAreaBoundaryChange?: (boundary: Array<[number, number]>) => void;
  initialBoundary?: Array<[number, number]>;
}

export const AreaMapPicker = ({
  latitude,
  longitude,
  onCoordinatesChange,
  height = "500px",
  zoom = 13,
  areaRadius = 1000,
  onAreaBoundaryChange,
  initialBoundary,
}: AreaMapPickerProps) => {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [areaBoundary, setAreaBoundary] = useState<Array<[number, number]>>(
    initialBoundary || []
  );
  const [tempBoundary, setTempBoundary] = useState<Array<[number, number]>>([]);
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

    if (isDrawingMode) {
      // Add point to temporary boundary
      setTempBoundary((prev) => [...prev, [lat, lng]]);
    } else {
      // Set center position
      setPosition([lat, lng]);
      onCoordinatesChange?.(lat, lng);
    }
  };

  const finishDrawing = () => {
    if (tempBoundary.length >= 3) {
      setAreaBoundary([...tempBoundary]);
      onAreaBoundaryChange?.([...tempBoundary]);
      setTempBoundary([]);
      setIsDrawingMode(false);
    }
  };

  const cancelDrawing = () => {
    setTempBoundary([]);
    setIsDrawingMode(false);
  };

  const clearBoundary = () => {
    setAreaBoundary([]);
    setTempBoundary([]);
    onAreaBoundaryChange?.([]);
  };

  const startDrawing = () => {
    setIsDrawingMode(true);
    setTempBoundary([]);
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
      {/* Map Controls */}
      <div className="p-3 bg-gray-50 border-b flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={startDrawing}
          disabled={isDrawingMode}
        >
          {isDrawingMode ? "Drawing..." : "Draw Area Boundary"}
        </Button>

        {isDrawingMode && (
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={finishDrawing}
              disabled={tempBoundary.length < 3}
            >
              Finish Drawing ({tempBoundary.length} points)
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={cancelDrawing}
            >
              Cancel
            </Button>
          </>
        )}

        {areaBoundary.length > 0 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={clearBoundary}
          >
            Clear Boundary
          </Button>
        )}
      </div>

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

        {/* Center marker */}
        {position && (
          <Marker position={position}>
            <Popup>
              <div className="text-center">
                <p className="font-semibold">Area Center</p>
                <p className="text-sm text-gray-600">
                  Lat: {position[0].toFixed(6)}
                </p>
                <p className="text-sm text-gray-600">
                  Lng: {position[1].toFixed(6)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Radius circle (fallback if no boundary is drawn) */}
        {position && areaBoundary.length === 0 && (
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
        )}

        {/* Area boundary polygon */}
        {areaBoundary.length >= 3 && (
          <Polygon
            positions={areaBoundary}
            pathOptions={{
              fillColor: "#10b981",
              fillOpacity: 0.3,
              color: "#10b981",
              weight: 3,
              opacity: 0.8,
            }}
          />
        )}

        {/* Temporary boundary while drawing */}
        {tempBoundary.length >= 3 && (
          <Polygon
            positions={tempBoundary}
            pathOptions={{
              fillColor: "#f59e0b",
              fillOpacity: 0.2,
              color: "#f59e0b",
              weight: 2,
              opacity: 0.8,
              dashArray: "5, 5",
            }}
          />
        )}

        {/* Show temporary points while drawing */}
        {tempBoundary.map((point, index) => (
          <Circle
            key={index}
            center={point}
            radius={50}
            pathOptions={{
              fillColor: "#f59e0b",
              fillOpacity: 0.7,
              color: "#f59e0b",
              weight: 2,
            }}
          />
        ))}
      </MapContainer>

      {/* Info panel */}
      <div className="p-3 bg-gray-50 border-t">
        {position && (
          <p className="text-sm text-gray-600 mb-2">
            Center coordinates: {position[0].toFixed(6)},{" "}
            {position[1].toFixed(6)}
          </p>
        )}

        {areaBoundary.length > 0 ? (
          <p className="text-sm text-green-600">
            Area boundary defined with {areaBoundary.length} points
          </p>
        ) : (
          <p className="text-sm text-blue-600">
            Using circular area with {areaRadius}m radius
          </p>
        )}

        {isDrawingMode && (
          <p className="text-sm text-orange-600 mt-1">
            Click on the map to add boundary points. Need at least 3 points to
            create an area.
          </p>
        )}
      </div>
    </div>
  );
};
