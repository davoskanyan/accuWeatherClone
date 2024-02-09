import Degree from './Degree';
import { useOutletContext } from 'react-router-dom';

function ForecastCard() {
  // TODO: use query instead
  const [
    cardName,
    formattedTime,
    tempValue,
    tempUnit,
    iconNumber,
    weatherText,
  ] = useOutletContext();

  return (
    <div className="bg-white shadow-sm p-[12px]  w-[632px] m-8">
      <div className="border-b-[1px] flex flex-row justify-between pb-2">
        <p className="text-[14px] opacity-[0.6] bottom-3">{cardName}</p>
        <p className="opacity-[0.6] text-{14px}">{formattedTime}</p>
      </div>

      <div className="flex flex-row gap-2 items-center text-[84px] ">
        <img
          className={`h-[88px] w-[88px]`}
          src={`https://www.accuweather.com/images/weathericons/${iconNumber}.svg`}
        />
        <Degree tempValue={tempValue} unit={tempUnit} unitPosition="-6px" />
      </div>

      <p className="align-bottom"> {weatherText}</p>
    </div>
  );
}

export default ForecastCard;
