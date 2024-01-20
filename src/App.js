import Main from './components/Main';
import './index.css';
import ForecastInfo from './pages/ForecastInfo';
import { Route, Routes } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <div className="h-100">
      <Routes>
        <Route path="/:id/:city" element={<ForecastInfo />} />
        <Route path="/notFound" element={<PageNotFound />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
