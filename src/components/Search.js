import { TextField } from '@radix-ui/themes';
import SearchIcon from '../icons/searchIcon.svg';
import { useEffect, useState } from 'react';

const API_KEY = '6FsuZ4vrEMOvcJ9zVWUDlpNqvZugPH0y';

function Search() {
  const [city] = useState('yerevan');
  const [locationKey, setLocationKey] = useState('');
  const [isLoading, setIsLoading] = useState('false');

  useEffect(() => {
    async function getLocationKey() {
      try {
        setIsLoading('true');
        const res = await fetch(
          `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${city}`,
        );
        const data = await res.json();
        setLocationKey(data[0].Key);
      } catch (e) {
        alert(e.message);
      } finally {
        setIsLoading(false);
      }
    }

    getLocationKey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getForecastbyLoactionKey() {
      if (!locationKey) return;
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}/?apikey=${API_KEY}`,
        );
        const data = await res.json();
        console.log('dv:', data);
      } catch (e) {
        alert(e.message);
      } finally {
        setIsLoading(false);
      }
    }

    getForecastbyLoactionKey();
  }, [locationKey]);
  return (
    <div className="flex justify-center w-full flex-col items-center">
      <TextField.Root className="h-11 border-white w-[532px] ">
        <TextField.Slot>
          <img alt="searchIcon" src={SearchIcon} height="16" width="16" />
        </TextField.Slot>
        <TextField.Input
          className="mx-0 my-auto border-4"
          placeholder="Search"
        />
      </TextField.Root>
      {isLoading && <div>Loading...</div>}
      <div></div>
    </div>
  );
}

export default Search;
