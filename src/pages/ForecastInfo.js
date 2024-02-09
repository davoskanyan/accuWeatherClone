import Header from '../components/Header';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { TimeFormattingFromString } from '../utils';
import { useQuery } from '@tanstack/react-query';
import SearchHeader from '../components/SearchHeader';

const API_KEY = process.env.REACT_APP_ACCUWEATHER_API_KEY;

const activeStyle = ({ isActive }) => {
  return {
    color: isActive ? 'black' : '',
    padding: '10px',
    marginBottom: '0',
    borderBottom: isActive ? '1px solid #f05514' : '',
  };
};
function ForecastInfo() {
  const { id, city } = useParams();

  // TODO: extract
  const { data, error, status } = useQuery({
    queryKey: ['currentCondition', id],
    queryFn: () =>
      fetch(
        `https://dataservice.accuweather.com/currentconditions/v1/${id}/?apikey=${API_KEY}`,
      ).then((response) => response.json()),
  });

  // TODO: extract
  useEffect(() => {
    const recentLocationsStr = localStorage.getItem('recentLocation');
    const recentLocations = recentLocationsStr
      ? JSON.parse(recentLocationsStr)
      : [];

    const recentLocationsFiltered = recentLocations.filter(
      (storageCity) => storageCity.cityId !== id,
    );
    localStorage.setItem(
      'recentLocation',
      JSON.stringify(
        [{ cityId: id, cityName: city }, ...recentLocationsFiltered].slice(
          0,
          3,
        ),
      ),
    );
  }, [id, city]);

  if (status !== 'success') {
    return <span>loading...</span>;
  }

  // TODO: move to fetch
  const localObservationDateTime = data[0].LocalObservationDateTime;
  const formattedTime = TimeFormattingFromString(localObservationDateTime);
  const tempValue = Math.round(data[0].Temperature.Metric.Value);
  const iconNumber = data[0].WeatherIcon;
  const tempUnit = data[0].Temperature.Metric.Unit;
  const weatherText = data[0].WeatherText;
  const cardName = 'Current Weather';

  return (
    <div className="bg-[#EBEBEB]">
      {status === 'isLoading' && <div>Loading...</div>}
      {status === 'error' && <div>{error}</div>}
      {status === 'success' && (
        <div>
          <Header
            tempValue={tempValue}
            tempUnit={tempUnit}
            iconNumber={iconNumber}
          />
          <div className=" h-[100vh] mx-80">
            <ul className="flex flex-row justify-start text-[16px] border-b-[1px] border-b-gray-400 pb-0 text-[#666c72] h-[45px] items-center">
              <NavLink style={activeStyle} to="today-forecast">
                <li>Today</li>
              </NavLink>
              <NavLink style={activeStyle} to="daily-forecast">
                <li>Daily</li>
              </NavLink>
            </ul>
            <Outlet
              context={[
                cardName,
                formattedTime,
                tempValue,
                tempUnit,
                iconNumber,
                weatherText,
              ]}
            />
            <SearchHeader />
          </div>
        </div>
      )}
    </div>
  );
}

export default ForecastInfo;
