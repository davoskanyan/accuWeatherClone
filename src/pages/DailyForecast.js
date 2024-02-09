import { useParams } from 'react-router-dom';
import DailyForecastCard from '../components/DailyForecastCard';
import { dateIntervalWithWords } from '../utils';
import { useQuery } from '@tanstack/react-query';
import { getDailyForecasts } from '../api';

function DailyForecast() {
  const { id } = useParams();

  const { data, error, status } = useQuery({
    queryKey: ['dailyForecasts', id],
    queryFn: () => getDailyForecasts(id),
  });

  console.log('datadaily:', data);
  if (status !== 'success') {
    return <span>loading...</span>;
  } else if (status === 'error') {
    return <span>{error}</span>;
  }

  const startDate = data[0].Date;
  const endDate = data[4].Date;

  const dateIntervalObj = dateIntervalWithWords(startDate, endDate);

  return (
    <div>
      <p className="m-3 pl-5">
        {dateIntervalObj.startDate} - {dateIntervalObj.endDate}
      </p>
      {data.map((forecast, id) => (
        <DailyForecastCard cardId={id} key={forecast.Date} />
      ))}
    </div>
  );
}

export default DailyForecast;
