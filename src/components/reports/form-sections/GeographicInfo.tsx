import React, { useEffect, useCallback } from 'react';
import { useGeolocation } from '../../../hooks/useGeolocation';
import { MapPin } from 'lucide-react';

interface GeographicInfoProps {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const GeographicInfo: React.FC<GeographicInfoProps> = ({ formData, onChange }) => {
  const { latitude, longitude, error, loading } = useGeolocation();

  // Only update coordinates if they're empty or different
  useEffect(() => {
    if (
      latitude && 
      longitude && 
      (!formData.latitude || !formData.longitude || 
       formData.latitude !== latitude || 
       formData.longitude !== longitude)
    ) {
      onChange({ target: { name: 'latitude', value: latitude }} as React.ChangeEvent<HTMLInputElement>);
      onChange({ target: { name: 'longitude', value: longitude }} as React.ChangeEvent<HTMLInputElement>);
    }
  }, [latitude, longitude]); // Remove onChange from dependencies

  return (
    <div className="space-y-4 mt-8">
      <h3 className="text-lg font-semibold text-gray-800">2. Informações Geográficas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Latitude</label>
          <div className="relative">
            <input
              type="text"
              name="latitude"
              value={formData.latitude || ''}
              onChange={onChange}
              placeholder={loading ? 'Obtendo localização...' : ''}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
            />
            <MapPin className="absolute left-3 top-[60%] transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Longitude</label>
          <div className="relative">
            <input
              type="text"
              name="longitude"
              value={formData.longitude || ''}
              onChange={onChange}
              placeholder={loading ? 'Obtendo localização...' : ''}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
            />
            <MapPin className="absolute left-3 top-[60%] transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Relevo</label>
          <select
            name="reliefType"
            value={formData.reliefType || ''}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione o tipo de relevo</option>
            <option value="plano">Plano</option>
            <option value="ondulado">Ondulado</option>
            <option value="montanhoso">Montanhoso</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Uso Atual do Solo</label>
          <select
            name="soilUse"
            value={formData.soilUse || ''}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione o uso do solo</option>
            <option value="agricola">Agrícola</option>
            <option value="pastagem">Pastagem</option>
            <option value="floresta">Floresta</option>
            <option value="outro">Outro</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default GeographicInfo;