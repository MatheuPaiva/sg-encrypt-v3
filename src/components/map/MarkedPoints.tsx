import React from "react";
import { LatLng } from "leaflet";

interface MarkedPointsProps {
  points: LatLng[];
}

const MarkedPoints: React.FC<MarkedPointsProps> = ({ points }) => {
  if (points.length === 0) return null;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-4">Pontos Marcados</h3>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        style={{
          maxHeight: "80px", // Define uma altura máxima
          overflowY: "auto", // Adiciona scroll vertical
        }}
      >
        {points.map((point, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg">
            <h4 className="font-medium text-blue-600">Ponto {index + 1}</h4>
            <div className="text-sm text-gray-600">
              <p>Latitude: {point.lat.toFixed(6)}°</p>
              <p>Longitude: {point.lng.toFixed(6)}°</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarkedPoints;
