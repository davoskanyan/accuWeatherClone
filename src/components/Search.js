import { Popover, TextField } from '@radix-ui/themes';
import SearchIcon from '../icons/searchIcon.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Search({ onChange, value, error, isLoading, searchOptions }) {
  const [open, setOpen] = useState(false);

  function handleInputChange(e) {
    onChange(e.target.value);
  }

  function handleBlur(e) {
    if (!e.relatedTarget?.closest('.search-content-dialog')) {
      setOpen(false);
    }
  }

  function handleFocus() {
    setOpen(true);
  }

  return (
    <div className="flex justify-center w-full flex-col items-center">
      <Popover.Root className="z-0 " open>
        <Popover.Trigger>
          <TextField.Root className="h-11 border-white w-[532px] z-40 shadow-none outline-0">
            <TextField.Slot>
              <img alt="searchIcon" src={SearchIcon} height="16" width="16" />
            </TextField.Slot>

            <TextField.Input
              className="mx-0 my-auto border-4 z-10"
              placeholder="Search your City"
              value={value}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onChange={(e) => handleInputChange(e)}
            />
          </TextField.Root>
        </Popover.Trigger>

        <Popover.Content
          sideOffset={-1}
          className={`search-content-dialog w-[520px] min-h-[44px] !p-0 ${open ? 'visible' : 'invisible'}`}
        >
          <ul autoFocus={false} className="flex flex-col   m-0">
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
