import { dateToWeekdayDayMonth } from '../utils';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getDailyForecasts } from '../api';

function DailyForecastCard({ cardId }) {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['dailyForecasts', id],
    queryFn: () => getDailyForecasts(id),
    select: (data) => {
      return {
        date: dateToWeekdayDayMonth(data[cardId].Date),
        dayIconNumber: data[cardId].Day.Icon,
        dayIconPhrase: data[cardId].Day.IconPhrase,
        dayTemperature: data[cardId].Temperature.Maximum.Value,
        nightTemperature: data[cardId].Temperature.Minimum.Value,
      };
    },
  });

  return (
    <div className="bg-white shadow-sm p-[12px] w-[632px] m-8">
      <Link to={`selectedDay/${cardId}`}>
        <div className="flex flex-row gap-2 items-center justify-between group group-hover:cursor-pointer">
          <div className="flex flex-row items-center">
            <div className="flex flex-col mr-5">
              <p className="text-{14px}">
                {data.date.weekDayOfDate.slice(0, 3)}
              </p>
              <p className="opacity-[0.6] text-{14px}">
                {data.date.month}/{data.date.day}
              </p>
            </div>

            <div className="flex flex-row items-center ">
              <img
                className={`h-[62px] w-[62px] mr-8`}
                src={`https://www.accuweather.com/images/weathericons/${data.dayIconNumber}.svg`}
              />
              <p className="text-[55px]">
                {data.dayTemperature}°
                <span className="opacity-[0.6] text-[25px]">
                  / {data.nightTemperature}°
                </span>
              </p>
            </div>
          </div>
          {/*TODO: handle with css*/}

          <div className="invisible group-hover:visible">
            <FaArrowRightLong />
          </div>
        </div>
        <p className="align-bottom text-[18px]">{data.dayIconPhrase}</p>
      </Link>
    </div>
  );
}

export default DailyForecastCard;
