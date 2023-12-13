import accuWeatherLogo from '../icons/accuWeatherLogo.svg';
import Search from './Search';
import RecentSearch from './RecentSearch';
import { useState } from 'react';

function Header() {
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
      <div className="flex items-center px-32 h-16 bg-gradient-to-b from-black from-1%">
        <img className="h-fit" src={accuWeatherLogo} />
      </div>
      <div className="flex flex-col items-center justify-around h-full w-full">
        <Search />
        <RecentSearch />
      </div>
    </div>
  );
}

export default Header;
