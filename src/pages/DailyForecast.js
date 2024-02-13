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

  if (status !== 'success') {
    return <span>loading...</span>;
  } else if (status === 'error') {
    return <span>{error}</span>;
  }

  const dateIntervalObj = dateIntervalWithWords(data[0].Date, data[4].Date);

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
