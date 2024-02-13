import SelectedDayCard from './SelectedDayCard';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import DayNavigationBar from './DayNavigationBar';
import { getDailyForecasts } from '../api';

function WeatherSelectedDate() {
  const { id, index } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['dailyForecasts', id],
    queryFn: () => getDailyForecasts(id),
    select: (data) => {
      return {
        date: data[index].Date,
        dayIconNumber: data[index].Day.Icon,
        dayIconPhrase: data[index].Day.IconPhrase,
        dayTemperature: data[index].Temperature.Maximum.Value,
        nightTemperature: data[index].Temperature.Minimum.Value,
        nightIconNumber: data[index].Night.Icon,
        nightIconPhrase: data[index].Night.IconPhrase,
      };
    },
  });

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <>
      <DayNavigationBar index={index} date={data.date} />
      <SelectedDayCard
        cardName={'Day'}
        iconNumber={data.dayIconNumber}
        tempValue={data.dayTemperature}
        weatherText={data.dayIconPhrase}
        date={data.date}
      />
      <SelectedDayCard
        cardName={'Night'}
        iconNumber={data.nightIconNumber}
        tempValue={data.nightTemperature}
        weatherText={data.nightIconPhrase}
        date={data.date}
      />
    </>
  );
}

export default WeatherSelectedDate;
