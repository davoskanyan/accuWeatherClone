import { Popover, TextField } from '@radix-ui/themes';
import SearchIcon from '../icons/searchIcon.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDebouncedValue } from '../custom-hooks/useDebouncedValue';
import { useQuery } from '@tanstack/react-query';
import { getAutocomplete } from '../api';
import CurrentPositionBtn from './CurrentPositionBtn';

function Search() {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const debouncedValue = useDebouncedValue(value);

  const { data, error, isLoading } = useQuery({
    enabled: Boolean(value.length >= 2),
    queryKey: ['autocomplete', debouncedValue],
    queryFn: () => getAutocomplete(debouncedValue),
  });

  const searchOptions = value.length <= 2 ? [] : data;

  function handleBlur(e) {
    if (!e.relatedTarget?.closest('.search-content-dialog')) {
      setOpen(false);
    }
  }

  if (error) {
    return <div>Error fetching data</div>;
  }
  return (
    <div className="flex justify-center w-full flex-col items-center">
      <Popover.Root className="z-0 " open>
        <Popover.Trigger>
          <TextField.Root className="h-11 border-white w-full z-40 shadow-none outline-0">
            <TextField.Slot>
              <img alt="searchIcon" src={SearchIcon} height="16" width="16" />
            </TextField.Slot>

            <TextField.Input
              className="mx-0 my-auto border-4 z-10"
              placeholder="Search your City"
              value={value}
              onBlur={handleBlur}
              onFocus={() => setOpen(true)}
              onChange={(e) => setValue(e.target.value)}
            />
          </TextField.Root>
        </Popover.Trigger>

        <Popover.Content
          sideOffset={-1}
          className={`search-content-dialog w-full min-h-[44px] !p-0 ${
            open ? 'visible' : 'invisible'
          }`}
        >
          <ul autoFocus={false} className="flex flex-col   m-0">
            <CurrentPositionBtn />

            {error && <li>{error}</li>}
            {isLoading ? (
              <li>Loading...</li>
            ) : (
              searchOptions?.map((city) => (
                <Link
                  to={`/${city.Key}/${city.LocalizedName}`}
                  key={city.Key}
                  className="hover:bg-stone-100 px-[16px]"
                >
                  <li className=" hover:bg-stone-100 data-[highlighted]:text-black py-2">
                    <div className="flex flex-col ">
                      <span className=" font-bold">{city.LocalizedName}</span>
                      <span className="text-stone-500">
                        {city.AdministrativeArea.LocalizedName},{' '}
                        {city.AdministrativeArea.ID} {city.Country.ID}
                      </span>
                    </div>
                  </li>
                </Link>
              ))
            )}
          </ul>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}

export default Search;
