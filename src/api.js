const API_KEY = process.env.REACT_APP_ACCUWEATHER_API_KEY;

export function getAutocomplete(debouncedValue) {
  return fetch(
    `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${debouncedValue}`,
  ).then((response) => response.json());
}

export function getDailyForecasts(id) {
  return fetch(
    `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${id}/?apikey=${API_KEY}`,
  )
    .then((response) => response.json())
    .then((data) => {
      return data.DailyForecasts;
    });
}

export function getCurrentConditions(id) {
  return fetch(
    `https://dataservice.accuweather.com/currentconditions/v1/${id}/?apikey=${API_KEY}`,
  )
    .then((response) => response.json())
    .then((data) => {
      return {
        tempValue: Math.round(data[0].Temperature.Metric.Value),
        iconNumber: data[0].WeatherIcon,
        tempUnit: data[0].Temperature.Metric.Unit,
        localObservationDateTime: data[0].LocalObservationDateTime,
        weatherText: data[0].WeatherText,
      };
    });
}
