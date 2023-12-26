import accuWeatherLogo from '../icons/accuWeatherLogo.svg';
import React from 'react';
import SunIcon from '../icons/1.svg';
import Search from './Search';

function Header() {
  return (
    <div>
      <img className="h-fit" src={accuWeatherLogo} />

      <div>
        <span>Yerevan, Yerevan </span>
        <span className="text-[30px]">
          3°
          <span className="opacity-50 text-[12px] relative left-[-10px]">
            C
          </span>
        </span>
        <img className="h-[32px] w-[32px]" src={SunIcon} />
      </div>
      <div>
        <Search />
      </div>
    </div>
  );
}

export default Header;
