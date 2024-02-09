import React from 'react';
import { dateToWeekdayDayMonth } from '../utils';

function SelectedDayCard({
  cardName,
  iconNumber,
  tempValue,
  weatherText,
  date,
}) {
  const day = dateToWeekdayDayMonth(date);

  return (
    <div className="bg-white shadow-sm p-[12px]  w-[632px] m-8">
      <div className="border-b-[1px] flex flex-row justify-between pb-2">
        <p className="text-[14px] bottom-3">{cardName}</p>
        <p className="opacity-[0.6] text-{14px}">
          {day.month}/{day.day}
        </p>
      </div>

      <div className="flex flex-row gap-2 items-center text-[84px] ">
        <img
          className={`h-[88px] w-[88px]`}
          src={`https://www.accuweather.com/images/weathericons/${iconNumber}.svg`}
        />
        <p className="text-[55px]">
          {tempValue}°
          <span className="opacity-[0.6] text-[25px]">
            {cardName === 'Day' ? 'Hi' : 'Lo'}
          </span>
        </p>
      </div>

      <p className="align-bottom">{weatherText}</p>
    </div>
  );
}

export default SelectedDayCard;
