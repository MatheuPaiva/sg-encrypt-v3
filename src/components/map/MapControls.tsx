import React from 'react';

interface MapControlsProps {
  perimeter: number;
  onStart: () => void;
  onFinish: () => void;
  onExport: () => void;
  markersCount: number;
  isMeasuring: boolean;
}

const MapControls: React.FC<MapControlsProps> = ({
  perimeter,
  onStart,
  onFinish,
  onExport,
  markersCount,
  isMeasuring,
}) => {
  return (
    <div className="absolute right-4 top-4 flex flex-col gap-2 z-30">
      {!isMeasuring ? (
        <button
          onClick={onStart}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Iniciar Medição
        </button>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700">
              Perímetro: {perimeter.toFixed(2)} km
            </p>
            <p className="text-xs text-gray-500">
              Pontos marcados: {markersCount}
            </p>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={onFinish}
              disabled={markersCount < 3}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Finalizar Medição
            </button>
            
            {perimeter > 0 && (
              <button
                onClick={onExport}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
              >
                Exportar PDF
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapControls;