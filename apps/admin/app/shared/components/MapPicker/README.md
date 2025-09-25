# Map Components for Area Management

This document describes the map components available for managing areas with coordinates and boundaries.

## Components

### 1. MapPicker
A simple map component for selecting coordinates.

**Features:**
- Click to set latitude and longitude
- Visual marker and circular area highlight
- Real-time coordinate display

**Usage:**
```tsx
import { MapPicker } from "@/shared/components/MapPicker";

<MapPicker
  latitude={latitude}
  longitude={longitude}
  onCoordinatesChange={(lat, lng) => {
    setLatitude(lat.toString());
    setLongitude(lng.toString());
  }}
  areaRadius={1000} // Highlight radius in meters
  height="400px"
  zoom={13}
/>
```

### 2. AreaMapPicker
An advanced map component with boundary drawing capabilities.

**Features:**
- Click to set center coordinates
- Draw custom area boundaries
- Visual polygon highlighting
- Fallback to circular area if no boundary is drawn
- Interactive drawing controls

**Usage:**
```tsx
import { AreaMapPicker } from "@/shared/components/MapPicker";

<AreaMapPicker
  latitude={latitude}
  longitude={longitude}
  onCoordinatesChange={(lat, lng) => {
    setLatitude(lat.toString());
    setLongitude(lng.toString());
  }}
  onAreaBoundaryChange={(boundary) => {
    setBoundary(boundary);
  }}
  initialBoundary={existingBoundary}
  areaRadius={2000} // Default radius when no boundary is drawn
  height="500px"
  zoom={13}
/>
```

## Area Form Integration

The AreaForm component now includes:

1. **Interactive Map Section**: 
   - Visual map with coordinate selection
   - Boundary drawing capabilities
   - Real-time form field updates

2. **Coordinate Fields**: 
   - Latitude and longitude inputs
   - Automatically updated when map is clicked
   - Manual entry still supported

3. **Boundary Data**: 
   - Optional polygon boundary storage
   - JSON array of coordinate pairs
   - Fallback to circular area display

## How to Highlight Areas

### Circular Areas
Areas are highlighted using circles by default:
- Center point from latitude/longitude
- Configurable radius (in meters)
- Blue semi-transparent fill

### Custom Boundaries
Draw custom area boundaries:
1. Click "Draw Area Boundary" button
2. Click on map to add points (minimum 3)
3. Click "Finish Drawing" to complete
4. Green polygon highlights the area

### Visual Indicators
- **Blue Circle**: Default circular area
- **Green Polygon**: Custom drawn boundary
- **Orange Dashed**: Temporary boundary while drawing
- **Marker**: Center point of the area

## Data Structure

### Form Schema
```typescript
{
  latitude: string (optional)
  longitude: string (optional)
  boundary: Array<[number, number]> (optional)
  // ... other area fields
}
```

### Boundary Format
```typescript
// Example boundary (triangle)
[
  [31.9454, 35.9284], // Point 1: [lat, lng]
  [31.9464, 35.9294], // Point 2: [lat, lng]
  [31.9444, 35.9294], // Point 3: [lat, lng]
]
```

## Installation Requirements

Required packages:
```bash
pnpm add leaflet react-leaflet @types/leaflet
```

Required CSS (added to layout.tsx):
```typescript
import "leaflet/dist/leaflet.css";
```

## Best Practices

1. **Default Center**: Uses Amman, Jordan (31.9454, 35.9284) as default
2. **Area Radius**: Recommended 1-5km for city areas
3. **Boundary Points**: Minimum 3 points, recommended 5-10 for accuracy
4. **Zoom Level**: 13-15 for area-level detail
5. **Height**: 400-500px for good user experience

## Troubleshooting

### Markers Not Showing
- Ensure leaflet CSS is imported
- Check leaflet-config.ts is imported
- Verify map is not in SSR context

### Map Not Loading
- Component uses dynamic imports for SSR compatibility
- Shows loading message while mounting
- Check console for JavaScript errors

### Coordinates Not Updating
- Verify onCoordinatesChange callback is provided
- Check form setValue calls are working
- Ensure latitude/longitude are watched values
