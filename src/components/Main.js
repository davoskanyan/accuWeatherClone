import accuWeatherLogo from '../icons/accuWeatherLogo.svg';
import Search from './Search';
import RecentSearch from './RecentSearch';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../custom-hooks/useFetch';
import { useDebouncedValue } from '../custom-hooks/useDebouncedValue';

const API_KEY = process.env.REACT_APP_ACCUWEATHER_API_KEY;

function Main() {
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebouncedValue(searchValue);

  const [status, errorMessage, result = []] = useFetch(
    `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${debouncedValue}`,
    { disabled: searchValue.length <= 2 },
  );

  return (
    <div
      style={{
        backgroundImage:
          'url("https://www.awxcdn.com/adc-assets/images/hero/1/1440x450.jpg")',
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
          error={errorMessage}
          isLoading={status === 'isLoading'}
          searchOptions={searchValue.length <= 2 ? [] : result}
        />
        <RecentSearch />
      </div>
    </div>
  );
}

export default Main;
