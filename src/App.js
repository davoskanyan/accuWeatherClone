import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Main from './pages/Main';
import './index.css';
import ForecastInfo from './pages/ForecastInfo';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import DailyForecast from './pages/DailyForecast';
import ForecastCard from './components/ForecastCard';
import WeatherSelectedDate from './components/WeatherSelectedDate';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-100">
        <Routes>
          <Route index element={<Main />} />

          <Route path=":id/:city" element={<ForecastInfo />}>
            <Route index element={<Navigate to="today-forecast" replace />} />

            <Route path="today-forecast" element={<ForecastCard />} />

            <Route path="daily-forecast">
              <Route index element={<DailyForecast />} />

              <Route
                path="selectedDay/:index"
                element={<WeatherSelectedDate />}
              />
            </Route>
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
