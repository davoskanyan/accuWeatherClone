import React, { useState } from 'react';
import { dateToWeekdayDayMonth } from '../utils';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
const API_KEY = process.env.REACT_APP_ACCUWEATHER_API_KEY;

function DailyForecastCard({ cardId }) {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['dailyForecasts', id],
    queryFn: () =>
      fetch(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${id}/?apikey=${API_KEY}`,
      ).then((response) => response.json()),
  });

  const [isHovering, setIsHovering] = useState(false);

  const formattedData = {
    date: data.DailyForecasts[cardId].Date,
    dayIconNumber: data.DailyForecasts[cardId].Day.Icon,
    dayIconPhrase: data.DailyForecasts[cardId].Day.IconPhrase,
    dayTemperature: data.DailyForecasts[cardId].Temperature.Maximum.Value,
    nightTemperature: data.DailyForecasts[cardId].Temperature.Minimum.Value,
  };

  const formattedDate = dateToWeekdayDayMonth(formattedData.date);

  function handleMouseOver() {
    setIsHovering(true);
  }

  function handleMouseOut() {
    setIsHovering(false);
  }

  return (
    <div className="bg-white shadow-sm p-[12px] w-[632px] m-8">
      <Link to={`selectedDay/${cardId}`}>
        <div
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="flex flex-row gap-2 items-center justify-between hover:cursor-pointer"
        >
          <div className="flex flex-row items-center">
            <div className="flex flex-col mr-5">
              <p className="text-{14px}">
                {formattedDate.weekDayOfDate.slice(0, 3)}
              </p>
              <p className="opacity-[0.6] text-{14px}">
                {formattedDate.month}/{formattedDate.day}
              </p>
            </div>

            <div className="flex flex-row items-center ">
              <img
                className={`h-[62px] w-[62px] mr-8`}
                src={`https://www.accuweather.com/images/weathericons/${formattedData.dayIconNumber}.svg`}
              />
              <p className="text-[55px]">
                {formattedData.dayTemperature}°
                <span className="opacity-[0.6] text-[25px]">
                  / {formattedData.nightTemperature}°
                </span>
              </p>
            </div>
          </div>
          {/*TODO: handle with css*/}
          {isHovering ? (
            <div>
              <FaArrowRightLong />
            </div>
          ) : (
            ''
          )}
        </div>
        <p className="align-bottom text-[18px]">
          {formattedData.dayIconPhrase}
        </p>
      </Link>
    </div>
  );
}

export default DailyForecastCard;
