import Header from '../components/Header';
import { NavLink, Outlet } from 'react-router-dom';
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
  useStoreRecentLocation();

  return (
    <div className="bg-[#EBEBEB]">
      <div>
        <Header />
        <div className="h-[150vh] w-[50%] mx-auto">
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
    </div>
  );
}

export default ForecastInfo;
