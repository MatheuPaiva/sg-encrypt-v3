import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MapControls from './MapControls';
import NumberedMarker from './NumberedMarker';
import MapPolygon from './MapPolygon';
import MarkedPoints from './MarkedPoints';
import { calculatePerimeter } from '../../utils/mapCalculations';
import { exportMapToPDF } from '../../utils/mapExport';
import { defaultCenter, defaultZoom } from '../../constants/mapSettings';

const MapClickHandler = ({ onMapClick, isMeasuring }: { 
  onMapClick: (latlng: LatLng) => void;
  isMeasuring: boolean;
}) => {
  useMapEvents({
    click(e) {
      if (isMeasuring) {
        onMapClick(e.latlng);
      }
    },
  });
  return null;
};

const MapView: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [markers, setMarkers] = useState<LatLng[]>([]);
  const [perimeter, setPerimeter] = useState<number>(0);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);

  // Obter localização do usuário
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation(new LatLng(latitude, longitude));
        },
        (error) => {
          console.error('Erro ao obter localização do usuário:', error);
          setUserLocation(new LatLng(defaultCenter[0], defaultCenter[1])); // Fallback para o centro padrão
        }
      );
    } else {
      console.warn('Geolocalização não suportada pelo navegador.');
      setUserLocation(new LatLng(defaultCenter[0], defaultCenter[1])); // Fallback para o centro padrão
    }
  }, []);

  const handleMapClick = (latlng: LatLng) => {
    setMarkers((prev) => [...prev, latlng]);
    if (markers.length >= 2) {
      const newPerimeter = calculatePerimeter([...markers, latlng]);
      setPerimeter(newPerimeter);
    }
  };

  const handleStartMeasurement = () => {
    setIsMeasuring(true);
    setMarkers([]);
    setPerimeter(0);
  };

  const handleFinishMeasurement = () => {
    if (markers.length >= 3) {
      setIsMeasuring(false);
      const finalPerimeter = calculatePerimeter([...markers, markers[0]]);
      setPerimeter(finalPerimeter);
    }
  };

  const handleExportPDF = async () => {
    if (!mapRef.current) return;

    try {
      await exportMapToPDF(mapRef.current, markers, perimeter);
    } catch (error) {
      alert('Falha ao exportar PDF. Por favor, tente novamente.');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)]">
      <div className="relative h-[70vh]" ref={mapRef}>
        {userLocation && (
          <MapContainer
            center={userLocation}
            zoom={defaultZoom}
            className="h-full w-full"
          >
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; <a href="https://www.esri.com">Esri</a> &mdash; Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
            />
            <MapClickHandler onMapClick={handleMapClick} isMeasuring={isMeasuring} />

            {markers.map((position, idx) => (
              <NumberedMarker
                key={`${position.lat}-${position.lng}-${idx}`}
                position={position}
                number={idx + 1}
              />
            ))}

            {markers.length >= 3 && <MapPolygon positions={markers} />}
          </MapContainer>
        )}
      </div>

      {/* Controles de Medição */}
      <MapControls
        perimeter={perimeter}
        onStart={handleStartMeasurement}
        onFinish={handleFinishMeasurement}
        onExport={handleExportPDF}
        markersCount={markers.length}
        isMeasuring={isMeasuring}
      />

      {/* Exibição de Pontos Marcados */}
      {markers.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-4 mt-4">
          <MarkedPoints points={markers} />
        </div>
      )}
    </div>
  );
};

export default MapView;
