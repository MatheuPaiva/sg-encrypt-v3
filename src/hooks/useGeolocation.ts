import { useState, useEffect } from 'react';

interface GeolocationState {
  latitude: string;
  longitude: string;
  error: string | null;
  loading: boolean;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    latitude: '',
    longitude: '',
    error: null,
    loading: true
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: 'Geolocalização não é suportada pelo seu navegador',
        loading: false
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6),
          error: null,
          loading: false
        });
      },
      (error) => {
        setState(prev => ({
          ...prev,
          error: 'Não foi possível obter sua localização',
          loading: false
        }));
      }
    );
  }, []);

  return state;
};