import accuWeatherLogo from '../icons/accuWeatherLogo.svg';
import SunIcon from '../icons/1.svg';

function Header() {
  return (
    <div className="h-[62px] text-white flex flex-row bg-[#1f1f1f]">
      <div className="px-20 items-center flex justify-center">
        <img
          alt="logo"
          className="h-[24px] px-5 items-center"
          src={accuWeatherLogo}
        />
        <div className="flex flex-row h-fit justify-around items-center">
          <h1 className="mx-3">Yerevan, Yerevan </h1>
          <span className="text-[18px]">
            3°
            <span className="opacity-50 text-[10px] relative left-[-6px]">
              C
            </span>
          </span>
          <img className="h-[25px] w-[25px]" src={SunIcon} />
        </div>
      </div>
      {/*<div className="h-fit">*/}
      {/*  <Search />*/}
      {/*</div>*/}
    </div>
  );
}

export default Header;
