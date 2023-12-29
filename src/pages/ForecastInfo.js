import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
const API_KEY = '6FsuZ4vrEMOvcJ9zVWUDlpNqvZugPH0y';

function ForecastInfo() {
  const { city, id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  console.log('dv:', city);
  useEffect(() => {
    async function getForecastbyLoactionKey() {
      if (!id) return;
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${id}/?apikey=${API_KEY}`,
        );
        const data = await res.json();
        console.log('forecast:', data);
      } catch (e) {
        setError('Cannot fetch data');
      } finally {
        setIsLoading(false);
      }
    }

    getForecastbyLoactionKey();
  }, [id]);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <div>
        <Header />
      </div>
    </div>
  );
}

export default ForecastInfo;
