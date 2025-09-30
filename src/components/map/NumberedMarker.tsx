import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { LatLng, divIcon } from 'leaflet';

interface NumberedMarkerProps {
  position: LatLng;
  number: number;
}

const NumberedMarker: React.FC<NumberedMarkerProps> = ({ position, number }) => {
  const customIcon = divIcon({
    className: 'custom-marker',
    html: `<div class="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">${number}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  return (
    <Marker position={position} icon={customIcon}>
      <Popup>
        <div className="text-sm">
          <p>Ponto {number}</p>
          <p>Latitude: {position.lat.toFixed(6)}°</p>
          <p>Longitude: {position.lng.toFixed(6)}°</p>
        </div>
      </Popup>
    </Marker>
  );
};

export default NumberedMarker;