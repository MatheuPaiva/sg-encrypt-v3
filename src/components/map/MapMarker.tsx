import React from 'react';
import { Marker } from 'react-leaflet';
import { LatLng } from 'leaflet';

interface MapMarkerProps {
  position: LatLng;
  index: number;
}

const MapMarker: React.FC<MapMarkerProps> = ({ position, index }) => {
  return (
    <Marker
      position={position}
      title={`Ponto ${index + 1}`}
    />
  );
};

export default MapMarker;