import { DropdownMenu, TextField } from '@radix-ui/themes';
import SearchIcon from '../icons/searchIcon.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Search({ onChange, value, error, isLoading, searchOptions }) {
  const [open, setOpen] = useState(false);

  function handleInputChange(e) {
    setOpen(true);
    onChange(e.target.value);
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
          value={value}
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
                <Link to={`/${city.Key}/${city.LocalizedName}`} key={city.Key}>
                  <DropdownMenu.Item
                    onSelect={() => handleSelect()}
                    autoFocus={false}
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
                </Link>
              ))
            )}
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}

export default Search;
