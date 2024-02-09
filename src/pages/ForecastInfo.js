import Header from '../components/Header';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchHeader from '../components/SearchHeader';
import { getCurrentConditions } from '../api';

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
    queryFn: () => getCurrentConditions(id),
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

  return (
    <div className="bg-[#EBEBEB]">
      {status === 'isLoading' && <div>Loading...</div>}
      {status === 'error' && <div>{error}</div>}
      {status === 'success' && (
        <div>
          <Header
            tempValue={data.tempValue}
            tempUnit={data.tempUnit}
            iconNumber={data.iconNumber}
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
            <Outlet />
            <SearchHeader />
          </div>
        </div>
      )}
    </div>
  );
}

export default ForecastInfo;
