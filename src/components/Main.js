import accuWeatherLogo from '../icons/accuWeatherLogo.svg';
import Search from './Search';
import RecentSearch from './RecentSearch';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Main({
  setSearchValue,
  searchValue,
  error,
  isLoading,
  searchOptions,
  setCity,
}) {
  const [bgImageNumber] = useState(1);
  const BG_IMAGE_URL = `url("https://www.awxcdn.com/adc-assets/images/hero/${bgImageNumber}/1440x450.jpg")`;
  // useEffect(() => {
  //   setBgImageNumber((prev) => if(prev!== 6)
  // }, []);
  return (
    <div
      style={{
        backgroundImage: BG_IMAGE_URL,
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
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          error={error}
          isLoading={isLoading}
          searchOptions={searchOptions}
          setCity={setCity}
        />
        <RecentSearch />
      </div>
    </div>
  );
}

export default Main;
