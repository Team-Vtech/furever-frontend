"use client";

import { useMapEvents } from "react-leaflet";

interface MapEventsHandlerProps {
  onMapClick: (e: any) => void;
}

export const MapEventsHandler = ({ onMapClick }: MapEventsHandlerProps) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e);
    },
  });

  return null;
};
