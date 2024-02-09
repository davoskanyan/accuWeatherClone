import Degree from './Degree';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCurrentConditions } from '../api';
import { TimeFormattingFromString } from '../utils';

function ForecastCard() {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['currentCondition', id],
    queryFn: () => getCurrentConditions(id),
  });
  const formattedTime = TimeFormattingFromString(data.localObservationDateTime);

  return (
    <div className="bg-white shadow-sm p-[12px]  w-[632px] m-8">
      <div className="border-b-[1px] flex flex-row justify-between pb-2">
        <p className="text-[14px] opacity-[0.6] bottom-3">Current Weather</p>
        <p className="opacity-[0.6] text-{14px}">{formattedTime}</p>
      </div>

      <div className="flex flex-row gap-2 items-center text-[84px] ">
        <img
          alt="icon"
          className={`h-[88px] w-[88px]`}
          src={`https://www.accuweather.com/images/weathericons/${data.iconNumber}.svg`}
        />
        <Degree
          tempValue={data.tempValue}
          unit={data.tempUnit}
          unitPosition="-6px"
        />
      </div>

      <p className="align-bottom"> {data.weatherText}</p>
    </div>
  );
}

export default ForecastCard;
