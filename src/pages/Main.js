import accuWeatherLogo from '../icons/accuWeatherLogo.svg';
import Search from '../components/Search';
import RecentSearch from '../components/RecentSearch';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDebouncedValue } from '../custom-hooks/useDebouncedValue';
import { useQuery } from '@tanstack/react-query';

const API_KEY = process.env.REACT_APP_ACCUWEATHER_API_KEY;
const bgImage = Math.floor(Math.random() * 6) + 1;

function Main() {
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebouncedValue(searchValue);

  const { data, error, status } = useQuery({
    enabled: Boolean(searchValue.length >= 2),
    queryKey: ['autocomplete', debouncedValue],
    queryFn: () =>
      fetch(
        `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${debouncedValue}`,
      ).then((response) => response.json()),
  });

  return (
    <div
      style={{
        backgroundImage: `url("https://www.awxcdn.com/adc-assets/images/hero/${bgImage}/1440x450.jpg")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      className="bg-no-repeat bg-cover h-96 w-100 text-white flex-col flex"
    >
      <Link to="/">
        <div className="flex items-center px-32 h-16 bg-gradient-to-b from-black from-1%">
          <img className="h-fit" src={accuWeatherLogo} />
        </div>
      </Link>
      <div className="flex flex-col items-center justify-around h-full w-full">
        <Search
          value={searchValue}
          onChange={setSearchValue}
          error={error}
          isLoading={status === 'isLoading'}
          searchOptions={searchValue.length <= 2 ? [] : data}
        />
        <RecentSearch />
      </div>
    </div>
  );
}

export default Main;
