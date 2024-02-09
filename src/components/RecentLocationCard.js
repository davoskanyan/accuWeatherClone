import { Box, Text } from '@radix-ui/themes';
import Degree from './Degree';
import { useQuery } from '@tanstack/react-query';
const API_KEY = process.env.REACT_APP_ACCUWEATHER_API_KEY;

function RecentLocationCard({ id, name }) {
  const { data } = useQuery({
    queryKey: ['currentConditions', id],
    queryFn: () =>
      fetch(
        `https://dataservice.accuweather.com/currentconditions/v1/${id}/?apikey=${API_KEY}`,
      ).then((response) => response.json()),
  });

  if (!data) {
    return <span>loading...</span>;
  }

  const tempValue = Math.round(data[0].Temperature.Metric.Value);
  const iconNumber = data[0].WeatherIcon;
  const tempUnit = data[0].Temperature.Metric.Unit;
  return (
    <Box
      style={{
        background: 'rgb(0,0,0, 0.25)',
        borderRadius: '4px',
        padding: '10px',
        backdropFilter: 'blur(20px)',
        color: 'white',
      }}
      className="h-32 flex flex-col"
    >
      <Text className="text-md">{name}</Text>
      {/*<Text className="text-[10px]">{country}</Text>*/}
      <div className="text-3xl flex flex-row justify-start gap-1 items-center">
        <img
          className={`h-[32px] w-[32px]`}
          src={`https://www.accuweather.com/images/weathericons/${iconNumber}.svg`}
        />
        <Degree tempValue={tempValue} unit={tempUnit} unitPosition="-9px" />
      </div>
    </Box>
  );
}

export default RecentLocationCard;
