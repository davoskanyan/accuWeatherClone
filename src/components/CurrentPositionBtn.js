import { useGeolocation } from '../custom-hooks/useGeolocation';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCitybyGeolocation } from '../api';

function CurrentPositionBtn() {
  const {
    isLoading,
    position: { lat, lng },
  } = useGeolocation();

  const { data } = useQuery({
    queryKey: ['citybyGeolocation'],
    queryFn: () => getCitybyGeolocation(lat, lng),
    enabled: !isLoading,
  });

  if (!lat && !lng) {
    return <div>loading...</div>;
  }

  return (
    <Link
      to={`/${data?.key}/${data?.city}`}
      className="flex flex-row p-2 hover:bg-stone-100 "
    >
      <img
        src={'https://www.awxcdn.com/adc-assets/images/icons/icon-gps.svg'}
      />
      <button className="hover:bg-stone-100 px-[16px]">
        {isLoading ? ' Loading...' : 'Use your current Location '}
      </button>
    </Link>
  );
}

export default CurrentPositionBtn;
