import Header from '../components/Header';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCurrentConditions } from '../api';
import { useStoreRecentLocation } from '../custom-hooks/useStoreRecentLocation';

const activeStyle = ({ isActive }) => {
  return {
    color: isActive ? 'black' : '',
    padding: '10px',
    marginBottom: '0',
    borderBottom: isActive ? '1px solid #f05514' : '',
  };
};

function ForecastInfo() {
  const { id } = useParams();

  const { data, error, status } = useQuery({
    queryKey: ['currentCondition', id],
    queryFn: () => getCurrentConditions(id),
  });

  useStoreRecentLocation();

  if (status !== 'success') {
    return <span>loading...</span>;
  }

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
          <div className="h-[100vh] w-[50%] mx-auto">
            <ul className="flex flex-row justify-start text-[16px] border-b-[1px] uppercase border-b-gray-400 pb-0 text-[#666c72] h-[45px] items-center">
              <NavLink style={activeStyle} to="today-forecast">
                <li>Today</li>
              </NavLink>
              <NavLink style={activeStyle} to="daily-forecast">
                <li>Daily</li>
              </NavLink>
            </ul>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}

export default ForecastInfo;
