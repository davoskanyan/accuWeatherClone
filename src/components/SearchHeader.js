import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAutocomplete } from '../api';
// import { useQuery } from '@tanstack/react-query';

function SearchHeader() {
  const [value, setValue] = useState('');

  const { data, isLoading } = useQuery({
    enabled: Boolean(value.length >= 2),
    queryKey: ['autocomplete', value],
    queryFn: () => getAutocomplete(value),
  });
  console.log('dv:', data);

  return (
    <div>
      <input
        type="search"
        list="location-list"
        name="location-list"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <datalist
        id="location-list"
        className="bg-white"
        placeholder="Write your City"
      >
        {isLoading && <option value="Loading..."></option>}

        {data?.map((option) => (
          <option key={option.Key} value={option.LocalizedName}></option>
        ))}
      </datalist>
    </div>
  );
}

export default SearchHeader;
