import { useEffect, useState } from 'react';

export function useGeolocation() {
  const [isLoading, setIsLoading] = useState(true);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('no geolocation');
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      },
    );
  }, []);

  return { error, isLoading, position };
}
