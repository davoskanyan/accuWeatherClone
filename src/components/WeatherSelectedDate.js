import SelectedDayCard from './SelectedDayCard';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { dateToMonthbyWords, dateToWeekdayDayMonth } from '../utils';

function WeatherSelectedDate() {
  const { index } = useParams();
  const [dailyInfo, setDailyInfo] = useState({});

  useEffect(() => {
    const data = localStorage.getItem(index);
    setDailyInfo(JSON.parse(data));
  }, [index]);

  const month = dateToMonthbyWords(dailyInfo.date);
  const day = dateToWeekdayDayMonth(dailyInfo.date);
  const navigate = useNavigate();
  return (
    <>
      <div
        className="flex justify-between mt-5 border-b-[1px] border-b-[#c2c2c2] text-[14px] py-2 ml-8 mb-[-20px]
       w-[632px]"
      >
        {/* TODO: it's sad */}
        {index != 0 ? (
          <Link to={`../selectedDay/${Number(index) - 1}`}>{'<'}</Link>
        ) : (
          <div />
        )}
        <span className="self-center">
          {day.weekDayOfDate}, {month} {day.day}
        </span>
        {index != 4 ? (
          <button
            className="font-bold self-end"
            onClick={() =>
              navigate(`../${Number(index) + 1}`, {
                relative: 'path',
              })
            }
          >
            {' '}
            {'>'}{' '}
          </button>
        ) : (
          ''
        )}
      </div>
      <SelectedDayCard
        cardName={'Day'}
        iconNumber={dailyInfo.dayIconNumber}
        tempValue={dailyInfo.dayTemperature}
        weatherText={dailyInfo.dayIconPhrase}
        date={dailyInfo.date}
      />
      <SelectedDayCard
        cardName={'Night'}
        iconNumber={dailyInfo.nightIconNumber}
        tempValue={dailyInfo.nightTemperature}
        weatherText={dailyInfo.nightIconPhrase}
        date={dailyInfo.date}
      />
    </>
  );
}

export default WeatherSelectedDate;
