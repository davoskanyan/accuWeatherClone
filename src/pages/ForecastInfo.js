import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import useFetch from '../custom-hooks/useFetch';
const API_KEY = '6FsuZ4vrEMOvcJ9zVWUDlpNqvZugPH0y';

function ForecastInfo() {
  const { city, id } = useParams();
  const [status, errorMessage, result = {}] = useFetch(
    `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${id}/?apikey=${API_KEY}`,
    { disabled: !id },
  );
  console.log('dv:', result);
  console.log('dv:', city);

  return (
    <div>
      {status === 'isLoading' && <div>Loading...</div>}
      {status === 'error' && <div>{errorMessage}</div>}
      <div>
        <Header />
        <div>{result.DailyForecasts[0].Date}</div>
      </div>
    </div>
  );
}

export default ForecastInfo;
