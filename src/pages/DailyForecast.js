import { useParams } from 'react-router-dom';
import DailyForecastCard from '../components/DailyForecastCard';
import { dateIntervalWithWords } from '../utils';
import { useQuery } from '@tanstack/react-query';
const API_KEY = process.env.REACT_APP_ACCUWEATHER_API_KEY;

function DailyForecast() {
  const { id } = useParams();

  const { data, error, status } = useQuery({
    queryKey: ['dailyForecasts', id],
    queryFn: () =>
      fetch(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${id}/?apikey=${API_KEY}`,
      ).then((response) => response.json()),
  });

  if (status !== 'success') {
    return <span>loading...</span>;
  } else if (status === 'error') {
    return <span>{error}</span>;
  }

  const dailyForecasts = data.DailyForecasts;
  const startDate = data.DailyForecasts[0].Date;
  const endDate = data.DailyForecasts[4].Date;

  const dateIntervalObj = dateIntervalWithWords(startDate, endDate);

  return (
    <div>
      <p className="m-3 pl-5">
        {dateIntervalObj.startDate} - {dateIntervalObj.endDate}
      </p>
      {dailyForecasts.map((forecast, id) => (
        // TODO: reduce props
        <DailyForecastCard cardId={id} key={forecast.Date} />
      ))}
    </div>
  );
}

export default DailyForecast;
