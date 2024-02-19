import { Box, Text } from '@radix-ui/themes';
import Degree from './Degree';
import { useQuery } from '@tanstack/react-query';
import { getAutocomplete, getCurrentConditions } from '../api';

function RecentLocationCard({ id, name }) {
  const { data, error } = useQuery({
    queryKey: ['currentConditions', id],
    queryFn: () => getCurrentConditions(id),
    throwOnError: true,
  });

  const { data: options, isLoading } = useQuery({
    queryKey: ['autocomplete', name],
    queryFn: () => getAutocomplete(name),
    throwOnError: true,
  });

  if (!data || !options) {
    return <span>loading...</span>;
  }

  const country = isLoading ? 'loading...' : options[0]?.Country.LocalizedName;

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
      {error ? (
        <div>Something went wrong</div>
      ) : (
        <div>
          <div className="flex flex-col items-stretch">
            <Text className="text-md">{name}</Text>
            <Text className="text-[10px]">{country}</Text>
          </div>

          <div className="text-3xl flex flex-row justify-start gap-1 items-center">
            <img
              className={`h-[32px] w-[32px]`}
              src={`https://www.accuweather.com/images/weathericons/${data.iconNumber}.svg`}
              alt={data.weatherText}
            />
            <Degree
              tempValue={data.tempValue}
              unit={data.tempUnit}
              unitPosition="-9px"
            />
          </div>
        </div>
      )}
    </Box>
  );
}

export default RecentLocationCard;
