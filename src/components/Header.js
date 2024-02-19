import accuWeatherLogo from '../icons/accuWeatherLogo.svg';
import { Link, useParams } from 'react-router-dom';
import Degree from './Degree';
import Search from './Search';
import { useQuery } from '@tanstack/react-query';
import { getAutocomplete, getCurrentConditions } from '../api';

function Header() {
  const { city, id } = useParams();

  const { data: autocomplete, status: autocompleteStatus } = useQuery({
    queryKey: ['autocomplete', city],
    queryFn: () => getAutocomplete(city),
  });

  const { data: currentCondition, status: currentConditionStatus } = useQuery({
    queryKey: ['currentCondition', id],
    queryFn: () => getCurrentConditions(id),
  });

  const isSuccess =
    autocompleteStatus === 'success' && currentConditionStatus === 'success';

  return (
    <div className="h-[62px]  text-white flex flex-row bg-[#1f1f1f] ">
      <div className="w-[50%] flex mx-auto justify-between items-center">
        <div className=" flex justify-center">
          <Link to={'/'}>
            <img
              alt="logo"
              className="h-[24px] items-center"
              src={accuWeatherLogo}
            />
          </Link>

          <div className="flex flex-row h-fit justify-around gap-3 font-bold items-center">
            {isSuccess && (
              <>
                <h1 className="mx-3">
                  {city}, {autocomplete[0].AdministrativeArea.LocalizedName}
                </h1>
                <Degree
                  iconNumber={currentCondition.iconNumber}
                  unit={currentCondition.tempUnit}
                  tempValue={currentCondition.tempValue}
                  unitPosition={'-12px'}
                />
                <img
                  className={`h-[24px] w-[24px]`}
                  src={`https://www.accuweather.com/images/weathericons/${currentCondition.iconNumber}.svg`}
                />
              </>
            )}
          </div>
        </div>
        <div className="w-1/3">
          <Search />
        </div>
      </div>
    </div>
  );
}

export default Header;
