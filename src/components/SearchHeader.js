import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';

// const API_KEY = process.env.REACT_APP_ACCUWEATHER_API_KEY;

function SearchHeader() {
  // const { id } = useParams();
  //
  // if (status !== 'success') {
  //   return <span>loading...</span>;
  // } else if (status === 'error') {
  //   return <span>{error}</span>;
  // }
  //
  // console.log('dv:', data);
  return (
    <div>
      <form>
        <input
          type="search"
          list="ice-cream-flavors"
          id="ice-cream-choice"
          name="ice-cream-choice"
        />

        <datalist id="ice-cream-flavors"></datalist>
      </form>
    </div>
  );
}

export default SearchHeader;
