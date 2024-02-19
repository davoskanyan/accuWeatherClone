import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export function useStoreRecentLocation() {
  const { id, city } = useParams();

  useEffect(() => {
    if (!id || !city) {
      return;
    }

    const recentLocationsStr = localStorage.getItem('recentLocation');
    const recentLocations = recentLocationsStr
      ? JSON.parse(recentLocationsStr)
      : [];

    const recentLocationsFiltered = recentLocations.filter(
      (storageCity) => storageCity.cityId !== id,
    );
    localStorage.setItem(
      'recentLocation',
      JSON.stringify(
        [{ cityId: id, cityName: city }, ...recentLocationsFiltered].slice(
          0,
          3,
        ),
      ),
    );
  }, [id, city]);
}
