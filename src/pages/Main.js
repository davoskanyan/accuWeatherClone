import accuWeatherLogo from '../icons/accuWeatherLogo.svg';
import Search from '../components/Search';
import RecentSearch from '../components/RecentSearch';
import { Link } from 'react-router-dom';

const bgImage = Math.floor(Math.random() * 6) + 1;

function Main() {
  return (
    <div
      style={{
        backgroundImage: `url("https://www.awxcdn.com/adc-assets/images/hero/${bgImage}/1440x450.jpg")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      className="bg-no-repeat bg-cover h-96 w-100 text-white flex-col flex"
    >
      <Link to="/">
        <div className="flex items-center px-32 h-16 bg-gradient-to-b from-black from-1%">
          <img className="h-fit" src={accuWeatherLogo} />
        </div>
      </Link>
      <div className="flex flex-col items-center justify-around h-full w-[532px] mx-auto ">
        <Search />
        <RecentSearch />
      </div>
    </div>
  );
}

export default Main;
