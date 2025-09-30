import React from 'react';
import { Polygon } from 'react-leaflet';
import { LatLng } from 'leaflet';

interface MapPolygonProps {
  positions: LatLng[];
}

const MapPolygon: React.FC<MapPolygonProps> = ({ positions }) => {
  return (
    <Polygon 
      positions={positions}
      pathOptions={{
        color: 'blue',
        weight: 2,
        fillOpacity: 0.2
      }}
    />
  );
};

export default MapPolygon;