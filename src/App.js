import Main from './components/Main';
import './index.css';
import ForecastInfo from './pages/ForecastInfo';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

const API_KEY = '6FsuZ4vrEMOvcJ9zVWUDlpNqvZugPH0y';

function App() {
  const [city, setCity] = useState('yerevan');
  const [locationKey, setLocationKey] = useState('');
  const [isLoading, setIsLoading] = useState('false');
  const [searchValue, setSearchValue] = useState('');
  const [searchOptions, setSearchOptions] = useState([]);
  const [error, setError] = useState('');

  console.log('dv:', city);
  useEffect(() => {
    async function getLocationKey() {
      try {
        setIsLoading('true');
        const res = await fetch(
          `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${city}`,
        );
        const data = await res.json();
        setLocationKey(data[0].Key);
      } catch (e) {
        setError('Cannot fetch data');
      } finally {
        setIsLoading(false);
      }
    }

    getLocationKey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getForecastbyLoactionKey() {
      if (!locationKey) return;
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}/?apikey=${API_KEY}`,
        );
        const data = await res.json();
        console.log('data:', data);
      } catch (e) {
        setError('Cannot fetch data');
      } finally {
        setIsLoading(false);
      }
    }

    getForecastbyLoactionKey();
  }, [locationKey]);

  useEffect(() => {
    async function fetchAutocomplete() {
      if (searchValue === null) return;
      if (searchValue.length < 2) return;
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${searchValue}`,
        );
        const data = await res.json();
        setSearchOptions(data);
        console.log('autocomplete:', data);
      } catch (e) {
        setError('Cannot fetch data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchAutocomplete();
  }, [searchValue]);

  return (
    <div className="h-100">
      <BrowserRouter>
        <Routes>
          <Route path={`${city.LocalizedName}`} element={<ForecastInfo />} />
          <Route
            path="/"
            element={
              <Main
                setSearchValue={setSearchValue}
                searchValue={searchValue}
                error={error}
                isLoading={isLoading}
                searchOptions={searchOptions}
                setCity={setCity}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
