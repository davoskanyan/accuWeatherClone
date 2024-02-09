import { Box, Text } from '@radix-ui/themes';
import Degree from './Degree';
import { useQuery } from '@tanstack/react-query';
import { getCurrentConditions } from '../api';

function RecentLocationCard({ id, name }) {
  const { data } = useQuery({
    queryKey: ['currentConditions', id],
    queryFn: () => getCurrentConditions(id),
  });

  if (!data) {
    return <span>loading...</span>;
  }

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
          src={`https://www.accuweather.com/images/weathericons/${data.iconNumber}.svg`}
        />
        <Degree
          tempValue={data.tempValue}
          unit={data.tempUnit}
          unitPosition="-9px"
        />
      </div>
    </Box>
  );
}

export default RecentLocationCard;
