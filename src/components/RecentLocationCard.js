import React from 'react';
import { Box, Text } from '@radix-ui/themes';
import SunIcon from '../icons/1.svg';

function RecentLocationCard({ city, country }) {
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
      <Text className="text-md">{city}</Text>
      <Text className="text-[10px]">{country}</Text>
      <div className="flex flex-row flex-nowrap justify-start items-center gap-1">
        <img className="h-[32px] w-[32px]" src={SunIcon} />
        <span className="text-[30px]">
          3°
          <span className="opacity-50 text-[12px] relative left-[-10px]">
            C
          </span>
        </span>
      </div>
    </Box>
  );
}

export default RecentLocationCard;
