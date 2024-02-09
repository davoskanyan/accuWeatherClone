import React, { useEffect, useMemo, useState } from 'react';
import { dateToWeekdayDayMonth } from '../utils';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function DailyForecastCard({
  date,
  id,
  iconNumber,
  maxTempValue,
  minTempValue,
  weatherText,
  nightIconNumber,
  nightWeatherText,
}) {
  const formattedDate = dateToWeekdayDayMonth(date);

  const [isHovering, setIsHovering] = useState(false);
  const data = useMemo(
    () => ({
      id: id,
      date: date,
      dayIconNumber: iconNumber,
      nightIconNumber: nightIconNumber,
      dayIconPhrase: weatherText,
      nightIconPhrase: nightWeatherText,
      dayTemperature: maxTempValue,
      nightTemperature: minTempValue,
    }),
    [
      id,
      date,
      iconNumber,
      nightIconNumber,
      weatherText,
      nightWeatherText,
      maxTempValue,
      minTempValue,
    ],
  );

  // TODO: remove asap
  useEffect(() => {
    localStorage.setItem(`${id}`, JSON.stringify(data));
  }, [id, data]);

  function handleMouseOver() {
    setIsHovering(true);
  }

  function handleMouseOut() {
    setIsHovering(false);
  }

  return (
    <div className="bg-white shadow-sm p-[12px] w-[632px] m-8">
      <Link to={`selectedDay/${id}`}>
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
                src={`https://www.accuweather.com/images/weathericons/${iconNumber}.svg`}
              />
              <p className="text-[55px]">
                {maxTempValue}°
                <span className="opacity-[0.6] text-[25px]">
                  / {minTempValue}°
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
        <p className="align-bottom text-[18px]"> {weatherText}</p>
      </Link>
    </div>
  );
}

export default DailyForecastCard;
