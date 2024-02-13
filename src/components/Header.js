import accuWeatherLogo from '../icons/accuWeatherLogo.svg';
import { Link, useParams } from 'react-router-dom';
import Degree from './Degree';
import Search from './Search';

function Header({ iconNumber, tempUnit, tempValue }) {
  const { city } = useParams();

  return (
    <div className="h-[62px]  text-white flex flex-row bg-[#1f1f1f] justify-between">
      <div className="px-20 items-center flex justify-center">
        <Link to={'/'}>
          <img
            alt="logo"
            className="h-[24px] px-5 items-center"
            src={accuWeatherLogo}
          />
        </Link>

        <div className="flex flex-row h-fit justify-around gap-3  font-bold items-center">
          <h1 className="mx-3">
            {city}, {city}{' '}
          </h1>
          <Degree
            iconNumber={iconNumber}
            unit={tempUnit}
            tempValue={tempValue}
            unitPosition={'-12px'}
          />
          <img
            className={`h-[24px] w-[24px]`}
            src={`https://www.accuweather.com/images/weathericons/${iconNumber}.svg`}
          />
        </div>
      </div>
      <div className="flex items-center mr-[30px] ">
        <Search />
      </div>
    </div>
  );
}

export default Header;
