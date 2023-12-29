import Main from './components/Main';
import './index.css';
import ForecastInfo from './pages/ForecastInfo';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageNotFound from './pages/PageNotFound';

const API_KEY = '6FsuZ4vrEMOvcJ9zVWUDlpNqvZugPH0y';

function App() {
  const [isLoading, setIsLoading] = useState('false');
  const [searchValue, setSearchValue] = useState('');
  const [searchOptions, setSearchOptions] = useState([]);
  const [error, setError] = useState('');

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
      <Routes>
        <Route path="/:id/:city" element={<ForecastInfo />} />
        <Route path="/notFound" element={<PageNotFound />} />
        <Route
          path="/"
          element={
            <Main
              setSearchValue={setSearchValue}
              searchValue={searchValue}
              error={error}
              isLoading={isLoading}
              searchOptions={searchOptions}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
