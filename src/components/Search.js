import { DropdownMenu, TextField } from '@radix-ui/themes';
import SearchIcon from '../icons/searchIcon.svg';
import { useEffect, useState } from 'react';

const API_KEY = '6FsuZ4vrEMOvcJ9zVWUDlpNqvZugPH0y';

function Search() {
  const [city] = useState('yerevan');
  const [locationKey, setLocationKey] = useState('');
  const [isLoading, setIsLoading] = useState('false');
  const [searchValue, setSearchValue] = useState('');
  const [searchOptions, setSearchOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

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
        setError('Cannot fetch data');
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
        console.log('data:', data);
      } catch (e) {
        setError('Cannot fetch data');
      } finally {
        setIsLoading(false);
      }
    }

    getForecastbyLoactionKey();
  }, [locationKey]);

  useEffect(() => {
    async function fetchAutocomplete() {
      if (searchValue === null) return;
      if (searchValue.length < 2) return;
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${searchValue}`,
        );
        const data = await res.json();
        setSearchOptions(data);
        console.log('autocomplete:', data);
      } catch (e) {
        setError('Cannot fetch data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchAutocomplete();
  }, [searchValue]);

  function handleInputChange(e) {
    setOpen(true);
    setSearchValue(e.target.value);
  }

  function handleInputFocus(e) {
    if (e.relatedTarget?.role === 'menu') {
      e.target.focus();
    }
  }

  function handleSelect() {
    setOpen(false);
  }

  return (
    <div className="flex justify-center w-full flex-col items-center">
      <TextField.Root className="h-11 border-white w-[532px] z-40">
        <TextField.Slot>
          <img alt="searchIcon" src={SearchIcon} height="16" width="16" />
        </TextField.Slot>

        <TextField.Input
          className="mx-0 my-auto border-4 z-10"
          placeholder="Search your City"
          value={searchValue}
          onBlur={(e) => handleInputFocus(e)}
          onChange={(e) => handleInputChange(e)}
          onClick={() => setOpen(true)}
        />
      </TextField.Root>
      <DropdownMenu.Root className="z-0" open={open}>
        <DropdownMenu.Trigger>
          <div className="relative w-[532px] border-amber-500 border h-[44px] z-0 top-[-44px]"></div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          sideOffset={-3}
          onPointerDownOutside={() => setOpen(false)}
          alignOffset={1}
          className="w-[530px] min-h-[44px] p-0"
        >
          <DropdownMenu.Group autoFocus={false}>
            {error && <DropdownMenu.Item>{error}</DropdownMenu.Item>}
            {isLoading ? (
              <DropdownMenu.Item>Loading...</DropdownMenu.Item>
            ) : (
              searchOptions?.map((city) => (
                <DropdownMenu.Item
                  onSelect={() => handleSelect()}
                  autoFocus={false}
                  key={city.key}
                  className="dropdown-item data-[highlighted]:bg-stone-100 data-[highlighted]:text-black py-6"
                >
                  <div className="flex flex-col ">
                    <span className=" font-bold">{city.LocalizedName}</span>
                    <span className="text-stone-500">
                      {city.AdministrativeArea.LocalizedName},{' '}
                      {city.AdministrativeArea.ID} {city.Country.ID}
                    </span>
                  </div>
                </DropdownMenu.Item>
              ))
            )}
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}

export default Search;
