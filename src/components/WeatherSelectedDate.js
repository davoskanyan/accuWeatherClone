import SelectedDayCard from './SelectedDayCard';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import DayNavigationBar from './DayNavigationBar';
const API_KEY = process.env.REACT_APP_ACCUWEATHER_API_KEY;

function WeatherSelectedDate() {
  const { id, index } = useParams();

  const { data } = useQuery({
    queryKey: ['dailyForecasts', id],
    queryFn: () =>
      fetch(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${id}/?apikey=${API_KEY}`,
      ).then((response) => response.json()),
  });

  const formattedData = {
    date: data.DailyForecasts[index].Date,
    dayIconNumber: data.DailyForecasts[index].Day.Icon,
    nightIconNumber: data.DailyForecasts[index].Night.Icon,
    dayIconPhrase: data.DailyForecasts[index].Day.IconPhrase,
    nightIconPhrase: data.DailyForecasts[index].Night.IconPhrase,
    dayTemperature: data.DailyForecasts[index].Temperature.Maximum.Value,
    nightTemperature: data.DailyForecasts[index].Temperature.Minimum.Value,
  };

  return (
    <>
      <DayNavigationBar index={index} date={formattedData.date} />
      <SelectedDayCard
        cardName={'Day'}
        iconNumber={formattedData.dayIconNumber}
        tempValue={formattedData.dayTemperature}
        weatherText={formattedData.dayIconPhrase}
        date={formattedData.date}
      />
      <SelectedDayCard
        cardName={'Night'}
        iconNumber={formattedData.nightIconNumber}
        tempValue={formattedData.nightTemperature}
        weatherText={formattedData.nightIconPhrase}
        date={formattedData.date}
      />
    </>
  );
}

export default WeatherSelectedDate;
