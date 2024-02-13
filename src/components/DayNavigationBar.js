import React from 'react';
import { Link } from 'react-router-dom';
import { dateToMonthbyWords, dateToWeekdayDayMonth } from '../utils';

function DayNavigationBar({ index, date }) {
  const lastDay = index === '4';
  const firstDay = index === '0';
  const month = dateToMonthbyWords(date);
  const day = dateToWeekdayDayMonth(date);
  return (
    <div
      className="flex justify-between mt-5 border-b-[1px] border-b-[#c2c2c2] text-[14px] py-2 ml-8 mb-[-20px]
       w-[632px]"
    >
      {!firstDay ? (
        <Link
          className="font-bold cursor-pointer self-start"
          to={`../selectedDay/${Number(index) - 1}`}
        >
          {'<'}
        </Link>
      ) : (
        <div />
      )}
      <span className="self-center">
        {day.weekDayOfDate}, {month} {day.day}
      </span>
      {!lastDay ? (
        <Link
          to={`../selectedDay/${Number(index) + 1}`}
          className="font-bold cursor-pointer self-end"
        >
          {'>'}
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}

export default DayNavigationBar;
